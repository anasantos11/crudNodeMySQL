const express = require('express');
const bodyParser = require('body-parser');
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