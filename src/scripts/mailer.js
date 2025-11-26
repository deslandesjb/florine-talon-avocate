const nodemailer = require("nodemailer");

async function sendEmail(props) {
	let transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASS,
		},
	});

	let message = {
		from: process.env.EMAIL,
		to: process.env.EMAIL,
		subject: props.subject,
		html: `<h1>Contact Form</h1><br>
    <b>Name</b>: ${props.name}<br> 
    <b>Email</b>: ${props.email}<br>
    <b>Message</b>: ${props.html}`,
	};

	let info = await transporter.sendMail(message);
	return info;
}

module.exports = { sendEmail };
