fmk.controller('LogDetail', ['$scope', '$modalInstance', '$filter', 'log',
  function($scope, $modalInstance, $filter, log) {

   $scope.log = log;
  }
]);