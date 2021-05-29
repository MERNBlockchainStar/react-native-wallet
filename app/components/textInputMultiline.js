import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import Colors from './../config/colors'

export default class Account extends Component {
    render() {
        return (
            <View style={styles.inputContainer}>
                <Text style={styles.text}>
                    {this.props.title}
                </Text>
                <TextInput
                    {...this.props}
                    style={styles.input}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 46,
        width: "100%",
        paddingLeft: 0,
        fontSize: 16,
        color: Colors.black,
        fontWeight: 'normal',
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: Colors.black,
    },
    inputContainer: {
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 10,
    },
})
