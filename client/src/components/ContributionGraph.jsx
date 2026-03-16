import { useState, useEffect } from 'react';
import { FiActivity } from 'react-icons/fi';
import { ActivityCalendar } from 'react-activity-calendar';
import './ContributionGraph.css';

export default function ContributionGraph({ username }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    // Fetch contribution data from a reliable third-party API that parses GitHub's HTML
    fetch(`https://github-contributions-api.deno.dev/${username}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((resData) => {
        if (resData && resData.contributions) {
          // Process the last 365 days
          const oneYearAgo = new Date();
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
          
          const flatContributions = resData.contributions.flat();
          const formattedData = flatContributions
            .filter((day) => new Date(day.date) >= oneYearAgo)
            .map((day) => ({
              date: day.date,
              count: day.contributionCount,
              level: getLevel(day.contributionCount),
            }));
          setData(formattedData);
        }
      })
      .catch((err) => console.error('Error fetching contributions:', err))
      .finally(() => setLoading(false));
  }, [username]);

  // GitHub contribution levels based on count (approximate mapping)
  const getLevel = (count) => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
  };

  if (!username) return null;

  return (
    <section className="contribution-graph" id="contribution-graph">
      <div className="contribution-graph__card">
        <div className="contribution-graph__header">
          <h2 className="contribution-graph__title">
            <FiActivity /> True GitHub Contributions
          </h2>
        </div>

        <div className="contribution-graph__calendar-wrapper">
          {loading ? (
            <div className="contribution-graph__loading">Loading true contribution data...</div>
          ) : data.length > 0 ? (
            <ActivityCalendar
              data={data}
              theme={{
                light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
              colorScheme="dark"
              labels={{
                totalCount: '{{count}} contributions in the last year',
              }}
              color="#39d353"
              blockSize={16}
              blockRadius={3}
              blockMargin={6}
              fontSize={14}
            />
          ) : (
            <div className="contribution-graph__error">Could not load contribution data.</div>
          )}
        </div>
      </div>
    </section>
  );
}
