// require packages
const express = require('express')
const cors = require('cors')

// app instance
const app = express()

// middleware
app.use(express.json())
app.use(cors())

// endpoints
const { getLogs, addLog, deleteLog, editLog, randomSnack, randomMeal } = require('./controller')

app.get('/logs', getLogs)
app.post('/logs', addLog)
app.delete('/logs/:id', deleteLog)
app.put('/logs/:id', editLog)

app.get('/snacks', randomSnack)
app.get('/meals', randomMeal)

// start server with app.listen
app.listen(4000, () => console.log('Running on port 4000'))