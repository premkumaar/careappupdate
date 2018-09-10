import React, { Component } from 'react';
import {
  
  
  Text,
  View,Image
} from 'react-native';
import StyleSheet from './Style'
import {Icon,button,Container,Header,Content,Left} from 'native-base'
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Carecellscr from './Carecell'

export default class Carecelldetails extends Component{
  static navigationOptions = {
    headerTitle:'Detailes..',
  }
  constructor(props){
      super(props)
      console.log("props value "+JSON.stringify(this.props))
      this.state={
        Name:this.props.navigation.state.params.Name,
        Participants:this.props.navigation.state.params.Participants,
        NewComers:this.props.navigation.state.params.NewComers,
        Image:this.props.navigation.state.params.Image
    }
  }
  
  render() {
    console.log("image path "+this.state.Image)
    return(
        <View style={ StyleSheet.MainContainer }>
           <Text style = { StyleSheet.TextStyle }>Name: {this.state.Name}</Text>
           <Text style = { StyleSheet.TextStyle }>Participants: {this.state.Participants}</Text>
           <Text style = { StyleSheet.TextStyle }>NewComers: {this.state.NewComers}</Text>
           <Image source={{uri:this.state.Image}} 
           style={{height:400,width:400}}/>
        </View>
    )
  }
}
 


 