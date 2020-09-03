const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database-sinhvien.db'
});

class User extends Model { }
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
    await sequelize.close();
})();