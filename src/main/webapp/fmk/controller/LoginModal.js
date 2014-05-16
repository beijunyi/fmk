fmk.controller('LoginModal', ['$scope', '$modalInstance', 'LoginBot',
  function($scope, $modalInstance, LoginBot) {

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

    }

  }
]);