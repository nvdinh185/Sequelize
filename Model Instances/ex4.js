const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './my-database.db'
});

const user = sequelize.define("user", {
    name: DataTypes.TEXT,
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green'
    }
});

(async () => {
    await user.sync({ force: true });

    const jane = await user.create({ name: "Point" }); // Tạo một bản ghi và lưu vào csdl
    console.log(jane.name); // "Point"
    console.log(jane.favoriteColor); // "green"
    jane.name = "Point II";
    jane.favoriteColor = "blue";
    await jane.save({ fields: ['name'] });// Lưu trường name vào csdl
    console.log(jane.name); // "Point II"
    console.log(jane.favoriteColor); // "blue"
    // The above printed blue because the local object has it set to blue, but
    // in the database it is still "green":
    await jane.reload();// lấy lại bản ghi từ csdl
    console.log(jane.name); // "Point II"
    console.log(jane.favoriteColor); // "green"
    await sequelize.close();
})();
