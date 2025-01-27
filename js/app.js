const tasksContainer = document.getElementById("display");
const newTaskBtn = tasksContainer.querySelector("#add-new-task-btn");
const wrapper = document.getElementById("wrapper");
const closeBtn = wrapper.querySelector("#close-btn");
const taskForm = document.getElementById("task-form")
const confirmCloseDialog = document.querySelector("dialog");
const cancelButton = document.getElementById("cancel-btn");
const discardButton = document.getElementById("discard-btn");
const addOrUpdateTaskBtn = document.getElementById("add-update-task-btn")
const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const desc = document.getElementById("desc");
class Task {
    title;
    date;
    description;

    constructor(title, date, description) {
        this.title = title;
        this.date = date;
        this.description = description;
    }
}


const isTaskMapUnInitialized = localStorage.getItem("taskMap").length <= 2;

let tasks = isTaskMapUnInitialized? new Map()
    : new Map(JSON.parse(localStorage.getItem("taskMap")));


if(tasks.size) displayTasks();

let taskToEditId;


/************** EVENT LISTENERS *****************************/
newTaskBtn.addEventListener("click", addNewTask);

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addOrUpdateTask();
    displayTasks();
    reset();
});

closeBtn.addEventListener("click", () => {
    const formInputsContainValues = titleInput.value || dateInput.value || desc.value;

    if(formInputsContainValues && !taskToEditId) {
        confirmCloseDialog.showModal();
    } else if(taskToEditId) {
        const inputsTask = new Task(titleInput.value, dateInput.value, desc.value);
        const taskToEdit = tasks.get(taskToEditId);

        if (JSON.stringify(inputsTask) === JSON.stringify(taskToEdit)) reset();
        else confirmCloseDialog.showModal();
    } else {
        reset();
    }
});

cancelButton.addEventListener("click", ()=>{
    confirmCloseDialog.close();
});

discardButton.addEventListener("click", () => {
    confirmCloseDialog.close();
    // Making sure that the Custom error message is empty to fix bugs during Update task
    titleInput.setCustomValidity("");
    desc.setCustomValidity("");
    reset();
});


// Custom Validation for title input field
titleInput.addEventListener("input", (event) => {
    // Validate with the built-in constraints
    titleInput.setCustomValidity("");
    if (!titleInput.validity.valid) return;

    // Extend with a custom constraint
    const makeId = stringToId(titleInput.value);
    if (!taskToEditId && tasks.has(makeId)) {
        titleInput.setCustomValidity("You already have a task with this title.");
    }

    if (titleInput.value.trim() === "") {
        titleInput.setCustomValidity("Please provide a title");
    }
});

desc.addEventListener("input", (event) => {
    // Validate with the built-in constraints
    desc.setCustomValidity("");
    if (!titleInput.validity.valid) return;

    // Extend with a custom constraint
    if (desc.value.trim() === "") {
        desc.setCustomValidity("Please provide a description");
    }
});

/****************FUNCTIONS*******************************/
const reset = () => {
    // Array destructuring to clear input fields
    [titleInput.value, dateInput.value, desc.value] = ["","",""];

    taskForm.classList.toggle("hidden");
    tasksContainer.classList.toggle("hidden");
    addOrUpdateTaskBtn.innerText = "Add Task";
};

const addOrUpdateTask = () => {
    const task = new Task(titleInput.value, dateInput.value, desc.value);
    let id = stringToId(task.title);

    if(taskToEditId)  taskToEditId = undefined;
    // Adds or updates tasks map
    tasks.set(id, task);

    // Save to local Storage
    localStorage.setItem("taskMap", JSON.stringify([...tasks]));
};
function displayTasks () {

    //Clear tasksContainer
    tasksContainer.querySelectorAll(".task")
        .forEach(task => task.remove());

    tasks.forEach((task, id) => {
        const HTMLString = `
        <div id="${id}" class="task">
            <p><strong>Title:</strong> ${task.title}</p>
            <p><strong>Date:</strong> ${task.date}</p>
            <p><strong>Description:</strong> ${task.description}</p>
            <button onclick="editTask(this)" type="button" class="btn">Edit</button>
            <button onclick="deleteTask(this)" type="button" class="btn">Delete</button>
        </div>
        `;

        //displayTasks.innerHTML += HTMLString;
        // insertAdjacentHTML is superior to innerHTML += because it does not corrupt the DOM and remove JS references
        tasksContainer.insertAdjacentHTML("beforeend", HTMLString);
    });
}

function addNewTask() {
    taskForm.classList.toggle("hidden");
    tasksContainer.classList.toggle("hidden");
}

function deleteTask(buttonEL) {
    const taskId = buttonEL.parentElement.id;

    // Delete from tasks
    const isTaskDeleted = tasks.delete(taskId);

    // save changes to local storage
    localStorage.setItem("taskMap", JSON.stringify([...tasks]));

    if (isTaskDeleted) {
        buttonEL.parentElement.remove();
    }
}

function editTask(buttonEL) {
    const taskId = buttonEL.parentElement.id;
    const taskObjToEdit = tasks.get(taskId);

    // Object destructuring assignment
    ({title:titleInput.value, date:dateInput.value, description:desc.value} = taskObjToEdit);

    // Change the text inside the button
    addOrUpdateTaskBtn.innerText = "Update Task";

    addNewTask();

    // assign to global variable
    taskToEditId = taskId;
}


/////// Helper Functions ///////////////////

function stringToId(str) {
    return str.toLowerCase().split(" ").join("-");
}

function removeSpecialCharsExceptWhiteSpace(str) {
    str.replace(/[^a-zA-Z0-9 ]/g, '');
}

