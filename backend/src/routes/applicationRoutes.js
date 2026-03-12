import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { allowRoles } from '../middleware/rbac.js';
import { submitApplication, listApplications } from '../controllers/applicationController.js';

const router = Router();
router.use(authMiddleware);

router.get('/', listApplications);
router.post('/', allowRoles('AGENT', 'ADMIN', 'SUPER_ADMIN'), submitApplication);

export default router;
