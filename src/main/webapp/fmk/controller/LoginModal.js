fmk.controller('LoginModal', ['$scope', '$modalInstance', 'allowDismiss', 'LoginBot',
  function($scope, $modalInstance, allowDismiss, LoginBot) {

    $scope.allowDismiss = allowDismiss;

    $scope.login = function() {
      delete $scope.error;
      $scope.loading = true;
      LoginBot.login($scope.username, $scope.password, function(token) {
        $scope.loading = false;
        $modalInstance.close(token);
      }, function(message) {
        $scope.loading = false;
        $scope.error = message;
      });
    };

    $scope.cancel = function() {
      $modalInstance.dismiss();
    }

  }
]);