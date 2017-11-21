import axios from 'axios';
import appConfig from '../config.js';

module.exports = {
  http: axios, // you can use your favourite ajax library
  urlPrefix: `http://localhost:${appConfig.serverPort}/api`
};