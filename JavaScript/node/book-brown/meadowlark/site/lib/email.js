var nodemailer = require('nodemailer');

module.exports = function( credentials ) {

    var mailTransport = nodemailer.createTransport('SMTP', {
        service: 'gmail',
        auth: {
            user: credentials.auth.user,
            pass: credentials.auth.password
        }
    });

    var sender = '"Meadowlark Travel" <info@Meadowlarklol.com>';
    var errorRecipient = credentials.auth.user;

    return {
        send: function ( to, subj, body ) {
            mailTransport.sendMail({
                from: sender,
                to: to,
                subject: subj,
                html: body,
                generateTextFromHtml: true
            }, function(err) {
                if(err) console.error('Unable to send email: ' + err);
            });
        },
        emailError: function(message, filename, exception){
			var body = '<h1>Meadowlark Travel Site Error</h1>' +
				'message:<br><pre>' + message + '</pre><br>';
			if(exception) body += 'exception:<br><pre>' + exception + '</pre><br>';
			if(filename) body += 'filename:<br><pre>' + filename + '</pre><br>';
		    mailTransport.sendMail({
		        from: sender,
		        to: errorRecipient,
		        subject: 'Meadowlark Travel Site Error',
		        html: body,
		        generateTextFromHtml: true
		    }, function(err){
		        if(err) console.error('Unable to send email: ' + err);
		    });
		}
    };
};
