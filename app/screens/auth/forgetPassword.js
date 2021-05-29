import React, {Component} from 'react'
import {View, Alert, StyleSheet, KeyboardAvoidingView, TouchableHighlight, Text} from 'react-native'
import AuthService from './../../services/authService'
import TextInput from './../../components/textInput'
import Colors from './../../config/colors'
import Header from './../../components/header'

export default class ForgetPassword extends Component {
    static navigationOptions = {
        title: 'Forget password',
    }

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            company: '',
        }
    }

    goToLogin = () => {
        this.props.navigation.goBack()
    }

    sendEmail = async () => {
        var body = {
            "user": this.state.email,
            "company": this.state.company,
        }
        let responseJson = await AuthService.forgetPassword(body)
        if (responseJson.status === "success") {
            Alert.alert('Success',
                responseJson.message,
                [{text: 'OK', onPress: () => this.goToLogin()}])
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
                    title="Forget password"
                />
                <View style={styles.mainContainer}>
                    <KeyboardAvoidingView style={styles.container} behavior={'padding'} keyboardVerticalOffset={75}>
                        <TextInput
                            title="Email"
                            placeholder="e.g john@gmail.com"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            underlineColorAndroid="white"
                            onChangeText={(email) => this.setState({email})}
                        />
                        <TextInput
                            title="Company"
                            placeholder="e.g rehive"
                            autoCapitalize="none"
                            underlineColorAndroid="white"
                            onChangeText={(company) => this.setState({company})}
                        />
                        <TouchableHighlight
                            style={styles.submit}
                            onPress={() => this.sendEmail()}>
                            <Text style={{color: 'white',fontSize:20}}>
                                Send reset email
                            </Text>
                        </TouchableHighlight>
                    </KeyboardAvoidingView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    input: {
        height: 60,
        width: "100%",
        padding: 10,
        paddingLeft: 20,
        marginTop: 20,
        borderColor: 'white',
        borderWidth: 1,
    },
    submit: {
        padding: 10,
        marginTop: 10,
        height: 50,
        marginHorizontal:20,
        borderRadius: 25,
        backgroundColor: Colors.lightblue,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

