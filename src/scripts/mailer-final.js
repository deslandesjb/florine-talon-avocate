// mailer.js final version
import { createTransport } from "nodemailer";
// const nodemailer = require("nodemailer");

async function sendEmail(props) {
	let transporter = createTransport({
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
		html: `<h1>Formulaire de contact</h1><br>
    <b>Nom</b>: ${props.name}<br> 
    <b>Email</b>: ${props.email}<br>
    ${props.tel ? `<b>Téléphone</b>: ${props.tel}<br>` : ""}
    <b>Message</b>: ${props.html}`,
	};

	let info = await transporter.sendMail(message);
	return info;
}

export { sendEmail };
