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
    // Create a new user
    const user = await User.create({ username: "Jane" });
    console.log("Jane's auto-generated ID:", user.id);

    const project1 = await User.findByPk(3); // select theo id (primary key)
    if (project1 === null) {
        console.log('Not found!');
    } else {
        console.log(project1.toJSON());
        console.log(project1 instanceof User); // true
    }

    const project2 = await User.findOne();
    if (project2 === null) {
        console.log('Not found!');
    } else {
        console.log(project2.toJSON());
        console.log(project2 instanceof User); // true
    }

    await sequelize.close();
})();