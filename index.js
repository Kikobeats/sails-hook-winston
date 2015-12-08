'use strict';

var winston     = require('winston');
var path        = require('path');
var mkdirp      = require('mkdirp');
var captain     = require(path.resolve('node_modules/sails/node_modules/captains-log'));
var buildShipFn = require(path.resolve('node_modules/sails/lib/hooks/logger/ship'));

module.exports = function(sails) {
  return {
    ready: false,
    initialize: function(done) {
      var log;
      var logger;
      var consoleOptions;
      var captainsOptions = sails.config.log;

      consoleOptions = {
        level: sails.config.log.level,
        formatter: function(options) {
          var message;
          if (sails.config.log.timestamp) {
            message = Date();
            message += ' ';
          } else {
            message = '';
          }

          message += options.message || '';
          message += (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
          return message;
        }
      };

      // Console Transport
      logger = new winston.Logger({transports: [new winston.transports.Console(consoleOptions)]});

      // Custom Transport
      // More information: https://github.com/winstonjs/winston/blob/master/docs/transports.md
      if (Object.prototype.toString.call(sails.config.log.transports) === '[object Array]' && sails.config.log.transports.length > 0) {
        sails.config.log.transports.forEach(function(transport) {
          logger.add(transport.module, transport.config || {});
        });
      }

      sails.config.log.custom = logger;

      captainsOptions.custom = logger;
      log = captain(captainsOptions);
      log.ship = buildShipFn(sails.version ? ('v' + sails.version) : '', log.info);
      sails.log = log;
      return done();
    }
  };
};
