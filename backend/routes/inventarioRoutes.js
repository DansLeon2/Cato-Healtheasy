import { Router } from 'express';
import { getInventarioByPaciente } from '../controllers/inventarioController.js';

const router = Router();
router.get('/paciente/:idPaciente', getInventarioByPaciente);

export default router;