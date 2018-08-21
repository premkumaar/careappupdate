/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet, FlatList, Text, View
} from 'react-native';
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
      <View style={styles.container} >
        <Text style={styles.h2text}>
          Bible Books
        </Text>
          <FlatList
          data={this.state.id_name_map}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>
          <View style={styles.flatview}>
            <Text style={styles.book_name}>{item.book_name}</Text>
         
         </View>
          }
        
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18
  },
  email: {
    color: 'red'
  }
  
});

