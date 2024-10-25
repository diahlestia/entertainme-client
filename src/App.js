import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home'
import CreateMovie from './pages/CreateMovie';
import UpdateMovie from './pages/EditMovie';
import Navbar from './components/Navbar';
import Favorites from './pages/Favorites';


function App() {


  return (
    <div className="App">
      <Router>
        <Navbar />
      {/* <nav>
            <h3><Link className="m-3 nav col-md-5"
              style={{ color: "#1B1A17", cursor: "pointer" }}
              to="/">Home</Link></h3>
          </nav> */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/add">
            <CreateMovie />
          </Route>
          <Route path="/update/:id">
            <UpdateMovie />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


export default App;
