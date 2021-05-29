import React, {Component} from 'react'
import {View, Alert, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableHighlight} from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import UserInfoService from './../../services/userInfoService'
import TextInput from './../../components/textInput'
import Colors from './../../config/colors'
import Header from './../../components/header'
import ResetNavigation from './../../util/resetNavigation'

export default class Address extends Component {
    static navigationOptions = {
        title: 'Address',
    }

    constructor(props) {
        super(props)
        this.state = {
            routeName:this.props.navigation.state.params ? this.props.navigation.state.params.name:null,
            line_1: '',
            line_2: '',
            city: '',
            state_province: '',
            country: '',
            postal_code: '',
        }
    }

    componentDidMount() {
        this.getAddress()
    }


    getAddress = async () => {
        let responseJson = await UserInfoService.getAddress()
        if (responseJson.status === "success") {
            const address = responseJson.data
            this.setState({
                line_1: address.line_1,
                line_2: address.line_2,
                city: address.city,
                state_province: address.state_province,
                country: address.country !== "--" ? address.country : 'US',
                postal_code: address.postal_code,
            })
        }
        else {
            Alert.alert('Error',
                responseJson.message,
                [{text: 'OK'}])
        }
    }

    save = async () => {
        let responseJson = await UserInfoService.updateAddress(this.state)
        //console.log(responseJson)
        if (responseJson.status === "success") {
            this.reload()
        }
        else {
            Alert.alert('Error',
                responseJson.message,
                [{text: 'OK'}])
        }
    }


    reload = () => {
        ResetNavigation.dispatchToDrawerRoute(this.props.navigation, this.state.routeName != null ? 'GetVerified' : 'Settings')
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    navigation={this.props.navigation}
                    back
                    title="Address"
                />
                <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
                    <ScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps='always'>

                        <TextInput
                            title="Address Line 1"
                            placeholder="e.g. 1 Bree Street"
                            autoCapitalize="none"
                            underlineColorAndroid="white"
                            value={this.state.line_1}
                            onChangeText={(line_1) => this.setState({line_1})}
                        />

                        <TextInput
                            title="Address Line 2"
                            placeholder="e.g. Building 76"
                            autoCapitalize="none"
                            underlineColorAndroid="white"
                            value={this.state.line_2}
                            onChangeText={(line_2) => this.setState({line_2})}

                        />

                        <TextInput
                            title="City"
                            placeholder="e.g. Cape Town"
                            autoCapitalize="none"
                            underlineColorAndroid="white"
                            value={this.state.city}
                            onChangeText={(city) => this.setState({city})}

                        />

                        <TextInput
                            title="State province"
                            placeholder="e.g. Western Cape"
                            autoCapitalize="none"
                            underlineColorAndroid="white"
                            value={this.state.state_province}
                            onChangeText={(state_province) => this.setState({state_province})}
                        />

                        <View style={styles.pickerContainer}>
                            <Text style={[styles.text, {flex: 4}]}>
                                Country
                            </Text>
                            <View style={{flex: 5, alignItems: 'flex-end'}}>
                                <CountryPicker
                                    onChange={(value) => {
                                        this.setState({country: value.cca2});
                                    }}
                                    cca2={this.state.country}
                                    closeable
                                    filterable
                                    translation="eng"
                                    styles={{flex: 1, justifyContent: 'center'}}
                                />
                            </View>
                        </View>

                        <TextInput
                            title="Postal code"
                            placeholder="e.g. 1212"
                            autoCapitalize="none"
                            value={this.state.postal_code}
                            underlineColorAndroid="white"
                            onChangeText={(postal_code) => this.setState({postal_code})}
                        />
                    </ScrollView>
                    <TouchableHighlight
                        style={styles.submit}
                        onPress={() => this.save()}>
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
        fontSize: 16,
        borderRightColor: Colors.lightgray,
        color: Colors.black,
    },
    pickerContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        paddingVertical:20,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgray,
    },
})

