import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  AsyncStorage,
  RefreshControl,
  TouchableHighlight,
  Text,
  Alert,
  ListView,
  ActivityIndicator,
} from 'react-native';
import Contact from './../../components/contact';
import TextInput from './../../components/textInput';
import ContactService from './../../services/contactService';
import UserInfoService from './../../services/userInfoService';
import Auth from './../../util/auth';
import Colors from './../../config/colors';
import Header from './../../components/header';

export default class SendTo extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Send',
  });

  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      ready: false,
      refreshing: false,
      reference: '',
      searchText: '',
      data: [],
      contacts: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    };
  }

  async componentWillMount() {
    let balance = await AsyncStorage.getItem('balance');
    this.setState({
      balance: parseFloat(balance),
    });
    this.showContactsAsync();
    let responseJson = await UserInfoService.getUserDetails();
    if (responseJson.status === 'success') {
      AsyncStorage.removeItem('user');
      AsyncStorage.setItem('user', JSON.stringify(responseJson.data));
    } else {
      Auth.logout(this.props.navigation);
    }
  }

  showContactsAsync = async () => {
    //await AsyncStorage.removeItem('contacts')
    if (this.state.ready === false) {
      let contacts = await AsyncStorage.getItem('contacts');
      if (contacts) {
        let data = JSON.parse(contacts);
        this.setState({
          ready: true,
          data,
          contacts: this.state.contacts.cloneWithRows(data),
        });
      } else {
        this.refreshContactsAsync();
      }
    } else {
      this.setState({ refreshing: true });
      this.refreshContactsAsync();
    }
  };

  refreshContactsAsync = async () => {
    let data = await ContactService.getAllContacts();
    this.setState({
      refreshing: false,
      ready: true,
      data,
      contacts: this.state.contacts.cloneWithRows(data),
    });

    await AsyncStorage.removeItem('contacts');
    await AsyncStorage.setItem('contacts', JSON.stringify(data));
  };

  selectAContact = contact => {
    this.setState({ searchText: contact });
  };

  searchTextChanged = event => {
    let searchText = event.nativeEvent.text;
    this.setState({ searchText });

    if (searchText === '') {
      this.setState({
        contacts: this.state.contacts.cloneWithRows(this.state.data),
      });
      return;
    }

    let contacts = this.state.data.filter(node => {
      if (typeof node.name == 'undefined') {
        return false;
      }
      let name = node.name.toLowerCase();
      if (typeof node.contact == 'undefined') {
        return false;
      }
      if (name.indexOf(searchText) !== -1) {
        return true;
      } else if (node.contact.indexOf(searchText) !== -1) {
        return true;
      }

      return false;
    });

    this.setState({
      contacts: this.state.contacts.cloneWithRows(contacts),
    });
  };

  send = async () => {
    if (this.state.searchText === '') {
      Alert.alert('Error', 'Enter a reference..');
      return;
    } else {
      this.setState({ reference: this.state.searchText });
    }

    this.props.navigation.navigate('SendMoney', {
      recipient: this.state.searchText,
      memo: '',
      balance: this.state.balance,
    });
  };

  goToBarcodeScanner = () => {
    this.props.navigation.navigate('QRcodeScanner');
  };

  render() {
    if (!this.state.ready) {
      return (
        <View style={{ flex: 1 }}>
          <Header navigation={this.props.navigation} title="To" back right />
          <KeyboardAvoidingView
            style={styles.container}
            behavior={'padding'}
            keyboardVerticalOffset={75}>
            <View style={{ flex: 1 }}>
              <TextInput
                title="Recipient"
                placeholder="Enter email Address"
                autoCapitalize="none"
                underlineColorAndroid="white"
                value={this.state.searchText}
                onChange={this.searchTextChanged.bind(this)}
              />
              <View style={styles.spinner}>
                <Text>Loading Contacts</Text>
                <ActivityIndicator
                  animating
                  style={{ height: 80 }}
                  size="large"
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header navigation={this.props.navigation} title="To" drawer right />
          <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
            <View style={{ flex: 1 }}>
              <TextInput
                title="Recipient"
                placeholder="Enter email Address"
                fontSize={this.state.searchText.length == 0 ? 18 : 22}
                autoCapitalize="none"
                underlineColorAndroid="white"
                value={this.state.searchText}
                onChange={this.searchTextChanged.bind(this)}
              />
              <View style={{ flex: 1, marginHorizontal: 20, marginTop: 10 }}>
                <ListView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.showContactsAsync.bind(this)}
                    />
                  }
                  dataSource={this.state.contacts}
                  enableEmptySections
                  renderRow={rowData => (
                    <Contact selected={this.selectAContact} rowData={rowData} />
                  )}
                />
              </View>
            </View>
            <TouchableHighlight style={styles.submit} onPress={this.send}>
              <Text style={{ color: 'white', fontSize: 20 }}>Next</Text>
            </TouchableHighlight>
          </KeyboardAvoidingView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 10,
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 25,
    height: 50,
    backgroundColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    width: '100%',
    padding: 10,
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
  contact: {
    height: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
