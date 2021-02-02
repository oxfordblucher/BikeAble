import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard';
/* import User from './Pages/User/User'; */
import Discover from './Pages/Discover';
import Nav from './Components/Nav';
import NoMatch from './Pages/NoMatch';
/* import { StoreProvider } from './Utils/GlobalState'; */

function App() {
  return (
    <Router>
      <div>
        {/* <StoreProvider> */}
          <Nav />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            {/* <Route exact path='/user/:id' component={User} /> */}
            {/* <Route exact path='/discover' component={Discover} /> */}
            <Route component={NoMatch} />
          </Switch>
        {/* </StoreProvider> */}
      </div>
    </Router>
  );
}

export default App;
