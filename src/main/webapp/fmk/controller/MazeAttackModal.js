fmk.controller('MazeAttackModal', ['$scope', '$modalInstance', 'cardDefs', 'progress',
  function($scope, $modalInstancet, cardDefs, progress) {
    $scope.cardDefs = cardDefs;
    $scope.progress = progress;

    $scope.finish = function() {
      $modalInstancet.dismiss();
    };

    $scope.$watch('progress.battles', function(newValue, oldValue) {
      var modalBody = $('div.maze-attack-modal div.modal-body');
      modalBody.scrollTop(modalBody[0].scrollHeight);
    }, true);
  }
]);