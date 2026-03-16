import { FiStar, FiGitBranch, FiBookOpen } from 'react-icons/fi';
import './RepoList.css';

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Lua: '#000080',
  Scala: '#c22d40',
  R: '#198CE7',
  Jupyter: '#DA5B0B',
};

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}

export default function RepoList({ repos }) {
  if (!repos || repos.length === 0) return null;

  const sorted = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);

  return (
    <section className="repo-section" id="repo-section">
      <div className="repo-section__header">
        <h2 className="repo-section__title">
          <FiBookOpen /> Repositories
        </h2>
        <span className="repo-section__count">{repos.length} repos</span>
      </div>
      <div className="repo-grid">
        {sorted.slice(0, 12).map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="repo-card__name">
              <FiBookOpen size={15} />
              {repo.name}
            </div>
            {repo.description && (
              <p className="repo-card__desc">{repo.description}</p>
            )}
            <div className="repo-card__meta">
              {repo.language && (
                <span className="repo-card__meta-item">
                  <span
                    className="repo-card__lang-dot"
                    style={{ background: LANG_COLORS[repo.language] || '#8b949e' }}
                  />
                  {repo.language}
                </span>
              )}
              {repo.stargazers_count > 0 && (
                <span className="repo-card__meta-item repo-card__meta-item--stars">
                  <FiStar /> {repo.stargazers_count}
                </span>
              )}
              {repo.forks_count > 0 && (
                <span className="repo-card__meta-item repo-card__meta-item--forks">
                  <FiGitBranch /> {repo.forks_count}
                </span>
              )}
              <span className="repo-card__updated">
                {timeAgo(repo.updated_at)}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
