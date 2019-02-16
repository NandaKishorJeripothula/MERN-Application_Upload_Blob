import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import getUploads from "./components/getUploads.component";
import GetAllUploads from './components/getAllUploads.component'
import home from "./components/home.component";
import Navbar from './components/navbar.component'
class App extends Component {
  render() {
    return (
      <Router>
          <div >
          <Navbar/>
          <div className='container'>
          
            <br/>
            <Route path="/" exact component={home} />
            <Route path="/getUploads" component={getUploads} />
            <Route path="/getAllUploads" component={GetAllUploads} />
            </div>
          </div>
      </Router>
    );
  }
}
export default App;