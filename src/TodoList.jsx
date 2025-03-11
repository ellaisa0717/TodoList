import { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(""); // ✅ Fixed setter name

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index)); // ✅ Fixed parameter
  };

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask(""); // ✅ Fixed setter name
  };

  return (
    <div className="app-container">
      <h2>📝 To-Do List</h2>
      <input
        type="text"
        placeholder="Add a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)} // ✅ Fixed setter name
      />
      <button onClick={addTask}>Add Task</button>
      <ul className="todo-container">
        {tasks.map((t, index) => (
          <li key={index} onClick={() => removeTask(index)}>
            {t} ❌
          </li>
        ))}
      </ul>
    </div>
  );
}
