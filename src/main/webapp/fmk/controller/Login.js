fmk.controller('Login', ['$scope', '$modalInstance','$log', 'GameApi', 'LoginApi',
  function($scope, $modalInstance, $log, GameApi, LoginApi) {

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
          GameApi.setToken(token);
          LoginApi.passportLogin(function() {
            $modalInstance.close();
          });
        } else {
          $log.error(LNG.ERROR_CODE[json.returnCode] || result);
        }
      });
    }
  }
]);