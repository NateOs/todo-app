//Fetch existing todos from localStorage
//getSavedTodos
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : [] //if (todosJSON !== null) execute 'a' else 'b'
    } catch (e) {
        return []
    }
}

//Save todos to localStorage
//saveTodos

const saveTodos = (todos) => {

        localStorage.setItem('todos', JSON.stringify(todos))
    
}

//removetodos
const removeTodo = (id) => {
    const TodoIndex = todos.findIndex( (todo) =>  todo.id === id)

    if (TodoIndex > -1) {
        todos.splice(TodoIndex, 1)
    }
}

//toggleTodo
const toggleTodo = (id) => {
    const TodoIndex2 = todos.findIndex( (todo) => {
        return todo.id === id
    })
    if (TodoIndex2 > -1) {
        todos[TodoIndex2].completed = !todos[TodoIndex2].completed
    }
}
        
//Render application todos based on filters
//renderTodos
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''

    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach( (todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

//Get the DOM elements for an individual note
//generateTodoDOM
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input') //checkbox
    const delTodo = document.createElement('button')
    const p = document.createElement('span')

    p.textContent = todo.text
    delTodo.textContent = 'x'
    //removetodos
    delTodo.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    checkbox.setAttribute('type', 'checkbox') //checkbox
    checkbox.checked = todo.completed
    
    checkbox.addEventListener('change',  (e) => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    todoEl.appendChild(delTodo)
    todoEl.appendChild(p)
    todoEl.appendChild(checkbox)

    return todoEl
}

//Get the DOM elements for list summary
//generateSummaryDOM
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}