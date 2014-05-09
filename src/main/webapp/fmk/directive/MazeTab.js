MAZE_PROFILE = 'maze_profile';

fmk.directive('mazeTab', function ($modal, MazeApi, MazeBot, UserBot, ProfileService) {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/MazeTab.html',

    controller: function($scope) {

      $scope.start = function() {
        MazeBot.clearMazes($scope.profile);
      };

      $scope.saveSettings = function() {
        ProfileService.saveProfile();
      };

      $scope.test = function() {
        MazeApi.info(7, 5);
      };


      $scope.outdated = true;

      function reload() {
        UserBot.getUserinfo(false, function(userinfo) {
          $scope.userinfo = userinfo;
          MazeBot.getAvailableMazes(false, function(mazes) {
            $scope.mazes = mazes;
            $scope.profile = ProfileService.getProfile()[MAZE_PROFILE];
            $scope.outdated = false;
          })
        });
      }

      $scope.$on(HOME_SWITCH_USER, function() {
        $scope.outdated = true;
        if($scope.tabs.maze)
          reload();
      });

      $scope.$watch('tabs.maze', function(newValue) {
        if(newValue && $scope.outdated)
          reload();
      });

    },

    link: function() {
      ProfileService.setDefaultProfile(MAZE_PROFILE, {
        attack: {
          2: false,
          3: false,
          4: false,
          5: false,
          6: true,
          7: true,
          8: true
        }
      });
    }

  }
});