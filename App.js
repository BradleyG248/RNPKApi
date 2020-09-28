import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Value } from 'react-native-reanimated';

let userInput = "";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activePokemon: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event = {}) {
    userInput = event.target.text;
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{userInput}</Text>
        <TextInput onChangeText={this.handleChange}>text</TextInput>
      </View>
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
