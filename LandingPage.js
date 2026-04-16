import React, { useState } from 'react';
import { fetchAll, getTopLanguages, getTopRepos, getYearsActive, getActivityStreak, getCommitCount } from '../utils/github';
import './LandingPage.css';

export default function LandingPage({ onGenerate }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [phase, setPhase] = useState('');

  const phases = [
    'Fetching profile…',
    'Reading repositories…',
    'Analyzing contributions…',
    'Crafting your story…',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    setError('');

    let pi = 0;
    const interval = setInterval(() => {
      setPhase(phases[pi % phases.length]);
      pi++;
    }, 700);

    try {
      const { user, repos, events } = await fetchAll(username.trim());
      const topLangs = getTopLanguages(repos);
      const topRepos = getTopRepos(repos);
      const yearsActive = getYearsActive(user, repos);
      const activeDays = getActivityStreak(events);
      const commitCount = getCommitCount(events);
      onGenerate({ user, repos, events, topLangs, topRepos, yearsActive, activeDays, commitCount });
    } catch (err) {
      setError('Username not found or GitHub API limit reached. Try again.');
    } finally {
      clearInterval(interval);
      setLoading(false);
      setPhase('');
    }
  };

  return (
    <main className="landing">
      <div className="landing__noise" aria-hidden="true" />
      <div className="landing__grid" aria-hidden="true" />

      <header className="landing__header">
        <span className="landing__logo">GSB</span>
        <span className="landing__credit">by Agus Satria Adhitama</span>
      </header>

      <section className="landing__hero">
        <div className="landing__eyebrow">
          <span className="landing__dot" /> GitHub Story Builder
        </div>

        <h1 className="landing__title">
          Your code,<br />
          <em>your story.</em>
        </h1>

        <p className="landing__sub">
          Turn any GitHub profile into a beautiful, shareable developer story.
          Stats, languages, timeline — all of it, beautifully rendered.
        </p>

        <form className="landing__form" onSubmit={handleSubmit}>
          <div className="landing__input-wrap">
            <span className="landing__at">github.com /</span>
            <input
              className="landing__input"
              type="text"
              placeholder="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={loading}
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <button className="landing__btn" type="submit" disabled={loading || !username.trim()}>
            {loading ? <span className="landing__spinner" /> : 'Generate →'}
          </button>
        </form>

        {loading && (
          <p className="landing__phase">{phase}</p>
        )}
        {error && (
          <p className="landing__error">{error}</p>
        )}
      </section>

      <div className="landing__features">
        {['Stack Analysis', 'Contribution Heat', 'Top Projects', 'Shareable Card'].map(f => (
          <div className="landing__feature" key={f}>
            <span className="landing__feature-dot" />
            {f}
          </div>
        ))}
      </div>

      <footer className="landing__footer">
        <span>Made with React · Powered by GitHub API</span>
        <span>© {new Date().getFullYear()} Agus Satria Adhitama</span>
      </footer>
    </main>
  );
}
