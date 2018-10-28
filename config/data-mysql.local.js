module.exports = {
  mysql: function () {
    const mysql = require('mysql');
    return mysql.createConnection({
      host: "localhost",
      user: "USER",
      password: "PASSWORD",
      database: "DATABASE"
    });
  }
}
