const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database-sinhvien.db'
});

(async () => {
  try {
    await sequelize.authenticate();
    var Task = sequelize.define('Tasks', {
      title: Sequelize.STRING,
      rating: { type: Sequelize.INTEGER, defaultValue: 3 }
    })

    var task = Task.build({
      title: 'specify the project idea',
      rating: 2
    })

    await task.save()
    console.log('Connection has been established successfully.' + task.title);
    // await sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
