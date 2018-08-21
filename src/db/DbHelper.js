
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


}

export default  new DbHelper();
