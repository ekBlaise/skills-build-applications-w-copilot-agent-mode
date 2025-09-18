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
      <h2>Workouts</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Workouts;
