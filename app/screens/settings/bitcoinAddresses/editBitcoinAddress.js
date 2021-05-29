import React, { Component } from 'react'
import { View, Alert, StyleSheet } from 'react-native'
import EditBitcoinAddressComponent from './bitcoinAddressComponent'
import SettingsService from './../../../services/settingsService'
import ResetNavigation from './../../../util/resetNavigation'
import Header from './../../../components/header'

export default class AddBankAccount extends Component {
  static navigationOptions = {
    title: 'Edit bitcoin address',
  }

  constructor(props) {
    super(props)
    const params = this.props.navigation.state.params.reference
    this.state = {
      id: params.id,
      address: params.address,
    }
  }

  updateAddress = (address) => {
    this.setState({ address })
  }
  reload = () => {
    ResetNavigation.dispatchUnderDrawer(this.props.navigation, 'Settings', 'SettingsBitcoinAddresses')
  }

  update = async () => {
    let responseJson = await SettingsService.editBitcoinAddresses(this.state.id, this.state)
    if (responseJson.status === "success") {
      this.reload()
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Edit bitcoin address"
        />
        <EditBitcoinAddressComponent
          updateAddress={this.updateAddress}
          values={this.state}
          onPress={this.update}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
