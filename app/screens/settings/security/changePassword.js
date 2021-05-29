import React, {Component} from 'react'
import {View, Alert, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableHighlight} from 'react-native'
import AuthService from './../../../services/authService'
import TextInput from './../../../components/textInput'
import Colors from './../../../config/colors'
import Header from './../../../components/header'

export default class ChangePassword extends Component {
    static navigationOptions = {
        title: 'Change password',
    }

    constructor() {
        super()

        this.state = {
            old_password: "",
            new_password1: "",
            new_password2: "",
        }
    }

    save = async () => {
        let responseJson = await AuthService.changePassword(this.state)
        if (responseJson.status === "success") {
            Alert.alert('Success',
                responseJson.message,
                [{
                    text: 'OK',
                    onPress: () => this.props.navigation.goBack(),
                }])
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
                    title="Change password"
                />
                <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
                    <ScrollView keyboardDismissMode={'interactive'}>

                        <TextInput
                            title="Old password"
                            placeholder="e.g. 12345678"
                            autoCapitalize="none"
                            secureTextEntry
                            value={this.state.old_password}
                            underlineColorAndroid="white"
                            onChangeText={(old_password) => this.setState({old_password})}
                        />
                        <TextInput
                            title="New password"
                            autoCapitalize="none"
                            placeholder="e.g. 123dr321"
                            secureTextEntry
                            value={this.state.line_2}
                            onChangeText={(new_password1) => this.setState({new_password1})}
                            underlineColorAndroid="white"
                        />

                        <TextInput
                            title="Confirm new password"
                            autoCapitalize="none"
                            placeholder="e.g. 123dr321"
                            secureTextEntry
                            value={this.state.new_password2}
                            underlineColorAndroid="white"
                            onChangeText={(new_password2) => this.setState({new_password2})}
                        />
                    </ScrollView>
                    <TouchableHighlight
                        style={styles.submit}
                        onPress={() => this.save()}>
                        <Text style={{color: 'white', fontSize: 20}}>
                            Confirm
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
    input: {
        height: 60,
        width: "100%",
        padding: 10,
        fontSize: 16,
        borderColor: 'white',
        borderWidth: 1,
    },
    submit: {
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.lightblue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        paddingLeft: 10,
    },
    inputContainer: {
        flexDirection: 'column',
        width: '100%',
        paddingTop: 10,
    },
})

