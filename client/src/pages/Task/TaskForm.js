import axios from "axios";
import React, { useEffect, useState } from "react";
import { CONSTANTS } from "../../config/Constants";

function TaskForm({ addTask, user }) {
  const [data, setData] = useState({ name: "", description: "", assignId: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.description || !data.assignId) {
      return;
    } else {
      addTask(data.name, data.description, data.assignId);
      setData({ name: "", description: "", assignId: "" });
    }
  };

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="name"
        value={data.name}
        onChange={(e) => {
          handleChnage(e);
        }}
        placeholder="Task Name"
        required
      />
      <textarea
        value={data.description}
        name="description"
        onChange={(e) => {
          handleChnage(e);
        }}
        placeholder="Task Description"
        required
      />
      <select
        value={data.assignId}
        name="assignId"
        onChange={(e) => {
          handleChnage(e);
        }}
        required
      >
        <option value="">Select assign name</option>
        {user &&
          user.map((item) => <option value={item._id}>{item.name}</option>)}
      </select>
      <br />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
