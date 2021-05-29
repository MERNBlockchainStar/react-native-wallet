import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import Colors from './../config/colors'

export default class Account extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cca2: 'US',
        }
    }

    render() {
        return (
            <View style={[styles.inputContainer, {paddingVertical: 5}]}>
                <Text style={styles.text}>
                    {this.props.title}
                </Text>
                <View style={styles.countryPicker}>
                    <View style={{marginLeft:-22}}>
                        <CountryPicker
                            onChange={(value) => {
                                this.setState({cca2: value.cca2})
                                this.props.changeCountryCode(value.callingCode)
                            }}
                            closeable
                            filterable
                            cca2={this.state.cca2}
                            translation="eng"
                            styles={{
                                flex: 1,
                                justifyContent: 'center',
                                borderRightWidth: 1,
                                borderRightColor: Colors.lightgray
                            }}
                        />
                    </View>
                    <TextInput
                        {...this.props}
                        style={styles.input}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        flex: 4,
        fontSize: 16,
        color: Colors.black,
        fontWeight: 'normal',
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
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
        paddingVertical: 5,
        paddingHorizontal:10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgray,
        alignItems: 'center',
    },
    countryPicker: {
        flex: 5,
        flexDirection: 'row',
        paddingLeft: 20,
    }
})

