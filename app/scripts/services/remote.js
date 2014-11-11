/* global services:true */

'use strict';

services.service('KodiRemote', ['KodiWS',
  function(KodiWS) {
    var remote = {
      input: function(action) {
        KodiWS.send('Input.' + action);
      },
    };
    return remote;
  }
]);
