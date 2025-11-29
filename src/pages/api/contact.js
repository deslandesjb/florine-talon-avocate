import { sendEmail } from "../../scripts/mailer.js";

export const prerender = false;

export const POST = async ({ request }) => {
	try {
		const data = await request.formData();
		const firstName = data.get("first-name")?.toString() || "";
		const lastName = data.get("last-name")?.toString() || "";
		const email = data.get("email")?.toString() || "";
		const tel = data.get("tel")?.toString() || "";
		const message = data.get("message")?.toString() || "";
		const file = data.get("file_input");

		// Constante pour la taille maximale (1 Mo = 1 * 1024 * 1024 bytes)
		const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 Mo

		// Validation
		const errors = {};
		if (!firstName.trim()) errors.firstName = "Le prénom est requis";
		if (!lastName.trim()) errors.lastName = "Le nom est requis";
		if (!email.trim()) errors.email = "L'email est requis";
		if (!message.trim()) errors.message = "Le message est requis";

		// Validation de la taille du fichier
		if (file && file.size > 0) {
			if (file.size > MAX_FILE_SIZE) {
				const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
				errors.file = `Le fichier est trop volumineux (${fileSizeMB} Mo). La taille maximale autorisée est de 1 Mo.`;
			}
			// Validation du type de fichier (optionnel mais recommandé)
			if (file.type && file.type !== "application/pdf") {
				errors.file = "Seuls les fichiers PDF sont acceptés.";
			}
		}

		// Si erreurs, retourner les erreurs
		if (Object.keys(errors).length > 0) {
			return new Response(JSON.stringify({ success: false, errors }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Envoyer l'email
		const fullName = `${firstName} ${lastName}`;
		const payload = {
			name: fullName,
			email: email,
			tel: tel,
			html: message,
			subject: `Nouveau message de contact de ${fullName}`,
			attachment: file && file.size > 0 ? file : null,
		};

		await sendEmail(payload);

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Erreur lors de l'envoi de l'email:", error);
		return new Response(
			JSON.stringify({
				success: false,
				error: "Une erreur est survenue lors de l'envoi de l'email",
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
};
