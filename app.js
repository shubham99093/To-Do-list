const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");
const listHeader = document.querySelector(".Task-header");
let TaskList = [];
let TaskCount = 0;

function taskCheck() {
    if (inputBox.value === "") {
        alert("You Must Write Something!");
    }
    else if (chkSameTask(inputBox.value)) {
        alert("You added Same Task!");
    }
    else {
        addTask(inputBox.value);
    }
    showCount();
    saveData();
}

let addTask = (inputText) => {
    TaskList.push(inputText);
    let li = document.createElement("li");
    li.innerHTML = inputText;
    li.classList.add("Task");
    li.classList.add("unchecked");
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"
    inputBox.value = "";
    li.appendChild(span);
    if (TaskList.length > 0) {
        listHeader.style.display = "inline";
    }
}

inputBox.addEventListener("keyup", (event) => {
    (event.code === "Enter") ? taskCheck() : null;
});

function chkSameTask(inputTask) {
    if (!(TaskList.length === 0)) {
        if (TaskList.includes(inputTask) === true) {
            return true;
        }
        return false;
    }
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        e.target.classList.toggle("unchecked");
    } else if (e.target.tagName === "SPAN") {
        let li = e.target.parentElement;
        let Task = li.innerHTML.replace("<span>×</span>", "");
        let index = TaskList.indexOf(Task);
        TaskList.splice(index, 1);
        e.target.parentElement.remove();
        if (TaskList.length == 0) {
            listHeader.style.display = "none";
        }
    }
    showCount();
    saveData();
}, false);

let allTask = () => {
    let Tasks = document.querySelectorAll(".Task");
    for (let task of Tasks) {
        task.style.display = "block";
    }
}

let active = () => {
    let Tasks = document.querySelectorAll(".Task");
    for (let task of Tasks) {
        (task.classList[1] === "checked") ?
            task.style.display = "none"
            : task.style.display = "block";
    }
}

let complated = () => {
    let Tasks = document.querySelectorAll(".Task");
    for (let task of Tasks) {
        (task.classList[1] === "checked") ?
            task.style.display = "block"
            : task.style.display = "none";
    }
}

let removeComplated = () => {
    let Tasks = document.querySelectorAll(".Task");
    for (let task of Tasks) {
        if (task.classList[1] === "checked") {
            let TaskName = task.innerHTML.replace("<span>×</span>", "");
            let index = TaskList.indexOf(TaskName);
            TaskList.splice(index, 1);
            task.remove();
            if (TaskList.length == 0) {
                listHeader.style.display = "none";
            }
        }
    }
    showCount();
    saveData();
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    let TaskArr = JSON.stringify(TaskList);
    localStorage.setItem("TaskList", TaskArr);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    let TaskArr = localStorage.getItem("TaskList");
    TaskList = JSON.parse(TaskArr) || [];
    // (TaskList == null) ? TaskList = [] : "";
    // console.log(TaskList);
    if (TaskList.length > 0) {
        listHeader.style.display = "inline";
    }
    showCount();
    allTask();
}

function showCount() {
    let totalTask = document.querySelector(".totalTask");
    totalTask.innerHTML = TaskList.length;
}

showTask();