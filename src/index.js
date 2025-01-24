#!/usr/bin/env node

const { program } = require("commander");
const {
  handlerGetTask,
  handlerCreateTasks,
  handlerUpdateTasks,
  handlerDeleteTask,
  handlerGetTaskByStatus,
  handlerUpdateTaskByStatus,
} = require("./handlers/TaskHandler");

program.version("0.0.1").description("A command line tool for managing task");

program.command("list [status]").action(async (status) => {
  if (status) {
    const tasks = await handlerGetTaskByStatus(status);
    console.table(tasks);
  } else {
    const tasks = await handlerGetTask();
    console.table(tasks);
  }
});

program.command("add <description>").action(async (description) => {
  try {
    const newTask = await handlerCreateTasks(description);
    console.log(`Task added successfully (ID: ${newTask.id})`);
  } catch (error) {
    console.log(error.message);
  }
});
program.command("update <id> <description>").action(async (id, description) => {
  try {
    const updateTask = await handlerUpdateTasks(id, description);
    console.log(`Task update (ID: ${updateTask.id})`);
  } catch (error) {
    console.log(error.message);
  }
});
program.command("mark <status> <id>").action(async (status, id) => {
  try {
    const updateTask = await handlerUpdateTaskByStatus(status, id)
    console.log(updateTask);
  } catch (error) {
    console.log(error.message);
  }
});

program.command("delete <id>").action(async (id) => {
  try {
    const taskDelete = await handlerDeleteTask(id);
    console.log(taskDelete);
  } catch (error) {
    console.log(error.message);
  }
});

program.parse(process.argv);
