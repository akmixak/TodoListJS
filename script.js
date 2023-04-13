const taskInput = document.getElementById("task-title");
const dueDateInput = document.getElementById("due-date");
const descInput = document.getElementById("task-description");
const priorityIndex = document.getElementById("priority-index");
const sortByButton = document.getElementById("sort-data");

const todoItems = [];
function addTask(obj) {
  todoItems.push(obj);
}
let todoList = document.createElement("ul");
let activeTaskList = document.createElement("ul");
let completedTaskList = document.createElement("ul");
let todo = document.getElementById("todo");
todo.addEventListener("submit", function (e) {
  e.preventDefault();
  //console.log(taskInput.value, dueDateInput.value);
  addTask({
    title: taskInput.value,
    dueDate: dueDateInput.value,
    description: descInput.value,
  });
  //console.log("Anonefwe");
  let todoElement = document.createElement("li");
  todoElement.innerHTML = `<h3>${taskInput.value}</h3>
                <span class = "duedate">${dueDateInput.value}</span>
                <span class = "priority">${priorityIndex.value}</span>
                <p>${descInput.value}</p>
                <button class = "remove-task">remove</button><button class = "start-task">start</button>`;
  todoList.append(todoElement);
});
function removeCallback(e) {
  if (
    e.target.tagName === "BUTTON" &&
    e.target.classList.contains("remove-task")
  ) {
    console.log("akndkn");
    e.target.closest("li").remove();
  }
}
function startTaskCallback(e) {
  if (
    e.target.tagName === "BUTTON" &&
    e.target.classList.contains("start-task")
  ) {
    let taskToStart = e.target.closest("li");
    taskToStart.querySelector("button.start-task").remove();
    let markAsDoneButton = document.createElement("button");
    markAsDoneButton.innerHTML = "Mark As Done";
    markAsDoneButton.classList.add("mark-done");
    console.log(markAsDoneButton);
    taskToStart.append(markAsDoneButton);
    activeTaskList.append(taskToStart);
  }
}
function getPriorityIndex(p) {
  switch (p) {
    case "none":
      return 0;
    case "low":
      return 1;
    case "medium":
      return 2;
    case "high":
      return 3;
  }
}
function comparePriority(p1, p2) {
  console.log(p1, p2);
  return getPriorityIndex(p1) - getPriorityIndex(p2);
}
function prioritySortCallback(l1, l2) {
  console.log(l1, l2);
  let priority1 = l1.querySelector(".priority").innerText;
  let priority2 = l2.querySelector(".priority").innerText;
  console.log(comparePriority(priority1, priority2));
  return comparePriority(priority1, priority2);
}
function sortBy() {
  let sortParameter = sortBy.value;
  let todoListArray = Array.from(todoList.querySelectorAll("li"));
  todoListArray.sort(prioritySortCallback);
  todoList.append(...todoListArray);
}
function markDoneCallback(e) {
  if (
    e.target.tagName === "BUTTON" &&
    e.target.classList.contains("mark-done")
  ) {
    let doneTask = e.target.closest("li");
    doneTask.querySelector("button.mark-done").remove();
    completedTaskList.append(doneTask);
  }
}
document.querySelector("nav").addEventListener("click", startTaskCallback);
document.querySelector("nav").addEventListener("click", removeCallback);
document.querySelector("nav").addEventListener("click", markDoneCallback);
sortByButton.addEventListener("change", sortBy);
document.querySelector("li.due-task-list").append(todoList);
document.querySelector("li.active-task-list").append(activeTaskList);
document.querySelector("li.done-task-list").append(completedTaskList);
