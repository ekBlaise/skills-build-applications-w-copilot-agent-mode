import React, { useEffect, useState } from 'react';

const Users = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const base = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Fetching Users from', base);
    fetch(base)
      .then((r) => r.json())
      .then((json) => {
        console.log('Users fetched raw:', json);
        const items = Array.isArray(json) ? json : json.results || [];
        console.log('Users parsed items:', items);
        setData(items);
      })
      .catch((err) => console.error('Users fetch error', err));
  }, [base]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5">Users</h2>
        <div>
          <button className="btn btn-sm btn-primary me-2">New User</button>
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
                  <th>Email</th>
                  <th>Team</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((u) => (
                  <tr key={u.id || u._id || Math.random()}>
                    <td>{u.id || u._id}</td>
                    <td>{u.name || u.full_name || u.first_name || '-'}</td>
                    <td>{u.email || '-'}</td>
                    <td>{(u.team && (u.team.name || u.team)) || u.team_id || '-'}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-2">View</button>
                      <button className="btn btn-sm btn-outline-danger">Remove</button>
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No users found.</td>
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

export default Users;
