import { useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import SearchSection from './components/SearchSection';
import ProfileSummary from './components/ProfileSummary';
import RepoList from './components/RepoList';
import ContributionGraph from './components/ContributionGraph';
import ActivityAnalytics from './components/ActivityAnalytics';
import ErrorDisplay from './components/ErrorDisplay';
import './App.css';

// Local Proxy Server API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://gitsum.onrender.com';
const GITHUB_API = `${API_BASE_URL}/api/github`;

function LoadingSkeleton() {
  return (
    <div className="loading-section">
      <div className="skeleton skeleton--card" />
      <div className="skeleton skeleton--row" />
      <div className="skeleton skeleton--row" />
      <div className="skeleton skeleton--card" style={{ height: '120px' }} />
    </div>
  );
}

export default function App() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [reposData, setReposData] = useState(null);
  const [eventsData, setEventsData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const trimmed = username.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setProfileData(null);
    setReposData(null);
    setEventsData(null);

    try {
      // Fetch profile, repos, and events in parallel from local proxy server
      const [profileRes, reposRes, eventsRes] = await Promise.all([
        axios.get(`${GITHUB_API}/users/${trimmed}`),
        axios.get(`${GITHUB_API}/users/${trimmed}/repos?per_page=100&sort=stars&direction=desc`),
        axios.get(`${GITHUB_API}/users/${trimmed}/events?per_page=100`),
      ]);

      setProfileData(profileRes.data);
      setReposData(reposRes.data);
      setEventsData(eventsRes.data);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError('404: User not found');
        } else if (err.response.status === 403) {
          setError('403: API rate limit exceeded');
        } else {
          setError(`Error ${err.response.status}: ${err.response.data?.message || 'Something went wrong'}`);
        }
      } else {
        setError('Network error: Could not reach GitHub API');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="app__bg-gradient" />
      <Navbar />
      <main className="app__content">
        <SearchSection
          username={username}
          setUsername={setUsername}
          onSearch={handleSearch}
          loading={loading}
        />
        <ErrorDisplay error={error} />
        {loading && <LoadingSkeleton />}
        {!loading && profileData && (
          <>
            <ProfileSummary data={profileData} />
            <RepoList repos={reposData} />
            <ContributionGraph username={profileData.login} />
            <ActivityAnalytics repos={reposData} events={eventsData} />
          </>
        )}
      </main>
      <footer className="app__footer">
        Built with ♥ by two cool CS Majors · Powered by the GitHub API
      </footer>
    </div>
  );
}
