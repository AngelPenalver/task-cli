const fs = require("fs").promises;
const path = require("path");
const listTasks = path.resolve(__dirname, "../../tasks.json");

//function to write tasks to the file
async function writeTasksToFile(tasks) {
  await fs.writeFile(listTasks, JSON.stringify({ tasks }, null, 2));
}

//function to read tasks from the file
async function readTasksFromFile() {
  try {
    const data = await fs.readFile(listTasks, "utf8");
    return JSON.parse(data).tasks || [];
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(listTasks, JSON.stringify({ tasks: [] }, null, 2));
      return [];
    } else {
      throw error;
    }
  }
}
//get all tasks
async function handlerGetTask() {
  try {
   const tasks = await readTasksFromFile()
    return tasks.length === 0 ? "No ha creado ninguna tarea" : tasks;
  } catch (error) {
    return error.message;
  }
}

//get tasks by status
async function handlerGetTaskByStatus(status) {
  try {
    let tasks = await readTasksFromFile()
    return (tasks.filter((task) => task.status === status))
  } catch (error) {
    return error.message
  }
  
}
//create tasks
async function handlerCreateTasks(description) {
  try {
   
    const tasks = await readTasksFromFile()
    const newTask = {
      id: tasks.length + 1,
      description: description,
      status: "todo",
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    await writeTasksToFile(tasks)
    return newTask;
  } catch (error) {
    console.error("Error al crear la tarea:", error.message);
    return error.message;
  }
}

//update tasks
async function handlerUpdateTasks(id, description) {
  try {
   
    const tasks = await readTasksFromFile()
    const taskIndex = tasks.findIndex(task => task.id === Number(id));
    tasks[taskIndex].description = description;
    await writeTasksToFile(tasks)
    return tasks[taskIndex];
  } catch (error) {
    console.error("Error al crear la tarea:", error.message);
    return error.message
  }
}

//update task status
async function handlerUpdateTaskByStatus(status, id) {
  try {
    const tasks = await readTasksFromFile()
    const taskIndex = tasks.findIndex(task => task.id === Number(id));
    if(tasks[taskIndex]){
      tasks[taskIndex].status = status;
      await writeTasksToFile(tasks)
      return 'Task update';
    }
    return 'Task not found'
  } catch (error) {
    console.error("Error al crear la tarea:", error.message);
    return error.message;
  }
}

//delete task
async function handlerDeleteTask(id) {
  try {
    const tasks = await readTasksFromFile()
    const taskIndex = tasks.findIndex(task => task.id === Number(id));
    if (!tasks[taskIndex]) {
      return "Task not found";
    }
    const tasksDelete = tasks.filter((task) => task.id !== Number(id));
    await writeTasksToFile(tasksDelete)
    return "Task delete";
  } catch (error) {
    console.log("Hubo un error al intentar eliminar la tarea " + error.message);
  }
}


module.exports = {
  handlerCreateTasks,
  handlerGetTask,
  handlerDeleteTask,
  handlerUpdateTasks,
  handlerGetTaskByStatus,
  handlerUpdateTaskByStatus
};
