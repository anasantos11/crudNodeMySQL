const app = require('./config/express').express();
require('./config/data.global').sqlServer();
var sql = require("mssql");

/**
 * Rota default da api que apenas responde que o servidor está rodando
 */
app.get('/', function (req, res) {
  res.send('Server running');
});

/**
 * Api para retornar os dados de todos os clientes cadastrados no banco de dados
 */
app.get('/customers', function (req, res) {
  new sql.Request().query("SELECT * FROM CUSTOMERS", function (error, response, fields) {
    if (error) {
      console.error("Erro:  " + error.message);
      res.send("Erro:  " + error.message);
    }
    response ? res.send(response.recordsets[0]) : response;
  });
});

/**
 * Api para retornar o dados de um cliente específico cadastrado no banco de dados.
 * A busca é feita através do id do cliente recebido na requisição.
 */
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

/**
 * Api para inserir um novo cliente no banco de dados conforme dados recebidos na requisição.
 */
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

/**
 * Api para atualizar dados de um cliente já cadastrado no banco de dados conforme 
 * dados recebidos na requisição.
 */
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

/**
 * Api para deletar um cliente específico cadastrado no banco de dados.
 * A busca do cliente a ser deletado é feita através do id recebido na requisição.
 */
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