JOURNEY_PROFILE = 'journey_profile';

fmk.directive('journeyTab', function (CardBot, JourneyBot, UserBot, NotificationService, ProfileService, $filter) {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/JourneyTab.html',

    controller: function($scope) {

      $scope.saveSettings = function() {
        ProfileService.saveProfile(function() {
          NotificationService.success($filter('translate')('JOURNEY'), $filter('translate')('SETTINGS_SAVED_SUCCESSFULLY'))
        });
      };

      $scope.showConfigOptions = function() {
        $scope.configOptionsHidden = false;
      };

      $scope.hideConfigOptions = function() {
        $scope.configOptionsHidden = true;
      };
      $scope.start = function() {
      };

      $scope.switchCardGroup = function() {
        CardBot.setCurrentCardGroup($scope.cardGroupInfo.target, function() {
          $scope.cardGroupInfo.current = $scope.cardGroupInfo.target;
        })
      };


      $scope.refreshUserJourneysStatus = function() {
        JourneyBot.getUserJourneysStatus(function(userJourneysStatus) {
          $scope.userJourneysStatus = userJourneysStatus;
        }, true);
      };

      $scope.exploreForBoss = function() {
        JourneyBot.exploreForBoss(function(boss) {

        }, function() {

        })
      };

      $scope.getJourneyPointReward = function(journey) {
        JourneyBot.getJourneyPointReward(journey.UserJourneyId);
      };

      $scope.fightJourney = function(journey) {
        JourneyBot.fightJourney(journey.UserJourneyId);
      };

      $scope.clearCDTime = function() {
        JourneyBot.clearCDTime();
      };

      $scope.buyEnergy = function() {
        UserBot.buyEnergy();
      };


      function reload() {
        ProfileService.getProfile(function(profile) {
          $scope.profile = profile[JOURNEY_PROFILE];
          UserBot.getUserinfo(function(userinfo) {
            if(userinfo.JourneyActStatus && userinfo.JourneyActStatus.isOpen) {
              JourneyBot.startRegularUpdate(function(userJourneysStatus) {
                /*
                 Avatar: "0"
                 FleeTime: 0
                 Grade: 3
                 HPCount: 130260
                 HPCurrent: 0
                 JourneyAvatar: "9103"
                 JourneyBigAvatar: "http://s6.mysticalcard.com/public/swf/journey/img_maxCard_9103.jpg"
                 JourneyId: "11"
                 JourneyName: "困难·莉莉丝"
                 LastAttackerName: "瞎玩吧"
                 LastAttackerUid: 219659
                 Level: 24
                 NickName: "瞎玩吧"
                 Round: 6
                 Sex: "0"
                 Status: 2
                 Time: 1402407961
                 Uid: 219659
                 UserJourneyId: 20889
                 enableAward: 0
                 */
                $scope.userJourneysStatus = userJourneysStatus;
                JourneyBot.getFightStatus(function(fightStatus) {
                  /*
                   {
                   "userJourneyInfo": {
                   "UserJourneyId": 23118,
                   "Uid": 355441,
                   "JourneyId": "9",
                   "NickName": "随意猫少",
                   "Avatar": "203",
                   "Sex": "1",
                   "Status": 2,
                   "LastAttackerName": "李里克",
                   "LastAttackerUid": 110827,
                   "HPCount": 61830,
                   "HPCurrent": 0,
                   "Round": 2,
                   "Grade": 2,
                   "Level": 11,
                   "JourneyName": "普通·莉莉丝",
                   "JourneyAvatar": "9102",
                   "JourneyBigAvatar": "http://s6.mysticalcard.com/public/swf/journey/img_maxCard_9102.jpg",
                   "Time": 1402415427,
                   "FleeTime": 0,
                   "CDTime": -8297,
                   "CDTimeStatus": 1,
                   "HpRankList": [
                   {
                   "Uid": 110827,
                   "NickName": "李里克",
                   "HP": "38189",
                   "Round": "1"
                   },
                   {
                   "Uid": 355441,
                   "NickName": "随意猫少",
                   "HP": "23641",
                   "Round": "1"
                   }
                   ],
                   "clear_cd_time": {
                   "time": 60,
                   "cash": 1
                   },
                   "max_cd_time": 3600
                   }
                   }
                   */
                  $scope.fightStatus = fightStatus;
                  CardBot.getCurrentCardGroup(function(pos) {
                    $scope.cardGroupInfo.target = pos;
                    $scope.cardGroupInfo.current = pos;
                  });
                });
              })
            }
          });
        });
      }
      $scope.$on(HOME_SWITCH_USER, function() {
        delete $scope.userJourneysStatus;
        delete $scope.fightStatus;
        JourneyBot.stopRegularUpdate();
        JourneyBot.loseFightStatus();
        if($scope.tabs.journey)
          reload();
      });
      $scope.$watch('tabs.journey', function(newValue) {
        if(newValue)
          reload();
        else {
          delete $scope.userJourneysStatus;
          delete $scope.fightStatus;
          JourneyBot.stopRegularUpdate();
          JourneyBot.loseFightStatus();
        }
      });
    },

    link: function($scope) {

      $scope.comparisons = [
        {
          type: 'lt',
          name: $filter('translate')('LESS_THAN')
        }, {
          type: 'gte',
          name: $filter('translate')('GREATER_THAN_EQUAL')
        }
      ];

      $scope.cardGroups = [
        {
          name: $filter('translate')('DEF_CARD_GROUP'),
          pos: 'def'
        }, {
          name: $filter('translate')('CARD_GROUP') + ' 1',
          pos: '1'
        }, {
          name: $filter('translate')('CARD_GROUP') + ' 2',
          pos: '2'
        }, {
          name: $filter('translate')('CARD_GROUP') + ' 3',
          pos: '3'
        }, {
          name: $filter('translate')('CARD_GROUP') + ' 4',
          pos: '4'
        }, {
          name: $filter('translate')('CARD_GROUP') + ' 5',
          pos: '5'
        }, {
          name: $filter('translate')('CARD_GROUP') + ' 6',
          pos: '6'
        }, {
          name: $filter('translate')('CARD_GROUP') + ' 7',
          pos: '7'
        }, {
          name: $filter('translate')('CARD_GROUP') + ' 8',
          pos: '8'
        }, {
          name: $filter('translate')('CARD_GROUP') + ' 9',
          pos: '9'
        }
      ];
      $scope.cardGroupInfo = {};

      ProfileService.setDefaultProfile(JOURNEY_PROFILE, {
        autoAttack: false,
        maxCooldown: 50,
        easy: false,
        easyComparison: 'lt',
        easyThreshold: 50,
        normal: false,
        normalComparison: 'lt',
        normalThreshold: 50,
        hard: false,
        hardComparison: 'lt',
        hardThreshold: 50,
        nightmare: false,
        nightmareComparison: 'lt',
        nightmareThreshold: 50,
        infernal: false,
        infernalComparison: 'lt',
        infernalThreshold: 50
      });
    }

  }
});