# One-time setup in WSL (for me, the human)

Run these in the **Ubuntu** terminal, not PowerShell. After each step, check the expected result.

1. **Check the tools**
   `node -v` -> should start with `v24`
   `npm -v` -> any version
   `git --version` -> any version
   If `node` is missing or not 24, tell the agent and it will walk me through installing Node 24 with nvm.

2. **Work in the Linux filesystem**
   `mkdir -p ~/projects && cd ~/projects && pwd`
   -> should print `/home/<my-user>/projects`. Never work under `/mnt/c` (slow, and file watching breaks).

3. **Set my Git identity** (once)
   `git config --global user.name "My Name"`
   `git config --global user.email "my-github-email"`

4. **Get the repo**
   `git clone https://github.com/OhLookDucks/portfolio-site.git`
   `cd portfolio-site && git status`
   -> should say the working tree is clean.
   To push later I need GitHub access from WSL. `gh auth login` (GitHub CLI) is the easiest route. If `gh` is missing, ask the agent.

5. **Open it in an editor** (optional)
   With VS Code and its WSL extension installed on Windows: `code .` from inside the repo.

6. **Copy in the starter docs**
   Put `AGENTS.md` and the `docs/` folder in the repo root, then:
   `git checkout -b tanstack-migration`

7. **Start the agent in the repo folder** and paste `FIRST-PROMPT.txt`.

Later, to see the site: run `npm run dev` in the repo, then open the `localhost` URL it prints in my Windows browser.
