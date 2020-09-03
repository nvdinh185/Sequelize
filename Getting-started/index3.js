const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database-sinhvien.db'
});

sequelize.authenticate().then(() => {
    console.log("Success!");
    var News = sequelize.define('likes', {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING
        }
    }, {
        // freezeTableName: true
        timestamps: false
    });
    // News.create({
    //     title: 'Getting Started',
    //     content: 'Hello there'
    // });
    News.sync({ force: true }).then(res => {
        console.log('Item table created successfully', res);
    });
    // News.findAll({}).then((data) => {
    //     console.log(data);
    // }).catch((err) => {
    //     console.log(err);
    // });
}).catch((err) => {
    console.log(err);
});