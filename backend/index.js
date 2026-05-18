import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database.js';


import citasRoutes from './routes/citasRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import inventarioRoutes from './routes/inventarioRoutes.js';
import signosRoutes from './routes/signosRoutes.js';
import auditoriaRoutes from './routes/auditoriaRoutes.js';
import iaRoutes from './routes/iaRoutes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './docs/swaggerConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.use('/api/v1/citas', citasRoutes);
app.use('/api/v1/pacientes', pacienteRoutes);
app.use('/api/v1/inventario', inventarioRoutes);
app.use('/api/v1/signos', signosRoutes);
app.use('/api/v1/auditoria', auditoriaRoutes);
app.use('/api/v1/ia', iaRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'success', mensaje: 'Servidor API REST operando' });
});

await initializeDatabase();
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});