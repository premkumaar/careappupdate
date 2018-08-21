/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,Platform,
  AsyncStorage,
  Image,Alert,
  TextInput
} from 'react-native';
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
  Alert.alert('AreaName: ' + AreaName + ' Participants: ' + Participants+'NewComers: '+ NewComers)
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
      <View style={styles.container}>

        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={{justifyContent:'flex-end',alignItems:'flex-end'}}>

          <View style={styles.ImageContainer}>

          { this.state.ImageSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.ImageContainer} source={this.state.ImageSource} />
          }
      </View>
    </TouchableOpacity>
    <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "AreaName"
               placeholderTextColor = "#9a73ef"
               onChangeText = {(value) => this.setAreaName(value)}
               autoCapitalize = "none" />
  <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "No.Of Participants"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleParticipants}/>
  <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "NewComers"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleNewComers}/>
        <TouchableOpacity
               style = {styles.submitButton}
               onPress = {() => this.confirmtext(this.state.AreaName, this.state.Participants,this.state.NewComers,this.state.ImageSource.uri)}>
               <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
      <Image source={require('../images/thankyou.jpeg') } style={{height:150,width:500}}/>
      <Text>
               {this.state.AreaName}
            </Text>
       </View>
    )
  }

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    margin: 5,
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
  },

  ImageContainer: {
    borderRadius: 150/2,
    width: 150,
    height: 150,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',
    
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
 },
 submitButtonText:{
    color: 'white'
 }
});
