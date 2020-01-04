const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = () => { }) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  res.writeHead(200, headers);
  // res.end(res._data.toString());
  //res.end(req.method === 'GET' ? 'left' : '' );
  res.end(req.method === 'GET' ? function() {
    var num = Math.random()
    if (num < .25) {
      return 'up';
    } else if (num < .5) {
      return 'right';
    } else if (num < .75) {
      return 'down';
    } else {
      return 'left';
    }
  }() : '');
  //res.end('left');
  //res.end(left? left : ;)
  next(); // invoke next() at the end of a request to help with testing!
};
