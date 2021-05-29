import React, { Component } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import { ImagePicker } from 'expo';
import Colors from './../../../config/colors';
import Header from './../../../components/header';

export default class Document extends Component {
  static navigationOptions = {
    title: 'Document',
  };

  constructor(props) {
    super(props);
    const params = this.props.navigation.state.params;
    this.state = {
      title: params.name,
      getVerified: false,
      modalVisible: false,
      type: 'other',
    };
  }

  componentWillMount() {
    if (this.state.title === 'Proof of Identity' || this.state.title === 'ID Document') {
      this.setState({
        type: 'government_id',
      });
    }
    if (this.state.title === 'Advanced Proof of Identity') {
      this.setState({
        type: 'id_confirmation',
      });
    }
    if (this.state.title === 'Proof of Address') {
      this.setState({
        type: 'utility_bill',
      });
    }
    if (
      this.state.title === 'Proof of Identity' ||
      this.state.title === 'Advanced Proof of Identity' ||
      this.state.title === 'Proof of Address'
    ) {
      this.setState({
        getVerified: true,
      });
    }
  }

  openModal = async () => {
    this.setState({ modalVisible: true });
  };

  launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    this.setState({ modalVisible: false });
    if (!result.cancelled) {
      this.props.navigation.navigate('DocumentUpload', {
        getVerified: this.state.getVerified,
        image: result,
        doc_type: this.state.type,
        type: this.state.title,
      });
    }
  };

  launchImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    this.setState({ modalVisible: false });
    if (!result.cancelled) {
      this.props.navigation.navigate('DocumentUpload', {
        getVerified: this.state.getVerified,
        image: result,
        doc_type: this.state.type,
        type: this.state.title,
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} back title="Document" />
        <View style={styles.topContainer}>
          <Text style={{ fontSize: 18, textAlign: 'center' }}>
            {this.state.type === 'utility_bill'
              ? `Upload a bank statement, utility bill or letter from a Commissioner of Oaths confirming your proof of address`
              : this.state.title === 'ID Selfie'
                ? `Take a picture of yourself using your phone camera`
                : this.state.type === 'government_id' 
                ? `Upload your National ID or Passport`
                  :`Upload a bank statement, utility bill or letter from a Commissioner of Oaths confirming your proof of address`}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={{ flex: 1 }} />
          <TouchableHighlight
            style={styles.upload}
            onPress={() => this.openModal()}>
            <Text style={{ fontSize: 20, color: 'white' }}>Upload</Text>
          </TouchableHighlight>
        </View>
        <Modal
          animationType={'slide'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <View style={styles.modal}>
            <View style={styles.bottomModal}>
              <View style={[styles.button, { borderBottomColor: 'black' }]}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                  Upload Image
                </Text>
              </View>
              <TouchableHighlight
                style={styles.button}
                onPress={() => this.launchCamera()}>
                <Text style={styles.buttonText}>Use Camera</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                onPress={() => this.launchImageLibrary()}>
                <Text style={styles.buttonText}>Choose From Gallery</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
  topContainer: {
    flex: 1,
    backgroundColor: Colors.lightgray,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  upload: {
    marginBottom: 10,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightblue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomModal: {
    width: '70%',
    height: 220,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: Colors.black,
  },
});
