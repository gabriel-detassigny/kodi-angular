# Kodi Angular

This is a web interface for the entertainment center [Kodi](http://kodi.tv/), using AngularJS.

It uses [Bootstrap](http://getbootstrap.com/) for the design and communicate through web sockets with Kodi.

Moreover, it is designed as a responsive interface.

### Remote Control and Player

Here is a preview of what the remote control interface looks like on desktop:

![Screenshot](wiki/images/remote.png "Remote")

Here is the mobile version:

![Screenshot](wiki/images/remote-mobile.png "Remote mobile")

### Libraries

For now, there are basic tables to see and play movies, tv shows or music:

![Screenshot](wiki/images/tvshows.png "TV Shows")

## Installation

You need to install Kodi version 12.0 or higher, as it uses [Kodi JSON-RPC API v6](http://kodi.wiki/view/JSON-RPC_API) through WebSocket technology.

### On Kodi

External control of the application must be authorize. To do so, go to these settings in Kodi :
> System > Services > Remote Control

And allow control for other applications from outside the system.

### On your machine

#### Dependencies

You need to have [NPM](https://www.npmjs.com/), [Bower](http://bower.io/), and [Grunt](gruntjs.com) installed on your machine.

#### Configuration

There is a configuration file sample at _app/scripts/config.js.example_ .

Just copy it to _app/scripts/config.js_ and change the config values to your need. (You will probably at least need to change the IP of your Kodi instance).

#### Build the App

You can now build your application by typing :
```
npm install && bower install && grunt build
```

It should generate all HTML/CSS/JS in a __dist__ folder.
