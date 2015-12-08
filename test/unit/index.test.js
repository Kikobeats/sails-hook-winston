import { Sails } from 'sails';
import hook from '../../src/index';

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
});
