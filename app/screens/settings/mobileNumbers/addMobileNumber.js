import React, {Component} from 'react'
import {View, KeyboardAvoidingView, StyleSheet, TouchableHighlight, Text, Alert} from 'react-native'
import SettingsService from './../../../services/settingsService'
import TextInput from './../../../components/mobileNumberInput'
import Colors from './../../../config/colors'
import Header from './../../../components/header'
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

export default class AmountEntry extends Component {
    static navigationOptions = {
        title: 'Add mobile number',
    }

    constructor(props) {
        super(props);
        this.state = {
            routeName:this.props.navigation.state.params.routeName,
            number: '',
            code: '+1',
            primary: false,
        }
    }

    changeCountryCode = (code) => {
        this.setState({code: '+' + code})
    }
    add = async () => {
        let responseJson = await SettingsService.addMobile({number:this.state.code+this.state.number,primary:this.state.primary})

        if (responseJson.status === "success") {
            this.props.navigation.navigate("VerifyMobileNumber",{routeName:this.state.routeName})
        }
        else {
            Alert.alert('Error',
                responseJson.message,
                [{text: 'OK'}])
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    navigation={this.props.navigation}
                    back
                    title="Add mobile number"
                />
                <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
                    <View style={{flex: 1}}>
                        <TextInput
                            title="Enter number"
                            autoCapitalize="none"
                            value={this.state.number}
                            onChangeText={(number) => this.setState({number})}
                            changeCountryCode={this.changeCountryCode}
                            code={this.state.code}
                        />
                    </View>
                    <TouchableHighlight
                        style={styles.submit}
                        onPress={this.add}>
                        <Text style={{color: 'white', fontSize: 20}}>
                            Save
                        </Text>
                    </TouchableHighlight>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingTop:10
    },
    submit: {
        marginBottom: 10,
        marginHorizontal: 20,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.lightblue,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
