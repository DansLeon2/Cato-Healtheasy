import { Router } from 'express';
import { getPacienteJSON, createPacienteJSON, updatePacienteJSON } from '../controllers/pacienteController.js';

const router = Router();

router.get('/:id', getPacienteJSON);
router.post('/', createPacienteJSON);
router.patch('/:id', updatePacienteJSON);

export default router;