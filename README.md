# crudNodeMySQL

Criado Web Service RESTful com NodeJS e Express JS a partir do banco de dados gerado pelo script ***data.sql*** disponibilizado neste repositório.

A API foi disponibilizada no Microsoft Azure e pode ser acessada através deste [link](https://service-apds.azurewebsites.net/).

O Web Service expõe os seguintes endpoints:

| Método | Recurso                    | Descrição                                                                               |
| ------ |--------------------------- | --------------------------------------------------------------------------------------- |
| GET  	 | /customers 	              | Retorna os dados de todos os clientes cadastrados no banco de dados 	                  |
| GET  	 | /customers/:idCustomer 	  | Retorna dados de um determinado cliente cadastrado no banco de dados                    |
| POST   | /customers 	              | Insere um novo cliente no banco de dados 	                                              |
| PUT  	 | /customers 	              | Atualiza dados de um cliente cadastrado no banco de dados 	                            |
| DELELTE| /customers/:idCustomer 	  | Deleta o cliente cadastrado no banco de dados que possui o ID passado como parâmetro 	  |
| GET  	 | /customerOrders/:idCustomer| Retorna todos os pedidos de um determinado cliente do banco de dados 	                  |
| GET    | /search?entity=:nameEntity&term=:termSearched 	| Pesquisa um termo informado em um entidade do banco de dados 	      |


**EXECUÇÃO**

Para executar o projeto em sua máquina é necessário que tenha o Node.js instalado.

Abra o prompt de comando e navegue até a pasta raiz do diretório do projeto para executar os comandos que serão citados abaixo.

Instale as dependências do projeto:

	- npm install

Execute o aplicativo: 

	- node src/server.js

Pronto, o servidor foi iniciado e está escutando a porta 3000, que pode ser acessado por http://localhost:3000/ em seu navegador.
