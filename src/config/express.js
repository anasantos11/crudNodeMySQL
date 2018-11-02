/**
 * Import das dependências do framework express para utilizar os recursos dele para criar as apis
 */
const express = require('express');
const bodyParser = require('body-parser');
/**
 * Iniciar o servidor e deixar escutando a porta. 
 * Se estiver no ambiente local escuta a porta 3000 senão pega nas variáveis do ambiente a porta utilizada
 */
const app = express();
module.exports = {
    express: function () {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.listen(process.env.PORT || 3000, function () {
            console.log('Server running');
        });
        return app;
    }
}