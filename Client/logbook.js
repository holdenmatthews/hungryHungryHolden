const baseURL = 'http://localhost:4000'

const newLogBtn = document.getElementById("new-log-btn")

const buildList = (res) => {
    const listContainer = document.getElementById("list-container")
    listContainer.innerHTML = ""
    logs = res
    for (const id in logs) {
        const logContainer = document.createElement("div")
        logContainer.id = `log-container_${id}`
        logContainer.classList.add("log-container")
        logContainer.innerHTML = `
            <h4>Date & Time</h4> <br>
            <time>${readDate(logs[id].datetime)}</time> <br>
            <h4>Food</h4>
            <span>${logs[id].food}</span> <span>${logs[id].quantity}</span> <span>${logs[id].unit}</span> <br>
            <h4>Hunger Scale</h4> <br>
            <span>Before: ${logs[id].hungerScaleBefore}</span> <span>After: ${logs[id].hungerScaleAfter}</span> <br>
            <h4>Notes</h4> <br>
            <div>${logs[id].notes}</div> <br>
            <button onclick="deleteLog(${logs[id].id})">X</button>
            <button onclick="editLog(${logs[id].id})">edit</button>
        `
        listContainer.insertBefore(logContainer, listContainer.children[0])
    }
}

const getLogs = () => {
    axios.get(`${baseURL}/logs`)
        .then((res) => {
            buildList(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const newLog = () => {
    const inputFields = document.getElementById("input-fields")
    inputFields.innerHTML = `
    <label for="datetime">When did you eat?</label>
    <input type="datetime-local" name="datetime" id="datetime"> <br>
    <label for="food">What did you eat?</label>
    <input type="text" name="food" id="food"> <br>
    <label for="quantity">Quantity</label>
    <input type="number" min="0" name="quantity" id="quantity">
    <label for="unit">Unit</label>
    <select name="unit" id="unit">
        <option value="pcs">pcs</option>
        <option value="g">g</option>
        <option value="oz">oz</option>
        <option value="fl oz">fl oz</option>
        <option value="Tbsp">Tbsp</option>
        <option value="tsp">tsp</option>
        <option value="cups">cups</option>
    </select>
    <p>Hunger Scale</p>
    <label for="hungerScaleBefore">Before</label>
    <input type="number" min="1" max="10" name="hungerScaleBefore" id="hungerScaleBefore">
    <label for="hungerScaleAfter">After</label>
    <input type="number" min="1" max="10" name="hungerScaleAfter" id="hungerScaleAfter"> <br>
    <label for="notes">Notes:</label>
    <input type="text" name="notes" id="notes">
    <button onclick="cancelNewLog()">CANCEL</button>
    <button onclick="addLog()">SUBMIT</button>
    `
}

const addLog = () => {
    const datetime = document.getElementById("datetime").value
    const food = document.getElementById("food").value
    const quantity = document.getElementById("quantity").value
    const unit = document.getElementById("unit").value
    const hungerScaleBefore = document.getElementById("hungerScaleBefore").value
    const hungerScaleAfter = document.getElementById("hungerScaleAfter").value
    const notes = document.getElementById("notes").value

    axios.post(`${baseURL}/logs`, { datetime, food, quantity, unit, hungerScaleBefore, hungerScaleAfter, notes })
    .then((res) => {
        buildList(res.data)
        const inputFields = document.getElementById("input-fields")
        inputFields.innerHTML = ''
    })
    .catch((err) => {
        console.log(err)
    })
}

const cancelNewLog = () => {
    const inputFields = document.getElementById("input-fields")
    inputFields.innerHTML = ''
}

const deleteLog = (id) => {
    axios.delete(`${baseURL}/logs/${id}`)
    .then((res) => {
        buildList(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const editLog = (id) => {
    const logContainer = document.getElementById(`log-container_${id}`)
    logContainer.innerHTML = `
    <label for="datetime">When did you eat?</label>
    <input type="datetime-local" name="datetime" id="datetime_${id}" value="${logs[id].datetime}"> <br>
    <label for="food">What did you eat?</label>
    <input type="text" name="food" id="food_${id}" value="${logs[id].food}"> <br>
    <label for="quantity">Quantity</label>
    <input type="number" min="0" name="quantity" id="quantity_${id}" value="${logs[id].quantity}">
    <label for="unit">Unit</label>
    <select name="unit" id="unit_${id}" value="${logs[id].unit}">
        <option value="pcs">pcs</option>
        <option value="g">g</option>
        <option value="oz">oz</option>
        <option value="fl oz">fl oz</option>
        <option value="Tbsp">Tbsp</option>
        <option value="tsp">tsp</option>
        <option value="cups">cups</option>
    </select>
    <p>Hunger Scale</p>
    <label for="hungerScaleBefore">Before</label>
    <input type="number" min="1" max="10" name="hungerScaleBefore" id="hungerScaleBefore_${id}" value="${logs[id].hungerScaleBefore}">
    <label for="hungerScaleAfter">After</label>
    <input type="number" min="1" max="10" name="hungerScaleAfter" id="hungerScaleAfter_${id}" value="${logs[id].hungerScaleAfter}"> <br>
    <label for="notes">Notes:</label>
    <input type="text" name="notes" id="notes_${id}" value="${logs[id].notes}">
    <button onclick="getLogs()">CANCEL</button>
    <button onclick="updateLog(${id})">SUBMIT</button>
    `
}

const updateLog = (id) => {
    const datetime = document.getElementById(`datetime_${id}`).value
    const food = document.getElementById(`food_${id}`).value
    const quantity = document.getElementById(`quantity_${id}`).value
    const unit = document.getElementById(`unit_${id}`).value
    const hungerScaleBefore = document.getElementById(`hungerScaleBefore_${id}`).value
    const hungerScaleAfter = document.getElementById(`hungerScaleAfter_${id}`).value
    const notes = document.getElementById(`notes_${id}`).value
    axios.put(`${baseURL}/logs/${id}`, { datetime, food, quantity, unit, hungerScaleBefore, hungerScaleAfter, notes })
    .then((res) => {
        buildList(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const readDate = (datetime) => {
    return `${datetime[5]}${datetime[6]}/${datetime[8]}${datetime[9]}/${datetime[0]}${datetime[1]}${datetime[2]}${datetime[3]} ${datetime[11]}${datetime[12]}:${datetime[14]}${datetime[15]}`
}

getLogs()

newLogBtn.addEventListener("click", newLog)