const displayTasks = document.getElementById("display");
const newTaskBtn = displayTasks.querySelector("button");

const wrapper = document.getElementById("wrapper");


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
    wrapper.innerHTML = "";
    wrapper.innerHTML = `
    <form>
      <svg tabindex="0" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F44336"><path d="m251.33-204.67-46.66-46.66L433.33-480 204.67-708.67l46.66-46.66L480-526.67l228.67-228.66 46.66 46.66L526.67-480l228.66 228.67-46.66 46.66L480-433.33 251.33-204.67Z"/></svg>
      <div class="input">
        <label for="title">Title</label>
        <input type="text" id="title" required/>
      </div>
      <div class="input">
        <label for="date">Date</label>
        <input id="date" type="date" required/>
      </div>
      <div class="input">
        <label for="desc">Description</label>
        <textarea id="desc" cols="" rows="5" required></textarea>
      </div>
      <button type="submit">Add Task</button>
    </form>
    `;

    // Buttons in the form
    const cancelBtn = wrapper.querySelector("form svg");
    const submitBtn = wrapper.querySelector("form button");

    // Event Listeners
    cancelBtn.addEventListener("click", goToHome);
    submitBtn.addEventListener("click", () => {
        tasks.push(new Task());
        goToHome();
    });
}