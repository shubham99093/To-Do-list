const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");
const listHeader = document.querySelector(".Task-header");
let all = document.querySelector("#all");
let active = document.querySelector("#active");
let complated = document.querySelector("#complated");
let removeComplated = document.querySelector("#removeComplated");
let TaskList = [];
let TaskCount = 0;
saveData();

function addTask() {
    if (inputBox.value === "") {
        alert("You Must Write Something!");
    }
    else if (chkSameTask(inputBox.value)) {
        alert("You added Same Task!");
    }
    else {
        TaskList[TaskCount] = inputBox.value;
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.classList.add("Task");
        li.classList.add("unchecked");
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        inputBox.value = "";
        li.appendChild(span);
        TaskCount++;
        if (TaskCount > 0) {
            listHeader.style.display = "inline";
        }
    }
    saveData()
}

inputBox.addEventListener("keyup", function (event) {
    if (event.code === "Enter") {
        addTask();
    }
});

//arr method
function chkSameTask(inputTask) {
    if (TaskCount === 0) {
        return false;
    } else {
        for (let i = 0; i < TaskCount; i++) {
            if (TaskList[i] === inputTask) {
                return true;
            }
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
        TaskCount--;
        if (TaskCount == 0) {
            listHeader.style.display = "none";
        }
    }
    saveData()
}, false);

all.addEventListener("click", function () {
    let Tasks = document.querySelectorAll(".Task");
    for (let task of Tasks) {
        task.style.display = "list-item";
    }
});

active.addEventListener("click", function () {
    let Tasks = document.querySelectorAll(".Task");
    for (let task of Tasks) {
        if (task.classList[1] === "checked") {
            task.style.display = "none";
        } else if (task.classList[1] === "unchecked") {
            task.style.display = "list-item";
        }
    }
});

complated.addEventListener("click", function () {
    let Tasks = document.querySelectorAll(".Task");
    for (let task of Tasks) {
        if (task.classList[1] === "checked") {
            task.style.display = "list-item";
        } else if (task.classList[1] === "unchecked") {
            task.style.display = "none";
        }
    }
});

removeComplated.addEventListener("click", function () {
    let Tasks = document.querySelectorAll(".Task");
    for (let task of Tasks) {
        if (task.classList[1] === "checked") {
            let TaskName = task.innerHTML.replace("<span>×</span>", "");
            let index = TaskList.indexOf(TaskName);
            TaskList.splice(index, 1);
            task.remove();
            TaskCount--;
            if (TaskCount == 0) {
                listHeader.style.display = "none";
            }
        }
    }
    saveData()
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
    let Count = JSON.stringify(TaskCount)
    localStorage.setItem("Count", Count);
    let TaskArr = JSON.stringify(TaskList)
    localStorage.setItem("TaskArr", TaskArr);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    let Count = localStorage.getItem("Count");
    TaskCount = JSON.parse(Count)
    let TaskArr = localStorage.getItem("TaskArr");
    TaskList = JSON.parse(TaskArr);
    if (TaskCount > 0) {
        listHeader.style.display = "inline";
    }
}


showTask();