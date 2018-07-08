'use strict'

import { StyleSheet } from 'react-native';

exports.loginStyles = StyleSheet.create({
    view_container : {
        marginTop : 80,
        width : 300,
        justifyContent : 'center',
        marginLeft: 40,
        marginRight: 10,
        flex : 1
    },
    label : {
        fontFamily : 'sans-serif',
        color : 'black',
        fontWeight : 'bold'
    },
    textInput: {
        marginBottom : 10,  
        borderRadius : 3,
        // width : 5,
        flex : 1,
        marginLeft : 5,
        borderRadius : 3,
        textAlign : "center"
    },
    button : {
        marginTop: 7,
        backgroundColor: 'lightgreen',
        color : 'white',
        borderRaidus : 2
    }
});