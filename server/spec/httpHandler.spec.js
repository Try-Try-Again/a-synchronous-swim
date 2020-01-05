
const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const server = require('./mockServer');

// const describe = require('mocha').describe;
//https://jestjs.io/docs/en/api#describename-fn


const httpHandler = require('../js/httpHandler');



describe('server responses', () => {

  it('should respond to a OPTIONS request', (done) => {
    let {req, res} = server.mock('/', 'OPTIONS');

    httpHandler.router(req, res);
    expect(res._responseCode).to.equal(200);
    expect(res._ended).to.equal(true);
    expect(res._data.toString()).to.be.empty;
    done();
  });

  // new test for GET request with empty array

  it('should respond to a left GET request with left', (done) => {
    // set up
    var post = server.mock('/', 'POST', 'left');
    var get = server.mock('/', 'GET');

    // run
    httpHandler.router(post.req, post.res);
    httpHandler.router(get.req, get.res);
    // assert
    expect(get.res._data.toString()).to.equal('left');

    done();
  });

  it('should respond to a right GET request with right', (done) => {
    // set up
    var post = server.mock('/', 'POST', 'right');
    var get = server.mock('/', 'GET');

    // run
    httpHandler.router(post.req, post.res);
    httpHandler.router(get.req, get.res);
    // assert
    expect(get.res._data.toString()).to.equal('right');

    done();
  });

  it('should respond to a up GET request with right', (done) => {
    // set up
    var post = server.mock('/', 'POST', 'up');
    var get = server.mock('/', 'GET');

    // run
    httpHandler.router(post.req, post.res);
    httpHandler.router(get.req, get.res);
    // assert
    expect(get.res._data.toString()).to.equal('up');

    done();
  });

  it('should respond to a down GET request with down', (done) => {
    // set up
    var post = server.mock('/', 'POST', 'down');
    var get = server.mock('/', 'GET');

    // run
    httpHandler.router(post.req, post.res);
    httpHandler.router(get.req, get.res);
    // assert
    expect(get.res._data.toString()).to.equal('down');

    done();
  });





  xit('should respond with 404 to a GET request for a missing background image', (done) => {
    httpHandler.backgroundImageFile = path.join('.', 'spec', 'missing.jpg');
    let {req, res} = server.mock('FILL_ME_IN', 'GET');

    httpHandler.router(req, res, () => {
      expect(res._responseCode).to.equal(404);
      expect(res._ended).to.equal(true);
      done();
    });
  });

  xit('should respond with 200 to a GET request for a present background image', (done) => {
    // write your test here
    done();
  });

  var postTestFile = path.join('.', 'spec', 'water-lg.jpg');

  xit('should respond to a POST request to save a background image', (done) => {
    fs.readFile(postTestFile, (err, fileData) => {
      httpHandler.backgroundImageFile = path.join('.', 'spec', 'temp.jpg');
      let {req, res} = server.mock('FILL_ME_IN', 'POST', fileData);

      httpHandler.router(req, res, () => {
        expect(res._responseCode).to.equal(201);
        expect(res._ended).to.equal(true);
        done();
      });
    });
  });

  xit('should send back the previously saved image', (done) => {
    fs.readFile(postTestFile, (err, fileData) => {
      httpHandler.backgroundImageFile = path.join('.', 'spec', 'temp.jpg');
      let post = server.mock('FILL_ME_IN', 'POST', fileData);

      httpHandler.router(post.req, post.res, () => {
        let get = server.mock('FILL_ME_IN', 'GET');
        httpHandler.router(get.req, get.res, () => {
          expect(Buffer.compare(fileData, get.res._data)).to.equal(0);
          done();
        });
      });
    });
  });
});
