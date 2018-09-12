/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,

  TouchableOpacity,
  AsyncStorage,
  Image,Alert,
  TextInput
} from 'react-native';

import StyleSheet from './Style'
import ImagePicker from 'react-native-image-picker';


export default class Carecellscr extends Component{
  constructor(){
    super()
    this.state = {
      AreaName:'',
      Participants: '',
      NewComers:'',
      ImageSource: {uri:null},
      getValue : ''
       };
  }
 
  
 handleParticipants = (text) =>{
  this.setState({ Participants: text })
 }
 handleNewComers = (text) =>{
  this.setState({ NewComers: text })
 }

  confirmtext = (AreaName, Participants,NewComers,ImageSource) => {
  Alert.alert('AreaName: ' + AreaName + ' Participants: ' + 
  Participants+'NewComers: '+ NewComers)
  }
  realmquries(){
   




  }







  async componentDidMount(){
    try {
      const value = await AsyncStorage.getItem('AreaName');
      console.log("value of saync storage == " + value)
      if (value !== null){
        // We have data!!
        this.setState({AreaName:value})
      }
     
    } catch (error) {
      console.log("value null")
      // Error retrieving data
    }
  }

   setAreaName = (value) => {
     console.log("value setares "+value)
     try {
      AsyncStorage.setItem('AreaName', value);
     } catch(err) {
       console.log("error in saving value "+err)
     }
     this.setState({AreaName: value });
   }
  //this.props.navigation.navigate("Carecelldetails",{Name:AreaName,Participants:Participants,
  //NewComers:NewComers,Image:ImageSource})
//   this.props.navigation.state.params.AreaName.Participants.NewComers
 selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
   
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({

          ImageSource: source

        });
      }
    });
  }
  
  render() {
    console.log("area name "+this.state.AreaName)
    console.log("image source"+JSON.stringify(this.state.ImageSource.uri))
    return (
      <View style={StyleSheet. carecontainer}>

        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} 
        style={{justifyContent:'flex-end',alignItems:'flex-end'}}>

          <View style={StyleSheet.ImageContainer}>

          { this.state.ImageSource === null ? <Text>Select a Photo</Text> :
            <Image style={StyleSheet.ImageContainer} source={this.state.ImageSource} />
          }
      </View>
    </TouchableOpacity>
    <TextInput style = {StyleSheet.input}
               underlineColorAndroid = "transparent"
               placeholder = "AreaName"
               placeholderTextColor = "#9a73ef"
               onChangeText = {(value) => this.setAreaName(value)}
               autoCapitalize = "none" />
  <TextInput style = {StyleSheet.input}
               underlineColorAndroid = "transparent"
               placeholder = "No.Of Participants"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleParticipants}/>
  <TextInput style = {StyleSheet.input}
               underlineColorAndroid = "transparent"
               placeholder = "NewComers"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleNewComers}/>
        <TouchableOpacity
               style = {StyleSheet.submitButton}
               onPress = {() => this.confirmtext(this.state.AreaName,
                this.state.Participants,this.state.NewComers,
                this.state.ImageSource.uri)}>
               <Text style = {StyleSheet.submitButtonText}> Submit </Text>
            </TouchableOpacity>
     
            <TouchableOpacity
               style = {StyleSheet.submitButton}
               onPress = {() => this.realmquries()}>
               <Text style = {StyleSheet.submitButtonText}> realm</Text>
            </TouchableOpacity>
       </View>
    )
  }

}


