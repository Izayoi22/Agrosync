import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { db } from './config/db.js'
import cors from  'cors'
import path from 'path'
import authRoutes from './routes/authRoutes.js'
import cropRoutes from './routes/cropRoutes.js'
import weatherRoutes from './routes/weatherRoutes.js'
import protect from './middleware/authMiddleware.js'

// Cargar variables de entorno
dotenv.config();

const app = express();

// Conectar a MongoDB
db();

// Middleware
app.use(cors()); // Permitir solicitudes de otros dominios (CORS)
app.use(express.json()); // Parsear JSON en las solicitudes

// Rutas públicas (sin autenticación)
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);

// Rutas protegidas (requieren autenticación)
app.use('/api/crops', protect, cropRoutes);

// Ruta para producción (si usas Vue en producción)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// Configuración del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
