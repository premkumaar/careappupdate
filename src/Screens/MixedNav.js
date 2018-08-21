import {TabNavigator,DrawerNavigator,StackNavigator, DrawerActions} from 'react-navigation';
import Homescr from './Homescr';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHightLight
  } from 'react-native';
  import React from 'react';
import NewTestament from './NewTestament';
import OldTestament from './OldTestament';
import Carecellscr from './Carecell';
import Carecelldetails from './Carecelldetails'

const Tabnav = TabNavigator({
    NT:{
        screen:NewTestament,
        
    },
    OT:{
        screen:OldTestament,
        
    },
    
},
)

const Drawer = DrawerNavigator({
    Bible:{
        screen:Tabnav,
        
    },
    Home:{
        screen:Homescr
    },
    
    Carecell:{
        screen:Carecellscr
    }

});

export  const Main = StackNavigator({
    Drawer:{
        screen:Drawer,
        headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: 'green'},
    title: 'Care cell APP....',
    gesturesEnabled: false,
    headerLeft: <Text onPress={() => {
      //console.log("hello header")
      navigation.dispatch(DrawerActions.toggleDrawer())
    }}>Menu</Text>
  })

 },
 Carecelldetails:{
     screen:Carecelldetails
 }
})
