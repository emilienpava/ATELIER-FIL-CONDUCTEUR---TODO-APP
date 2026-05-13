const apiStatus = document.getElementById('api-status')
const todoForm = document.getElementById('todo-form')
const todoInput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-list')

let todos = []

async function checkApiStatus() {
    try {
        const response = await fetch('/api/health')

        if (response.ok) {
            apiStatus.textContent = 'API connectee'
            apiStatus.className = 'status connected'
        } else {
            apiStatus.textContent = 'API indisponible'
            apiStatus.className = 'status disconnected'
        }
    } catch (error) {
        apiStatus.textContent = 'Impossible de contacter l API'
        apiStatus.className = 'status disconnected'
    }
}

function displayTodos() {
    todoList.innerHTML = ''

    for (let i = 0; i < todos.length; i++) {
        const li = document.createElement('li')
        const span = document.createElement('span')
        const button = document.createElement('button')

        span.textContent = todos[i].title
        button.textContent = 'Supprimer'
        button.className = 'delete-btn'

        button.addEventListener('click', function () {
            deleteTodo(i)
        })

        li.appendChild(span)
        li.appendChild(button)
        todoList.appendChild(li)
    }
}

function addTodo(title) {
    const todo = {
        title: title
    }

    todos.push(todo)
    displayTodos()
}

function deleteTodo(index) {
    todos.splice(index, 1)
    displayTodos()
}

todoForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const title = todoInput.value.trim()

    if (title === '') {
        return
    }

    addTodo(title)
    todoInput.value = ''
})

checkApiStatus()
displayTodos()
