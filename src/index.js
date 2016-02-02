import winston from 'winston';
import captain from 'captains-log';
import buildShipFn from 'sails/lib/hooks/logger/ship';
import moment from 'moment';

export default function (sails) {
  return {
    ready: false,

    initialize: done => {
      let log;
      let logger;
      let captainsOptions = sails.config.log;
      let consoleOptions = {
        level: sails.config.log.level,
        formatter: options => {
          let message = '';
          if(sails.config.log.timestamp){
            message = sails.config.log.timestampFormat ? moment().format(sails.config.log.timestampFormat) : moment().format('LLLL');
            message += ' ';
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
        sails.config.log.transports.forEach(transport => logger.add(transport.module, transport.config || {}));
      }

      sails.config.log.custom = logger;
      captainsOptions.custom = logger;

      log = captain(captainsOptions);
      log.ship = buildShipFn(sails.version ? ('v' + sails.version) : '', log.info);
      sails.log = log;

      return done();
    }
  };
}
