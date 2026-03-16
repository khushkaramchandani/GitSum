import { useMemo } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { FiPieChart } from 'react-icons/fi';
import './ActivityAnalytics.css';

const CHART_COLORS = [
  '#58a6ff', '#bc8cff', '#3fb950', '#f0883e', '#f85149',
  '#39d2c0', '#e3b341', '#f778ba', '#79c0ff', '#d2a8ff',
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(22, 27, 34, 0.95)',
        border: '1px solid rgba(48, 54, 61, 0.6)',
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '0.8rem',
        color: '#e6edf3',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ fontWeight: 700 }}>{payload[0].name || payload[0].payload.name}</div>
        <div style={{ color: '#8b949e' }}>{payload[0].value}</div>
      </div>
    );
  }
  return null;
};

export default function ActivityAnalytics({ repos, events }) {
  const { langData, topRepos, activeDays, inactiveDays } = useMemo(() => {
    if (!repos || repos.length === 0) {
      return { langData: [], topRepos: [], activeDays: 0, inactiveDays: 365 };
    }

    // Language usage from repos
    const langMap = {};
    repos.forEach((repo) => {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    });
    const langArr = Object.entries(langMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    // Top repos by stars
    const top = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((r) => ({
        name: r.name.length > 12 ? r.name.slice(0, 12) + '…' : r.name,
        stars: r.stargazers_count,
      }));

    // Active days from events
    const dateSet = new Set();
    (events || []).forEach((ev) => {
      const d = ev.created_at?.split('T')[0];
      if (d) dateSet.add(d);
    });
    const active = dateSet.size;
    const inactive = 365 - active;

    return { langData: langArr, topRepos: top, activeDays: active, inactiveDays: inactive };
  }, [repos, events]);

  if (!repos || repos.length === 0) return null;

  const activePercent = Math.round((activeDays / 365) * 100);
  const inactivePercent = 100 - activePercent;

  return (
    <section className="analytics-section" id="analytics-section">
      <h2 className="analytics-section__title">
        <FiPieChart /> Activity Analytics
      </h2>

      <div className="analytics-grid">
        {/* Language Pie Chart */}
        {langData.length > 0 && (
          <div className="analytics-card">
            <div className="analytics-card__title">Language Usage</div>
            <div className="analytics-card__chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={langData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {langData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Top Repos Bar Chart */}
        {topRepos.length > 0 && topRepos.some(r => r.stars > 0) && (
          <div className="analytics-card">
            <div className="analytics-card__title">Top Repositories by Stars</div>
            <div className="analytics-card__chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topRepos} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(48,54,61,0.4)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#8b949e', fontSize: 11 }}
                    axisLine={{ stroke: 'rgba(48,54,61,0.4)' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#8b949e', fontSize: 11 }}
                    axisLine={{ stroke: 'rgba(48,54,61,0.4)' }}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="stars" radius={[6, 6, 0, 0]} fill="url(#barGradient)" />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#c0c0c0" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Active vs Inactive Days */}
      <div className="analytics-stats" style={{ marginTop: 'var(--space-md)' }}>
        <div className="analytics-stat-card">
          <div className="analytics-stat-card__value analytics-stat-card__value--green">
            {activeDays}
          </div>
          <div className="analytics-stat-card__label">Active Days</div>
          <div className="analytics-stat-card__bar">
            <div
              className="analytics-stat-card__bar-fill analytics-stat-card__bar-fill--green"
              style={{ width: `${activePercent}%` }}
            />
          </div>
        </div>
        <div className="analytics-stat-card">
          <div className="analytics-stat-card__value analytics-stat-card__value--muted">
            {inactiveDays}
          </div>
          <div className="analytics-stat-card__label">Inactive Days</div>
          <div className="analytics-stat-card__bar">
            <div
              className="analytics-stat-card__bar-fill analytics-stat-card__bar-fill--muted"
              style={{ width: `${inactivePercent}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
