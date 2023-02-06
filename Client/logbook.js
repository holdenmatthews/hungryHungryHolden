const baseURL = 'http://localhost:4000'

const newLogBtn = document.getElementById("new-log-btn")
const getAllLogsBtn = document.getElementById("get-all-logs")
const getLogsByDateBtn = document.getElementById("get-logs-by-date")

const buildList = (res) => {
    const listContainer = document.getElementById("list-container")
    listContainer.innerHTML = ""
    logs = res
    for (const id in logs) {
        const logContainer = document.createElement("div")
        logContainer.id = `log-container_${id}`
        logContainer.classList.add("log-container")
        logContainer.innerHTML = `
            <h4 class="log-label">Date & Time</h4>
            <div class="log-contents">${readDate(logs[id].datetime)}</div>
            <h4 class="log-label">Food</h4>
            <div class="log-contents">
            <span>${logs[id].food}</span> <span>${logs[id].quantity}</span> <span>${logs[id].unit}</span>
            </div>
            <h4 class="log-label">Hunger Scale</h4>
            <div class="log-contents">
            <span class="hunger-box">Before: ${logs[id].hungerScaleBefore}</span> <span>After: ${logs[id].hungerScaleAfter}</span>
            </div>
            <h4 class="log-label">Notes</h4>
            <div class="log-contents">${logs[id].notes}</div>
            <button onclick="deleteLog(${logs[id].id})" id="delete-button">X</button>
            <button onclick="editLog(${logs[id].id})" id="edit-button">edit</button>
        `
        listContainer.insertBefore(logContainer, listContainer.children[0])
    }
}

const getLogs = () => {
    const inputFields = document.getElementById("input-fields")
    inputFields.innerHTML = ""
    inputFields.classList = ""
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
    inputFields.classList = "input-fields"
    inputFields.innerHTML = `
    <label for="datetime" class="log-label">When did you eat?</label>
    <input type="datetime-local" name="datetime" id="datetime" class="log-contents"> <br>
    <label for="food" class="log-label">What did you eat?</label>
    <input type="text" name="food" id="food" class="log-contents"> <br>
    <label for="quantity" class="log-label">Quantity</label>
    <input type="number" min="0" name="quantity" id="quantity" class="log-contents">
    <label for="unit" class="log-label">Unit</label>
    <select name="unit" id="unit" class="log-contents">
        <option value="pcs">pcs</option>
        <option value="g">g</option>
        <option value="oz">oz</option>
        <option value="fl oz">fl oz</option>
        <option value="Tbsp">Tbsp</option>
        <option value="tsp">tsp</option>
        <option value="cups">cups</option>
    </select>
    <p class="log-label">Hunger Scale</p>
    <label for="hungerScaleBefore" class="log-label">Before</label>
    <input type="number" min="1" max="10" name="hungerScaleBefore" id="hungerScaleBefore" class="log-contents">
    <label for="hungerScaleAfter" class="log-label">After</label>
    <input type="number" min="1" max="10" name="hungerScaleAfter" id="hungerScaleAfter" class="log-contents"> <br>
    <label for="notes" class="log-label">Notes:</label>
    <input type="text" name="notes" id="notes" class="log-contents"> <br>
    <button onclick="cancelNewLog()" class="cancel-button">CANCEL</button>
    <button onclick="addLog()" class="submit-button">SUBMIT</button>
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
        inputFields.innerHTML = ""
        inputFields.classList = ""
    })
    .catch((err) => {
        console.log(err)
    })
}

const cancelNewLog = () => {
    const inputFields = document.getElementById("input-fields")
    inputFields.innerHTML = ""
    inputFields.classList = ""
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
    <label for="datetime" class="log-label">When did you eat?</label>
    <input type="datetime-local" name="datetime" id="datetime_${id}" value="${logs[id].datetime}" class="log-contents"> <br>
    <label for="food" class="log-label">What did you eat?</label>
    <input type="text" name="food" id="food_${id}" value="${logs[id].food}" class="log-contents"> <br>
    <label for="quantity" class="log-label">Quantity</label>
    <input type="number" min="0" name="quantity" id="quantity_${id}" value="${logs[id].quantity}" class="log-contents">
    <label for="unit" class="log-label">Unit</label>
    <select name="unit" id="unit_${id}" value="${logs[id].unit}" class="log-contents">
        <option value="pcs">pcs</option>
        <option value="g">g</option>
        <option value="oz">oz</option>
        <option value="fl oz">fl oz</option>
        <option value="Tbsp">Tbsp</option>
        <option value="tsp">tsp</option>
        <option value="cups">cups</option>
    </select>
    <p class="log-label">Hunger Scale</p>
    <label for="hungerScaleBefore" class="log-label">Before</label>
    <input type="number" min="1" max="10" name="hungerScaleBefore" id="hungerScaleBefore_${id}" value="${logs[id].hungerScaleBefore}" class="log-contents">
    <label for="hungerScaleAfter" class="log-label">After</label>
    <input type="number" min="1" max="10" name="hungerScaleAfter" id="hungerScaleAfter_${id}" value="${logs[id].hungerScaleAfter}" class="log-contents"> <br>
    <label for="notes" class="log-label">Notes:</label>
    <input type="text" name="notes" id="notes_${id}" value="${logs[id].notes}" class="log-contents">
    <button onclick="getLogs()" class="cancel-button">CANCEL</button>
    <button onclick="updateLog(${id})" class="submit-button">UPDATE</button>
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
    return `${datetime[5]}${datetime[6]}/${datetime[8]}${datetime[9]}/${datetime[0]}${datetime[1]}${datetime[2]}${datetime[3]}  @  ${datetime[11]}${datetime[12]}:${datetime[14]}${datetime[15]}`
}

const dateSearch = () => {
    const listContainer = document.getElementById("list-container")
    listContainer.innerHTML = ""
    const inputFields = document.getElementById("input-fields")
    inputFields.innerHTML = `
    <label for="searchdate" class="log-label">See all logs from: </label>
    <input type="date" name="searchdate" id="searchdate" class="log-contents">
    <button onclick="getLogsByDate()" id="search-button">SEARCH</button>
    `
    inputFields.classList = "input-fields"
}

const getLogsByDate = () => {
    const date = document.getElementById("searchdate").value
    axios.get(`${baseURL}/logs/${date}`)
        .then((res) => {
            buildList(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

getLogs()

newLogBtn.addEventListener("click", newLog)
getAllLogsBtn.addEventListener("click", getLogs)
getLogsByDateBtn.addEventListener("click", dateSearch)