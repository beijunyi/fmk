fmk.controller('Home', ['$scope', '$modal', 'CardApi', 'FenergyApi', 'FriendApi', 'MapstageApi', 'LoginBot', 'MazeBot', 'Log',
  function($scope, $modal, CardApi, FenergyApi, FriendApi, MapstageApi, LoginBot, MazeBot, Log) {

    function showLoginModal() {
      $modal.open({
        templateUrl: 'fmk/view/Login.html',
        controller: 'LoginModal',
        backdrop: 'static'
      });
    }
    function autoLogin() {
      var lastLogin = LoginBot.getLastLoginRecord();
      if(lastLogin != null)
        LoginBot.login(lastLogin.username, lastLogin.password);
      else
        showLoginModal();
    }

    $scope.user = function() {
    };

    $scope.card = function () {
      CardApi.getAllCard();
    };

    $scope.map = function() {
      MapstageApi.getMapStageALL();
    };

    $scope.maze = function() {
      MazeBot.fetchMazes(false, function(mazes) {
      });
    };

    $scope.logs = [];
    Log.linkLogs($scope.logs);

    $scope.friends = [];
    $scope.list = function() {
      FriendApi.getFriends(function(response) {
        $scope.friends = response.Friends;
      });
    };
    $scope.findFriend = function(fid) {
      return $.grep($scope.friends, function(friend) {
        return friend.Uid == fid;
      })[0];
    };
    $scope.claimEnergy = function(fid) {
      FenergyApi.getFEnergy(fid, function () {
        $scope.findFriend(fid).FEnergySurplus = 0;
      });
    };
    $scope.sendEnergy = function(fid) {
      FenergyApi.sendFEnergy(fid, function () {
        $scope.findFriend(fid).FEnergySend = 0;
      });
    };

    autoLogin();
  }
]);