import React, {Component} from 'react'
import {View, KeyboardAvoidingView, StyleSheet, TouchableHighlight, AsyncStorage, Text, Alert} from 'react-native'
import TransectionService from './../../services/transactionService'
import ResetNavigation from './../../util/resetNavigation'
import TextInput from './../../components/textInput'
import Colors from './../../config/colors'
import Header from './../../components/header'
import Big from 'big.js'

export default class AmountEntry extends Component {
    static navigationOptions = {
        title: 'Withdraw',
    }

    constructor(props) {
        super(props);
        const params = this.props.navigation.state.params
        this.state = {
            amount: 0,
            reference: params.reference,
            currency: ''
        }
    }

    async componentWillMount() {
        let data = await AsyncStorage.getItem('currency')
        let currency = JSON.parse(data)
        this.setState({currency: currency.code})
    }

    withdraw = async () => {
        if (this.state.amount <= 0) {
            Alert.alert(
                'Invalid',
                'Enter valid amount',
                [[{text: 'OK'}]]
            )
        }
        else {
            const data = await AsyncStorage.getItem('currency')
            const currency = JSON.parse(data)
            Alert.alert(
                'Are you sure?',
                'You are about to withdraw ' + currency.symbol + this.state.amount,
                [
                    {text: 'Yes', onPress: this.withdrawConfirmed},
                    {
                        text: 'No',
                        style: 'cancel'
                    },
                ]
            )
        }
    }

    changeAmount = (text) => {
        let amount = parseFloat(text)
        if (isNaN(amount)) {
            this.setState({amount: 0})
        }
        else {
            this.setState({amount})
        }
    }

    withdrawConfirmed = async () => {
        const data = await AsyncStorage.getItem('currency')
        const currency = JSON.parse(data)
        let amount = new Big(this.state.amount)
        for (let i = 0; i < currency.divisibility; i++) {
          amount = amount.times(10)
        }

        let responseJson = await TransectionService.withdraw(amount, this.state.reference, this.state.currency)
        if (responseJson.status === "success") {
            Alert.alert('Success',
                "Transaction successful",
                [{text: 'OK', onPress: () => ResetNavigation.dispatchToSingleRoute(this.props.navigation, "Home")}])
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
              title="Withdraw"
            />
            <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
              <View style={{flex: 1}}>
                <TextInput
                  title="Amount"
                  placeholder="Enter amount here"
                  autoCapitalize="none"
                  keyboardType="numeric"
                  underlineColorAndroid="white"
                  onChangeText={this.changeAmount}
                />
              </View>
              <TouchableHighlight
                style={styles.submit}
                onPress={this.withdraw}>
                <Text style={{color: 'white', fontSize: 20}}>
                    Withdraw
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
        marginBottom:10,
        marginHorizontal:20,
        borderRadius:25,
        height: 50,
        backgroundColor: Colors.lightblue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 60,
        width: "100%",
        padding: 10,
        marginTop: 10,
        borderColor: 'white',
        borderWidth: 1,
    },
})
