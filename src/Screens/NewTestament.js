/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
 
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert } from 'react-native';
var realm = require('realm');


export default class MyProject extends Component {
 
  constructor(props) {
 
    super(props);
    realm = new Realm({
      schema: [{name: 'Contacts_Info', 
      schemaVersion: 1,
      
      properties: 
      {
        person_id: {type: 'int',   default: 0},
        first_name: 'string', 
        last_name: 'string', 
         mobile_number : 'string',
         email_id: 'string',
         address: 'string',
         
         
      }}],
      // migration: (oldRealm, newRealm) => {
      //   // only apply this change if upgrading to schemaVersion 1
      //   if (oldRealm.schemaVersion < 1) {
      //     const oldObjects = oldRealm.objects('Contacts_Info');
      //     const newObjects = newRealm.objects('Contacts_Info');
          
      //       newObjects[i]. = oldObjects[i].firstName + ' ' + oldObjects[i].lastName;
      //     }
      //   }
      // }
    });
   
    //var mydata = this.getData();

    //console.log("data is"+ JSON.stringify(mydata))
   var mydata = realm.objects('Contacts_Info');
   let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 
    this.state = {
      open: false,
        first_name:'',
        last_name:'',
        mobile_number:'',
        email_id:'',
        address:'',
        
        isLoading: true,
        text: '',
      mydata:'',
       dataSource: ds.cloneWithRows(mydata),
         }
         this.arrayholder = mydata ;
         
  }
   
    GetListViewItem (first_name,last_name,mobile_number,email_id,address) {
    
   Alert.alert(first_name,last_name,mobile_number,email_id,address);
  
  }
  // componentDidMount() {
  //   console.log("hdhd", DbHelper.getData())
  // }
  // getData = async () => {
  //   return await DbHelper.getData();
  // }
  
   SearchFilterFunction(text){
     
    const newData = this.arrayholder.filter(function(item){
      const itemData = item.first_name.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
  })
  this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text
  })
}
 
  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
  // async componentDidMount(){
  //   var res = await DbHelper.getData()
  //   console.log("resuly from homescreen "+res)
  //   this.setState({mydata:res})

  // }
 
  render() {
    
      return (
 
      <View style={styles.MainContainer}>
 
      <TextInput 
       style={styles.TextInputStyleClass}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Search Here"
        />
 
        <ListView
 
          dataSource={this.state.dataSource}
 
          renderSeparator= {this.ListViewItemSeparator}
 
          renderRow={(rowData) => <Text style={styles.rowViewContainer} 
 
          onPress={this.GetListViewItem.bind(this, rowData.first_name)} >{rowData.first_name}</Text>}
      
          enableEmptySections={true}
 
          style={{marginTop: 10}}
 
        />
 
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
 
 MainContainer :{
 
  justifyContent: 'center',
  flex:1,
  margin: 7,
 
  },
 
 rowViewContainer: {
   fontSize: 17,
   padding: 10
  },
 
  TextInputStyleClass:{
        
   textAlign: 'center',
   height: 40,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF"
        
   }
 
});