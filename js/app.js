const displayTasks = document.getElementById("display");
const newTaskBtn = displayTasks.querySelector("button");
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
    displayTasks.classList.toggle("hidden");
}

taskForm.addEventListener("submit", (e) => {

    e.preventDefault();
    const task = new Task(titleInput.value, dateInput.value, desc.value);
    let key = task.title.toLowerCase().split(" ").join("-");
    tasks.set(key, task);
    console.log(tasks.keys());
    taskForm.classList.toggle("hidden");
    displayTasks.classList.toggle("hidden");

    const HTMLString = `
    <div>
        <p>Title: ${task.title}</p>
        <p>Date: ${task.date}</p>
        <p>Description: ${task.description}</p>
    </div>
    `;
    displayTasks.innerHTML += HTMLString;

});
// Event Listeners
closeBtn.addEventListener("click", () => {
    confirmCloseDialog.showModal();
});

cancelButton.addEventListener("click", ()=>{
    confirmCloseDialog.close();
});

discardButton.addEventListener("click", () => {
    confirmCloseDialog.close();
    taskForm.classList.toggle("hidden");
    displayTasks.classList.toggle("hidden");
})

