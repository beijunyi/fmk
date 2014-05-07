fmk.controller('Home', ['$scope', '$modal', 'Friend', 'Fenergy', 'Log',
  function($scope, $modal, Friend, Fenergy, Log) {

    function openLogin() {
      $modal.open({
        templateUrl: 'fmk/view/Login.html',
        controller: 'Login',
        backdrop: 'static'
      });
    }

    $scope.accept = function() {
      Friend.disposeFriendApply(FRIEND_AGREE, 1);
    };

    $scope.logs = [];
    Log.linkLogs($scope.logs);

    $scope.friends = [];
    $scope.list = function() {
      Friend.getFriends(function(response) {
        $scope.friends = response.Friends;
      });
    };
    $scope.findFriend = function(fid) {
      return $.grep($scope.friends, function(friend) {
        return friend.Uid == fid;
      })[0];
    };
    $scope.claimEnergy = function(fid) {
      Fenergy.getFEnergy(fid, function () {
        $scope.findFriend(fid).FEnergySurplus = 0;
      });
    };
    $scope.sendEnergy = function(fid) {
      Fenergy.sendFEnergy(fid, function () {
        $scope.findFriend(fid).FEnergySend = 0;
      });
    };

    openLogin();
  }
]);