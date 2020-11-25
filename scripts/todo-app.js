let todos = getSavedTodos() //todos is assigned an empty array returned from the fxn or an array(s) of todos

const filters = { //an object for matching values
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

//getting search value
document.querySelector('#search-text').addEventListener('input',  (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

//adding todo
document.querySelector('#new-todo').addEventListener('submit',  (e) => {
    e.preventDefault() //remove default browser behaviour

    const text = e.target.elements.text.value.trim() //reove empty spaces from text

    if (text.length > 0) {
        todos.push({
            id: uuidv4(),
            text: text,
            completed: false
        })
        localStorage.setItem('todos', JSON.stringify(todos))
        renderTodos(todos, filters)
        e.target.elements.text.value = '' //clears the textbox after saving a todo entry
    } 
})

document.querySelector('#hide-completed').addEventListener('change',  (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})