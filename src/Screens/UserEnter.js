import React, { Component } from 'react';
import {  StyleSheet, View,  TouchableOpacity,Alert,Text,YellowBox,TextInput ,Button} 
 from 'react-native';
 import { DatePickerDialog } from 'react-native-datepicker-dialog';
 

import moment from 'moment';
 
var Realm = require('realm');
 
let realm ;

import { StackNavigator } from 'react-navigation';

export default class UserEnterActivity extends Component
{
 static navigationOptions =
 {
    title: 'UserEnterActivity',
 };
 GoTohomescr = () =>
{
  this.props.navigation.state.params.updateData(this.state.first_name,this.state.last_name,this.state.mobile_number,this.state.email_id,this.state.address)
   this.props.navigation.navigate('First');
   
   }
constructor(props){

  super(props);

  this.state = {

    First_Name : '',

    Last_Name : '',

    Mobile_Number : '',

    Email_Id:'',

    Address:'',

    DateText: '',
 
 DateHolder: null,
 buttonColor: 'red'

}

realm = new Realm({
    schema: [{name: 'Contacts_Info', 
    properties: 
    {
      person_id: {type: 'int',   default: 0},
      first_name: 'string', 
      last_name: 'string', 
       mobile_number : 'string',
       email_id: 'string',
       address: 'string',
       
    }}]
  });

  YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
   ]);

}
onButtonPress = () => { //Make a property of ExampleButton class
  this.setState({buttonColor: '#42f4d1'});
} 


DatePickerMainFunctionCall = () => {
 
  let DateHolder = this.state.DateHolder;

  if(!DateHolder || DateHolder == null){

    DateHolder = new Date();
    this.setState({
      DateHolder: DateHolder
    });
  }

  //To open the dialog
  this.refs.DatePickerDialog.open({

    date: DateHolder,

  });

}

/**
 * Call back for dob date picked event
 *
 */
onDatePickedFunction = (date) => {
  this.setState({
    dobDate: date,
    DateText: moment(date).format('DD-MMM-YYYY')
  });
}

 add_Person=()=> {

 // await   DbHelper.addData(first_name,last_name,mobile_number,email_id,address)
  realm.write(() => {

    var ID = realm.objects('Contacts_Info').length + 1;
     realm.create('Contacts_Info', {
      person_id: ID, 
       first_name: this.state.First_Name, 
       last_name: this.state.Last_Name, 
       mobile_number : this.state.Mobile_Number,
       email_id: this.state.Email_Id,
       address : this.state.Address,
      
      });
      
 });

  Alert.alert("Student Details Added Successfully.")

}

render() {
    
  return (
  
      <View style={styles.MainContainer}>
        
        <TextInput 
              placeholder="Enter first Name"
              style = { styles.TextInputStyle } 
              underlineColorAndroid = "transparent" 
              onChangeText = { ( text ) => { this.setState({ First_Name: text })} } 
            />

        <TextInput  
              placeholder="Enter Last Name"
              style = { styles.TextInputStyle } 
              underlineColorAndroid = "transparent" 
              onChangeText = { ( text ) => { this.setState({ Last_Name: text })} } 
            />

        <TextInput 
              placeholder="Enter Mobile Number"
              style = { styles.TextInputStyle } 
              underlineColorAndroid = "transparent" 
              onChangeText = { ( text ) => { this.setState({ Mobile_Number: text })} } 
            />
<TextInput 
              placeholder="Enter EmailId"
              style = { styles.TextInputStyle } 
              underlineColorAndroid = "transparent" 
              onChangeText = { ( text ) => { this.setState({ Email_Id: text })} } 
            />
            <TextInput 
              placeholder="Enter Address"
              style = { styles.TextInputStyle } 
              underlineColorAndroid = "transparent" 
              onChangeText = { ( text ) => { this.setState({ Address: text })} } 
            />

         <Text> please enter your data of birth</Text>

 <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >

   <View style={styles.datePickerBox}>

     <Text style={styles.datePickerText}>{this.state.DateText}</Text>

   </View>
   <Button
           onPress={this.onButtonPress}
           title="add Favorites"
           color={this.state.buttonColor}/>
 </TouchableOpacity>

<TouchableOpacity onPress={this.add_Person} activeOpacity={0.7} style={styles.button} >

          <Text style={styles.TextStyle}> SAVE DETAILS </Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={this.GoTohomescr} activeOpacity={0.7} style={styles.button} >

          <Text style={styles.TextStyle}> SHOW DETAILS </Text>

        </TouchableOpacity>
<DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
 </View>
  );
}
}

 

 
const styles = StyleSheet.create(
{
 MainContainer:
 {
    justifyContent: 'center',
    flex:1,
    margin: 10
  
 },
 TextInputStyle:
  {
    borderWidth: 1,
    borderColor: '#009688',
    width: '100%',
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
  },

button: {
  
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius:7,
    marginTop: 12
  },
  Editbutton:{
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  TextStyle:{
    color:'#fff',
    textAlign:'center',
  },
  datePickerBox:{
    marginTop: 9,
    borderColor: '#FF5722',
    borderWidth: 0.5,
    padding: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 38,
    justifyContent:'center'
  },
 
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#000',
 
  },
})