const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(`error.message`, error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const contact = contacts.find((el) => el.id == contactId);

    return contact;
  } catch (error) {
    console.log(`error.message`, error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };

  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const idx = await contacts.findIndex((item) => item.id == contactId);
    if (idx === -1) return null;
    const response = contacts[idx];

    contacts.splice(idx, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts));

    return response;
  } catch (error) {
    console.log(`error.message`, error.message);
  }
};

const updateContact = async ({ contactId }, body) => {
  try {
    console.log(`contactId`, contactId);
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const idx = contacts.findIndex((item) => item.id == contactId);
    if (idx === -1) {
      return null;
    }

    contacts[idx] = { ...contacts[idx], ...body };
    fs.writeFile(contactsPath, JSON.stringify(contacts));

    return contacts[idx];
  } catch (error) {
    console.log(`error.message`, error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
