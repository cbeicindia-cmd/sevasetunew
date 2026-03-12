import { Router } from 'express';
import { listSchemes, createScheme, updateScheme } from '../controllers/schemeController.js';
import { authMiddleware } from '../middleware/auth.js';
import { allowRoles } from '../middleware/rbac.js';

const router = Router();

router.get('/', listSchemes);
router.post('/', authMiddleware, allowRoles('ADMIN', 'SUPER_ADMIN'), createScheme);
router.put('/:id', authMiddleware, allowRoles('ADMIN', 'SUPER_ADMIN'), updateScheme);

export default router;
