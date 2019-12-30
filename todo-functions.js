// Returns saved todos from localStorage
// If no todos are saved, will return empty array
const getSavedTodos = () => {
    const todoJSON = localStorage.getItem('todos');

    if (todoJSON !== null) {
        return JSON.parse(todoJSON);
    } else {
        return [];
    }
};

// Saves todos to localStorage
const saveTodos = todo => {
    localStorage.setItem('todos', JSON.stringify(todo));
}

// Create and renders h2 tag with todos left to the DOM
const generateSummary = (incompleteTodo) => {
    let todosLeft = document.createElement('h2');
    todosLeft.textContent = `You have ${incompleteTodo.length} incomplete tasks left.`;
    return todosLeft;
};


// Removes a todo from the DOM
const removeTodo = id => {
    const todoIndex = todo.findIndex(task => task.id === id);

    if (todoIndex >= 0) {
        todo.splice(todoIndex, 1);
    }
};


// Changes todo from complete to incomplete and vice versa
const toggleTodo = id => {
    const todoIndex = todo.findIndex(task => task.id === id);

    if (todoIndex >= 0) {
        todo[todoIndex].completed = !todo[todoIndex].completed;
    }
}


// Generate p tag with contents given by parameter
const generateTodoDOM = task => {
    let newTodo = document.createElement('div');
    let completed = document.createElement('input');
    completed.setAttribute('type', 'checkbox');

    completed.checked = task.completed;

    newTodo.appendChild(completed);

    completed.addEventListener('change', () => {
        toggleTodo(task.id);
        saveTodos(todo);
        renderTodos(todo, filters);
    });

    let todoText = document.createElement('p');
    todoText.textContent = task.text;

    todoText.setAttribute('class', 'todo-text');

    newTodo.appendChild(todoText);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete task';

    newTodo.appendChild(deleteButton);

    newTodo.setAttribute('class', 'todo-container');

    deleteButton.addEventListener('click', () => {
        removeTodo(task.id);
        saveTodos(todo);
        renderTodos(todo, filters);
    })
    return newTodo;
};

// Creates and adds todos to the page
const renderTodos = function (todo, filters) {

    let filterTodo = todo;

    let incompleteTodo = todo.filter(function (task) {
        return !task.completed;
    });

    if (filters.hideCompleted) {
        // creates array of incomplete todo
        filterTodo = todo.filter(function (task) {
            return !task.completed;
        });
    }

    // creates an array that contains todos that include the typed value
    filterTodo = filterTodo.filter(function (task) {
    return task.text.toLowerCase().includes(filters.searchText.toLowerCase());
    });
    
    // removes all html from #tasks
    document.querySelector('#tasks').innerHTML = '';

    document.querySelector('#tasks').appendChild(generateSummary(incompleteTodo));

    // creates a p tag for every element in final array and adds to #tasks
    filterTodo.forEach (function (task) {
        document.querySelector('#tasks').appendChild(generateTodoDOM(task));
    })
};

