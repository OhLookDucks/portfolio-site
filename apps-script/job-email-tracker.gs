/**
 * JOB EMAIL TRACKER
 * Reads your Gmail "Jobs" labels and keeps the Applications tab up to date.
 *
 *   previewChanges()  -> only REPORTS what it would do. Nothing is written. Run this first.
 *   updateTracker()   -> really updates the sheet.
 *   autoLabel()       -> scans recent mail and applies Jobs/<status> labels automatically
 *   autoLabelAndUpdate() -> autoLabel + updateTracker in one go (what the trigger runs)
 *
 * What it does:
 *  1. "Application submitted" emails from Indeed and "application was sent" emails from
 *     LinkedIn: finds the matching row and sets Status to Applied, or adds a new row.
 *  2. Emails under your Jobs/Offer, Interview, Assessment and Rejected labels: finds the
 *     row whose company name appears in the email and moves its Status up.
 *  3. Rows still "Applied" a week after their follow-up date become Ghosted.
 * A status only ever moves UP (To Apply > Applied > Ghosted > Test Task > Interviewing >
 * Rejected > Offer). The script never moves one back down and never deletes anything.
 *
 * QUOTA SAFETY (added 2026-11-19): Gmail gives Apps Script about 20,000 mail
 * operations per day. The old version re-read ALL mail since START_DATE on every
 * run, so the allowance was gone before lunch. Now every run only reads the last
 * few days of mail, skips mail that is already labeled, and caps how much it
 * reads, so a full day of runs stays far below the limit.
 *
 * This file is a BACKUP COPY. The live script runs at script.google.com in the
 * project bound to the tracker Sheet. If you edit the live script, paste the
 * new version back here so the copy does not go stale.
 */

// ===== SETTINGS (you can change these) =====
const SCAN_WINDOW_DAYS = 3;        // each run only reads mail newer than this many days
const ADD_NEW_ROWS = true;         // add a row when an "application submitted" email has no match
const GHOST_AFTER_DAYS = 7;        // Applied -> Ghosted this many days after the follow-up date
const SHEET_NAME = "📋 Applications";
const FIRST_DATA_ROW = 5;         // row 4 = headers, data starts row 5
const START_DATE = "2026/11/01";   // now only used by the check buttons at the bottom

// Column numbers on the sheet (A = 1, B = 2, ...)
const COL = { date: 1, company: 2, role: 3, platform: 4, link: 5, status: 6, followUp: 7, notes: 8 };

// Gmail label -> tracker status
const LABEL_STATUS = [
  ["Jobs/Offer", "Offer"],
  ["Jobs/Interview", "Interviewing"],
  ["Jobs/Assessment", "Test Task"],
  ["Jobs/Rejected", "Rejected"],
  ["Jobs/Requirements", "Requirements Needed"],
];

// A status can only move to the right in this list
const RANK = ["To Apply", "Applied", "Ghosted", "Requirements Needed", "Test Task", "Interviewing", "Rejected", "Offer"];


// ===== THE TWO BUTTONS =====
function previewChanges() { run_(true); }
function updateTracker() { run_(false); }


