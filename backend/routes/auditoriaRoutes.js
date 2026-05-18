import { Router } from 'express';
import { getLogsAuditoria } from '../controllers/auditoriaController.js';

const router = Router();
router.get('/', getLogsAuditoria);

export default router;  