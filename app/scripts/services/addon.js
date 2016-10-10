/* global services:true */

'use strict';

services.service('Addon', ['KodiWS', '$q', function(KodiWS, $q) {
  var addonFields = ['name', 'summary', 'thumbnail', 'enabled'];
  var folderFields = ['thumbnail'];
  var addon = {

    /**
     * Get all Addons from Kodi
     *
     * @return a deferred callback with the Addons in parameter
     */
    all: function(content) {
      var deferred = $q.defer();
      KodiWS.send('Addons.GetAddons', {
        content: content,
        properties: addonFields/*, sort: { method: 'name' }*/
      }).then(function(data) {
        deferred.resolve(data.addons);
      });
      return deferred.promise;
    },

    /**
     * Get all Addons from Kodi
     *
     * @return a deferred callback with the Addons in parameter
     */
    listItems: function(addonid, folder) {
      var deferred = $q.defer();
      if (!folder || folder.length === 0) {
        folder = '';
      }
      else {
        folder = folder.replace('plugin://' + addonid, '');
        if (folder.charAt(0) !== '/') {
          folder = '/' + folder;
        }
      }
      KodiWS.send('Files.GetDirectory', {
        directory: 'plugin://' + addonid + folder,
        properties: folderFields/*, sort: { ignorearticle: true, method: 'label', order: 'ascending' }*/
      }).then(function(data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    },

    /**
     * Get a page of Addons from Kodi.
     *
     * @param integer showNum : the Addon number (e.g. 26 for the 2nd page if we take 25 per page)
     * @param integer size : the maximum number of shows we want for this page
     * @return a deferred callback with data in parameter
     */
    page: function(content, showNum, size) {
      var deferred = $q.defer();
      KodiWS.send('Addons.GetAddons', {
        content: content,
        properties: addonFields/*, sort: { method: 'name' }*/,
        limits: {start: showNum, end: size}
      }).then(function(data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    },

    /**
     * Find a specific Addon
     *
     * @param integer addonid : the ID of the Addon
     * @return a deferred callback with the Addon information
     */
    find: function(addonid) {
      var deferred = $q.defer();
      KodiWS.send('Addons.GetAddonDetails', {properties: addonFields, addonid: addonid}).then(function(data) {
        deferred.resolve(data.addon);
      });
      return deferred.promise;
    },

    /**
     * Play a file.
     *
     * @param integer addonId : the ID of the addon.
     * @return void
     */
    playFile: function(file) {
      KodiWS.send('Player.Open', {item: {file: file.file}});
    },

    /**
     * Run (execute) addon.
     *
     * @param integer addonid : the ID of the addon.
     * @return void
     */
    executeAddon: function(addonid) {
      KodiWS.send('Addons.ExecuteAddon', {addonid: addonid});
    }
  };
  return addon;
}]);
