const contactsBook = require("./contacts");

const {program} = require("commander");

const Table = require("cli-table");

const invokeAction = async({action, id, name, email, phone}) => {
    switch(action) {
        case 'list':
            const listContacts = await contactsBook.getAllContacts();
            const table = new Table({
                head: ["index", "ID", "Name", "Email", "Phone"]
              });
        
              listContacts.forEach((contact, index) => {
                table.push([index, contact.id, contact.name, contact.email, contact.phone]);
              });
        
              console.log(table.toString());
              break;
        
        case 'get':
            const contactId = await contactsBook.getContactById(id);
            console.log(contactId);
            break;
        
        case 'add':
            const newContact = await contactsBook.addContact({ name, email, phone });
            console.log(newContact);
            break;

        case 'remove':
            const removeContact = await contactsBook.removeContact(id);
            console.log(removeContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
            break;
    }
}

program
  .option("--action <type>")
  .option("--id <type>")
  .option("--name <type>",)
  .option("--email <type>")
  .option("--phone <type>");

program.parse();

const argv = program.opts();

invokeAction(argv);