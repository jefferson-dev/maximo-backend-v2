import Sequelize from 'sequelize';
import User from '../app/models/User';
import Task from '../app/models/Task';

import dbConfig from '../config/database';

const models = [User, Task];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connect = new Sequelize(dbConfig);

    models
      .map((model) => model.init(this.connect))
      .map((model) => model.associate && model.associate(this.connect.models));
  }
}

export default new Database();
