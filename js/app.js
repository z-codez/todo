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

let tasks = new Map();

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

    if(formInputsContainValues) {
        confirmCloseDialog.showModal();
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
    reset();
});


// Custom Validation for title input field
titleInput.addEventListener("input", (event) => {
    // Validate with the built-in constraints
    titleInput.setCustomValidity("");
    if (!titleInput.validity.valid) return;

    // Extend with a custom constraint
    const makeId = titleInput.value.toLowerCase().split(" ").join("-");
    if (!taskToEditId && tasks.has(makeId)) {
        titleInput.setCustomValidity("You already have a task with this title.");
    }
});

/****************FUNCTIONS*******************************/
const reset = () => {
    // Array destructuring to clear input fields
    [titleInput.value, dateInput.value, desc.value] = ["","",""];

    taskForm.classList.toggle("hidden");
    tasksContainer.classList.toggle("hidden");
};

const addOrUpdateTask = () => {
    const task = new Task(titleInput.value, dateInput.value, desc.value);
    let id = task.title.toLowerCase().split(" ").join("-");

    if(taskToEditId)  taskToEditId = undefined;
    // Adds or updates tasks map
    tasks.set(id, task);
};
const displayTasks = () => {

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


    //
};

function addNewTask() {
    taskForm.classList.toggle("hidden");
    tasksContainer.classList.toggle("hidden");
}

function deleteTask(buttonEL) {
    const taskId = buttonEL.parentElement.id;

    const isTaskDeleted = tasks.delete(taskId);

    if (isTaskDeleted) {
        buttonEL.parentElement.remove();
    }
}

function editTask(buttonEL) {
    const taskId = buttonEL.parentElement.id;
    const taskObjToEdit = tasks.get(taskId);

    // Object destructuring assignment
    ({title:titleInput.value, date:dateInput.value, description:desc.value} = taskObjToEdit);
    console.log("From Edit Button: " + taskToEditId);
    // Change the text inside the button
    addOrUpdateTaskBtn.innerText = "Update Task";

    addNewTask();

    // assign to global variable
    taskToEditId = taskId;
}

