import User from '../models/User';

class UserControll {
  async create(req, res) {
    try {
      const userExist = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExist) {
        return res.status(400).json({ error: 'User already exist' });
      }

      const { fist_name, last_name, email } = await User.create(req.body);
      return res.json({
        fist_name,
        last_name,
        email,
      });
    } catch (err) {
      console.error({
        message: err.message,
        stack: err.stack,
      });
      return false;
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'fist_name', 'last_name', 'email'],
      });
      return res.json(users);
    } catch (err) {
      console.error({
        message: err.message,
        stack: err.stack,
      });
      return false;
    }
  }

  async update(req, res) {
    try {
      const { email, oldPassword } = req.body;

      const user = await User.findByPk(req.userId);

      if (email !== user.email) {
        const userExist = await User.findOne({ where: { email } });

        if (userExist) {
          return res.status(400).json({ error: 'User already exist' });
        }
      }

      if (oldPassword && !(await user.checkPass(oldPassword))) {
        return res.status(401).json({ error: 'Password does not math' });
      }

      const { id, fist_name, last_name } = await user.update(req.body);

      return res.json({
        id,
        fist_name,
        last_name,
        email,
      });
    } catch (err) {
      console.error({
        message: err.message,
        stack: err.stack,
      });
      return false;
    }
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);
    await user.destroy(user);

    return res.json({ msg: 'Account was successfully deleted' });
  }
}

export default new UserControll();
