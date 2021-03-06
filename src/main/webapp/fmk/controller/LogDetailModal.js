fmk.controller('LogDetailModal', ['$scope', '$modalInstance', '$filter', 'log', function ($scope, $modalInstance, $filter, log) {

  $scope.log = log;

  $scope.getResponse = function(log) {
    if(log.status == 1)
      return $filter('json')(log.response);
    if(log.status == -1)
      return $filter('translate')('PENDING');
    return log.message;
  }

}
]);