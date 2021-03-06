//Fetching already created todos
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

//removetodos by id
const removeTodo = (id) => {
    const TodoIndex = todos.findIndex( (todo) =>  todo.id === id)

    if (TodoIndex > -1) {
        todos.splice(TodoIndex, 1)
    }
}

//toggleTodo
const toggleTodo = (id) => {  //this functions sets the completed status of a todo to its opposite, either true or false, the result is toggled by the checkbox
    const TodoIndex2 = todos.findIndex( (todo) => {
        return todo.id === id
    })
    if (TodoIndex2 > -1) {
        todos[TodoIndex2].completed = !todos[TodoIndex2].completed
    }
}
        
//Render application todos based on filters
//renderTodos that are completed or not
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) //includes returns a matching object of a todo that was searched
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed //returns either true or false 
        
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed) //filter returns a false todo.completed status

    document.querySelector('#todos').innerHTML = ''

    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))
// Returning empty message if no todo
    if (filteredTodos.length === 0) {

        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No todos available'
        document.querySelector('#todos').appendChild(emptyMessage)
        emptyMessage.classList.add('empty-message')

    } else {
        filteredTodos.forEach( (todo) => {
            document.querySelector('#todos').appendChild(generateTodoDOM(todo))
        })
    }  
}

//Get the DOM elements for an individual note
//generateTodoDOM
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input') //checkbox
    const delTodo = document.createElement('button')
    const todoText = document.createElement('span')
    
    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    //checkbox
    checkbox.setAttribute('type', 'checkbox') //checkbox
    checkbox.checked = todo.completed
    todoText.appendChild(checkbox)
    checkbox.addEventListener('change',  (e) => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    //todotext
    todoText.appendChild(delTodo)
    containerEl.appendChild(todoText)
    
    //Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //removetodos button
    delTodo.textContent = 'Remove'
    delTodo.classList.add('button', 'button--text')
    delTodo.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    return todoText
}

//generateSummaryDOM
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')

    if (incompleteTodos.length > 1) {
        summary.textContent = `You have ${incompleteTodos.length} todos left`
    } else {
        summary.textContent = `You have ${incompleteTodos.length} todo left`
    }
    return summary
}