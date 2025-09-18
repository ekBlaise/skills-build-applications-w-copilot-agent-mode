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
      <h2>Users</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Users;
