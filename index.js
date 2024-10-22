// write logic here
let todoItems = []

document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("todoItemsRef");
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach((t) => {
      renderTodo(t);
       if (t.checked) {
        taskStats.completedTasks += 1;
      }
    });
     taskStats.totalTasks = todoItems.length;
    updateTaskStats();
  }
});




// HTML elements
const form = document.querySelector(".todo-form");
const input = document.querySelector(".todo-input");
const list = document.querySelector(".todo-list");
const circles = document.querySelectorAll(".circle");
let selectedColor = "gray"; 

const taskStats = {
  totalTasks: 0,
  completedTasks: 0,
};

function updateTaskStats() {
  document.getElementById("totalTasks").textContent = `Total Tasks: ${taskStats.totalTasks}`;
  document.getElementById("completedTasks").textContent = `Completed Tasks: ${taskStats.completedTasks}`;
}

circles.forEach((circle) => {
  circle.addEventListener("click", () => {
    circles.forEach((c) => c.classList.remove("active"));
    circle.classList.add("active");
    selectedColor = getColor(circle.classList[1]); 
  });
});

// Add Todo item
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim(); // tirm to remove space
  if (text !== "") {
    const todo = {
      text,
      checked: false,
      color: selectedColor, 
      id: Date.now(),
    };
taskStats.totalTasks += 1;
 updateTaskStats();
    todoItems.push(todo);
    input.value = "";
    resetCircles(); 
    renderTodo(todo); 
     localStorage.setItem("todoItemsRef", JSON.stringify(todoItems));
  }
});


function resetCircles() {
  circles.forEach((circle) => circle.classList.remove("active"));
  selectedColor = "gray"; 
}


function renderTodo(todo) {
  const li = document.createElement("li");
  li.setAttribute("data-id", todo.id);
  li.style.borderLeft = `5px solid ${todo.color}`;
 if (todo.checked) {
        li.classList.add("completed");
        // taskStats.completedTasks += 1;
    } else {
        li.classList.remove("completed");
    }
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.checked;
  checkbox.addEventListener("change", (event) => {
    todo.checked = event.target.checked;
        localStorage.setItem("todoItemsRef", JSON.stringify(todoItems));
         updateTaskStats();

  });

  li.appendChild(checkbox);
  const span = document.createElement("span");
  span.textContent = todo.text;

  checkbox.addEventListener("change", (event) => {
    todo.checked = event.target.checked;
    if (todo.checked) {
      li.classList.add("completed");
      taskStats.completedTasks += 1;
    } else {
      li.classList.remove("completed");
            taskStats.completedTasks -= 1;

    }
        localStorage.setItem("todoItemsRef", JSON.stringify(todoItems));

  });

  li.appendChild(span);

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "10px"; 

const deleteButton = document.createElement("button");
deleteButton.innerHTML ='<i class="fas fa-trash-alt"></i>';
deleteButton.classList.add("delete-todo");
 deleteButton.style.color = "#dc3545";
  deleteButton.style.background = "none";
deleteButton.style.cursor = "pointer";
// deleteButton.addEventListener("click", () => {
//     todoItems = todoItems.filter((item) => item.id !== todo.id);
//     li.remove();
//         localStorage.setItem("todoItemsRef", JSON.stringify(todoItems));

// });
 deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this item?")) {
      todoItems = todoItems.filter((item) => item.id !== todo.id);
       if (todo.checked) {
      taskStats.completedTasks -= 1; 
    }
    taskStats.totalTasks -= 1;
      li.remove();
      localStorage.setItem("todoItemsRef", JSON.stringify(todoItems));
        updateTaskStats();
    }
  });
//edit part
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-edit"></i>'; 
  editButton.classList.add("edit-todo");
  editButton.style.cursor = "pointer"; 
  editButton.style.color = "#9E9E9E"; 
   editButton.style.background = "none";
  editButton.addEventListener("click", () => {

    const newText = prompt("New task", todo.text);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText;
      todo.text = newText;
    localStorage.setItem("todoItemsRef", JSON.stringify(todoItems));

    }

  });
   buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);
 li.appendChild(buttonContainer);
  list.appendChild(li);
}

function getColor(className) {
  switch (className) {
    case "circleRed":
      return "#D32F2F";
    case "circleYellow":
      return "#FFD600";
    case "circleBlue":
      return "#4285F4";
      case "circleGreen":
      return "#388E3C";
       case "circlePurple":
      return "#BA68C8";
       case "circleOrange":
      return "#F57C00";
    default:
      return "gray";
  }
}

