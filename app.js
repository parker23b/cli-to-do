const fs = require("fs");
const readline = require("readline");

const filePath = "todo.json";

function loadTasks() {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath);
    return JSON.parse(content);
  } else {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "TODO> ",
});

const tasks = loadTasks();

function listTasks() {
  console.log("To-Do List:");
  tasks.forEach((task, index) => {
    console.log(
      `${index + 1}. ${task.completed ? "[x]" : "[ ]"} ${task.description}`
    );
  });
}

function addTask(description) {
  tasks.push({ description, completed: false });
  saveTasks(tasks);
}

function completeTask(index) {
  if (tasks[index]) {
    tasks[index].completed = true;
    saveTasks(tasks);
  }
}

function removeTask(index) {
  if (tasks[index]) {
    tasks.splice(index, 1);
    saveTasks(tasks);
  }
}

rl.prompt();

rl.on("line", (line) => {
  const [command, ...args] = line.trim().split(" ");
  const index = parseInt(args[0]) - 1;
  switch (command) {
    case "list":
      listTasks();
      break;
    case "add":
      const description = args.join(" ");
      addTask(description);
      break;
    case "complete":
      completeTask(index);
      break;
    case "remove":
      ``;
      removeTask(index);
      break;
    default:
      console.log(`Unknown command: ${command}`);
      break;
  }
  rl.prompt();
}).on("close", () => {
  console.log("Have a great day!");
  process.exit(0);
});
