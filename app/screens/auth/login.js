import React, { Component } from 'react';
import { View } from 'react-native';

import Header from './../../components/header';
import LoginForm from './../../components/wallet/LoginForm';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header navigation={this.props.navigation} back title="Log in" />
        <LoginForm navigation={this.props.navigation} />
      </View>
    );
  }
}
