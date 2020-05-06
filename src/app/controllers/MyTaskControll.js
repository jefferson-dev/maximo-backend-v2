import Task from '../models/Task';

class MyTaskControll {
  async index(req, res) {
    try {
      const { page = 1 } = req.query;

      const myTask = await Task.findAll({
        where: { user_id: req.userId },
        limit: 6,
        offset: (page - 1) * 6,
        order: [['updated_at', 'DESC']],
      });

      return res.json(myTask);
    } catch (err) {
      console.error({
        message: err.message,
        stack: err.stack,
      });
      return false;
    }
  }
}

export default new MyTaskControll();
