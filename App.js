import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { Value } from 'react-native-reanimated';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activePokemon: {},
      userInput: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event = {}) {
    this.setState({ userInput: event })
  }
  requestPoke = async () => {
    try {
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.userInput}`);
      this.setState({ activePokemon: res.data });
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.userInput}</Text>
        <TextInput style={styles.input} onChangeText={this.handleChange}>text</TextInput>
        <Button title="Search DB" onPress={this.requestPoke}></Button>
        <Image source={{ uri: this.state.activePokemon.sprite.front_default }} />
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
  input: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 2,
    width: "70%",
    paddingHorizontal: 5
  }
});
