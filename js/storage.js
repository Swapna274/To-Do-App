// Local Storage Management

const Storage = {
    // Save tasks to localStorage
    saveTasks: (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    },

    // Load tasks from localStorage
    loadTasks: () => {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    },

    // Clear all tasks from localStorage
    clearTasks: () => {
        localStorage.removeItem('tasks');
    }
};