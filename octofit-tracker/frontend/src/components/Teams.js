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
      <h2>Teams</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Teams;
