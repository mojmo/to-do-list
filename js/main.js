let input = document.querySelector(".input");
let submit = document.querySelector(".add-btn");
let tasks = document.querySelector(".tasks");
let clear = document.querySelector(".clear-btn");

let tasksArray = [];

if(localStorage.getItem("tasks")) {
    tasksArray = JSON.parse(localStorage.getItem("tasks"));
}

gettasksFromLocalStorage();

submit.onclick = function() {
    if(input.value !== "") {
        addTaskToArray(input.value);
        input.value = "";
    }
};

tasks.addEventListener("click", (event) => {
    if(event.target.classList.contains("delete")) {
        deleteTask(event.target.parentElement.getAttribute("data-id"));
        event.target.parentElement.remove();
    }

    if(event.target.classList.contains("task")) {
        updateTaskStatus(event.target.getAttribute("data-id"));
        event.target.classList.toggle("done");
    }
});

function addTaskToArray(enteredTask) {
    let task = {
        name: enteredTask,
        id: Date.now(),
        status: false
    };

    tasksArray.push(task);

    addTasksTothePage(tasksArray);

    addtasksToLocalStorage(tasksArray);
}

function addTasksTothePage(tasksArray) {

    //Empty the tasks div to prevent task duplicate
    tasks.innerHTML = "";

    tasksArray.forEach(task => {

        let div = document.createElement("div");
        div.className = "task";

        if(task.status) {
            div.className = "task done";
        }

        div.setAttribute("data-id", task.id);

        div.appendChild(document.createTextNode(task.name));

        let del = document.createElement("span");
        del.className = "delete";
        del.appendChild(document.createTextNode("Delete"));
        div.appendChild(del)

        tasks.appendChild(div);
    });
}

function addtasksToLocalStorage(tasksArray) {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

function gettasksFromLocalStorage() {
    let data = localStorage.getItem("tasks");

    if(data) {
        let tasks = JSON.parse(data);
        addTasksTothePage(tasks);
    }
}

function deleteTask(taskId) {
    tasksArray = tasksArray.filter((task) => task.id != taskId);
    addtasksToLocalStorage(tasksArray);
}

function updateTaskStatus(taskId) {

    tasksArray.forEach(task => {
        if(task.id == taskId) {
            task.status == false ? task.status = true : task.status = false;
        }
    });

    addtasksToLocalStorage(tasksArray);
}

clear.onclick = function() {
    localStorage.clear();
    tasks.innerHTML = "";
}

// Dark Theme

let checkbox = document.querySelector(".switch");

checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
});
