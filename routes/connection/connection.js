const mysql = require('mysql')

module.exports = async (params) => new Promise(
  (resolve, reject) => {
    const connection = mysql.createConnection(params);
    connection.connect(error => {
      if (error) {
        reject(error);
        return;
      }
      resolve(connection);
    })
  });


// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'wi-bluewhale',
//   multipleStatements: true,
//   connectionLimit: 10,
// })

// connection.connect(function (err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('connected as id ' + connection.threadId);
// });

// module.exports = connection;