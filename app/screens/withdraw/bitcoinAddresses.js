import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Alert,
  TouchableHighlight,
  Text,
  RefreshControl,
} from 'react-native';
import Account from './../../components/bankAccount';
import SettingsService from './../../services/settingsService';
import Colors from './../../config/colors';
import Header from './../../components/header';

export default class BitcoinAddresses extends Component {
  static navigationOptions = {
    title: 'Select bitcoin address',
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
      }),
      empty: false,
    };
  }

  componentWillMount() {
    this.getData();
  }

  getAmount = reference => {
    this.props.navigation.navigate('WithdrawalAmountEntry', { reference });
  };
  getData = async () => {
    this.setState({
      refreshing: true,
    });
    let responseJson = await SettingsService.getAllBitcoinAddresses();

    if (responseJson.status === 'success') {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
      });
      const data = responseJson.data;
      if (data.length === 0) {
        this.setState({
          empty: true,
        });
      } else {
        this.setState({
          empty: false,
        });
      }
      let ids = data.map((obj, index) => index);
      this.setState({
        refreshing: false,
        dataSource: ds.cloneWithRows(data, ids),
      });
    } else {
      this.setState({
        refreshing: false,
      });
      Alert.alert('Error', responseJson.message, [{ text: 'OK' }]);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          navigation={this.props.navigation}
          back
          title="Select bitcoin address"
        />
        {this.state.empty && (
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'column',
                backgroundColor: Colors.lightgray,
                padding: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'normal',
                  color: Colors.black,
                }}>
                No bitcoin addresses added yet
              </Text>
            </View>
          </View>
        )}
        {!this.state.empty && (
          <ListView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.getData.bind(this)}
              />
            }
            dataSource={this.state.dataSource}
            renderRow={rowData => (
              <Account
                onPress={this.getAmount}
                reference={rowData.code}
                name={rowData.address}
              />
            )}
          />
        )}
        <TouchableHighlight
          style={styles.submit}
          onPress={() =>
            this.props.navigation.navigate('AddBitcoinAddress', {
              parentRoute: 'Withdraw',
              nextRoute: 'BitcoinAddresses',
            })
          }>
          <Text style={{ color: 'white', fontSize: 20 }}>
            Add bitcoin address
          </Text>
        </TouchableHighlight>
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
  submit: {
    marginBottom: 10,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 25,
    backgroundColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
