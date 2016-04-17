import { Sails } from 'sails';
import hook from '../../src/index';
import { expect } from 'chai';

describe('Basic tests', () => {
  let sails;

  before(done => {
    Sails().lift({
      hooks: {
        winston: hook,
        grunt: false
      },
      log: {
        level: 'error'
      }
    }, (error, _sails) => {
      if (error) return done(error);

      sails = _sails;
      return done();
    });
  });

  after(done => {
    if (sails) return sails.lower(done);
    return done();
  });

  it('Should properly start sails application', () => {
    return true;
  });

  it('Should follow sails default log level priority', () => {
    expect(sails.config.log.custom.levels).to.eql({
      error: 1,
      warn: 2,
      debug: 3,
      info: 4,
      verbose: 5,
      silly: 6
    });
  });
});