// ===== MAIN LOGIC =====
function run_(dryRun) {
  const sheet = getSheet_();
  const rows = readRows_(sheet);
  const cutoff = daysAgo_(SCAN_WINDOW_DAYS);   // only mail newer than this is read
  const pending = {};          // rowNum -> {to, why}
  const newRows = [];          // rows we will add
  const log = [];

  const rank = s => RANK.indexOf(s);
  const currentStatus = r => (pending[r.rowNum] ? pending[r.rowNum].to : r.status);
  const propose = (r, to, why) => {
    if (rank(to) > rank(currentStatus(r))) {
      pending[r.rowNum] = { to: to, why: why };
      log.push("STATUS  row " + r.rowNum + " (" + r.company + "): " + (r.status || "(blank)") + " -> " + to + "   [" + why + "]");
    }
  };

  // --- Step 1: submitted applications (Indeed and LinkedIn) ---
  const submissions = findSubmissions_(cutoff);
  submissions.forEach(function (s) {
    let row = matchSubmission_(rows, s.company, s.role);
    if (row) {
      if (rank("Applied") > rank(currentStatus(row))) propose(row, "Applied", s.platform + " submitted email");
      return;
    }
    if (!ADD_NEW_ROWS) { log.push("NO ROW  " + s.company + " - " + s.role + " (not added: ADD_NEW_ROWS is off)"); return; }
    const rowNum = nextFreeRow_(rows);
    const followUp = new Date(s.date.getTime() + 7 * 86400000);
    const fresh = {
      rowNum: rowNum, date: s.date, company: s.company, role: s.role, platform: s.platform,
      status: "Applied", followUp: followUp, notes: "Added automatically from " + s.platform + " email", isNew: true,
    };
    rows.push(fresh);
    newRows.push(fresh);
    log.push("NEW ROW row " + rowNum + ": " + s.company + " | " + s.role + " | " + s.platform + " | Applied");
  });

  // --- Step 2: Offer / Interview / Assessment / Rejected labels ---
  LABEL_STATUS.forEach(function (pair) {
    const labelName = pair[0], status = pair[1];
    // Quota safety: recent labeled mail only. Older threads already moved
    // their rows in earlier runs, so re-reading them is wasted quota.
    const threads = GmailApp.search(labelQuery_(labelName) + " after:" + afterDate_(cutoff));
    threads.forEach(function (thread) {
      const msgs = thread.getMessages().filter(m => m.getDate() >= cutoff).slice(-AUTO_MAX_MESSAGES);
      if (!msgs.length) return;
      const text = norm_(msgs.map(m => m.getSubject() + " " + m.getFrom() + " " + messageText_(m).slice(0, 3000)).join(" "));
      let matched = false;
      rows.forEach(function (r) {
        if (!usableCompany_(r)) return;
        if (text.indexOf(norm_(r.company)) !== -1) {
          matched = true;
          propose(r, status, labelName + ": " + msgs[0].getSubject().slice(0, 60));
        }
      });
      if (!matched) log.push("NO MATCH [" + labelName + "] " + msgs[0].getSubject().slice(0, 80));
    });
  });

  // --- Step 3: ghosted ---
  const today = new Date();
  rows.forEach(function (r) {
    if (currentStatus(r) !== "Applied" || !(r.followUp instanceof Date)) return;
    const daysPast = (today - r.followUp) / 86400000;
    if (daysPast > GHOST_AFTER_DAYS) propose(r, "Ghosted", "no reply " + Math.floor(daysPast) + " days after follow-up date");
  });

  // --- Write (or just report) ---
  if (!log.length) log.push("Nothing to change.");
  if (!dryRun) writeChanges_(sheet, rows, pending, newRows, today);

  Logger.log((dryRun ? "PREVIEW ONLY. Nothing was written to the sheet.\n" : "DONE. The sheet was updated.\n") + log.join("\n"));
}


// ===== FINDING SUBMITTED APPLICATIONS =====
function findSubmissions_(startDate) {
  const found = [];
  const after = afterDate_(startDate);

  // Indeed: the "Application submitted" email names the company in the body.
  GmailApp.search('from:indeedapply@indeed.com "Application submitted" after:' + after).forEach(function (thread) {
    thread.getMessages().forEach(function (m) {
      if (m.getDate() < startDate) return;
      // Only the "Application submitted" email names the company, so the
      // "We'll help you get started" emails are skipped automatically.
      const company = parseIndeedCompany_(messageText_(m));
      if (!company) return;
      found.push({ company: company, role: parseIndeedRole_(m.getSubject()), platform: "Indeed", date: m.getDate() });
    });
  });

  // LinkedIn: the subject says "your application was sent to <Company>".
  GmailApp.search('from:linkedin.com "your application was sent to" after:' + after).forEach(function (thread) {
    thread.getMessages().forEach(function (m) {
      if (m.getDate() < startDate) return;
      const company = parseLinkedInCompany_(m.getSubject());
      if (!company) return;
      found.push({ company: company, role: "", platform: "LinkedIn", date: m.getDate() });
    });
  });

  return found;
}

