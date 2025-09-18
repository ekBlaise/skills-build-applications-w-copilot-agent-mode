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
      <h2>Activities</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Activities;
