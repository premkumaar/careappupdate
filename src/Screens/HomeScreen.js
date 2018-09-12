/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Image,
  View, FlatList, TouchableOpacity,
  Alert,Text,YellowBox ,Linking} 
 from 'react-native';
 import Modal from "react-native-simple-modal";
import DbHelper from '../db/DbHelper'
import  UserEnterScreen from './UserEnter';
import EditScreen from'./EditScreen';
import StyleSheet from './Style'

import { StackNavigator } from 'react-navigation';





class homescr extends Component {

 static navigationOptions =
  {
     title: 'ShowData',
  };
 // Binding function with this class.
 
  constructor(props) {
 
    super(props);
    
   
    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
     'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
    ]);
   
    this.state = {
      open: false,
      
      data:[],
      };
  }
  
   updateData=async(id,fname,lname,mobile,email,address)=>{
    
      await DbHelper.Update_Person(id,fname,lname,mobile,email,address)
      this.query()
   
   } 
   

  handleEmail = () => {
    Linking.openURL("mailto://support@expo.io").catch(err => console.error('An error occurred', err));


  }
  handlsms = () => {
    Linking.openURL("sms:8977175815?body=yourMessage?").catch(err => console.error('An error occurred', err));


  }
  handlcal = () => {
    Linking.openURL('https://www.google.com/calendar').catch(err => console.error('An error occurred', err));


  }
  handlephone = () =>{
    const url = 'telprompt:5551231234';
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url)
            .catch(() => null);
        }
      });
  }
  handlemap = () => {
    Linking.openURL('https://www.google.com/maps/search/?api=1&query='+this.state.address).catch(err => console.error('An error occurred', err));


  }
  GetClickedItem (first_name,mobile_number,email_id,address) {
    this.setState({open:true,first_name,mobile_number,email_id,address})
    // Alert.alert(first_name);
     
    }
   
  GoToEditScreen(person_id,first_name,last_name,mobile_number,email_id,address){
  this.props.navigation.navigate('Third', { 
      ID:person_id,
      FNAME : first_name,
      LNAME : last_name,
      Mobile : mobile_number,
      Email : email_id,
      Address: address,
     updateData: this.updateData,
  })
  }
  
  async query(){
    var res =  await DbHelper.renderData();
    this.setState({data: res});
    
  }
  componentDidMount(){
    this.query()
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
    )
  }
render(){
  console.log("render data"+JSON.stringify(this.state.data))
return(
  <View style = {StyleSheet.MainContainer}>
    <TouchableOpacity 
      activeOpacity = { .5 } 
      onPress={()=>this.props.navigation.navigate('Second',{updateData:this.updateData}) }>
      <Image 
        source={require('../images/person.png')} 
        style = {StyleSheet.ImageClass}
      />
    </TouchableOpacity>
    <FlatList
        data={this.state.data}
        extraData={this.state.data}
        renderItem={({item}) =>
       <View style={{flex:1, flexDirection: 'column'}} >
            <TouchableOpacity
              onPress={()=>{this.GoToEditScreen(
              item.person_id,
              item.first_name,
              item.last_name, item.mobile_number,
              item.email_id,item.address
            )}}>
              <View 
                style={StyleSheet.Editbutton}>
                <Text style={StyleSheet.buttonText}>Edit</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={this.GetClickedItem.bind(this, 
                item.first_name,item.mobile_number,
                item.email_id,item.address)} >
              <Text 
                style={StyleSheet.textViewContainer}>
                {'id = ' + item.person_id}
              </Text>
              <Text 
                style={StyleSheet.textViewContainer}>
                  {'FirstName = ' + item.first_name}
              </Text>
              <Text 
                style={StyleSheet.textViewContainer} >
                {'LastName = ' + item.last_name}
              </Text>
              <Text 
                style={StyleSheet.textViewContainer} >
                {'mobilenumber = ' + item.mobile_number}
              </Text>
              <Text 
                style={StyleSheet.textViewContainer} >
                {'EmailId = ' + item.email_id}
              </Text>
              <Text 
                style={StyleSheet.textViewContainer} >
                {'address = ' + item.address}
              </Text>
              <Text 
                style={StyleSheet.textViewContainer} >
                {'birthday = ' +item.birthday}
              </Text>
            </TouchableOpacity>
          </View> }
    />
     <Modal
        open={this.state.open}
        modalDidOpen={() => console.log('modal did open')}
        modalDidClose={() => this.setState({open: false})}
        closeOnTouchOutside={true}
        animationType = {"slide"}
        modalStyle={{
          borderRadius: 2,
          margin: 20,
          padding: 10,
          backgroundColor: "#c398f8"
        }} >
          <Text style={{color: 'red',fontSize: 20}}>{this.state.first_name}</Text>
          <Text style={{color: 'red',fontSize: 20}}>{this.state.mobile_number}</Text>
          <Text style={{color: 'red',fontSize: 20}}>{this.state.email_id}</Text>
          <Text style={{color: 'red',fontSize: 20}}>{this.state.address}</Text>
           <TouchableOpacity 
             activeOpacity = { .5 } onPress={this.handleEmail}>
               <Image source={require('../images/email.png')} 
               style = {StyleSheet.ImageClass}/>
              </TouchableOpacity>
              <TouchableOpacity 
             activeOpacity = { .5 } onPress={this.handlephone}>
               <Image source={require('../images/whatsapp.png')} 
               style = {StyleSheet.ImageClass}/>
              </TouchableOpacity>
              <TouchableOpacity 
             activeOpacity = { .5 } onPress={this.handlemap}>
               <Image source={require('../images/map.png')} 
               style = {StyleSheet.ImageClass}/>
              </TouchableOpacity>
              <TouchableOpacity 
             activeOpacity = { .5 } onPress={this.handlsms}>
               <Image source={require('../images/sms.png')} 
               style = {StyleSheet.ImageClass}/>
              </TouchableOpacity>
              <TouchableOpacity 
             activeOpacity = { .5 } onPress={this.handlcal}>
               <Image source={require('../images/caln.png')} 
               style = {StyleSheet.ImageClass}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ open: false })}>
                <Text 
                style={{
                  color: '#0762f3',justifyContent:'center',
                  alignItems:'center',fontSize: 40
                }}>ok</Text>
              </TouchableOpacity>
        </Modal>
    </View>
)}
  
}


 export default Project = StackNavigator(
  {
   First: { screen: homescr },
   Second: { screen:UserEnterScreen },
   Third : { screen: EditScreen}
  });
   



 

 
 