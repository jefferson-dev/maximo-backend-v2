import Task from '../models/Task';
import User from '../models/User';

class TaskControll {
  async create(req, res) {
    try {
      const { id, title, description } = await Task.create({
        ...req.body,
        user_id: req.userId,
      });

      return res.json({ id, title, description });
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
      const { page = 1 } = req.query;
      const { count } = await Task.findAndCountAll();
      res.header('x-total-count', count);

      const task = await Task.findAll({
        attributes: ['id', 'title', 'description'],
        limit: 6,
        offset: (page - 1) * 6,
        order: [['updated_at', 'DESC']],
        include: [
          {
            model: User,
            attributes: ['id', 'fist_name', 'last_name'],
          },
        ],
      });

      return res.json(task);
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
      const { id } = req.params;
      const task = await Task.findOne({ where: { id, user_id: req.userId } });

      if (!task) {
        return res.status(401).json({ error: 'Not authorized' });
      }

      const { title, description } = await task.update({ ...req.body });

      return res.json({ id, title, description });
    } catch (err) {
      console.error({
        message: err.message,
        stack: err.stack,
      });
      return false;
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findOne({ where: { id, user_id: req.userId } });

      if (!task) {
        return res
          .status(401)
          .json({ error: 'You are not authorized to delete this task' });
      }

      await task.destroy(task);

      return res.status(200).json({ msg: 'Task deleted.' });
    } catch (err) {
      console.error({
        message: err.message,
        stack: err.stack,
      });
      return false;
    }
  }
}

export default new TaskControll();
