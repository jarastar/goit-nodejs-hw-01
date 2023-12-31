const fs = require("fs/promises");
const path = require("path")
const { nanoid } = require("nanoid");



const contactsPath = path.join(__dirname, "db/contacts.json")

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));


const getAllContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data)
}

const getContactById = async (contactId) => {
    const contacts = await getAllContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}


const addContact = async({name, email, phone}) => {
    const contacts = await getAllContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

const removeContact = async(contactId) => {
    const contacts = await getAllContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;

}

module.exports = {
    getAllContacts,
    getContactById,
    removeContact,
    addContact
}