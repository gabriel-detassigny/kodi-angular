'use strict';

app.factory('Remote',
  function(KODI_URL) {
    var Remote = {
      left: function() {
        return "toto";
      }
    };
    return Remote;
  }
);
