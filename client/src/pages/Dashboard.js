import React, { useState, useEffect, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CONSTANTS } from "../config/Constants";
import { Auth, AuthContext } from "../context/auth";
import axios from "axios";
import avatar6 from "../assets/images/avatar6.jpg";
import TaskForm from "./Task/TaskForm";
import TaskColumn from "./Task/TaskColumn";

function Dashboard() {
  const { userId } = useContext(AuthContext);
  const { email, token } = Auth();

  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState([]);

  const logOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("Email");
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    getuser();
    getTask();
  }, []);

  const getTask = () => {
    axios({
      url: CONSTANTS.API_URL + "task",
      method: "get",
    })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to add a new task
  const addTask = (taskName, taskDescription, assignId) => {
    const newTask = {
      name: taskName,
      description: taskDescription,
      status: "Pending", // Default status is Pending
      assignId: assignId,
    };

    axios({
      url: CONSTANTS.API_URL + "task",
      method: "post",
      data: newTask,
    })
      .then((response) => {
        setTasks((prevTasks) => [response.data, ...prevTasks]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios({
        url: CONSTANTS.API_URL + "task/" + taskId,
        method: "delete",
      })
        .then((response) => {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== taskId)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Function to update the task status
  const updateTaskStatus = (taskId, newStatus) => {
    axios({
      url: CONSTANTS.API_URL + "taskstatus",
      method: "post",
      data: { status: newStatus, _id: taskId },
    })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getuser = () => {
    axios({
      url: CONSTANTS.API_URL + "user",
      method: "get",
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="task-manager">
        <h1>Task Management System</h1>
        <button
          onClick={() => {
            logOut();
          }}
        >
          Logout
        </button>
        <TaskForm addTask={addTask} user={user} />
        <div className="task-columns">
          <TaskColumn
            title="Pending"
            tasks={tasks.filter((task) => task.status === "Pending")}
            onDelete={deleteTask}
            onUpdateStatus={updateTaskStatus}
            column="Pending"
          />
          <TaskColumn
            title="Completed"
            tasks={tasks.filter((task) => task.status === "Completed")}
            onDelete={deleteTask}
            onUpdateStatus={updateTaskStatus}
            column="Completed"
          />
          <TaskColumn
            title="Done"
            tasks={tasks.filter((task) => task.status === "Done")}
            onDelete={deleteTask}
            onUpdateStatus={updateTaskStatus}
            column="Done"
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default Dashboard;
