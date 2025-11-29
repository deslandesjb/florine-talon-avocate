import { createTransport } from "nodemailer";
// const nodemailer = require("nodemailer");

async function sendEmail(props) {
	let transporter = createTransport({
		host: import.meta.env.EMAIL_HOST,
		port: import.meta.env.EMAIL_PORT,
		auth: {
			user: import.meta.env.EMAIL,
			pass: import.meta.env.EMAIL_PASS,
		},
	});

	let message = {
		// Utiliser votre email authentifié comme "from" (recommandé pour éviter les problèmes)
		from: import.meta.env.EMAIL,
		// Ajouter l'email du client dans "replyTo" pour que vos réponses arrivent au bon endroit
		replyTo: props.email,
		to: import.meta.env.EMAIL,
		subject: props.subject,
		html: `<h1>Formulaire de contact</h1><br>
    <b>Nom</b>: ${props.name}<br> 
    <b>Email</b>: ${props.email}<br>
    ${props.tel ? `<b>Téléphone</b>: ${props.tel}<br>` : ""}
    <b>Message</b>:<br /> ${props.html}`,
	};

	// Ajouter la pièce jointe si un fichier est fourni
	if (props.attachment && props.attachment.size > 0) {
		message.attachments = [
			{
				filename: props.attachment.name,
				content: Buffer.from(await props.attachment.arrayBuffer()),
			},
		];
	}

	let info = await transporter.sendMail(message);
	return info;
}

export { sendEmail };
