import { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState("");

  // Add Task
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  // Remove Task
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Start Editing Task
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingTask(tasks[index]);
  };

  // Save Edited Task
  const saveEditedTask = () => {
    if (editingTask.trim() === "") return;
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = editingTask;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingTask("");
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Dark Mode Toggle */}
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🔆 Light Mode" : "🌙 Dark Mode"}
      </button>

      <h2>📝 To-Do List</h2>
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className={darkMode ? "dark-mode" : ""}
      />
      <button onClick={addTask}>Add Task</button>

      <ul className="todo-container">
        {tasks.map((t, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingTask}
                  onChange={(e) => setEditingTask(e.target.value)}
                  className={darkMode ? "dark-mode" : ""}
                />
                <button onClick={saveEditedTask}>💾 Save</button>
              </>
            ) : (
              <>
                {t}
                <button onClick={() => startEditing(index)}>✏️ Edit</button>
                <button onClick={() => removeTask(index)}>❌ Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

