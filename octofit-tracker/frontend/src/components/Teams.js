import React, { useEffect, useState } from 'react';

const Teams = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const base = codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching Teams from', base);
    fetch(base)
      .then((r) => r.json())
      .then((json) => {
        console.log('Teams fetched raw:', json);
        const items = Array.isArray(json) ? json : json.results || [];
        console.log('Teams parsed items:', items);
        setData(items);
      })
      .catch((err) => console.error('Teams fetch error', err));
  }, [base]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5">Teams</h2>
        <div>
          <button className="btn btn-sm btn-primary me-2">New Team</button>
          <button className="btn btn-sm btn-outline-secondary">Refresh</button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Members</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((t) => (
                  <tr key={t.id || t._id || Math.random()}>
                    <td>{t.id || t._id}</td>
                    <td>{t.name || t.team_name || '-'}</td>
                    <td>{(t.members && t.members.length) || t.size || '-'}</td>
                    <td>{t.created_at || t.created || '-'}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">View</button>
                      <button className="btn btn-sm btn-outline-danger">Remove</button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No teams found.</td>
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

export default Teams;
