import React, {Component} from 'react'
import {ScrollView, StyleSheet, TouchableHighlight, Text, KeyboardAvoidingView} from 'react-native'
import TextInput from './../../../components/textInput'
import Colors from './../../../config/colors'

export default class BankAccountComponent extends Component {

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
                <ScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps='always'>
                    <TextInput
                        title="Account holder"
                        placeholder="e.g. John Snow"
                        autoCapitalize="none"
                        value={this.props.values.name}
                        underlineColorAndroid="white"
                        onChangeText={(text) => this.props.updateName(text)}
                    />
                    <TextInput
                        title="Account number"
                        placeholder="e.g. 4083764677"
                        autoCapitalize="none"
                        value={this.props.values.number}
                        underlineColorAndroid="white"
                        onChangeText={(text) => this.props.updateNumber(text)}
                    />
                    <TextInput
                        title="Account type"
                        placeholder="e.g. Cheque account"
                        autoCapitalize="none"
                        value={this.props.values.type}
                        underlineColorAndroid="white"
                        onChangeText={(text) => this.props.updateType(text)}
                    />
                    <TextInput
                        title="Bank name"
                        placeholder="e.g. Bank of World"
                        autoCapitalize="none"
                        value={this.props.values.bank_name}
                        underlineColorAndroid="white"
                        onChangeText={(text) => this.props.updateBank(text)}
                    />
                    <TextInput
                        title="Branch code"
                        placeholder="e.g. 46589"
                        autoCapitalize="none"
                        value={this.props.values.branch_code}
                        underlineColorAndroid="white"
                        onChangeText={(text) => this.props.updateBranch(text)}
                    />
                    <TextInput
                        title="Swift code"
                        placeholder="Usually 8 or 11 characters"
                        autoCapitalize="none"
                        value={this.props.values.swift}
                        underlineColorAndroid="white"
                        onChangeText={(text) => this.props.updateSwift(text)}
                    />
                    <TextInput
                        title="IBAN number"
                        placeholder="34 alphanumeric characters"
                        autoCapitalize="none"
                        value={this.props.values.iban}
                        underlineColorAndroid="white"
                        onChangeText={(text) => this.props.updateIBAN(text)}
                    />
                    <TextInput
                        title="BIC number"
                        placeholder="Usually 8 or 11 characters"
                        autoCapitalize="none"
                        value={this.props.values.bic}
                        underlineColorAndroid="white"
                        onChangeText={(text) => this.props.updateBIC(text)}
                    />
                </ScrollView>
                <TouchableHighlight
                    style={styles.submit}
                    ref="save"
                    onPress={this.props.save}>
                    <Text style={{color: 'white', fontSize: 20}}>
                        Save
                    </Text>
                </TouchableHighlight>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    submit: {
        marginTop: 10,
        marginBottom:10,
        marginHorizontal:20,
        borderRadius:25,
        height: 50,
        backgroundColor: Colors.lightblue,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
