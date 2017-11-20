const { http, urlPrefix } = require('./config.js');

module.exports = {
  getData (){
    return new Promise((resolve, reject) => {
      http.post(urlPrefix + '/data').then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
};