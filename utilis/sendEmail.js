const sgMail = require('@sendgrid/mail');

const sendEmail = async (options) => {
	console.log(options);
	sgMail.setApiKey(process.env.SEND_GRID_KEY);

	const message = {
		from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
		to: options.email,
		subject: options.subject,
		text: options.message,
		html: `<a href=${options.url}><button style="background-color: #2b2b52; padding: 13px; border: none; border-radius: 3px; color: white; font-weight: bold;">RESET PASSWORD</button></a>`,
	};
	await sgMail.send(message);
};
module.exports = sendEmail;
