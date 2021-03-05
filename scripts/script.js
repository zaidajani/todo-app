const todoTitle = document.getElementById('todo');
const todoDescription = document.getElementById('todoDescription');
const button = document.getElementById('addTodo');
const todolist = document.getElementById('todolist');

let todos = [];

if (localStorage.getItem('todo') == null) {
  todos = [];
}
else {
  todos = JSON.parse(localStorage.getItem('todo'));
}

update();

button.addEventListener('click', () => {
  todolist.innerText = '';
  
  let newTodo = {
    id: todos.length + 1,
    title: todoTitle.value,
    description: todoDescription.value
  }
  
  todos.push(newTodo);
  localStorage.setItem('todo', JSON.stringify(todos));
  console.log(JSON.parse(localStorage.getItem('todo')))

  todoTitle.value = '';
  todoDescription.value = '';

  todos.sort();

  todos.forEach(todo => {
    todolist.innerHTML += `
      <div class="card" style="width: 100%">
        <div class="card-body">
          <h5 class="card-title">${todo.title}</h5>
          <p class="card-text">
            ${todo.description}
          </p>
          <button class="btn btn-primary" onclick="deleteTodo(${todo.id})">Delete</button>
        </div>
      </div>
      <br>
    `
  });
});


function deleteTodo(id) {
  todos.splice(id, 1);
  localStorage.setItem('todo', JSON.stringify(todos));
  todos = JSON.parse(localStorage.getItem('todo'));
  todolist.innerHTML = '';

  if (todos.length <= 0) {
    return;
  }

  for (let i = 0; i < todos.length; i++) {
    todolist.innerHTML += `
      <div class="card" style="width: 100%">
        <div class="card-body">
          <h5 class="card-title">${todos[i].title}</h5>
          <p class="card-text">
            ${todos[i].description}
          </p>
          <button class="btn btn-primary" onclick="deleteTodo(${todos[i].id - 1})">Delete</button>
        </div>
      </div>
      <br>
    `
  }
}

function clearAllTodos() {
  localStorage.clear();
  todolist.innerHTML = '';
}

function update() {
  todos.forEach(todo => {
    todolist.innerHTML += `
      <div class="card" style="width: 100%">
        <div class="card-body">
          <h5 class="card-title">${todo.title}</h5>
          <p class="card-text">
            ${todo.description}
          </p>
          <button class="btn btn-primary" onclick="deleteTodo(${todo.id - 1})">Delete</button>
        </div>
      </div>
      <br>
    `
  });
}