var sendgrid = require('@sendgrid/mail');

module.exports = function() {
  
  sendgrid.setApiKey(process.env['SENDGRID_API_KEY']);
  
};
