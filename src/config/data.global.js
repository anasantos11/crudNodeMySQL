var sql = require("mssql");
const isLocal = !process.env.SQLAZURECONNSTR_ConnectionString;
const config = isLocal ? require('../../data-sql.local') : process.env.SQLAZURECONNSTR_ConnectionString;

module.exports = {
    sqlServer: function () {
        sql.connect(config, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Database connected");
            }
        });
    }
}