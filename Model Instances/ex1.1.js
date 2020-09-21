const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './my-database.db'
});

const User = sequelize.define('', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
});

console.log(User); // model
console.log(sequelize.models); // { model: model }
console.log(sequelize.models.model); // model