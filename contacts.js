const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  return fs
    .readFile(contactsPath, { encoding: "utf-8" })
    .then((contacts) => console.table(JSON.parse(contacts)))
    .catch((error) => error);
}

function getContactById(contactId) {
  return fs
    .readFile(contactsPath, { encoding: "utf-8" })
    .then((contacts) =>
      JSON.parse(contacts).find((e) => e.id === contactId && console.log(e))
    )
    .catch((error) => error);
}

function removeContact(contactId) {
  return fs
    .readFile(contactsPath, { encoding: "utf-8" })
    .then((contacts) =>
      JSON.parse(contacts).filter((e) => e.id !== contactId || console.log(e))
    )
    .then((newContactList) =>
      fs.writeFile(contactsPath, JSON.stringify(newContactList))
    );
}

function addContact(name, email, phone) {
  const newContact = { id: nanoid(), name, email, phone };
  return fs
    .readFile(contactsPath, { encoding: "utf-8" })
    .then((contacts) => [...JSON.parse(contacts), newContact])
    .then((newContacts) =>
      fs.writeFile(contactsPath, JSON.stringify(newContacts))
    )
    .then(console.log(newContact))
    .catch((error) => error);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
