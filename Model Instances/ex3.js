const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './my-database.db'
});

const user = sequelize.define("user", {
    name: DataTypes.TEXT,
    age: DataTypes.INTEGER
}, {
    timestamps: false // Không cho tạo cột createdAt và updatedAt
});

(async () => {
    await user.sync({ force: true }); // ghi đè lên bảng cũ (nếu có)

    const jane = user.build({ name: "Jane" }); // tạo một bản ghi
    console.log(jane instanceof user); // true
    console.log(jane.name); // "Jane"

    await jane.save(); // lưu bản ghi vào cơ sở dữ liệu
    console.log('Jane was saved to the database!');
    await sequelize.close();
})();
