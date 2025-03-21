import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    try {
        // Obtener el token del header Authorization
        let token = req.header('Authorization');
        
        // Verificar si el token existe
        if (!token) {
            return res.status(401).json({ 
                message: 'Acceso denegado. No se proporcionó token.' 
            });
        }

        // Si el token comienza con "Bearer ", removerlo
        if (token.startsWith('Bearer ')) {
            token = token.slice(7);
        }

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        
        // Guardar la información del usuario en req.user
        req.user = {
            id: decoded.userId
        };

        next();
    } catch (error) {
        console.error('Error de autenticación:', error);
        res.status(401).json({ 
            message: 'Token no válido o expirado',
            error: error.message 
        });
    }
};

export default protect;