function parseIndeedCompany_(body) {
  const m = body.match(/The following items were sent to\s+(.+?)\.\s*Good luck/i);
  return m ? clean_(m[1]) : "";
}

function parseIndeedRole_(subject) {
  return clean_(String(subject).replace(/^Indeed Application:\s*/i, ""));
}

function parseLinkedInCompany_(subject) {
  const m = String(subject).match(/your application was sent to\s+(.+)$/i);
  return m ? clean_(m[1]) : "";
}


// Turns the HTML of an email into plain text (Indeed's plain-text version leaves out the company)
function messageText_(m) {
  return clean_(
    m.getBody()
      .replace(/<(style|script)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
  );
}


// ===== SHEET HELPERS =====
function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.getSheets().find(s => s.getName().indexOf("Applications") !== -1);
  if (!sheet) throw new Error("Could not find the Applications tab. Check SHEET_NAME at the top of the script.");
  return sheet;
}

function readRows_(sheet) {
  const last = Math.max(sheet.getLastRow(), FIRST_DATA_ROW);
  const values = sheet.getRange(FIRST_DATA_ROW, 1, last - FIRST_DATA_ROW + 1, 8).getValues();
  return values.map(function (v, i) {
    return {
      rowNum: FIRST_DATA_ROW + i,
      date: v[COL.date - 1],
      company: clean_(v[COL.company - 1]),
      role: clean_(v[COL.role - 1]),
      platform: clean_(v[COL.platform - 1]),
      status: clean_(v[COL.status - 1]),
      followUp: v[COL.followUp - 1],
      notes: clean_(v[COL.notes - 1]),
    };
  });
}

function nextFreeRow_(rows) {
  const used = {};
  rows.forEach(r => { if (r.company) used[r.rowNum] = true; });
  let n = FIRST_DATA_ROW;
  while (used[n]) n++;
  return n;
}

function writeChanges_(sheet, rows, pending, newRows, today) {
  const stamp = Utilities.formatDate(today, Session.getScriptTimeZone(), "MMM d");

  // New rows first (they may also have a later status from a label)
  newRows.forEach(function (r) {
    const finalStatus = pending[r.rowNum] ? pending[r.rowNum].to : r.status;
    const range = sheet.getRange(r.rowNum, 1, 1, 8);
    range.setValues([[r.date, r.company, r.role, r.platform, "", finalStatus, r.followUp, r.notes]]);
    sheet.getRange(r.rowNum, COL.date).setNumberFormat("m/d/yyyy");
    sheet.getRange(r.rowNum, COL.followUp).setNumberFormat("m/d/yyyy");
  });

  // Status changes on existing rows
  rows.forEach(function (r) {
    if (r.isNew || !pending[r.rowNum]) return;
    const p = pending[r.rowNum];
    sheet.getRange(r.rowNum, COL.status).setValue(p.to);
    const note = "Auto: " + p.to + " (" + stamp + ")";
    sheet.getRange(r.rowNum, COL.notes).setValue(r.notes ? r.notes + "\n" + note : note);
  });
}


// ===== SMALL HELPERS =====
function clean_(t) { return String(t == null ? "" : t).replace(/\s+/g, " ").trim(); }

// A Date this many days back (quota safety: mail older than this is never re-read)
function daysAgo_(days) { return new Date(Date.now() - days * 86400000); }

// Date -> the "after:" text Gmail search understands
function afterDate_(d) { return Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyy/MM/dd"); }

// Lower-case, drop punctuation and words like "Inc"/"LLC" so company names compare fairly
function norm_(t) {
  return String(t == null ? "" : t).toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\b(inc|llc|ltd|corp|corporation|co|company|incorporated)\b/g, " ")
    .replace(/\s+/g, " ").trim();
}

