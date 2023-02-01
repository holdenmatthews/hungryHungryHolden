const baseURL = 'http://localhost:4000'

const snackBtn = document.getElementById("snack-idea")
const mealBtn = document.getElementById("meal-idea")

const randomSnack = () => {
    axios.get(`${baseURL}/snacks`)
    .then((res) => {
        alert(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const randomMeal = () => {
    axios.get(`${baseURL}/meals`)
    .then((res) => {
        alert(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

snackBtn.addEventListener("click", randomSnack)
mealBtn.addEventListener("click", randomMeal)