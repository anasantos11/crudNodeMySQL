const express = require('express');
const bodyParser = require('body-parser');
const app = express();

module.exports = {
    express: function () {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        const port = process.env.PORT || 3000;
        app.listen(port, function () {
            console.log('Server running at port:%d', port);
        });
        return app;
    }
}