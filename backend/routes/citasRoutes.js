// backend/routes/citasRoutes.js
import { Router } from 'express';
import { getCitasByPaciente } from '../controllers/citasController.js';

const router = Router();

// Definimos el endpoint GET: /api/v1/citas/paciente/:idPaciente
router.get('/paciente/:idPaciente', getCitasByPaciente);

export default router;