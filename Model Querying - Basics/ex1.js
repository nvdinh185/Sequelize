const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './my-database.db'
});

class User extends Model { }
User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  freezeTableName: true
});

(async () => {
  await User.sync();
  // await User.sync({ force: true });
  // Create a new user
  const jane = await User.create({ firstName: "Jane", lastName: "Doee" });
  console.log("Jane's auto-generated ID:", jane.id);

  // Find all users
  let users = await User.findAll();
  console.log(users.every(user => user instanceof User)); // true
  console.log("All users:", JSON.stringify(users, null, 2));

  // Specifying attributes for SELECT queries
  let firstName = await User.findAll({
    attributes: ['firstName']
  });
  console.log(JSON.stringify(firstName, null, 2));

  // Applying WHERE clauses
  let usersWhere = await User.findAll({
    where: { id: 1 }
  });
  console.log(JSON.stringify(usersWhere, null, 2));

  // Simple UPDATE queries
  await User.update({ lastName: "Dinh" }, {
    where: { lastName: "Doe" }
  });

  // Simple DELETE queries
  // await User.destroy({
  //   where: { firstName: "Jane" }
  // });

  let res = await sequelize.query("SELECT * FROM `User`");
  console.log(res[0]);

  await sequelize.close();
})();