const { Sequelize } = require('sequelize');

//var sequelize = new Sequelize('database', 'username', 'password', {
//         host: 'localhost',
//         dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
//
//         pool: {
//             max: 5,
//             min: 0,
//             idle: 10000
//         },
//
//        storage: './database-sinhvien.db'
//     });

// const sequelize = new Sequelize('./database-sinhvien.db') // Example for sqlite

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database-sinhvien.db'
});

// var Bar = sequelize.define('Bar', {  }, {
//         // Không tự động thêm timestamp attributes (updatedAt, createdAt)
//         timestamps: false,
//
//        // softDelete, Sequelize sẽ tự động thêm attribute deletedAt, chỉ hoạt động khi bạn enable timestamps
//         paranoid: true,
//
//        // Sử dụng underscore style thay cho camel style
//        // updatedAt sẽ là updated_at...
//         underscored: true,
//
//       // chỉ định tên table
//         tableName: 'my_very_custom_table_name'
//     })

setTimeout(async () => {
  try {
    await sequelize.authenticate();
    var Task = sequelize.define('Task', {
      title: Sequelize.STRING,
      rating: { type: Sequelize.INTEGER, defaultValue: 3 }
    })

    var task = Task.build({
      title: 'specify the project idea',
      rating: 2
    })
    
    task.save()
    console.log('Connection has been established successfully.' + task.title);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  // sequelize.close()
}, 0)
