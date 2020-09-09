const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './my-database.db'
});

class User extends Model { }
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, {
    sequelize,
    modelName: 'new' // tên bảng (Nếu không truyền thì lấy tên bảng là Users)
});

(async () => {
    await User.sync({ force: true });
    const jane = await User.create({
        username: 'jane doe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
    await sequelize.close();
})();