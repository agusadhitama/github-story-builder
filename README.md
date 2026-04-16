# GitHub Story Builder

> Turn any GitHub profile into a beautiful, shareable developer story.

Built with React · Powered by GitHub API  
**by Agus Satria Adhitama**

---

## Features

- **Hero card** = avatar, bio, location, website, years active
- **Stats row** = followers, public repos, active days, recent commits
- **Stack breakdown** = top languages with animated bars
- **Repository timeline** = repos created per year, visualized as a bar chart
- **Top projects** = 6 best repos with stars, forks, language
- **Share link** = copy a shareable URL with pre-filled username

---

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/agusadhitama/github-story-builder.git
cd github-story-builder
npm install
```

### 2. Run locally

```bash
npm start
```

Opens at `http://localhost:3000`

---

## Deploy to GitHub Pages

### 1. Update `homepage` in `package.json`

```json
"homepage": "https://agusadhitama.github.io/github-story-builder"
```

### 2. Deploy

```bash
npm run deploy
```

This builds the app and pushes to the `gh-pages` branch automatically.  
Your site will be live at: `https://agusadhitama.github.io/github-story-builder`

---

## Notes

- Uses the **public GitHub API** (unauthenticated) = rate limit is 60 requests/hour per IP.
- For higher limits, add a `REACT_APP_GITHUB_TOKEN` env variable and update `github.js` fetch headers.
- No backend needed = pure client-side React.

---

## License

MIT © Agus Satria Adhitama
