# apps-script/

Backup copies of the Google Apps Script projects that sit outside this repo,
in the owner's Google account.

| File | Lives at | What it does |
|---|---|---|
| `job-email-tracker.gs` | script.google.com, project bound to the job-tracker Sheet | Labels job-application mail into `Jobs/...` labels and updates the Applications tab, every 30 minutes |

The live script is the one that runs; this copy is backup only. If you edit
the live version, paste the new code back into the matching file here (and
vice versa: to restore, copy a file's contents into the Apps Script editor).
