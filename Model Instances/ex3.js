const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database-sinhvien.db'
});

const User = sequelize.define("user", {
    name: DataTypes.TEXT,
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green'
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
});

(async () => {
    await sequelize.sync({ force: true });
    // Code here
    const jane = User.build({ name: "Jane" });
    console.log(jane instanceof User); // true
    console.log(jane.name); // "Jane"

    await jane.save();
    console.log('Jane was saved to the database!');
    await sequelize.close();
})();
