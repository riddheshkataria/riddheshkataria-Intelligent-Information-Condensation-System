import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token's ID and attach it to the request object
      // We exclude the password from being attached
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move on to the next step (the actual controller)
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      return; // Stop execution
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };
