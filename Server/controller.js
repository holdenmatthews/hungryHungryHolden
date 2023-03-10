let logs = require('./db.json')

let globalID = 5

let snacks = ['Chips & Dip', 'Bagel with cheese', 'CheeseCheese', 'CocoRolls', 'Smoothie', 'Cinnamon Toast']
let meals = ['Lasagna', 'Costa Vida', 'Cafe Sabor', 'Pizza', 'Cheesy Potatoes']

const toDate = (datetime) => {
    return datetime.slice(0, 10)
}

module.exports = {

    getLogs: (req, res) => {
        res.status(200).send(logs)
    },

    getLogsByDate: (req, res) => {
        let logsOnDate = []
        const searchDate = req.params
        for (let i = 0; i < logs.length; i++) {
            if (toDate(logs[i].datetime) === searchDate.date) {
                logsOnDate.push(logs[i])
            }
        }
        res.status(200).send(logsOnDate)
    },

    addLog: (req, res) => {
        const { datetime, food, quantity, unit, hungerScaleBefore, hungerScaleAfter, notes } = req.body

        let newLog = {
            id: globalID,
            datetime: datetime,
            food: food,
            quantity: quantity,
            unit: unit,
            hungerScaleBefore: hungerScaleBefore,
            hungerScaleAfter: hungerScaleAfter,
            notes: notes
        }

        logs.push(newLog)

        globalID++

        res.status(200).send(logs)
    },

    deleteLog: (req, res) => {
        const { id } = req.params
        for (let i = 0; i < logs.length; i++) {
            if (logs[i].id === +id) {
                logs.splice(i, 1)
            }
        }
        res.status(200).send(logs)
    },

    editLog: (req, res) => {
        const { id } = req.params
        const { datetime, food, quantity, unit, hungerScaleBefore, hungerScaleAfter, notes } = req.body
        logs.forEach((log, i) => {
            if (log.id === +id) {
                logs[i].datetime = datetime
                logs[i].food = food
                logs[i].quantity = quantity
                logs[i].unit = unit
                logs[i].hungerScaleBefore = hungerScaleBefore
                logs[i].hungerScaleAfter = hungerScaleAfter
                logs[i].notes = notes
            }
        })
        res.status(200).send(logs)
    },

    randomSnack: (req, res) => {
        let i = Math.floor(Math.random() * snacks.length)
        res.status(200).send(snacks[i])
    },

    randomMeal: (req, res) => {
        let i = Math.floor(Math.random() * meals.length)
        res.status(200).send(meals[i])
    },

    getSnacks: (req, res) => {
        res.status(200).send(snacks)
    },

    addNewSnack: (req, res) => {
        snacks.push(req.body.snack)
        res.status(200).send(snacks)
    },

    deleteSnack: (req, res) => {
        const { id } = req.params
        snacks.splice(id, 1)
        res.status(200).send(snacks)
    },

    getMeals: (req, res) => {
        res.status(200).send(meals)
    },

    addNewMeal: (req, res) => {
        meals.push(req.body.meal)
        res.status(200).send(meals)
    },

    deleteMeal: (req, res) => {
        const { id } = req.params
        meals.splice(id, 1)
        res.status(200).send(meals)
    }

}