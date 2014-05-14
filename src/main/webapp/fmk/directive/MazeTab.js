MAZE_PROFILE = 'maze_profile';

fmk.directive('mazeTab', function ($modal, $filter, MazeApi, AssetsBot, MazeBot, UserBot, NotificationService, ProfileService) {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/MazeTab.html',

    controller: function($scope) {

      $scope.saveSettings = function() {
        ProfileService.saveProfile(function() {
          NotificationService.success($filter('translate')('MAZE'), $filter('translate')('SETTING_SAVED_SUCCESSFULLY'))
        });
      };

      $scope.showConfigOptions = function() {
        $scope.configOptionsHidden = false;
      };

      $scope.hideConfigOptions = function() {
        $scope.configOptionsHidden = true;
      };

      $scope.clearBattles = function() {
        $scope.battles = [];
      };

      $scope.start = function() {
        $scope.clearBattles();
        MazeBot.run(function() {
        }, $scope.battles);
      };

      $scope.outdated = true;
      function reload() {
        $scope.clearBattles();
        ProfileService.getProfile(function(profiles) {
          $scope.profile = profiles[MAZE_PROFILE];
          $scope.outdated = false;
          AssetsBot.getCardDefs(function(cardDefs) {
            $scope.cardDefs = cardDefs;
          });
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
        },
        interval: 180,
        autoRun: true,
        maxReset: 0
      });
    }

  }
});