const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 4000
const mysql = require('mysql');
const config = require('./config')
const connection = mysql.createConnection(config);

const todosRoute = require('./route/todos')

app.use(cors())
app.use(bodyParser.json())

// connect to the MySQL server
connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected!');

  let createTodos = `create table if not exists todos(
    id int primary key auto_increment,
    title varchar(255) not null,
    description varchar(255) not null,
    priority tinyint(1) unsigned not null,
    deadline varchar(255) not null,
    completed boolean not null default 0
  )`;

  connection.query(createTodos, (err, results, fields) => {
    if (err) {
      console.log(err.message);
    }
  });

  connection.end((err) => {
    if (err) {
      return console.log(err.message);
    }
  });
});

app.listen(PORT, () => {
  console.log('Server is running on Port: ' + PORT)
})

app.use('/api/todos', todosRoute)