import React, { Component } from 'react';
import {   View,  
  TouchableOpacity,
  Alert,Text,
  YellowBox,
  TextInput ,
  Button} 
 from 'react-native';
 import { DatePickerDialog } from 'react-native-datepicker-dialog';
  import DbHelper from '../db/DbHelper'
 
import moment from 'moment';
import StyleSheet from './Style'


import { StackNavigator } from 'react-navigation';

export default class UserEnterScreen extends Component
{
 static navigationOptions =
 {
    title: 'UserEnterScreen',
 };
 GoTohomescr =()=> 
{
  this.props.navigation.state.params.updateData(this.state.First_Name,
    this.state.Last_Name,
    this.state.Mobile_Number,
    this.state.Email_Id,this.state.Address)
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


 add_Person= async()=> {
  await DbHelper.addData(this.state.First_Name,this.state.Last_Name,
  this.state.Mobile_Number,this.state.Email_Id,this.state.Address);
  
}

render() {
    
  return (
  
      <View style={StyleSheet.MainContainer}>
        
        <TextInput 
              placeholder="Enter first Name"
              style = { StyleSheet.TextInputStyle } 
              underlineColorAndroid = "transparent" 
              onChangeText = { ( text ) => { this.setState({ First_Name: text })} } 
            />

        <TextInput  
              placeholder="Enter Last Name"
              style = { StyleSheet.TextInputStyle } 
              underlineColorAndroid = "transparent" 
              onChangeText = { ( text ) => { this.setState({ Last_Name: text })} } 
            />

        <TextInput 
              placeholder="Enter Mobile Number"
              style = { StyleSheet.TextInputStyle } 
              underlineColorAndroid = "transparent" 
              onChangeText = { ( text ) => { this.setState({ Mobile_Number: text })} } 
            />
<TextInput 
              placeholder="Enter EmailId"
              style = { StyleSheet.TextInputStyle } 
              underlineColorAndroid = "transparent" 
              onChangeText = { ( text ) => { this.setState({ Email_Id: text })} } 
            />
            <TextInput 
              placeholder="Enter Address"
              style = { StyleSheet.TextInputStyle } 
              underlineColorAndroid = "transparent" 
              onChangeText = { ( text ) => { this.setState({ Address: text })} } 
            />

         <Text> please enter your data of birth</Text>

 <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >

   <View style={StyleSheet.datePickerBox}>

     <Text style={StyleSheet.datePickerText}>{this.state.DateText}</Text>

   </View>
   <Button
           onPress={this.onButtonPress}
           title="add Favorites"
           color={this.state.buttonColor}/>
 </TouchableOpacity>

<TouchableOpacity onPress={this.add_Person} activeOpacity={0.7} style={StyleSheet.button} >

          <Text style={StyleSheet.TextStyle}> SAVE DETAILS </Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={this.GoTohomescr} activeOpacity={0.7} style={StyleSheet.button} >

          <Text style={StyleSheet.TextStyle}> SHOW DETAILS </Text>

        </TouchableOpacity>
<DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
 </View>
  );
}
}



 

  
  
