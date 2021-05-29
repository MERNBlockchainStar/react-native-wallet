import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Auth from './../../util/auth'
import Header from './../../components/header'

export default class Home extends Component {

  componentWillMount() {
    this.logout()
  }

  logout = async () => {
    Auth.logout(this.props.navigation)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          title="Log out"
        />
        <View style={styles.container}>
          <Text style={{ fontSize: 30 }}>Logging Out</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})
