const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const { host, port, user, pass } = require('../utils/config/mail.json');
const { dirname } = require('path');

var transport = nodemailer.createTransport({
  host: host,
  port: port,
  auth: {
    user,
    pass,
  },
});
console.log('PATH 2' + path.resolve());
console.log('PATH' + path.resolve() + '/resources/mail/');
transport.use(
  'compile',
  hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve(path.resolve()) + '/resources/mail/',
    extName: '.html',
  })
);

module.exports = transport;
