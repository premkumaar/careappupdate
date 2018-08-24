
'use strict';
import Realm from 'realm'
import Contacts_Info from './Contacts_Info';
var RNFS = require('react-native-fs');

class DbHelper {

    async getRealm() {
    	try {
    		return await Realm.open({
                path:RNFS.DocumentDirectoryPath + '/care.realm',
				schema: [Contacts_Info] })
    	} catch (err) {
    		return null;
    	}
    }
    
    async addData(first_name,last_name,mobile_number,email_id,address){
        console.log("first name"+first_name)
        let realm =await this.getRealm()
        var ID = realm.objects('Contacts_Info').length + 1;
        if(realm){
            console.log("realm is there")
            realm.write(()=>{
                console.log("write query")
                    realm.create('Contacts_Info', {
                    person_id: ID, 
                    first_name:first_name,
                    last_name:last_name,
                    mobile_number:mobile_number,
                    email_id:email_id,
                    address:address
                    });
            })
        }

    }
    async getData() {
        let realm = await this.getRealm()
        console.log("geting data"+JSON.stringify(realm.objects('Contacts_Info')));
        return realm.objects('Contacts_Info')

    }
   
    async Update_Person(){
        let realm =await this.getRealm()
        var obj = realm.objects('Contacts_Info');
        var ID = 0;
      realm.write(() => {
       
      
        for (let i = 0; i < obj.length; i++) {
        
                  if(obj[i].person_id === this.state.Person_Id)
                    {
              
                      ID = i
                    }
                  }
        
           obj[ID].first_name = this.state.First_Name;
           obj[ID].last_name = this.state.Last_Name;
           obj[ID].mobile_number = this.state.Mobile_Number;
           obj[ID].email_id = this.state.Email_Id;
           obj[ID].address = this.state.Address.toString();
     
          });
        }
        async  Delete_Person(){
            let realm =await this.getRealm()
            realm.write(() => {
              
              var ID = this.state.Person_Id - 1;
         
             realm.delete(realm.objects('Contacts_Info')[ID]);
         
              });
            }

}

export default  new DbHelper();
