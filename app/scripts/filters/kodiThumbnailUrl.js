/* global angular:true */

'use strict';

angular.module('kodiThumbnailUrl', []).filter('kodiThumbnailUrl', [
    'KodiWS',
    function(KodiWS) {
        return function(url) {
            return KodiWS.getThumbnailURL(url);
        };
    }
]);