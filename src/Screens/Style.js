'use strict';
import {StyleSheet,Platform, PixelRatio} from 'react-native';


export default StyleSheet.create (
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
        fontSize: 23,
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
    
     },datePickerBox:{
        marginTop: 9,
        borderColor: '#FF5722',
        borderWidth: 0.5,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 38,
        justifyContent:'center'
      },
     
      datePickerText: {
        fontSize: 14,
        marginLeft: 5,
        borderWidth: 0,
        color: '#000',
     
      },
      rowViewContainer: {
        fontSize: 17,
        padding: 10,
        paddingTop: 10,
    paddingBottom: 10,
       },
      
       TextInputStyleClass:{
             
        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 7 ,
        backgroundColor : "#FFFFFF"
             
        },
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
        },
        carecontainer: {
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
  