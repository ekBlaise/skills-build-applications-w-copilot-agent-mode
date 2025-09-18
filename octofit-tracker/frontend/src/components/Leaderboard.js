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
      <h2>Leaderboard</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Leaderboard;
