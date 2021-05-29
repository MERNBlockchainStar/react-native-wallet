import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Option from './../../../components/settingsOption'
import Header from './../../../components/header'

export default class Notifications extends Component {

  goTo = (path) => {
    this.props.navigation.navigate(path)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Notifications"
        />
        <Option name="Email notifications" gotoAddress="EmailNotifications" goTo={this.goTo} />
        <Option name="Mobile notifications" gotoAddress="MobileNotifications" goTo={this.goTo} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
})
