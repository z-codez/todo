const tasksContainer = document.getElementById("display");
const newTaskBtn = tasksContainer.querySelector("#add-new-task-btn");
const wrapper = document.getElementById("wrapper");

// Buttons in the form
const closeBtn = wrapper.querySelector("#close-btn");
const taskForm = document.getElementById("task-form")
const confirmCloseDialog = document.querySelector("dialog");
const cancelButton = document.getElementById("cancel-btn");
const discardButton = document.getElementById("discard-btn");

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

// Event Listeners

newTaskBtn.addEventListener("click", addNewTask);

function addNewTask() {
    taskForm.classList.toggle("hidden");
    tasksContainer.classList.toggle("hidden");
}

taskForm.addEventListener("submit", (e) => {

    e.preventDefault();
    const task = new Task(titleInput.value, dateInput.value, desc.value);
    let id = task.title.toLowerCase().split(" ").join("-");
    if (tasks.has(id)) {}
    else {
        tasks.set(id, task);
        console.log(tasks.keys());

        const HTMLString = `
        <div id="${id}" class="task">
            <p><strong>Title:</strong> ${task.title}</p>
            <p><strong>Date:</strong> ${task.date}</p>
            <p><strong>Description:</strong> ${task.description}</p>
            <button type="button" class="btn">Edit</button>
            <button type="button" class="btn">Delete</button>
        </div>
        `;

        // displayTasks.innerHTML += HTMLString;
        // insertAdjacentHTML is superior to innerHTML += because it does not corrupt the DOM and remove JS references
        tasksContainer.insertAdjacentHTML("beforeend", HTMLString);

        reset();
    }
});
// Event Listeners
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
    reset();
});


const reset = () => {
    // Array destructuring to clear input fields
    [titleInput.value, dateInput.value, desc.value] = ["","",""];

    taskForm.classList.toggle("hidden");
    tasksContainer.classList.toggle("hidden");
};

const addOrUpdateTask = () => {};
const displayTask = () => {};
