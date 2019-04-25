import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import '../App.css';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">Miniflix</Link>
        </div>
        <ul className="nav navbar-nav">
          <li><Link to="/">All Videos</Link></li>
          <li>{ (isLoggedIn()) ? <Link to="/upload">Upload Videos</Link> :  '' }</li>
        </ul>
        <ul className="nav navbar-nav pull-right">
          <li className="">
            { (isLoggedIn())
              ? (<a href="javascript:void(0)" className="" onClick={logout}><b>Logout</b></a>)
              : (<a href="javascript:void(0)" className="" onClick={login}><b>Login</b></a>)
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
