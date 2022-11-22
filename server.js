const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'study_db',
})

app.listen(1225, () => {
  console.log('サーバー起動中')
})

app.post('/login', (req, res) => {
  const { id, password } = req.body
  const sql = `SELECT name FROM users WHERE id = "${id}" AND password = "${password}"`
  db.query(sql, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.json({ name: data[0]?.name })
    }
  })
})

app.post('/register', (req, res) => {
  const { name, id, password } = req.body
  const sql = `INSERT INTO users (name, id, password) VALUES ("${name}","${id}","${password}")`
  db.query(sql, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
})
