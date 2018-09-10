
//import Realm from 'realm';
const Realm = require('realm');


export default class ContactsInfo extends Realm.Object{}

ContactsInfo.schema = {
  name: 'Contacts_Info', 
  properties: 
  {
    person_id: {type: 'int',   default: 0},
    first_name: 'string', 
    last_name: 'string', 
     mobile_number : 'string',
     email_id: 'string',
     address: 'string',
  }
}


