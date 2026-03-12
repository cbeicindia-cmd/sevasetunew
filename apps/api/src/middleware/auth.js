import { verifyToken } from '../config/auth.js';

export const requireAuth = (roles = []) => (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = auth.replace('Bearer ', '');
    const decoded = verifyToken(token);
    if (roles.length > 0 && !roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
