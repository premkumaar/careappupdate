
'use strict';
import Realm from 'realm';
import {Alert} 
 from 'react-native';
import ContactsInfo from './ContactsInfo';
var RNFS = require('react-native-fs');

class DbHelper {


 async getRealm() {
 
    	try {
    		return  await Realm.open({schema: [ContactsInfo], schemaVersion: 2})
    	} catch (err) {
        console.log("error "+err)
    		return null;
    	}
    }
    async renderData(){
      const realm = await this.getRealm()
      
     if(realm==null){
        
      }
      else{
        return realm.objects("Contacts_Info")
        console.log("value is there")
      }
    }
      async addData(fname,Lname,mobile,email,address) {
      const realm = await this.getRealm()
      
        console.log("opennnnn"+realm.length);
        var ID =   realm.objects('Contacts_Info').length + 1;
        
        if(realm){
            
            realm.write(()=>{
                
                    realm.create('Contacts_Info', {
                    person_id: ID, 
                    first_name:fname,
                    last_name:Lname,
                    mobile_number:mobile,
                    email_id:email,
                    address:address
                    });
            })
        Alert.alert("Student Details Added Successfully.")
        }


    }
    // async getData() {
    //     let realm = await this.getRealm()
    //     return realm.objects('Contacts_Info')

    // }
   
    async Update_Person(id,fname,lname,mobileNum,emailId,address){
       
      console.log("updatevalues.. ID"+ id); 
      console.log("updatevalues.."+ fname); 

      let realm = await this.getRealm()
        var obj = realm.objects('Contacts_Info');
        console.log("uppppp",obj);
        var ID = 0;
      realm.write(() => {
        
        for (let i = 0; i < obj.length; i++) {
                  if(obj[i].person_id === id)
                    {
                      ID = i
                    }
                  }
                  console.log("id in for loop "+ID)
           obj[ID].first_name = fname;
           obj[ID].last_name =  lname;
           obj[ID].mobile_number = mobileNum;
           obj[ID].email_id = emailId;
           obj[ID].address = address;
     
          });
          Alert.alert("Student Details Updated Successfully.")
        }
         async Delete_Person(id){
            let realm = await this.getRealm()
          
            realm.write(() => {
              console.log("opennnnnnnnnnnn")
               var ID = id - 1;
               console.log("ID",ID);
              realm.delete(realm.objects('Contacts_Info')[ID]);
            });
              Alert.alert("Record Deleted Successfully.")
            }

}

export default  new DbHelper();