// Ignore rows where the "company" is really a job title, or is too short to match safely
function usableCompany_(r) {
  const c = norm_(r.company);
  return c.length >= 4 && c !== norm_(r.role) && c.length <= 40;
}

function matchSubmission_(rows, company, role) {
  const c = norm_(company);
  if (!c) return null;
  return rows.find(function (r) {
    const rc = norm_(r.company);
    if (!rc) return false;
    const sameCompany = rc === c || (rc.length >= 4 && c.indexOf(rc) !== -1) || (c.length >= 4 && rc.indexOf(c) !== -1);
    if (!sameCompany) return false;
    const rr = norm_(r.role), nr = norm_(role);
    return !rr || !nr || rr.indexOf(nr) !== -1 || nr.indexOf(rr) !== -1;
  }) || null;
}

// "Jobs/Offer" -> label:jobs-offer  (how Gmail writes nested labels in search)
function labelQuery_(name) { return "label:" + name.toLowerCase().replace(/[\/\s]+/g, "-"); }


// ===== CHECK BUTTONS (they only read and show, nothing is changed) =====

// Lists every submitted application the script can find since START_DATE
function showWhatIFound() {
  const found = findSubmissions_(new Date(START_DATE));
  Logger.log(found.length
    ? found.map(s => s.date.toDateString() + " | " + s.platform + " | " + s.company + " | " + s.role).join("\n")
    : "No submitted-application emails found since " + START_DATE);
}

// Shows how the script reads a few Indeed emails
function debugIndeed() {
  const threads = GmailApp.search('from:indeedapply@indeed.com "Application submitted" after:' + START_DATE);
  Logger.log("Conversations found: " + threads.length);
  threads.slice(0, 3).forEach(function (t) {
    t.getMessages().slice(0, 4).forEach(function (m) {
      const text = messageText_(m);
      Logger.log(m.getDate().toDateString() + " | " + m.getSubject() +
        "\nCOMPANY READ AS: [" + parseIndeedCompany_(text) + "]\n" + text.slice(0, 500) + "\n---");
    });
  });
}

// ===== AUTO-LABELER (added 2026-11-18, wayfinder ticket #11) =====
// Sorts recent mail into your Jobs/<status> labels BY CONTENT, so you no
// longer label rejection/interview emails by hand. Manual labels always
// win: a thread you already labeled is never re-classified. Sheet updates
// still flow through your existing previewChanges()/updateTracker() rules.

// Only recent inbox mail, and the search itself skips anything already
// carrying a Jobs/ label, so labeled mail is never downloaded again.
const AUTO_SEARCH_QUERY = "in:inbox newer_than:" + SCAN_WINDOW_DAYS + "d";
const AUTO_EXCLUDE = LABEL_STATUS.map(function (pair) { return "-" + labelQuery_(pair[0]); }).join(" ");
const AUTO_MAX_THREADS = 25;    // at most this many conversations per run (quota safety)
const AUTO_MAX_MESSAGES = 3;    // read the newest messages of a conversation, not all of them

// First match wins, so order matters: Rejected is checked before the rest.
// Phrases are matched after normalization (lower-case, punctuation dropped).
const AUTO_KEYWORDS = {
  "Jobs/Rejected": [
    "unfortunately",
    "regret to inform",
    "not moving forward",
    "won t be moving forward",
    "will not be moving forward",
    "decided to move forward with other candidates",
    "gone with other candidates",
    "position has been filled",
    "unable to progress",
    "after careful consideration",
  ],
  "Jobs/Offer": [
    "pleased to offer you",
    "happy to offer you",
    "we d like to offer you",
    "compensation package",
  ],
  "Jobs/Assessment": [
    "assessment",
    "test task",
    "complete the task",
    "take home task",
    "technical challenge",
  ],
  "Jobs/Requirements": [
    "requirements",
    "clearance",
    "nbi",
    "police clearance",
    "submit the following",
  ],
  "Jobs/Interview": [
    "interview",
    "schedule a call",
    "available for a call",
  ],
};

