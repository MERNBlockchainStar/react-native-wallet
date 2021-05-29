import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import Colors from './../config/colors'

export default class Account extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cca2: 'US',
            borderColor: Colors.lightgray
        }
    }

    render() {
        return (
            <View style={[styles.inputContainer, {borderBottomColor: this.state.borderColor} ]}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.text, { color: this.state.textColor }]}>
                        {this.props.title}
                    </Text>
                    {
                        this.props.required ?
                            <Text style={{ paddingLeft: 2, color: Colors.red }}>
                                *
                            </Text> : null
                    }
                    {
                        this.props.error &&
                        <Text style={[styles.errorText, { fontSize: this.props.error.length > 50 ? 10 : 11, }]}
                            numberOfLines={3}>
                            {this.props.error}
                        </Text>
                    }
                </View>
                <View style={styles.countryPicker}>
                    <CountryPicker
                        onChange={(value) => {
                            this.setState({ cca2: value.cca2 })
                            this.props.changeCountryCode(value.callingCode)
                        }}
                        closeable
                        filterable
                        cca2={this.state.cca2}
                        translation="eng"
                        styles={{ width: 60, justifyContent: 'center' }}
                    />
                    <TextInput
                        value={this.props.code}
                        editable={false}
                        style={styles.code}
                    />
                    <TextInput
                        {...this.props}
                        ref={this.props.reference}
                        style={styles.input}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 3,
        height: 50,
        paddingLeft: 0,
        paddingBottom: 10,
        paddingTop:10,
        color: Colors.black,
        fontWeight: 'normal',
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
    },
    code: {
        width: 40,
        height: 50,
        fontSize: 16,
        color: Colors.black,
        textAlign: 'right',
        fontWeight: 'normal',
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
    },
    country: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        color: Colors.black,
    },
    inputContainer: {
        flexDirection: 'column',
        marginHorizontal: 20,
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgray,
    },
    countryPicker: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        paddingTop: 5,
        paddingBottom: 10,
        color: Colors.red,
        paddingLeft: 5,
    },
})
