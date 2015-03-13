# sails-hook-winston

[![Build Status](http://img.shields.io/travis/Kikobeats/sails-hook-rotate-log/master.svg?style=flat)](https://travis-ci.org/Kikobeats/sails-hook-rotate-log)
[![Dependency status](http://img.shields.io/david/Kikobeats/sails-hook-rotate-log.svg?style=flat)](https://david-dm.org/Kikobeats/sails-hook-rotate-log)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/sails-hook-rotate-log.svg?style=flat)](https://david-dm.org/Kikobeats/sails-hook-rotate-log#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/sails-hook-rotate-log.svg?style=flat)](https://www.npmjs.org/package/sails-hook-rotate-log)
[![Gittip](http://img.shields.io/gittip/Kikobeats.svg?style=flat)](https://www.gittip.com/Kikobeats/)

> Integrates winston logging system with your Sails application.

## Install

> **Note**: This library requires sails >= 0.11.0

```bash
npm install sails-hook-winston
```
## Usage

[winston](https://github.com/winstonjs/winston) is one of the most powerful logging libraries for NodeJS. You can unlock the feature of winston in your Sails application when you use this hook, in special use different transport.

At this moment, the transport supported are:

- Console (by default based in the Sails log options).
- [DailyLogRotate](https://github.com/winstonjs/winston#daily-rotate-file-transport).
- [MongoDB](https://github.com/winstonjs/winston#mongodb-transport).

## API

This library extend `config/log` and use the winston API for setup the Transport. This is an example of configuration:

```js
var path = require('path');
var pkgJSON = require(path.resolve('package.json'));

module.exports.log = {

  // This options are for Console transport that is used by default
  level: 'silly', // you are familiar with this value, right?
  timestamp: true, // if you want to output the timestamp in the console transport

  // unlock dailyRorate transport!
  // more information: https://github.com/winstonjs/winston#daily-rotate-file-transport
  dailyRotate: {
    dirname: path.resolve('logs'),
    datePatern: '.yyyy-MM-dd.log',
    filename: pkgJSON.name,
    prettyPrint: true,
    timestamp: true,
    level: 'silly'
  },

  // unlock mongoDB transport!
  // more information: https://github.com/winstonjs/winston#mongodb-transport
  mongoDB: {
    level: 'silly',
    db: pkgJSON.name,
    collection: 'logs',
    host: 'localhost',
    port: 27017
  }
};
```

Note how the options are different for each transport. For example, you can use `info` level in console but store `silly` level in MongoDB.

## License

MIT © [Kiko Beats](http://www.kikobeats.com)
