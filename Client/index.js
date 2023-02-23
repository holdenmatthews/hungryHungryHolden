const baseURL = 'http://http://35.161.176.239'

const snackBtn = document.getElementById("snack-idea")
const mealBtn = document.getElementById("meal-idea")

const randomSnack = () => {
    let snackBubble = document.getElementById("snack-idea-bubble")
    axios.get(`${baseURL}/snacks`)
    .then((res) => {
        snackBubble.classList = "idea-bubble"
        snackBubble.innerHTML = `${res.data}`
        setTimeout(() => {
            snackBubble.classList = ""
            snackBubble.innerHTML = ""
        }, 1000)
    })
    .catch((err) => {
        console.log(err)
    })
}

const randomMeal = () => {
    let mealBubble = document.getElementById("meal-idea-bubble")
    axios.get(`${baseURL}/meals`)
    .then((res) => {
        mealBubble.classList = "idea-bubble"
        mealBubble.innerHTML = `${res.data}`
        setTimeout(() => {
            mealBubble.classList = ""
            mealBubble.innerHTML = ""
        }, 1000)
    })
    .catch((err) => {
        console.log(err)
    })
}

snackBtn.addEventListener("click", randomSnack)
mealBtn.addEventListener("click", randomMeal)