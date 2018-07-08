'use strict'

import React, {Component} from 'react';
import { View, Text, TextInput, Button } from 'react-native';

// Style
import { loginStyles } from './login.style';

// Components.
import { DashboardComponent } from './../dashboard/dashboard.component';

export class LoginComponent extends Component {
    constructor() {
        super();
        this.state = { email : "Enter your email e.g: shahzaib@gmail.com",
                       password: "Enter your password" }
    }

    render() {
        return(
            <View style={loginStyles.view_container}>
                <TextInput style={loginStyles.textInput} placeholder="Enter your email e.g: shahzaib@gmail.com" style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                           onChangeText={(email) => this.setState({email})}
                           value={this.state.text}/>
                <Text></Text>           
                <TextInput style={loginStyles.textInput} placeholder="Enter your password" style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                           onChangeText={(password) => this.setState({password})}
                           value={this.state.text}/>
                <Button style={loginStyles.button} onPress={()=>{console.log('Button pressed!')}} title="Sign In" color="#841584" 
                        accessibilityLabel="Do you want to log In?" />           
            </View>
        );
    }
}