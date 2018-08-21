
import Realm from 'realm'


export default class Contacts_Info extends Realm.Object{}

Contacts_Info.schema={
  name: 'Contacts_Info', 
    properties: 
    {
      person_id: {type: 'int',   default: 0},
      first_name: 'string', 
      last_name: 'string', 
       mobile_number : 'string',
       email_id: 'string',
       address: 'string',
    }}
