// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoDate = document.getElementById('todo-date');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const emptyState = document.getElementById('empty-state');
const filterButtons = document.querySelectorAll('.btn-filter');

// State Management (LocalStorage Integration)
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all'; // Can be 'all', 'pending', or 'completed'

// Set default date picker value to today's date
window.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    todoDate.value = today;
});

// 1. SAVE TO LOCAL STORAGE & SYNC UI
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateUI();
}

// 2. RENDER / READ TASKS FROM STATE WITH FILTERING
function updateUI() {
    // Filter the todos based on current state
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'pending') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });


    taskCount.textContent = `${todos.length} ${todos.length === 1 ? 'Task' : 'Tasks'}`;

    if (filteredTodos.length === 0) {
        emptyState.classList.remove('hidden');
        // Custom message based on active empty filter
        if (currentFilter === 'completed') {
            emptyState.innerHTML = '<p>No completed tasks yet! 📋</p>';
        } else if (currentFilter === 'pending') {
            emptyState.innerHTML = '<p>No pending tasks! Hurrah 🎉</p>';
        } else {
            emptyState.innerHTML = '<p>All caught up! Enjoy your day ✨</p>';
        }
        todoList.innerHTML = '';
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    todoList.innerHTML = filteredTodos.map((todo) => {
        // Find the actual index of this item in the master 'todos' array
        const masterIndex = todos.indexOf(todo);

        const itemClass = todo.completed ? 'todo-item completed' : 'todo-item';
        const textClass = todo.completed ? 'todo-text completed-text' : 'todo-text';
        const checkedAttribute = todo.completed ? 'checked' : '';
        
        // Format date string beautifully (e.g., "Jul 13, 2026")
        const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = new Date(todo.date).toLocaleDateString('en-US', dateOptions);

        return `
            <li class="${itemClass}">
                <div class="todo-left">
                    <input 
                        type="checkbox" 
                        class="todo-checkbox"
                        ${checkedAttribute} 
                        onclick="toggleComplete(${masterIndex})"
                    >
                    <div class="todo-content">
                        <span 
                            id="text-${masterIndex}" 
                            class="${textClass}"
                            onclick="enableInlineEdit(${masterIndex})"
                        >${escapeHTML(todo.text)}</span>
                        <span class="task-date">📅 ${formattedDate}</span>
                    </div>
                </div>

                <div class="todo-actions">
                    <button onclick="enableInlineEdit(${masterIndex})" class="btn-action btn-edit" title="Edit task">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                    </button>
                    <button onclick="deleteTodo(${masterIndex})" class="btn-action btn-delete" title="Delete task">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                </div>
            </li>
        `;
    }).join('');
}

// Helper to escape special HTML characters safely
function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// 3. CREATE TASK OPERATION (Saves task text + selected date)
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    const taskDueDate = todoDate.value;
    
    if (!taskText || !taskDueDate) return;

    todos.push({
        text: taskText,
        date: taskDueDate,
        completed: false
    });

    todoInput.value = '';
    // Form date defaults back to today
    todoDate.value = new Date().toISOString().split('T')[0];
    
    saveToLocalStorage();
});

// 4. UPDATE TASK STATUS
window.toggleComplete = function(index) {
    todos[index].completed = !todos[index].completed;
    saveToLocalStorage();
};

// 5. UPDATE TASK INLINE CONTENT
window.enableInlineEdit = function(index) {
    if (todos[index].completed) return; 

    const textSpan = document.getElementById(`text-${index}`);
    const currentText = todos[index].text;

    textSpan.outerHTML = `
        <input 
            type="text" 
            id="edit-input-${index}" 
            value="${escapeHTML(currentText)}" 
            class="edit-input"
            onblur="saveInlineEdit(${index})"
            onkeydown="handleEditKeydown(event, ${index})"
        >
    `;

    const inputField = document.getElementById(`edit-input-${index}`);
    inputField.focus();
    inputField.select(); 
};

window.saveInlineEdit = function(index) {
    const inputField = document.getElementById(`edit-input-${index}`);
    if (!inputField) return;

    const updatedText = inputField.value.trim();
    if (updatedText) {
        todos[index].text = updatedText;
        saveToLocalStorage();
    } else {
        updateUI(); 
    }
};

window.handleEditKeydown = function(event, index) {
    if (event.key === 'Enter') {
        saveInlineEdit(index);
    } else if (event.key === 'Escape') {
        updateUI(); 
    }
};

// 6. DELETE OPERATION
window.deleteTodo = function(index) {
    todos.splice(index, 1);
    saveToLocalStorage();
};

// 7. FILTER EVENT LISTENERS
filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        // Update filter state
        currentFilter = e.target.getAttribute('data-filter');
        // Re-render UI
        updateUI();
    });
});

// Initial Render
updateUI();