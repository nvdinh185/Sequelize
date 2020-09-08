const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './my-database.db'
});

(async () => {
    await sequelize.authenticate();
    console.log("Kết nối thành công!");

    let News = sequelize.define('my_table', {
        name: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    await News.sync({ force: true });
    console.log('Tạo bảng thành công!');

    await sequelize.close();
    console.log("Đã đóng thành công!");
})();
