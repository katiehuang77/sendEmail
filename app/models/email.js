var apiKey = require('./apiKey');
module.exports = {
	send:function(body) {
		const sgMail = require('@sendgrid/mail');
			console.log(apiKey.apiKey);
			sgMail.setApiKey(apiKey.apiKey)
			const msg = {
  				to: ['jzchen0925@163.com','panzhihong1992@163.com'],
  				from: 'Colin.Chen24@gmail.com',
  				subject: '又一双忧伤的鞋子等待购买',
  				text: 'and easy to do anywhere, even with Node.js',
  				html: '<strong>' + JSON.stringify(body) + '</strong>',
			};
			console.log('send email' + JSON.stringify(body));

			sgMail.send(msg);
		}
}