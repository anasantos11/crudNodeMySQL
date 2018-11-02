const app = require('./config/express').express();
require('./config/data.global').sqlServer();
var sql = require("mssql");

app.get('/', function (req, res) {
  res.send('Server running');
});

app.get('/customers', function (req, res) {
  new sql.Request().query("SELECT * FROM CUSTOMERS", function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    response ? res.send(response.recordsets[0]) : response;
  });
});

app.get('/customers/:id', function (req, res) {
  const id = req.params.id;
  new sql.Request().query("SELECT * FROM customers WHERE customer_id =" + id, function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    response ? res.send(response.recordsets[0]) : response;
  });
});

app.post('/customers', function (req, res) {
  const id = req.body.id;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  const favoriteWebsite = req.body.favoriteWebsite;

  var query = "INSERT INTO customers (customer_id, last_name, first_name, favorite_website) VALUES (" + id + ",'" + lastName + "','" + firstName + "','" + favoriteWebsite + "')";

  new sql.Request().query(query, function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    res.send("Customer " + firstName + " " + lastName + " adicionado com sucesso!");
  });
});

app.put('/customers', function (req, res) {
  const id = req.body.id;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  const favoriteWebsite = req.body.favoriteWebsite;

  var query = "UPDATE customers SET last_name = '" + lastName + "', first_name = '" + firstName + "', favorite_website = '" + favoriteWebsite + "' WHERE customer_id = " + id;
  new sql.Request().query(query, function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    res.send("Dados do customer " + firstName + " " + lastName + " alterado com sucesso!");
  });
});


app.delete('/customers/:id', function (req, res) {
  const id = req.params.id;
  new sql.Request().query("DELETE FROM customers WHERE customer_id = " + id, function (error, response, fields) {
    sql.close();
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    res.send("Customer com id " + id + " removido com sucesso!");
  });
});