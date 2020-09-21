const { Sequelize, Model, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './my-database.db'
});

class User extends Model { }
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    freezeTableName: true
});

(async () => {
    await User.sync();
    // await User.sync({ force: true });
    // Create a new user
    // const user1 = await User.create({ username: "sdepold" });
    // console.log("Jane's auto-generated ID:", user1.id);

    // Tìm hoặc tạo: Tìm trong table xem đã có bản ghi thỏa mãn chưa? nếu chưa có thì tạo
    const [user2, created] = await User.findOrCreate({
        where: { username: 'sdepold' },
        defaults: {
            job: 'Technical Lead JavaScript'
        }
    });
    console.log(user2.username); // 'sdepold'
    console.log(user2.job); // This may or may not be 'Technical Lead JavaScript'
    console.log(created); // The boolean indicating whether this instance was just created
    if (created) {
        console.log(user2.job); // This will certainly be 'Technical Lead JavaScript'
    }

    // Tìm và đếm tất cả số bản ghi
    const { count, rows } = await User.findAndCountAll({
        where: {
            username: {
                [Op.like]: 'sde%'
            }
        },
        offset: 0,
        limit: 2
    });
    console.log(count);
    console.log(rows);

    await sequelize.close();
})();