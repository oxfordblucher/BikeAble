import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile';
import Discover from './Pages/Discover';
import NoMatch from './Pages/NoMatch';
import { Component } from 'react';
import CoordsContext from './Utils/coords-context';
import User from './Pages/User';

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      coords1: {
        lat: NaN,
        lng: NaN
      },
      coords2: {
        lat: NaN,
        lng: NaN
      },
      start: '',
      end: '',
      waypoint: {
        lat: NaN,
        lng: NaN
      },
      zipCode: NaN,
      found: false,
      user: {},
      summary: {
        distance: NaN,
        duration: ''
      },
      directions: [],
      logIn: this.logIn,
      logOut: this.logOut,
      setCoords: this.setCoords,
      setWaypoint: this.setWaypoint,
      setSummary: this.setSummary,
      unmountMap: this.unmountMap,
      mountMap: this.mountMap
    };
  }

  logIn = (user) => {
    this.setState({
      user: user
    })
  }

  logOut = () => {
    this.setState({
      user: {}
    })
  }

  setCoords = (coords1, coords2, start, end) => {
    this.setState({
      coords1: coords1,
      coords2: coords2,
      found: true,
      start: start,
      end: end
    })
  }

  setWaypoint = (lat, lng) => {
    this.setState({
      waypoint: {
        lat: lat,
        lng: lng
      }
    })
  }

  setSummary = (dist, dura, directions) => {
    this.setState({
      summary: {
        distance: dist,
        duration: dura
      },
      directions: directions
    })
  }

  unmountMap = () => {
    this.setState({
      found: false
    })
  }

  mountMap = () => {
    this.setState({
      found: true
    })
  }

  render() {
    return (
      <Router>
        <div>
          <CoordsContext.Provider value={this.state}>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/user' component={Profile} />
              <Route path='/user/:userId' component={User} />
              <Route exact path='/discover' component={Discover} />
              <Route exact path='/register' component={Register} />
              <Route component={NoMatch} />
            </Switch>
          </CoordsContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
