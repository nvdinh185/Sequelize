const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database-sinhvien.db'
});

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    }
}, {});

// console.log(User === sequelize.models.User); // true

const jane = User.build({ firstName: "Jane" });
// console.log(jane.firstName);

setTimeout(async () => {
    await jane.save();
    console.log('Jane was saved to the database!');
}, 0)