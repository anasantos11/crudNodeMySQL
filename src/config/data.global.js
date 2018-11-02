var sql = require('mssql');
const isLocal = !JSON.stringify(process.env.SQLAZURECONNSTR_ConnectionString);

function getConfig(){
    const connectionString = process.env.SQLAZURECONNSTR_ConnectionString.split(';');
    const config = {
        server: connectionString[0].split('=')[1].split(':')[1].split(',')[0],
        database: connectionString[1].split('=')[1],
        user: connectionString[2].split('=')[1],
        password: connectionString[3].split('=')[1],
        options: {
            encrypt: true
        }
    };
   return config;
};

module.exports = {
    sqlServer: function () {
        const config = isLocal ? require('../data-sql.local') : getConfig();
        sql.connect(config, function (err) {
            if (err) {
                console.log('Erro: ' + err);
            } else {
                console.log('Database connected');
            }
        });
    }
}
