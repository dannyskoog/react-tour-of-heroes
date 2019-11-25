import React from 'react';
import { Link, Switch, Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import './app.css';
import { Heroes } from './heroes/heroes';
import { Dashboard } from './dashboard/dashboard';
import { Messages } from './messages/messages';
import HeroDetail from './hero-detail/hero-detail';

function App() {
  const title = 'Tour of Heroes';

  return (
    <div className="app">
      <h1>{title}</h1>
      <Router>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/heroes">Heroes</Link>
        </nav>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/heroes">
            <Heroes />
          </Route>
          <Route path="/detail/:id">
            <HeroDetail />
          </Route>
        </Switch>
      </Router>
      <Messages />
    </div>
  );
}

export default App;