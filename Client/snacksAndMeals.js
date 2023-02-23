const baseURL = 'http://35.161.176.239'

const seeSnacksBtn = document.getElementById("see-snacks")
const addSnackBtn = document.getElementById("add-snack")
const seeMealsBtn = document.getElementById("see-meals")
const addMealBtn = document.getElementById("add-meal")

const buildSnackList = (res) => {
    const listContainer = document.getElementById("list-container")
    listContainer.innerHTML = ""
    const items = res
    for (let i = 0; i < items.length; i++) {
        const itemContainer = document.createElement("div")
        itemContainer.classList = `item-container`
        itemContainer.id = `item-container_${i}`
        itemContainer.innerHTML = `
        <div class="list-item">${items[i]}</div>
        <button onclick="deleteSnack(${i})" id="delete-button">X</button>
        `
        listContainer.insertBefore(itemContainer, listContainer.children[0])
    }
}

const buildMealList = (res) => {
    const listContainer = document.getElementById("list-container")
    listContainer.innerHTML = ""
    const items = res
    for (let i = 0; i < items.length; i++) {
        const itemContainer = document.createElement("div")
        itemContainer.classList = `item-container`
        itemContainer.id = `item-container_${i}`
        itemContainer.innerHTML = `
        <div class="list-item">${items[i]}</div>
        <button onclick="deleteMeal(${i})" id="delete-button">X</button>
        `
        listContainer.insertBefore(itemContainer, listContainer.children[0])
    }
}

const getSnacks = () => {
    const inputFields = document.getElementById("input-fields")
    inputFields.innerHTML = ""
    inputFields.classList = ""
    axios.get(`${baseURL}/all-snacks`)
    .then((res) => {
        buildSnackList(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const newSnack = () => {
    const listContainer = document.getElementById("list-container")
    listContainer.innerHTML = ""
    listContainer.classList = ""
    const inputFields = document.getElementById("input-fields")
    inputFields.classList = "input-fields"
    inputFields.innerHTML = `
    <label for="snack" class="log-label">Add a New Snack</label>
    <input type="text" name="snack" id="snack" class="log-contents">
    <button onclick="cancelAdd()" class="cancel-button">CANCEL</button>
    <button onclick="addSnack()" class="submit-button">SUBMIT</button>
    `
}

const addSnack = () => {
    const snack = document.getElementById("snack").value
    axios.post(`${baseURL}/all-snacks`, { snack })
    .then((res) => {
        buildSnackList(res.data)
        const inputFields = document.getElementById("input-fields")
        inputFields.innerHTML = ""
        inputFields.classList = ""
    })
    .catch((err) => {
        console.log(err)
    })
}

const deleteSnack = (i) => {
    axios.delete(`${baseURL}/all-snacks/${i}`)
    .then((res) => {
        buildSnackList(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const getMeals = () => {
    const inputFields = document.getElementById("input-fields")
    inputFields.innerHTML = ""
    inputFields.classList = ""
    axios.get(`${baseURL}/all-meals`)
    .then((res) => {
        buildMealList(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const newMeal = () => {
    const listContainer = document.getElementById("list-container")
    listContainer.innerHTML = ""
    listContainer.classList = ""
    const inputFields = document.getElementById("input-fields")
    inputFields.classList = "input-fields"
    inputFields.innerHTML = `
    <label for="meal" class="log-label">Add a New Meal</label>
    <input type="text" name="meal" id="meal" class="log-contents">
    <button onclick="cancelAdd()" class="cancel-button">CANCEL</button>
    <button onclick="addMeal()" class="submit-button">SUBMIT</button>
    `
}

const addMeal = () => {
    const meal = document.getElementById("meal").value
    axios.post(`${baseURL}/all-meals`, { meal })
    .then((res) => {
        buildMealList(res.data)
        const inputFields = document.getElementById("input-fields")
        inputFields.innerHTML = ""
        inputFields.classList = ""
    })
    .catch((err) => {
        console.log(err)
    })
}

const deleteMeal = (id) => {
    axios.delete(`${baseURL}/all-meals/${id}`)
    .then((res) => {
        buildMealList(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const cancelAdd = () => {
    const inputFields = document.getElementById("input-fields")
    inputFields.innerHTML = ""
    inputFields.classList = ""
}

seeSnacksBtn.addEventListener("click", getSnacks)
addSnackBtn.addEventListener("click", newSnack)
seeMealsBtn.addEventListener("click", getMeals)
addMealBtn.addEventListener("click", newMeal)