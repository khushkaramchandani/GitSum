import { FiSearch } from 'react-icons/fi';
import './SearchSection.css';

export default function SearchSection({ username, setUsername, onSearch, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) onSearch();
  };

  return (
    <section className="search-section" id="search-section">
      <div className="search-section__hero-glow" />
      
      <div className="search-section__beta-pill animate-fade-in-up">
        <span className="search-section__beta-dot"></span>
        Now in Beta Release
      </div>

      <h1 className="animate-fade-in-up delay-1">
        Explore Any Developer
      </h1>
      <p className="search-section__tagline animate-fade-in-up delay-2">
        Generate beautiful reports from any GitHub profile — repos, contributions, and analytics at a glance.
      </p>
      <form className="search-section__form animate-fade-in-up delay-3" onSubmit={handleSubmit}>
        <div className="search-section__input-wrapper">
          <input
            id="username-input"
            type="text"
            className="search-section__input"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <FiSearch className="search-section__input-icon" />
        </div>
        <button
          id="generate-btn"
          type="submit"
          className="search-section__btn"
          disabled={loading || !username.trim()}
        >
          {loading ? <div className="spinner" /> : null}
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>
    </section>
  );
}
