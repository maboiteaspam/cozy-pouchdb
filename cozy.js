
var Pouchdb = require('pouchdb');

var plugin = {
  configure: function(options, config, program, cozyLight) {
    cozyLight.db = new Pouchdb(cozyLight.configHelpers.getHomePath() + '/cozy', {adapter : 'leveldb'});
  },
  onExit: function(options, config, callback, cozyLight) {
    if (cozyLight.db) {
      try {
        /*eslint-disable */
        if(!cozyLight.db._closed) {
          /*eslint-enable */
          return cozyLight.db.close(callback);
        }
      } catch (err) {
        cozyLight.logger.warn(err);
        cozyLight.logger.warn(err.stack);
      }
    }
    callback();
  }
};

module.exports = plugin;
