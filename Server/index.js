// require packages
const express = require('express')
const cors = require('cors')

// app instance
const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(express.static(`../${__dirname}/Client`))

// endpoints
const { getLogs, getLogsByDate, addLog, deleteLog, editLog, randomSnack, randomMeal, getSnacks, addNewSnack, deleteSnack, getMeals, addNewMeal, deleteMeal } = require('./controller')

app.get('/logs', getLogs)
app.get('/logs/:date', getLogsByDate)
app.post('/logs', addLog)
app.delete('/logs/:id', deleteLog)
app.put('/logs/:id', editLog)

app.get('/snacks', randomSnack)
app.get('/meals', randomMeal)

app.get('/all-snacks', getSnacks)
app.post('/all-snacks', addNewSnack)
app.delete('/all-snacks/:id', deleteSnack)
app.get('/all-meals', getMeals)
app.post('/all-meals', addNewMeal)
app.delete('/all-meals/:id', deleteMeal)

// start server with app.listen
app.listen(4000, () => console.log('Running on port 4000'))