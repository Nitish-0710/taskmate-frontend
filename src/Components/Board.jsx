import React from "react";
import Column from "./Column";
import MyModal from "./MyModal";
import ColumnData from "./ColumnData.js";
import { theme } from "./Theme.js";
import { useDarkMode } from "../Context/DarkModeContext";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import {
  addTaskToServer,
  getTaskFromServer,
  updateTaskAtServer,
  deletTaskFromServer
} from "../services/taskServices.js";

function Board() {
  const { darkMode } = useDarkMode();

  const [activeModal, setActiveModal] = React.useState(null);

  function buttonFunction(title) {
    setActiveModal(title);
  }

  const [tasks, setTasks] = React.useState([]);
  React.useEffect(() => {
    getTaskFromServer().then((initialItems) => {
      setTasks(initialItems);
    });
  }, []);

  // console.log(tasks)
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState("");

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  async function modalSubmit(header) {
    if (isEditing) {
      const updatedTask = await updateTaskAtServer(currentTask.id, {title: editTitle, description: editDescription, duedate: editDate, category: currentTask.category}); 

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === currentTask.id
            ? updatedTask
            : task,
        ),
      );
      setIsEditing(false);
    } else {
      const newTask = await addTaskToServer({
        title,
        description,
        duedate: date,
        category: header,
      });

      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    setTitle("");
    setDescription("");
    setEditTitle("");
    setEditDescription("");
    setActiveModal(null);
  }

  const [isEditing, setIsEditing] = React.useState(false);
  const [currentTask, setCurrentTask] = React.useState(null);

  const [editTitle, setEditTitle] = React.useState("");
  const [editDescription, setEditDescription] = React.useState("");
  const [editDate, setEditDate] = React.useState(null);

  function editTask(id) {
    // console.log(id);
    const tasktoedit = tasks.find((task) => task.id === id);
    // console.log(tasktoedit);
    if (tasktoedit) {
      setEditTitle(tasktoedit.title);
      setEditDescription(tasktoedit.desc);
      setEditDate(tasktoedit.duedate);
      setCurrentTask(tasktoedit);
      setIsEditing(true);
      setActiveModal(tasktoedit.category);
    }
  }

  async function deleteTask(id) {
    const tasktodelete = tasks.find((t) => t.id === id);
    if(!tasktodelete) return; 

    if (window.confirm(`Delete ${tasktodelete.title} permanently ?`)) {
      await deletTaskFromServer(id)
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  }

  const handleTaskMove = (taskId, newCategory) => {
  setTasks(prevTasks => {
    const taskToMove = prevTasks.find(task => task.id === taskId);
    if (!taskToMove) return prevTasks;

    updateTaskAtServer(taskId, {
      category: newCategory,
      title: taskToMove.title,
      description: taskToMove.desc,
      duedate: taskToMove.duedate,
    }).catch(err => {
      console.error("Moving failed:", err);
    });

    return prevTasks.map(task =>
      task.id === taskId
        ? { ...task, category: newCategory }
        : task
    );
  });
};


  const colData = ColumnData.map((value) => {
    const status = value.title.toLowerCase();

    return (
      <Col xs={6} lg={3} key={status} className="mb-3">
        <Column
          key={status}
          header={value.title}
          status={status}
          darkMode={darkMode}
          alltasks={tasks}
          edit={editTask}
          delete={deleteTask}
          showModal={() => buttonFunction(value["title"])}
          onTaskMove={handleTaskMove}
        />
        <MyModal
          header={isEditing ? currentTask.category : value["title"]}
          show={value["title"] === activeModal}
          onHide={() => {
            setActiveModal(null);
            setIsEditing(false);
          }}
          modalsubmit={() => modalSubmit(value["title"])}
          title={isEditing ? editTitle : title}
          description={isEditing ? editDescription : description}
          titlevalue={
            isEditing ? (e) => setEditTitle(e.target.value) : handleTitleChange
          }
          descriptionvalue={
            isEditing
              ? (e) => setEditDescription(e.target.value)
              : handleDescriptionChange
          }
          duedate={isEditing ? editDate : date}
          datevalue={
            isEditing ? (e) => setEditDate(e.target.value) : handleDateChange
          }
          isEditing={isEditing}
        />
      </Col>
    );
  });

  return (
    <>
      <Container>
        <Row>{colData}</Row>
      </Container>
    </>
  );
}

export default Board;
