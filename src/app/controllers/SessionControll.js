import jwt from 'jsonwebtoken';
import User from '../models/User';

require('dotenv').config();

class SessionControll {
  async create(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'E-mail already exist.' });
      }

      if (!(await user.checkPass(password))) {
        return res.status(401).json({ error: 'Password does not math' });
      }

      const { id, fist_name } = user;

      return res.json({
        user: {
          id,
          fist_name,
          email,
        },
        token: jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRESIN,
        }),
      });
    } catch (err) {
      console.error({
        message: err.message,
        stack: err.stack,
      });
      return false;
    }
  }
}

export default new SessionControll();
