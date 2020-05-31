let mysql = require('mysql');
const express = require('express')
const router = express.Router()
const config = require('../config')
let connection = mysql.createConnection(config);

router.get('/', (req, res) => {
  connection.query('SELECT * FROM todos', (err, result, fields) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

router.get('/:id', (req, res) => {
  connection.query(`SELECT * FROM todos  where id= '${req.params.id}'`, (err, result, fields) => {
    if (err) throw err
    res.status(200).send(result)
  })
})

router.post('/add', (req, res) => {
  const todo = {
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    deadline: req.body.deadline,
    completed: req.body.completed
  }

  connection.query('INSERT INTO todos SET ?', todo, (err, result, fields) => {
    if (err) throw err
    res.status(200).send(true)
  });
})

router.put('/update/:id', (req, res) => {
  const updateTodo = {
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    deadline: req.body.deadline,
    completed: req.body.completed
  }

  connection.query(`UPDATE todos SET ? where id= '${req.params.id}'`, updateTodo, (err, result, fields) => {
    if (err) throw err
    if (!result) {
      res.status(404).send('Todo not found.')
    }
    res.status(200).send(true)
  })
})

router.delete('/remove/:id', (req, res) => {
  connection.query(`DELETE FROM todos WHERE id= '${req.params.id}'`, (err, result, fields) => {
    if (err) throw err
    if (!result) {
      res.status(404).send('Todo not found.')
    }
    res.status(200).send(true)
  })
})

module.exports = router