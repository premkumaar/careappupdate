/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
   FlatList, Text, View
} from 'react-native';
import StyleSheet from './Style'
import ajax from './books.json'
//import {Icon,button,Container,Header,Content,Left} from 'native-base'
//import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//const data = require('./books.json');



 export default class OldTestament extends Component {

  state = {
    id_name_map: []
  }

  async componentDidMount() {
    const id_name_map = await ajax.id_name_map;
    this.setState({id_name_map});
  }

  
  render() {
    return (
      <View style={StyleSheet.container} >
        <Text style={StyleSheet.h2text}>
          Bible Books
        </Text>
          <FlatList
          data={this.state.id_name_map}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style={StyleSheet.flatview}>
            <Text style={StyleSheet.book_name}>{item.book_name}</Text>
         
         </View>
          }
        
        />
      </View>
    );
  }
}



