sendgrid  = Meteor.npmRequire('sendgrid')('grownout', 'gr0wn0ut');

Meteor.methods({
	sendEmail: function (emailInfo) {
		var from = 'invite@grownout.com';
		var replyEmail;
		if(emailInfo && emailInfo.from){
			if(emailInfo.from.indexOf('yahoo') == -1){
				from = emailInfo.from;
			}
		}
		replyEmail = emailInfo.replyEmail != null ? emailInfo.replyEmail : from

		var mailOptions = new sendgrid.Email({
			from: from, // sender email address
			fromname: emailInfo.fromname,
			to: emailInfo.to, // list of receivers
			replyto: replyEmail, // if receiver wants to reply to email should go to concerned person not grownout.com id
			subject: emailInfo.subject, // Subject line
			html: emailInfo.html, // plaintext body
		});
		
		var fut = new Future();

		if(emailInfo.cc){
			mailOptions.setCcs(emailInfo.cc.split(','))
		}

		sendgrid.send(mailOptions, function(error, result) {
			if(error) {
				console.log('error while sending the mail :::',error);
				fut['return'](error);
			}
			else {
				console.log('email sent to ', emailInfo.to);
				fut['return'](result);
			}
		});
		return fut.wait();
	}
})