import { Router } from 'express';
import { getSignosByPaciente } from '../controllers/signosController.js';

const router = Router();
router.get('/paciente/:idPaciente', getSignosByPaciente);

export default router;