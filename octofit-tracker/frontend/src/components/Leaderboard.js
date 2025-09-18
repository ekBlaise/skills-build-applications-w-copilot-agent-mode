import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const base = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching Leaderboard from', base);
    fetch(base)
      .then((r) => r.json())
      .then((json) => {
        console.log('Leaderboard fetched raw:', json);
        const items = Array.isArray(json) ? json : json.results || [];
        console.log('Leaderboard parsed items:', items);
        setData(items);
      })
      .catch((err) => console.error('Leaderboard fetch error', err));
  }, [base]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5">Leaderboard</h2>
        <div>
          <button className="btn btn-sm btn-outline-secondary">Refresh</button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {data.map((l, idx) => (
                  <tr key={l.id || l._id || idx}>
                    <td>{l.rank || idx + 1}</td>
                    <td>{(l.user && (l.user.name || l.user)) || l.user_id || '-'}</td>
                    <td>{(l.team && (l.team.name || l.team)) || l.team_id || '-'}</td>
                    <td>{l.points || l.score || '-'}</td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-4">No leaderboard entries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
