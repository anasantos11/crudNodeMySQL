/**
 * Import da dependência do microsoft sql server para fazer conexão ao banco de dados 
 */
var sql = require('mssql');
/**
 * Tenta recuperar a string de conexão das variáveis do ambiente para saber se está no ambiente local.
 * Se conseguir recuperar significa que não está no ambiente local.
 */
const isLocal = !JSON.stringify(process.env.SQLAZURECONNSTR_ConnectionString);
/**
 * Método para recuperar a string de conexão das variáveis do ambiente e 
 * retornar um objeto com os dados formatados
 */
function getConfig() {
    if (isLocal) {
        return {
            server: '172.17.0.2',
            database: 'webservice_nodejs',
            user: 'root',
            password: 'webservice-nodejs'
        }
    } else {
        const connectionString = process.env.SQLAZURECONNSTR_ConnectionString.split(';');
        return {
            server: connectionString[0].split('=')[1].split(':')[1].split(',')[0],
            database: connectionString[1].split('=')[1],
            user: connectionString[2].split('=')[1],
            password: connectionString[3].split('=')[1],
            options: {
                encrypt: true
            }
        };
    }
};

/**
 * Realiza a conexão com o banco de dados após recuperar a string de conexão.
 * Se estiver rodando no ambiente local irá recuperar de um arquivo.
 * Se não estiver rodando no ambiente local chama o método getConfig para recuperar as informações. 
 */
module.exports = {
    sqlServer: function () {
        const config = getConfig();
        sql.connect(config, function (err) {
            if (err) {
                console.log('Erro: ' + err);
            } else {
                console.log('Database connected');
            }
        });
    }
}
