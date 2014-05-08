LOGIN_BOT_LOGIN_RECORDS = "login_records";

fmk.factory('LoginBot', function(GameApi, LoginApi, WebApi, Cookies) {

  var loginRecords = Cookies.getObject(LOGIN_BOT_LOGIN_RECORDS) || [];
  function saveLoginRecords() {
    Cookies.setObject(LOGIN_BOT_LOGIN_RECORDS, loginRecords);
  }

  return {

    getLastLoginRecord: function() {
      var lastLogin = null;
      $.each(loginRecords, function(index, account) {
        if(lastLogin == null)
          lastLogin = account;
        else if(account.timestamp > lastLogin.timestamp) {
          lastLogin = account;
        }
      });
      return lastLogin;
    },

    login: function(username, password, callback) {
      WebApi.login(username, password, function(token) {
        GameApi.setToken(token);
        LoginApi.passportLogin(function() {
          var newRecord = {
            username: username,
            password: password,
            server: token.GS_DESC,
            timestamp: new Date().getTime()
          };

          var existingRecord = $.grep(loginRecords, function(record) {
            return record.username = newRecord.username;
          });
          if(existingRecord.length == 0)
            loginRecords.push(newRecord);
          else
            existingRecord[0].timestamp = newRecord.timestamp;

          saveLoginRecords();
          if(callback)
            callback(newRecord);
        });
      });
    }
  }
});