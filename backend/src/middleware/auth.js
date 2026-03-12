import { verifyToken } from '../utils/jwt.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });

  try {
    req.user = verifyToken(authHeader.replace('Bearer ', ''));
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
