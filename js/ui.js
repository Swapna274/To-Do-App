// UI Rendering Functions

const UI = {
    // DOM Elements
    elements: {
        taskInput: document.getElementById('task-input'),
        addTaskBtn: document.getElementById('add-task-btn'),
        taskList: document.getElementById('task-list'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        totalTasksSpan: document.getElementById('total-tasks'),
        completedTasksSpan: document.getElementById('completed-tasks'),
        emptyState: document.getElementById('empty-state')
    },

    // Render tasks based on current filter
    renderTasks: (tasks, filter) => {
        const filteredTasks = tasks.filter(task => {
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true; // 'all' filter
        });

        const taskList = UI.elements.taskList;

        if (filteredTasks.length === 0) {
            UI.elements.emptyState.classList.remove('hidden');
            taskList.innerHTML = '';
        } else {
            UI.elements.emptyState.classList.add('hidden');
            taskList.innerHTML = filteredTasks.map(task => `
                <li class="task-item" data-id="${task.id}">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                    <div class="task-actions">
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                </li>
            `).join('');
        }
    },

    // Update task statistics
    updateStats: (tasks) => {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;

        UI.elements.totalTasksSpan.textContent = `Total: ${total} task${total !== 1 ? 's' : ''}`;
        UI.elements.completedTasksSpan.textContent = `Completed: ${completed} task${completed !== 1 ? 's' : ''}`;
    },

    // Clear the task input
    clearInput: () => {
        UI.elements.taskInput.value = '';
        UI.elements.taskInput.focus();
    },

    // Get the task input value
    getInputValue: () => {
        return UI.elements.taskInput.value.trim();
    },

    // Set active filter button
    setActiveFilter: (filter) => {
        UI.elements.filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });
    },

    // Show notification (could be enhanced with a proper notification system)
    showNotification: (message, type = 'info') => {
        // Simple alert for now - could be replaced with a toast notification
        alert(message);
    }
};