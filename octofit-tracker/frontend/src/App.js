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
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 rounded shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center fw-bold text-white" to="/">
            <img src="/octofitapp-small.png" alt="OctoFit" className="me-2" style={{height: 36, width: 36}} />
            <span>OctoFit</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#octoNav" aria-controls="octoNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octoNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link text-white" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/workouts">Workouts</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/leaderboard">Leaderboard</Link></li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control form-control-sm me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-light btn-sm" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/" element={
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="h4">Welcome to OctoFit Tracker</h1>
              <p className="mb-0">Use the navigation to explore Activities, Teams, Users, Workouts, and the Leaderboard.</p>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default App;
