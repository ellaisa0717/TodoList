import { useState, useEffect } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState("");
  const [filter, setFilter] = useState("all");

  // Initialize tasks and theme from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setDarkMode(savedTheme === "true");
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    // Update body class for global theme
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const removeTask = (index) => {
    if (Array.isArray(tasks) && typeof index === 'number' && index >= 0) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingTask(tasks[index].text);
  };

  const saveEditedTask = () => {
    if (editingTask.trim() === "") return;
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = { 
      ...updatedTasks[editingIndex], 
      text: editingTask 
    };
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingTask("");
  };

  const toggleCompleted = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { 
      ...updatedTasks[index], 
      completed: !updatedTasks[index].completed 
    };
    setTasks(updatedTasks);
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // "all" filter
  });

  // Handle key press for adding and editing tasks
  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      if (action === "add") addTask();
      if (action === "edit") saveEditedTask();
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Dark Mode Toggle */}
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🔆 Light Mode" : "🌙 Dark Mode"}
      </button>

      <h2>📝 To-Do List</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={(e) => handleKeyPress(e, "add")}
          className={`task-input ${darkMode ? "dark-mode" : ""}`}
        />
        <button className="add-btn" onClick={addTask}>Add Task</button>
      </div>

      <div className="filter-container">
        <button 
          className={`filter-btn ${filter === "all" ? "active" : ""} ${darkMode ? "dark-mode" : ""}`} 
          onClick={() => setFilter("all")}>
          All
        </button>
        <button 
          className={`filter-btn ${filter === "completed" ? "active" : ""} ${darkMode ? "dark-mode" : ""}`} 
          onClick={() => setFilter("completed")}>
          Completed
        </button>
        <button 
          className={`filter-btn ${filter === "pending" ? "active" : ""} ${darkMode ? "dark-mode" : ""}`} 
          onClick={() => setFilter("pending")}>
          Pending
        </button>
      </div>

      <ul className="todo-container">
        {filteredTasks.length === 0 ? (
          <li className="empty-state">No tasks to display</li>
        ) : (
          filteredTasks.map((t, index) => {
            const originalIndex = tasks.indexOf(t);
            return (
              <li key={originalIndex} className={`task-item ${darkMode ? "dark-mode" : ""}`}>
                {editingIndex === originalIndex ? (
                  <div className="editing-container">
                    <input
                      type="text"
                      value={editingTask}
                      onChange={(e) => setEditingTask(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, "edit")}
                      className={`edit-input ${darkMode ? "dark-mode" : ""}`}
                      autoFocus
                    />
                    <div className="button-group">
                      <button className="save-btn" onClick={saveEditedTask}>💾 Save</button>
                      <button className="cancel-btn" onClick={() => setEditingIndex(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="task-content">
                    <div className="task-left">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => toggleCompleted(originalIndex)}
                        className="task-checkbox"
                      />
                      <span className={`task-text ${t.completed ? "completed" : ""}`}>
                        {t.text}
                      </span>
                    </div>
                    <div className="button-group">
                      <button 
                        className="edit-btn"
                        onClick={() => startEditing(originalIndex)} 
                        disabled={t.completed}>
                        ✏️
                      </button>
                      <button className="delete-btn" onClick={() => removeTask(originalIndex)}>❌</button>
                    </div>
                  </div>
                )}
              </li>
            );
          })
        )}
      </ul>
      
      {tasks.length > 0 && (
        <div className="task-stats">
          <span>{tasks.filter(t => t.completed).length} completed</span>
          <span>{tasks.filter(t => !t.completed).length} pending</span>
        </div>
      )}
    </div>
  );
}