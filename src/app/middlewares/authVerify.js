import jwt from 'jsonwebtoken';
import { promisify } from 'util';

require('dotenv').config();

export default async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: 'Not authorization' });
  }

  const [, token] = await header.split(' ');

  try {
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.userId = decode.id;

    return next();
  } catch (err) {
    console.error({
      message: err.message,
      stack: err.stack,
    });
    return res.status(401).json({ error: 'Login invalid' });
  }
};
