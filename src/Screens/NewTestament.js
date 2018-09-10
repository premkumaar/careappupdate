/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import StyleSheet from './Style'
import { 
  Text, 
   
  View,
  ListView, 
  TextInput, 
  FlatList,
  Alert 
} from 'react-native';
var realm = require('realm');

import DbHelper from '../db/DbHelper'
export default class MyProject extends Component {
 
  constructor(props) {
 
    super(props);
    
    
  //  var mydata = async() => await DbHelper.renderData();
  //  console.log("new testment "+mydata.length)

      this.state = {
        open: false,
        data:'',
        isLoading: true,
        text: '',
      
         }
         this.arrayholder = '';
         
  }
   
    GetListViewItem (first_name,last_name) {
    
   Alert.alert(first_name,last_name);
  
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
      data:newData,
      text: text
  })
}
async componentDidMount(){
  var res =  await DbHelper.renderData();
   this.setState({data: res});
   this.arrayholder= this.state.data
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
 
      <View style={StyleSheet.MainContainer}>
 
      <TextInput 
       style={StyleSheet.TextInputStyleClass}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       underlineColorAndroid='transparent'
       placeholder="Search Here"
        />
 
       <FlatList
 
           data={this.state.data}
 
           renderItem={({item}) => <Text style={StyleSheet.rowViewContainer} 
 
          onPress={this.GetListViewItem.bind(this, item.first_name , 
            item.last_name,item.mobile_number,item.email_id,item.address)} >{item.first_name},{item.last_name},
            {item.mobile_number},{item.email_id},{item.address}</Text>}
      
          enableEmptySections={true}
 
          style={{marginTop: 10}}
 
        />
 
      </View>
    );
  }
}
 