// Button 1: label recent mail only (safe — nothing is written to the sheet)
function autoLabel() {
  return autoLabel_(false);
}

// Button 2: label recent mail AND update the sheet (what the trigger runs)
function autoLabelAndUpdate() {
  return autoLabel_(true);
}

function autoLabel_(alsoUpdate) {
  const rows = readRows_(getSheet_()).filter(usableCompany_);
  const threads = GmailApp.search(AUTO_SEARCH_QUERY + " " + AUTO_EXCLUDE, 0, AUTO_MAX_THREADS);
  const labels = {};   // label name -> GmailLabel, fetched once per run instead of once per thread
  const log = [];

  threads.forEach(function (thread) {
    // Manual labels always win: skip anything already under Jobs/
    const alreadyLabeled = thread.getLabels().some(function (l) {
      return l.getName().indexOf("Jobs/") === 0;
    });
    if (alreadyLabeled) return;

    const text = norm_(thread.getMessages().slice(-AUTO_MAX_MESSAGES).map(function (m) {
      return (m.getSubject() || "") + " " + messageText_(m).slice(0, 3000);
    }).join(" "));

    // Which open row does this thread belong to (by company)?
    const row = rows.find(function (r) {
      return text.indexOf(norm_(r.company)) !== -1;
    });
    if (!row) return;

    // First keyword group that matches decides the label
    for (const labelName in AUTO_KEYWORDS) {
      const hit = AUTO_KEYWORDS[labelName].some(function (k) {
        return text.indexOf(norm_(k)) !== -1;
      });
      if (!hit) continue;
      if (!labels[labelName]) labels[labelName] = ensureLabel_(labelName);
      const label = labels[labelName];
      const alreadyHas = thread.getLabels().some(function (l) {
        return l.getName() === label.getName();
      });
      if (!alreadyHas) {
        thread.addLabel(label);
        log.push("LABELED [" + labelName + "] " + (thread.getFirstMessageSubject() || "").slice(0, 70));
      }
      break;
    }
  });

  if (!log.length) log.push("Nothing new to label.");
  if (alsoUpdate) run_(false); // your existing updater (rank-safe, writes Auto: notes)
  Logger.log((alsoUpdate ? "AUTO-LABEL + UPDATE done.\n" : "AUTO-LABEL done. Run previewChanges() to see what the sheet would change.\n") + log.join("\n"));
}

// Gets or creates a Gmail label ("Jobs/Rejected" nests under "Jobs")
function ensureLabel_(name) {
  let label = GmailApp.getUserLabelByName(name);
  if (!label) GmailApp.createLabel(name);
  return GmailApp.getUserLabelByName(name);
}

// Run once: sets up the trigger. Every 30 minutes instead of 10: Gmail only
// allows ~20,000 mail operations a day, and 10-minute runs were burning
// through it. 30 minutes behaves the same for a job tracker and stays well
// inside the limit. Also removes any leftover trigger on updateTracker,
// because autoLabelAndUpdate already does that work.
function installAutoTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "updateTracker") {
      ScriptApp.deleteTrigger(t);
      Logger.log("Removed the old updateTracker trigger (autoLabelAndUpdate covers it).");
    }
  });
  const exists = ScriptApp.getProjectTriggers().some(function (t) {
    return t.getHandlerFunction() === "autoLabelAndUpdate";
  });
  if (!exists) {
    ScriptApp.newTrigger("autoLabelAndUpdate").timeBased().everyMinutes(30).create();
    Logger.log("Trigger installed: autoLabelAndUpdate every 30 minutes");
  } else {
    Logger.log("autoLabelAndUpdate trigger already installed.");
  }
}
