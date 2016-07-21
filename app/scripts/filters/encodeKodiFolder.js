/* global angular:true */

'use strict';

angular.module('encodeKodiFolder', []).filter('encodeKodiFolder', [
    '$window',
    function($window) {
        return function(folder, addonid) {
            if (folder.indexOf('plugin://') !== -1) {
                if (addonid) {
                    return $window.encodeURIComponent(folder.replace('plugin://' + addonid, '').split('/').slice(1).join('/'));
                } else {
                    return $window.encodeURIComponent(folder.replace('plugin://', '').split('/').slice(1).join('/'));
                }
            } else {
                return $window.encodeURIComponent(folder);
            }
        };
    }
]);