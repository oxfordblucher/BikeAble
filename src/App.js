import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Pages/Login';
import Dashboard from './Components/Pages/Dashboard';
import User from './Components/Pages/User';
import Nav from './Components/Nav';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={['/', '/login']}>
            <Login />
          </Route>
          <Route exact path='/dashboard'>
            <Dashboard />
          </Route>
          <Route exact path='/user/:id'>
            <User />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
