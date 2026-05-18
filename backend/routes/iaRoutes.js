import { Router } from 'express';
import { procesarPreguntaIA } from '../controllers/iaController.js';

const router = Router();
router.post('/preguntar', procesarPreguntaIA);

export default router;