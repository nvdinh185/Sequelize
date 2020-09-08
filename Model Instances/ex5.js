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
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
}, {
    freezeTableName: true
});

(async () => {
    await user.sync({ force: true });
    const jane1 = await user.create({ name: "Jane1", age: 100 });
    await jane1.increment('age', { by: 2 }); // tăng age lên 2
    await jane1.increment('age');// tăng age lên 1

    const jane2 = await user.create({ name: "Jane2", age: 100, cash: 5000 });
    await jane2.increment({
        'age': 2,// tăng age lên 2
        'cash': 100// tăng lên 100
    });

    await jane2.increment(['age', 'cash'], { by: 3 });// tăng age và cash đồng thời lên 3
    await sequelize.close();
})();
