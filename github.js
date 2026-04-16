const BASE = 'https://api.github.com';

export async function fetchUser(username) {
  const res = await fetch(`${BASE}/users/${username}`);
  if (!res.ok) throw new Error('User not found');
  return res.json();
}

export async function fetchRepos(username) {
  const res = await fetch(`${BASE}/users/${username}/repos?per_page=100&sort=pushed`);
  if (!res.ok) throw new Error('Failed to fetch repos');
  return res.json();
}

export async function fetchEvents(username) {
  const res = await fetch(`${BASE}/users/${username}/events/public?per_page=100`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchAll(username) {
  const [user, repos, events] = await Promise.all([
    fetchUser(username),
    fetchRepos(username),
    fetchEvents(username),
  ]);
  return { user, repos, events };
}

export function getTopLanguages(repos) {
  const langs = {};
  repos.forEach(r => {
    if (r.language) {
      langs[r.language] = (langs[r.language] || 0) + 1;
    }
  });
  return Object.entries(langs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));
}

export function getTopRepos(repos) {
  return repos
    .filter(r => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);
}

export function getYearsActive(user, repos) {
  const joined = new Date(user.created_at).getFullYear();
  const now = new Date().getFullYear();
  return now - joined;
}

export function getActivityStreak(events) {
  const days = new Set();
  events.forEach(e => {
    const d = new Date(e.created_at).toDateString();
    days.add(d);
  });
  return days.size;
}

export function getCommitCount(events) {
  return events.filter(e => e.type === 'PushEvent').reduce((acc, e) => {
    return acc + (e.payload?.commits?.length || 0);
  }, 0);
}

export const LANG_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  Rust: '#dea584',
  Go: '#00add8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  PHP: '#4f5d95',
  Swift: '#fa7343',
  Kotlin: '#a97bff',
  Dart: '#00b4ab',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  default: '#8888a8',
};

export function langColor(lang) {
  return LANG_COLORS[lang] || LANG_COLORS.default;
}
