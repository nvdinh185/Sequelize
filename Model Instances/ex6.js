const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './my-database.db'
});

const user = sequelize.define("", {
    name: DataTypes.TEXT
}, {
    tableName: 'employees' // tên bảng
});

(async () => {
    await user.sync();

    const jane = user.build({ name: "Jane" });
    await jane.save();
    console.log('Jane was saved to the database!');
    await sequelize.close();
})();
