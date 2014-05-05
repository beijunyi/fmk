fmk.controller('Login', ['$scope', '$modalInstance','$log', 'Game', 'Login',
  function($scope, $modalInstance, $log, Game, Login) {

    $scope.login = function() {
      var request = {
        userName: $scope.username,
        userPassword: $scope.password,
        gameName: 'CARD-IPHONE-CHS'
      };

      httpCall("checkUserActivedBase64Json", strEncode(jsonToString(request)), function(result){
        var json = eval('(' + result + ')');
        if(json.returnCode == '0') {
          var token = $.parseJSON(result).returnObjs;
          $scope.token = token;
          Game.setToken(token);
          Login.passportLogin(function() {
            $modalInstance.close();
          });
        } else {
          $log.error(LNG.ERROR_CODE[json.returnCode] || result);
        }
      });
    }
  }
]);