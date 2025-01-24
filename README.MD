```markdown
# Task CLI

A command line tool for managing tasks. You can list, add, update and delete tasks, as well as mark tasks with different statuses.

## Instalación

1. Clone repository:

   ```sh
   git clone https://github.com/AngelPenalver/proyects_backend/tree/main/todo_list
   cd task-cli
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Install the CLI globally:

   ```sh
   npm install -g .
   ```

## Use

### List all tasks

   ```sh
   task-cli list
   ```

### List tasks by status

   ```sh
   task-cli list done
   task-cli list todo
   task-cli list in-progress
   ```

### Add a new task

   ```sh
   task-cli add "description of the new task"
   ```

### Update an existing task

   ```sh
   task-cli update <id> "new description of the task"
   ```

### Mark a task with a specific status

   ```sh
   task-cli mark done <id>
   task-cli mark in-progress <id>
   task-cli mark todo <id>
   ```

### Delete task

   ```sh
   task-cli delete <id>
   ```

## Example

### Add a new task

   ```sh
   task-cli add "Study JavaScript"
   ```

### List all tasks

   ```sh
   task-cli list
   ```

### List tasks by "done" status

   ```sh
   task-cli list done
   ```

### Update a task

   ```sh
   task-cli update 1 "Complete the CLI project"
   ```

### Mark a task as "in-progress"

   ```sh
   task-cli mark in-progress 1
   ```

### Delete task

   ```sh
   task-cli delete 1
   ```

## Command Description

- `list [status]`: List all tasks or filter by status.
- `add <description>`: Adds a new task with the given description.
- `update <id> <description>`: Updates the description of an existing task.
- `mark <status> <id>`: Mark a task with the given status.
- `delete <id>`: Delete a task by its ID.

## Project Structure

- `index.js`: Main file that configures the CLI commands.
- `handlers/TaskHandler.js`: Contains the functions that handle task operations.

## Dependencies

- `commander`: To handle CLI commands.
- `chalk`: To color the output in the console.
- `fs.promises`: To handle file operations.

## Author

- [Angel Peñalver](https://github.com/AngelPenalver)

---

Thank you for using Task CLI! If you have any questions or problems, feel free to open an issue in the repository.
```