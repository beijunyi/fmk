fmk.directive('consoleLogger', function ($modal, $filter, LogService) {
    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: 'fmk/view/ConsoleLogger.html',

      controller: function($scope) {

        $scope.view = function(log) {
          $modal.open({
            templateUrl: 'fmk/view/LogDetailModal.html',
            controller: 'LogDetailModal',
            windowClass: 'log-detail',
            resolve: {
              log: function() {
                return log;
              }
            }
          })
        };

        $scope.getStatus = function(log) {
          if(log.status == -1)
            return $filter('translate')('PENDING');
          if(log.status == 1)
            return $filter('translate')('SUCCESS');
          return log.message;
        };

        $scope.logs = LogService.register({
          notify: function() {
            var tableContainer = $('div.console-logger div.table-container');
            tableContainer.scrollTop(tableContainer[0].scrollHeight);
          }
        })

      }

    }
});