import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div className="App container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <Link className="navbar-brand" to="/">OctoFit</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/" element={<div>Welcome to OctoFit Tracker. Use the navigation to view API data.</div>} />
      </Routes>
    </div>
  );
}

export default App;
