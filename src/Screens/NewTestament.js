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
export default class NewTestament extends Component {
 
  constructor(props) {
 
    super(props);
      this.state = {
        open: false,
        data:'',
        isLoading: true,
        text: '',
      
      
         }
          
         
  }
   
    GetListViewItem (first_name,last_name) {
    
   Alert.alert(first_name,last_name);
  
  }
 
async componentDidMount(){
  var res =  await DbHelper.renderData()

   this.setState({data: res});
   
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
  
  async onSearch(text){
    
    
    var searchText = await DbHelper.SearchFilterFunction(text)
    console.log("searched "+JSON.stringify(searchText))
    this.setState({data:searchText})

  }
  
  render() {
    
      return (
 
      <View style={StyleSheet.MainContainer}>
 
      <TextInput 
       style={StyleSheet.TextInputStyleClass}
       
       autoCorrect={false}
       onChangeText={(text)=> this.onSearch(text)}
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
 
