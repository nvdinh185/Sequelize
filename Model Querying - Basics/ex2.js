const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './my-database.db'
});

class User extends Model { }
User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  freezeTableName: true
});

(async () => {
  await User.sync();
  // await User.sync({ force: true });

  const user = await User.create({
    username: 'alice123',
    isAdmin: true
  }, { fields: ['username'] }); // chỉ cho phép gán giá trị cho thuộc tính username
  console.log(user.username); // 'alice123'
  console.log(user.isAdmin); // undefined (đã lưu trong csdl là false)

  // Specifying attributes for SELECT queries (as "name")
  let username = await User.findAll({
    attributes: [['username', 'ten']]
  });
  console.log(JSON.stringify(username, null, 2));

  // Truncate the table
  await User.destroy({
    truncate: true
  });

  // Tạo nhiều bản ghi
  const captains = await User.bulkCreate([
    { username: 'Jack Sparrow' },
    { username: 'Davy Jones' }
  ]);
  console.log(captains.length); // 2
  console.log(captains[0] instanceof User); // true
  console.log(captains[0].username); // 'Jack Sparrow'
  console.log(captains[0].id); // 1 // (or another auto-generated value)

  await sequelize.close();
})();