const { Sequelize, Model, DataTypes } = require("sequelize");
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
    const jane = await User.create({ name: "Jane" });
    console.log(jane.name); // "Jane"
    console.log(jane.favoriteColor); // "green"
    jane.name = "Jane II";
    jane.favoriteColor = "blue";
    await jane.save({ fields: ['name'] });
    console.log(jane.name); // "Jane II"
    console.log(jane.favoriteColor); // "blue"
    // The above printed blue because the local object has it set to blue, but
    // in the database it is still "green":
    await jane.reload();
    console.log(jane.name); // "Jane II"
    console.log(jane.favoriteColor); // "green"
    await sequelize.close();
})();
