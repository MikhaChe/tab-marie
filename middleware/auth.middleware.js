import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleWare = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split('')[1];
    if(!token) {
      return res.status(401).json({message: 'Auth error'});
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next()
  }
  catch(e) {
    return res.status(401).json({message: 'Auth error'});
  }
}

