import { FiMapPin, FiExternalLink } from 'react-icons/fi';
import './ProfileSummary.css';

export default function ProfileSummary({ data }) {
  if (!data) return null;

  const formatCount = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return n;
  };

  return (
    <section className="profile-summary" id="profile-summary">
      <div className="profile-card">
        <div className="profile-card__avatar-wrapper">
          <img
            className="profile-card__avatar"
            src={data.avatar_url}
            alt={`${data.login}'s avatar`}
          />
        </div>
        <div className="profile-card__info">
          <h2 className="profile-card__name">{data.name || data.login}</h2>
          <div className="profile-card__username">@{data.login}</div>
          {data.bio && <p className="profile-card__bio">{data.bio}</p>}
          {data.location && (
            <div className="profile-card__location">
              <FiMapPin size={14} />
              {data.location}
            </div>
          )}
          <div className="profile-card__stats">
            <div className="profile-card__stat">
              <div className="profile-card__stat-value">{formatCount(data.public_repos)}</div>
              <div className="profile-card__stat-label">Repos</div>
            </div>
            <div className="profile-card__stat">
              <div className="profile-card__stat-value">{formatCount(data.followers)}</div>
              <div className="profile-card__stat-label">Followers</div>
            </div>
            <div className="profile-card__stat">
              <div className="profile-card__stat-value">{formatCount(data.following)}</div>
              <div className="profile-card__stat-label">Following</div>
            </div>
            <div className="profile-card__stat">
              <div className="profile-card__stat-value">{formatCount(data.public_gists || 0)}</div>
              <div className="profile-card__stat-label">Gists</div>
            </div>
          </div>
          <a
            href={data.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-card__link"
          >
            <FiExternalLink size={14} />
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
