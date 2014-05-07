fmk.directive('consoleLogger', function ($modal) {
    return {
      restrict: 'E',
      scope: {
        logs: '='
      },
      templateUrl: 'fmk/view/ConsoleLogger.html',

      controller: function($scope) {

        $scope.view = function(log) {
          $modal.open({
            templateUrl: 'fmk/view/LogDetail.html',
            controller: 'LogDetail',
            resolve: {
              log: function() {
                return log;
              }
            }
          })
        }

      }

    }
  });