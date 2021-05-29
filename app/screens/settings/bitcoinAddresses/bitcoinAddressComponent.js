import React, {Component} from 'react'
import {ScrollView, StyleSheet, TouchableHighlight, Text, KeyboardAvoidingView} from 'react-native'
import TextInput from './../../../components/textInput'
import Colors from './../../../config/colors'

export default class BitcoinAddressComponent extends Component {

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
                <ScrollView keyboardDismissMode={'interactive'}>
                    <TextInput
                        title="Bitcoin Address"
                        placeholder="e.g akjsfndj2432askfn"
                        autoCapitalize="none"
                        underlineColorAndroid="white"
                        value={this.props.values.address}
                        onChangeText={this.props.updateAddress}
                    />
                </ScrollView>
                <TouchableHighlight
                    style={styles.submit}
                    onPress={this.props.onPress}>
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
        paddingTop:10,
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
