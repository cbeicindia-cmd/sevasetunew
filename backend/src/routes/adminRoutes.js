import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { allowRoles } from '../middleware/rbac.js';
import { dashboardStats, listAgentApplications, reviewAgent, triggerAiSync, listAiLogs } from '../controllers/adminController.js';

const router = Router();
router.use(authMiddleware, allowRoles('ADMIN', 'SUPER_ADMIN'));

router.get('/stats', dashboardStats);
router.get('/agents', listAgentApplications);
router.patch('/agents/:id/review', reviewAgent);
router.post('/ai-sync', triggerAiSync);
router.get('/ai-logs', listAiLogs);

export default router;
