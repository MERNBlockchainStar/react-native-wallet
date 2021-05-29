import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Option from './../../components/settingsOption'
import Header from './../../components/header'

export default class Settings extends Component {
  static navigationOptions = {
    title: 'Settings',
  }

  goTo = (path) => {
    this.props.navigation.navigate(path)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          drawer
          title="Settings"
        />
        <ScrollView>
          <Option name="Personal details" gotoAddress="SettingsPersonalDetails" goTo={this.goTo} />
          <Option name="Mobile numbers" gotoAddress="SettingsMobileNumbers" goTo={this.goTo} />
          <Option name="Email addresses" gotoAddress="SettingsEmailAddresses" goTo={this.goTo} />
          <Option name="Get verified" gotoAddress="SettingsGetVerified" goTo={this.goTo} />
          <Option name="Address" gotoAddress="SettingsAddress" goTo={this.goTo} />
          <Option name="Bank accounts" gotoAddress="SettingsBankAccounts" goTo={this.goTo} />
          {/* <Option name="Bitcoin addresses" gotoAddress="SettingsBitcoinAddresses" goTo={this.goTo} /> */}
          {/*<Option name="Cards" gotoAddress="null" goTo={this.goTo} />*/}
          <Option name="Security" gotoAddress="SettingsSecurity" goTo={this.goTo} />
          {/*<Option name="Notifications" gotoAddress="SettingsNotifications" goTo={this.goTo} />*/}
        </ScrollView>
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
