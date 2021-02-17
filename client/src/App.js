import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import User from './Pages/User';
import Discover from './Pages/Discover';
import Nav from './Components/Nav';
import NoMatch from './Pages/NoMatch';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/dashboard' component={Dashboard} />
          {<Route exact path='/user' component={User} />}
          <Route exact path='/discover' component={Discover} />
          <Route exact path='/register' component={Register} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
