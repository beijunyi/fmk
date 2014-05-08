fmk.factory('WebApi', function(GameApi, LoginApi) {
  return {

    login: function(username, password, callback) {
      var request = {
        userName: username,
        userPassword: password,
        gameName: game_name
      };

      httpCall("checkUserActivedBase64Json", strEncode(jsonToString(request)), function(response){
        var json = eval('(' + response + ')');
        if(json.returnCode == '0') {
          var token = $.parseJSON(response).returnObjs;
          if(callback)
            callback(token);
        } else {
          $log.error(LNG.ERROR_CODE[json.returnCode] || response);
        }
      });

    }
  }
});