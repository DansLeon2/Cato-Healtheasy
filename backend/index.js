import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import oracledb from 'oracledb';
import { initializeDatabase } from './config/database.js';

// 1. IMPORTAR RUTAS NUEVAS
import citasRoutes from './routes/citasRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 2. REGISTRAR EL MÓDULO DE CITAS
app.use('/api/v1/citas', citasRoutes);

// Ruta base de prueba
app.get('/api/v1/test', async (req, res) => {
    res.json({ status: 'success', mensaje: 'El API está funcionando.'});
});

// Arrancar BD y luego Servidor
await initializeDatabase();
app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});