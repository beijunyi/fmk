LEGIONATTACK_PHP = 'legionattack.php';

fmk.factory('LegionattackApi', function(GameApi) {
  return {

    info: function(callback) {
      var params = {
      };
      GameApi.post(LEGIONATTACK_PHP, 'info', params, callback);
    }

  }

});