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
    const jane = await User.create({ name: "Jane", age: 100 });
    await jane.increment('age', { by: 2 }); // tăng age lên 2
    await jane.increment('age');// tăng age lên 1

    const jane2 = await User.create({ name: "Jane", age: 100, cash: 5000 });
    await jane2.increment({
        'age': 2,// tăng age lên 2
        'cash': 100// tăng lên 100
    });

    await jane2.increment(['age', 'cash'], { by: 3 });// tăng age và cash đồng thời lên 3
    await sequelize.close();
})();
