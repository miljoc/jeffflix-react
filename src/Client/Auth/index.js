import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import history from 'getHistory';
import { getBaseUrl } from 'Helpers';
import client from '../index';

const cookies = new Cookies();

const propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export const Auth = {
  isAuthenticated: false,
  isAdmin: false,

  authenticate() {
    this.isAdmin = jwtDecode(cookies.get('jwt').jwt).admin;
    this.isAuthenticated = true;
  },
  logout() {
    history.push('/login');
    this.isAuthenticated = false;
    this.isAdmin = false;

    cookies.remove('jwt', { path: '/' });
    client.resetStore();
  },
};


export const checkAuth = () => {
  if (cookies.get('jwt') == null) return false;
  const jwt = jwtDecode(cookies.get('jwt').jwt);

  const currentTime = Date.now() / 1000;

  if (jwt.exp < currentTime) {
    return false;
  }

  return Auth.authenticate();
};

export const AUTH_REQUEST = (username, password) => {
  const url = `${getBaseUrl()}/olaris/m/v1/auth`;

  const data = {
    username,
    password,
  };

  return axios.post(url, data).then((response) => {
    cookies.set('jwt', response.data, { path: '/' });
    Auth.authenticate();
  });
};

AUTH_REQUEST.propTypes = propTypes;
