import React, { Component } from 'react';
import {   View,  TouchableOpacity,Alert,Text,YellowBox,TextInput } 
 from 'react-native';
 import StyleSheet from './Style'
 import DbHelper from '../db/DbHelper'
//var Realm = require('realm');
 
//let realm ;


export default class EditScreen extends Component{
 
    static navigationOptions =
    {
       title: 'EditScreen',
    };
   
    constructor(props){
   
      super(props);
      
      this.state = {
        Person_Id:'',
        First_Name : '',
        
        Last_Name : '',
  
        Mobile_Number:'',
  
        Email_Id:'',
  
        Address:''
   
    }
   
    }
   
    componentDidMount(){
      // Received Student Details Sent From Previous Activity and Set Into State.
      console.log("ID DIDMOUNT"+this.props.navigation.state.params.ID)
      this.setState({ 
        Person_Id:this.props.navigation.state.params.ID,
        First_Name: this.props.navigation.state.params.FNAME,
        Last_Name: this.props.navigation.state.params.LNAME,
        Mobile_Number: this.props.navigation.state.params.Mobile,
        Email_Id: this.props.navigation.state.params.Email,
        Address: this.props.navigation.state.params.Address
  
      })
   
     }

     updatePerson =()=>{
      // await DbHelper.Update_Person(this.state.Person_Id,this.state.First_Name,this.state.Last_Name,
      // this.state.Mobile_Number,this.state.Email_Id,this.state.Address)
      this.props.navigation.state.params.updateData(
        this.state.Person_Id,
        this.state.First_Name,
        this.state.Last_Name,
        this.state.Mobile_Number,
        this.state.Email_Id,
        this.state.Address)
      this.props.navigation.navigate('First');
    }
// Delete_Person(){
  
//   DbHelper.Delete_Person()
// }

    Delete_Person= async()=>{
      console.log("deeeee")
      await DbHelper.Delete_Person(this.state.Person_Id)
      this.props.navigation.state.params.updateData(
        null,null,null,null,null)
      this.props.navigation.navigate('First');
   }
   
    render() {
      
   
      return (
      
          <View style={StyleSheet.MainContainer}>
            
            <TextInput 
                  
                  style = { StyleSheet.TextInputStyle } 
                  underlineColorAndroid = "transparent" 
                  onChangeText = { ( text ) => { this.setState({ First_Name: text })} } 
                  value={this.state.First_Name}
                />
                  <TextInput 
                  
                  style = { StyleSheet.TextInputStyle } 
                  underlineColorAndroid = "transparent" 
                  onChangeText = { ( text ) => { this.setState({ Last_Name: text })} } 
                  value={this.state.Last_Name}
                />
     <TextInput 
                  value={this.state.Mobile_Number}
                  style = { StyleSheet.TextInputStyle } 
                  underlineColorAndroid = "transparent" 
                  onChangeText = { ( text ) => { this.setState({ Mobile_Number: text })} } 
                />
   
   
            <TextInput  
                  style = { StyleSheet.TextInputStyle } 
                  underlineColorAndroid = "transparent" 
                  onChangeText = { ( text ) => { this.setState({ Email_Id: text })} } 
                  value={this.state.Email_Id}

                />
   
            <TextInput 
                 
                  style = { StyleSheet.TextInputStyle } 
                  underlineColorAndroid = "transparent" 
                  onChangeText = { ( text ) => { this.setState({ Address: text })} } 
                  value={this.state.Address}
                />
   
   
            <TouchableOpacity onPress={this.updatePerson} activeOpacity={0.7} style={StyleSheet.button} >
   
              <Text style={StyleSheet.TextStyle}> UPDATE DETAILS </Text>
   
            </TouchableOpacity>
   
            <TouchableOpacity  activeOpacity={0.7} style={StyleSheet.button} onPress={this.Delete_Person} >
   
              <Text style={StyleSheet.TextStyle}>  DELETE CURRENT RECORD </Text>
   
            </TouchableOpacity>
               
          </View>
                
      );
    }
  }
   
    
   
   
     
      
     