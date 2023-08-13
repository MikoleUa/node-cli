const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const readline = require("readline");
const colors = require("colors");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let userName;

function next() {
  rl.question(
    `${colors.green(
      "Щоб продовжити натисніть будь яку клавішу"
    )}\n${colors.red.bold("no")} - щоб завершити роботу програми \n`,
    (answer) => {
      if (answer === "no") {
        rl.close();
        return;
      }
      invoke();
    }
  );
  // rl.setPrompt(
  //   "щоб продовжити натисніть будь яку клавішу \n no - щоб завершити роботу програми \n"
  // );
  // rl.prompt();
  // rl.on("line", (ancwer) => {
  //   if (ancwer === "no") {
  //     rl.close();
  //     return;
  //   }
  //   invoke();
  // });
}
rl.on("close", () => {
  console.log(
    `\n-------------------------\n Програма завершується...\n-------------------------
${userName} ${colors.green("гарно покодили ;=)")} `.gray
  );
});

rl.question("Як до Вас можна звертатись?\n".blue, (name) => {
  userName = name.toUpperCase().magenta;
  console.log(`Приємно познайомитися ${userName}`.blue);
  invoke();
});

function invoke() {
  rl.question(
    `${userName}, ${colors.blue("які наші дії?")}\n ${colors.cyan(
      "list"
    )} - отримати список контактів\n ${colors.yellow(
      "get"
    )} - знайкти контакт по id\n ${colors.green(
      "add"
    )} - додати новий контакт\n ${colors.red(
      "remove"
    )} - видалити контакт по id\n`,
    (action) => {
      switch (action) {
        case "list":
          listContacts().then(next);
          break;
        case "get":
          rl.question(
            `введіть ${colors.underline.yellow(
              "id"
            )} номера який потрібно отримати - `,
            (id) => getContactById(id).then(next)
          );
          break;
        case "remove":
          rl.question(
            `введіть ${colors.underline.red(
              id
            )} номера який потрібно видалити - `,
            (id) => removeContact(id).then(next)
          );
          break;
        case "add":
          rl.question(`введіть ${colors.green(`ім'я`)} - `, (name) =>
            rl.question(`введіть ${colors.green("ел пошту")} - `, (email) =>
              rl.question(`введіть ${colors.green("номер")} - `, (phone) => {
                addContact(name, email, phone).then(next);
                console.log("новий контакт успішно додано".rainbow);
              })
            )
          );
          break;
        default:
          console.warn("\x1B[31m Невідома команда!");
          invoke();
      }
    }
  );
}
