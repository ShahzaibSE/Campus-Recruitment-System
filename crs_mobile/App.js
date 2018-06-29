import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Component.
import { LoginComponent } from './src/login/login.component';

// Shared.
import { Header } from './src/shared/header';

export default class App extends React.Component {
  render() {
    return (
      <LoginComponent/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
