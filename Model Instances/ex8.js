const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './my-database.db'
});

const child = sequelize.define("child", {
    name: DataTypes.TEXT,
    age: DataTypes.INTEGER
}, {
    timestamps: false,
});

const person = sequelize.define("person", {
    name: DataTypes.TEXT,
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
});

(async () => {
    await child.sync();
    await person.sync();

    const ch = child.build({ name: "child" });
    const per = person.build({ name: "person" });

    await ch.save();
    await per.save();

    console.log('Jane was saved to the database!');

    await child.drop();
    console.log("child table dropped!");

    await sequelize.close();
})();
