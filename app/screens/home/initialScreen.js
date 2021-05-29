import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Colors from './../../config/colors';
import Exp from './../../../exp.json';
import { Button } from './../../components/common';

export default class InitialScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('./../../../assets/icons/new_logo.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            label="LOG IN"
            type="primary"
            reference={input => {
              this.login = input;
            }}
            onPress={() => this.props.navigation.navigate('Login')}
          />
          <Button
            label="REGISTER"
            type="secondary"
            reference={input => {
              this.login = input;
            }}
            onPress={() => this.props.navigation.navigate('Signup')}
          />

          {/* <TouchableHighlight
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, { marginLeft: 25 }]}
            onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableHighlight> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: 250,
    height: 150,
  },
  buttonsContainer: {
    // flexDirection: 'row',
    // paddingHorizontal: 25,
    justifyContent: 'center',
    // paddingVertical: 25,
  },
  button: {
    backgroundColor: Colors.lightblue,
    height: 50,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  textContainer: {
    backgroundColor: Colors.lightgray,
    paddingHorizontal: 25,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: Colors.lightblue,
  },
});
