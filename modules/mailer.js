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

transport.use(
  'compile',
  hbs({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve('./resources/mail/'),
    },
    viewPath: path.resolve('./resources/mail/'),
    extName: '.html',
  })
);

module.exports = transport;
