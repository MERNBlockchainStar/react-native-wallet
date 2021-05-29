import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import Colors from './../config/colors'

export default class TextInputRow extends Component {
    focus() {
        this.refs.textInput.focus();
    }

    render() {
        return (
        <View style={styles.inputContainer}>
            <Text style={styles.text}>
                {this.props.title}
            </Text>
            <TextInput
                {...this.props}
                ref={'textInput'}
                style={styles.input}
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 5,
        fontSize: 16,
        paddingHorizontal:10,
    },
    text: {
        flex: 4,
        fontSize: 18,
        borderRightWidth: 1,
        borderRightColor: Colors.lightgray,
        color: Colors.black,
    },
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgray,
    },
})

