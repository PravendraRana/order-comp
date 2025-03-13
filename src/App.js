import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("higher");
  const [task, setTask] = useState([
    {
      task: [
        { id: 1, task: "todo" },
        { id: 2, task: "coding" },
      ],
      priority: "higher",
    },
    {
      task: [{ id: 3, task: "test" }],
      priority: "middle",
    },
    {
      task: [
        { id: 4, task: "dsa" },
        { id: 5, task: "todo" },
      ],
      priority: "lower",
    },
  ]);

  // Function to add a new task
  const addTask = () => {
    // Validate input
    if (!text.trim()) {
      alert("Please enter a task");
      return;
    }

    // Create a new task object
    const newTaskObj = {
      id:
        Math.max(...task.flatMap((t) => t.task.map((item) => item.id)), 0) + 1,
      task: text,
    };

    // Find if the priority already exists
    const priorityExists = task.findIndex((item) => item.priority === priority);

    if (priorityExists !== -1) {
      // If priority exists, add task to that priority
      const updatedTasks = [...task];
      updatedTasks[priorityExists].task.push(newTaskObj);
      setTask(updatedTasks);
    } else {
      // If priority doesn't exist, create a new entry
      setTask([
        ...task,
        {
          task: [newTaskObj],
          priority: priority,
        },
      ]);
    }

    // Reset the input field
    setText("");
  };

  // Group tasks by priority for display
  const getTasksByPriority = (priorityLevel) => {
    const priorityGroup = task.find((item) => item.priority === priorityLevel);
    return priorityGroup ? priorityGroup.task : [];
  };

  // Get count of tasks for each priority
  const getTaskCount = (priorityLevel) => {
    const tasks = getTasksByPriority(priorityLevel);
    return tasks.length;
  };

  return (
    <div className="App">
      <div style={{ marginBottom: "8px" }}>
        <input
          type="text"
          value={text}
          placeholder="Enter example..."
          style={{ minWidth: "200px", marginRight: "4px" }}
          onChange={(e) => setText(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="higher">Higher</option>
          <option value="middle">Middle</option>
          <option value="lower">Lower</option>
        </select>
      </div>
      <button onClick={addTask}>Add Task</button>

      <div style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h3>Higher priority ({getTaskCount("higher")})</h3>
          <ul>
            {getTasksByPriority("higher").map((item) => (
              <li key={item.id}>{item.task}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Middle priority ({getTaskCount("middle")})</h3>
          <ul>
            {getTasksByPriority("middle").map((item) => (
              <li key={item.id}>{item.task}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h3>Lower priority ({getTaskCount("lower")})</h3>
          <ul>
            {getTasksByPriority("lower").map((item) => (
              <li key={item.id}>{item.task}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
