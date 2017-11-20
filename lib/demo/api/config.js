import axios from 'axios';
import appConfig from '../config.js';

module.exports = {
	http: axios, // 可以使用自己喜欢的库
	urlPrefix: `http://localhost:${appConfig.serverPort}/api`
};