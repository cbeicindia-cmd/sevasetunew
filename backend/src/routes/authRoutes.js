import { Router } from 'express';
import { body } from 'express-validator';
import { handleValidation } from '../middleware/validate.js';
import { login, register, requestOtp, verifyOtp } from '../controllers/authController.js';

const router = Router();

router.post('/otp/request', [body('mobile').isMobilePhone('en-IN')], handleValidation, requestOtp);
router.post('/otp/verify', [body('mobile').isMobilePhone('en-IN'), body('otp').isLength({ min: 6, max: 6 })], handleValidation, verifyOtp);
router.post('/register', [body('fullName').notEmpty(), body('email').isEmail(), body('password').isStrongPassword()], handleValidation, register);
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], handleValidation, login);

export default router;
