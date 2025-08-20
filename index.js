const nodemailer = require('nodemailer')
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());  // reemplaza body-parser

app.post("/contactme", async (req, res) => {
    const { message, subject, email } = req.body;

    if (!message || !subject || !email) {
        return res.status(400).json({ error: "Flatan datos" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.myEMAIL,
                pass: process.env.myPASS,
            },
        })

        await transporter.sendMail({
            from: email,
            to: process.env.myEMAIL,
            subject: subject,
            text: `Correo del usuario: ${email}\n\nMensaje:\n${message}`
        });

        res.json({ success: true, message: "Correo enviado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error enviando correo" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})