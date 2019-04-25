import { Component } from 'react';
import {
  getOauthAccessToken, saveOauthCreds
} from '../utils/AuthService';

const queryString = require('query-string');


class Callback extends Component {
  componentDidMount() {
    let searchString = this.props.location.search;
    let searchParams = queryString.parse(searchString);
    console.log(searchParams);
    getOauthAccessToken(searchParams)
      .then(res => {
        console.log(res);
        let searchString = res.data.url.split('?')[1];
        let searchParams = queryString.parse(searchString);
        console.log(searchParams);
        saveOauthCreds(searchParams);
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
        let searchString = err.data.url.split('?')[1];
        let searchParams = queryString.parse(searchString);
        console.log(searchParams);
      });
  }

  render() {
    return null;
  }
}

export default Callback;
