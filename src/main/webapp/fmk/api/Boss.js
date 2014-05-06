BOSS_PHP = 'boss.php';

fmk.factory('Boss', function(Game) {
  return {

    getBoss: function(callback) {
      var params = {
      };
      Game.post(BOSS_PHP, 'GetBoss', params, callback);
    },

    fight: function(callback) {
      var params = {
      };
      Game.post(BOSS_PHP, 'Fight', params, callback);
    },

    getFightData: function(callback) {
      var params = {
      };
      Game.post(BOSS_PHP, 'GetFightData', params, callback);
    },

    getRanks: function(callback) {
      var params = {
      };
      Game.post(BOSS_PHP, 'GetRanks', params, callback);
    },

    buyTime: function(callback) {
      var params = {
      };
      Game.post(BOSS_PHP, 'BuyTime', params, callback);
    },

    getStatus: function(callback) {
      var params = {
      };
      Game.post(BOSS_PHP, 'GetStatus', params, callback);
    }
  }

});