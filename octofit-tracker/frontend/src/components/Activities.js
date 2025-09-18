import React, { useEffect, useState } from 'react';

const Activities = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const base = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching Activities from', base);
    fetch(base)
      .then((r) => r.json())
      .then((json) => {
        console.log('Activities fetched raw:', json);
        const items = Array.isArray(json) ? json : json.results || [];
        console.log('Activities parsed items:', items);
        setData(items);
      })
      .catch((err) => console.error('Activities fetch error', err));
  }, [base]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5">Activities</h2>
        <div>
          <button className="btn btn-sm btn-primary me-2">New Activity</button>
          <button className="btn btn-sm btn-outline-secondary">Refresh</button>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((a) => (
                  <tr key={a.id || a._id || Math.random()}>
                    <td>{a.id || a._id}</td>
                    <td>{a.name || a.activity_name || '-'}</td>
                    <td>{a.duration || a.length || '-'}</td>
                    <td>{a.calories || '-'}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">View</button>
                      <button className="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No activities found.</td>
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

export default Activities;
