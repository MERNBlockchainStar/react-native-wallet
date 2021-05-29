import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Option from './../../components/settingsOption';
import Header from './../../components/header';

export default class Withdraw extends Component {
  static navigationOptions = {
    title: 'Withdraw',
  };

  goTo = path => {
    this.props.navigation.navigate(path);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} drawer title="Withdraw" />
        <Option
          name="Bank accounts"
          gotoAddress="BankAccounts"
          goTo={this.goTo}
        />
        {/* <Option name="Bitcoin addresses" gotoAddress="BitcoinAddresses" goTo={this.goTo}/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});
