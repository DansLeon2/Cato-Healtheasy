import { Router } from 'express';
import { getCitasByPaciente } from '../controllers/citasController.js';

const router = Router();

router.get('/paciente/:idPaciente', getCitasByPaciente);

export default router;