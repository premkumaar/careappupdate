/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Image, StyleSheet, View, ListView, TouchableOpacity,Alert,Text,YellowBox ,Linking} 
 from 'react-native';
 import Modal from "react-native-simple-modal";
var Realm = require('realm');

import UserEnterActivity from './UserEnter';
import EditActivity from'./EditActivity';

 
let realm ;

import { StackNavigator } from 'react-navigation';



class homescr extends Component {

 static navigationOptions =
  {
     title: 'ShowDataActivity',
  };
 // Binding function with this class.
 
  constructor(props) {
 
    super(props);
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
    var mydata = realm.objects('Contacts_Info');
 
   let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 
    this.state = {
      open: false,
        first_name:'',
        last_name:'',
        mobile_number:'',
        email_id:'',
        address:'',
        data:mydata,
        dataSource: ds.cloneWithRows(mydata)
      };
      
  }
  
  updateData=(first,last,mobile,emaill,addr)=>
  {
    this.setState({first_name:first,last_name:last,mobile_number:mobile,email_id:emaill,address:addr})
    // update or add object in Realm
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.state.data)
    });
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
   
  GoToEditActivity( person_id,first_name,last_name,mobile_number,email_id,address){
  this.props.navigation.navigate('Third', { 
 
      ID : person_id,
      FNAME : first_name,
      LNAME : last_name,
      Mobile : mobile_number,
      Email : email_id,
      Address: address,
     updateData: this.updateData,
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
    )
  }
  
  // async componentDidMount(){
  //   var res = await DbHelper.getData()
  //   console.log("resuly from homescreen "+res)
  //   this.setState({data:res})

  // }


render() 
{
  
  return(
  <View style = {styles.MainContainer}>
      
 <TouchableOpacity 
 activeOpacity = { .5 } onPress={ ()=>this.props.navigation.navigate('Second',{updateData:this.updateData}) }>
  <Image source={require('../images/person.png')} style = {styles.ImageClass}/>
 </TouchableOpacity>
         
<ListView

          dataSource={this.state.dataSource}
          renderSeparator= {this.ListViewItemSeparator}
          renderRow={(rowData) => 
          <View style={{flex:1, flexDirection: 'column'}} >

   <TouchableOpacity
             onPress={this.GoToEditActivity.bind(this, rowData.person_id, rowData.first_name,
             rowData.last_name, rowData.mobile_number,rowData.email_id,rowData.address)}>
          <View 
          style={styles.Editbutton}>
            <Text style={styles.buttonText}>Edit</Text>
          </View>
        </TouchableOpacity>
       

       <TouchableOpacity onPress={this.GetClickedItem.bind(this, rowData.first_name,rowData.mobile_number,rowData.email_id,rowData.address,rowData.birth)}>
                    
         <Text style={styles.textViewContainer} >{'id = ' + rowData.person_id}</Text>
              
        <Text style={styles.textViewContainer} >{'FirstName = ' + rowData.first_name}</Text>
              
       <Text style={styles.textViewContainer} >{'LastName = ' + rowData.last_name}</Text>
              
      <Text style={styles.textViewContainer} >{'mobilenumber = ' + rowData.mobile_number}</Text>

      <Text style={styles.textViewContainer} >{'EmailId = ' + rowData.email_id}</Text>

       <Text style={styles.textViewContainer} >{'address = ' + rowData.address}</Text>
     
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
               <Image source={require('../images/email.png')} style = {styles.ImageClass}/>
              </TouchableOpacity>
              <TouchableOpacity 
             activeOpacity = { .5 } onPress={this.handlephone}>
               <Image source={require('../images/whatsapp.png')} style = {styles.ImageClass}/>
              </TouchableOpacity>
              <TouchableOpacity 
             activeOpacity = { .5 } onPress={this.handlemap}>
               <Image source={require('../images/map.png')} style = {styles.ImageClass}/>
              </TouchableOpacity>
              <TouchableOpacity 
             activeOpacity = { .5 } onPress={this.handlsms}>
               <Image source={require('../images/sms.png')} style = {styles.ImageClass}/>
              </TouchableOpacity>
              <TouchableOpacity 
             activeOpacity = { .5 } onPress={this.handlcal}>
               <Image source={require('../images/caln.png')} style = {styles.ImageClass}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ open: false })}>
                <Text style={{color: '#0762f3',justifyContent:'center',alignItems:'center',fontSize: 40}}>ok</Text>
              </TouchableOpacity>
        </Modal>
    </View>
  )
}
}


 export default Project = StackNavigator(
  {
   First: { screen: homescr },
   Second: { screen: UserEnterActivity },
   Third : { screen: EditActivity}
  });
   
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
   
 
    textViewContainer: {
 
      textAlignVertical:'center', 
      padding:10,
      fontSize: 20,
      color: '#000',
      
     },
   ImageClass:
   {
     justifyContent: 'flex-end',
  
 // Set content's horizontal alignment.
 alignSelf: 'flex-end',
     
     // Setting up image width.
     width: 50,
  
     // Setting up image height.
     height: 50
  
   }
  });




 

 
 