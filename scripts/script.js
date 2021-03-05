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
          <button class="btn btn-primary" onclick="deleteTodo(${todo.id})">Delete</button>
        </div>
      </div>
      <br>
    `
  });
}