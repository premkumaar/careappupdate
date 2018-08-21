import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Image
} from 'react-native';
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
        <View style={ styles.MainContainer }>
           <Text style = { styles.TextStyle }>Name: {this.state.Name}</Text>
           <Text style = { styles.TextStyle }>Participants: {this.state.Participants}</Text>
           <Text style = { styles.TextStyle }>NewComers: {this.state.NewComers}</Text>
           <Image source={{uri:this.state.Image}} 
           style={{height:400,width:400}}/>
        </View>
    )
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
 
  TextStyle:
  {
     fontSize: 23,
     textAlign: 'center',
     color: '#000',
  },
 
  rowViewContainer: 
  {
 
    fontSize: 17,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
 
  },
 
  ActivityIndicator_Style:
  {
 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    left: 0, 
    right: 0, 
    top: 0, 
    bottom: 0,
 
  }
 
});
