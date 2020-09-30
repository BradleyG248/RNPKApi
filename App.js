import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableWithoutFeedback } from 'react-native';
import { Value } from 'react-native-reanimated';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      activePokemon: {},
      userInput: "",
      activeComponents: []
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event = {}) {
    this.setState({ userInput: event })
  }
  dropAccordion = () => {

  }
  requestPoke = async () => {
    try {
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.userInput}`);
      if (res.data) {
        this.setState({ activePokemon: res.data });
        let name = this.state.activePokemon.species.name;
        name[0].toUpperCase();
        console.log(name)
        let arr = [
          <Text>{name}</Text>,
          <Image style={styles.pokeImg} source={{ uri: this.state.activePokemon.sprites.front_default }} />,
          <TouchableWithoutFeedback onPress={this.dropAccordion} style={styles.accordion}>
            <Text>Abilities</Text>
          </TouchableWithoutFeedback>
        ]
        this.setState({ activeComponents: arr });
      }
    } catch (error) {
      console.error(error);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput autoCapitalize='none' style={styles.input} onChangeText={this.handleChange}></TextInput>
        <Button style={styles.searchBtn} title="Search DB" onPress={this.requestPoke}></Button>
        <View>
          {this.state.activeComponents}
        </View>
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
  },
  pokeImg: {
    width: 200,
    height: 200
  },
  searchBtn: {
    color: "orange",
    marginTop: 15
  },
  accordion: {
    backgroundColor: '#44bff0',
    height: 20,
    width: "80%"
  }
});
