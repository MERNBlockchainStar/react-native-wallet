import React, { Component } from 'react'
import { View, StyleSheet, ListView, Alert, RefreshControl } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import Notification from './../../../components/notification'
import SettingsService from './../../../services/settingsService'
import ResetNavigation from './../../../util/resetNavigation'
import Header from './../../../components/header'

export default class Settings extends Component {
  static navigationOptions = {
    title: 'Mobile Notifications',
  }

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      loading: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
      }),
    }
  }

  componentWillMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({ refreshing: true })
    let responseJson = await SettingsService.getAllNotifications()
    if (responseJson.status === "success") {
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2) });
      const data = responseJson.data;
      //console.log(data)
      let ids = data.map((obj, index) => index);
      this.setState({
        refreshing: false,
        dataSource: ds.cloneWithRows(data, ids),
      })
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK' }])
    }
  }

  reload = () => {
    ResetNavigation.dispatchUnderDrawer(this.props.navigation, 'Settings', 'SettingsNotifications')
  }

  toggleValue = async (id, value) => {
    this.setState({ loading: true })

    const body = {
      sms_enabled: value,
    }
    let responseJson = await SettingsService.changeStateOfNotification(id, body)

    if (responseJson.status === "success") {
      this.setState({ loading: false })
    }
    else {
      Alert.alert('Error',
        responseJson.message,
        [{ text: 'OK', onPress: () => this.reload() }])
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Mobile Notifications"
        />
        <Spinner
          visible={this.state.loading}
          textContent={"Updating..."}
          textStyle={{ color: '#FFF' }}
        />
        <ListView
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.getData.bind(this)} />}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Notification data={rowData} toggleValue={this.toggleValue} switchValue={rowData.sms_enabled} />}
        />
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
