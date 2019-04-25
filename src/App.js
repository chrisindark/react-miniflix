import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import axios from 'axios';
import Upload from './components/Upload';
import Display from './components/Display';
import Callback from './components/Callback';
import logo from './logo.svg';
import './App.css';

// Handle API request errors
axios.interceptors.response.use(response => {
  return response;
}, error => {
  return new Promise((resolve, reject) => {
      // console.log(error);
      reject(error);
  });
});

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Display} />
          <Route path="/upload" component={Upload} />
          <Route path="/auth/google/callback" component={Callback} />
        </div>
      </Router>
    );
  }
}

export default App;
