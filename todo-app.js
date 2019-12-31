let todo = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
};

let displayDescription = false;

renderTodos(todo, filters);

// shows and reveals website description based on button click
document.querySelector('.show-description').addEventListener('click', () => {
    if (displayDescription === false) {
        const appInfo = document.createElement('p');
        appInfo.textContent = 'This web app lets you create and edit a todo list. The list is saved in your devices local storage, so it will remember your list even if you close the app.';

        const gap = document.createElement('br');
        const githubLink = document.createElement('a');
        githubLink.setAttribute('href', 'https://github.com/samirtoubache/todo-app');
        githubLink.textContent = 'GitHub link: ';

        document.querySelector('#site-description').appendChild(appInfo);
        document.querySelector('#site-description').appendChild(gap);
        document.querySelector('#site-description').appendChild(githubLink);
    } else {
        document.querySelector('#site-description').innerHTML = '';
    }
    displayDescription = !displayDescription;
});

document.querySelector('#search-todo').addEventListener('input', function (e) {
    filters.searchText = e.target.value;
    renderTodos(todo, filters);
})

document.querySelector('#new-todo').addEventListener('submit', function (e) {
    e.preventDefault();
    todo.push({
        id: uuidv4(),
        text: e.target.elements.newTodo.value,
        completed: false
    })
    saveTodos(todo);
    renderTodos(todo, filters);
    e.target.elements.newTodo.value = '';
})

document.querySelector('#hide-completed').addEventListener('change', e => {
    let checked = e.target.checked;
    filters.hideCompleted = checked;
    renderTodos(todo, filters);
})
