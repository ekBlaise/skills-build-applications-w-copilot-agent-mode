import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const base = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching Workouts from', base);
    fetch(base)
      .then((r) => r.json())
      .then((json) => {
        console.log('Workouts fetched raw:', json);
        const items = Array.isArray(json) ? json : json.results || [];
        console.log('Workouts parsed items:', items);
        setData(items);
      })
      .catch((err) => console.error('Workouts fetch error', err));
  }, [base]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5">Workouts</h2>
        <div>
          <button className="btn btn-sm btn-primary me-2">New Workout</button>
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
                  <th>User</th>
                  <th>Activity</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((w) => (
                  <tr key={w.id || w._id || Math.random()}>
                    <td>{w.id || w._id}</td>
                    <td>{(w.user && (w.user.name || w.user)) || w.user_id || '-'}</td>
                    <td>{(w.activity && (w.activity.name || w.activity)) || w.activity_id || '-'}</td>
                    <td>{w.duration || '-'}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">View</button>
                      <button className="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No workouts found.</td>
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

export default Workouts;
