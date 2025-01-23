const displayTasks = document.getElementById("display");
const newTaskBtn = displayTasks.querySelector("button");
const wrapper = document.getElementById("wrapper");
// Buttons in the form
const closeBtn = wrapper.querySelector("#close-btn");
const taskForm = document.getElementById("task-form")
const confirmCloseDialog = document.querySelector("dialog");
const cancelButton = document.getElementById("cancel-btn");
const discardButton = document.getElementById("discard-btn");
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

let tasks = [Task];

// Event Listeners

newTaskBtn.addEventListener("click", addNewTask);

function addNewTask() {
    taskForm.classList.toggle("hidden");
    displayTasks.classList.toggle("hidden");
}

taskForm.addEventListener("submit", () => {
    tasks.push(new Task());
    displayTasks.innerHTML += `  
        `;
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

