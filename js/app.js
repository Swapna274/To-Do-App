// Main Application Logic

const App = {
    // Application state
    state: {
        tasks: [],
        currentFilter: 'all'
    },

    // Initialize the application
    init: () => {
        // Load tasks from storage
        App.state.tasks = Storage.loadTasks();

        // Set up event listeners
        App.setupEventListeners();

        // Render initial UI
        App.render();
    },

    // Set up event listeners
    setupEventListeners: () => {
        // Add task button
        UI.elements.addTaskBtn.addEventListener('click', App.addTask);

        // Enter key in task input
        UI.elements.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') App.addTask();
        });

        // Filter buttons
        UI.elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                App.setFilter(filter);
            });
        });

        // Event delegation for dynamic task elements
        UI.elements.taskList.addEventListener('click', (e) => {
            const taskItem = e.target.closest('.task-item');
            if (!taskItem) return;

            const taskId = parseInt(taskItem.dataset.id);

            if (e.target.classList.contains('task-checkbox')) {
                App.toggleTask(taskId);
            } else if (e.target.classList.contains('edit-btn')) {
                App.editTask(taskId);
            } else if (e.target.classList.contains('delete-btn')) {
                App.deleteTask(taskId);
            }
        });
    },

    // Add a new task
    addTask: () => {
        const text = UI.getInputValue();
        if (text === '') {
            UI.showNotification('Please enter a task description');
            return;
        }

        const newTask = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        App.state.tasks.push(newTask);
        App.saveTasks();
        App.render();
        UI.clearInput();

        UI.showNotification('Task added successfully!');
    },

    // Toggle task completion
    toggleTask: (id) => {
        App.state.tasks = App.state.tasks.map(task => {
            if (task.id === id) {
                return {...task, completed: !task.completed };
            }
            return task;
        });

        App.saveTasks();
        App.render();
    },

    // Edit a task
    editTask: (id) => {
        const task = App.state.tasks.find(task => task.id === id);
        const newText = prompt('Edit your task:', task.text);

        if (newText !== null && newText.trim() !== '') {
            App.state.tasks = App.state.tasks.map(task => {
                if (task.id === id) {
                    return {...task, text: newText.trim() };
                }
                return task;
            });

            App.saveTasks();
            App.render();
            UI.showNotification('Task updated successfully!');
        }
    },

    // Delete a task
    deleteTask: (id) => {
        if (confirm('Are you sure you want to delete this task?')) {
            App.state.tasks = App.state.tasks.filter(task => task.id !== id);
            App.saveTasks();
            App.render();
            UI.showNotification('Task deleted successfully!');
        }
    },

    // Set the current filter
    setFilter: (filter) => {
        App.state.currentFilter = filter;
        UI.setActiveFilter(filter);
        App.render();
    },

    // Save tasks to storage
    saveTasks: () => {
        Storage.saveTasks(App.state.tasks);
    },

    // Render the UI
    render: () => {
        UI.renderTasks(App.state.tasks, App.state.currentFilter);
        UI.updateStats(App.state.tasks);
    }
};

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', App.init);