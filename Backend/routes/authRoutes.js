import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
const router = express.Router();

// Enviar correo electrónico de bienvenida
const sendWelcomeEmail = (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ingridcruz312008@gmail.com',
            pass: 'pinguino25ewu',
        },
    });

    const mailOptions = {
        from: 'ingridcruz312008@gmail.com',
        to: email,
        subject: 'Bienvenido a AgroSync',
        text: 'Gracias por registrarte en AgroSync. Tu cuenta ha sido creada exitosamente.',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar email:', error);
        } else {
            console.log('Email enviado:', info.response);
        }
    });
};

// Registro de usuario
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
        }

        const user = new User({
            username: name, // Usamos name como username
            email,
            password
        });
        
        await user.save();

        // Generar token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'tu_secreto_jwt',
            { expiresIn: '24h' }
        );

        // Comentamos temporalmente el envío de correo para evitar errores
        // sendWelcomeEmail(email);

        // Devolver token junto con mensaje de éxito
        res.status(201).json({
            message: 'Usuario registrado con éxito.',
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error al registrar:', error);
        res.status(500).json({ 
            message: 'Error al registrar el usuario.', 
            error: error.message 
        });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const isValidPassword = await user.matchPassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'tu_secreto_jwt',
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ 
            message: 'Error al iniciar sesión.', 
            error: error.message 
        });
    }
});

export default router;
