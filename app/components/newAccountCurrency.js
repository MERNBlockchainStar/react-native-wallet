import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight, TouchableWithoutFeedback,Image} from 'react-native'
import Colors from './../config/colors'
import IconF from 'react-native-vector-icons/Ionicons'

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: this.props.currencies,
            active: false,
            balance: 0,
            code: this.props.code,
            reference: this.props.reference,
        }
    }

    componentWillMount() {
        let i = 0, j = 0;
        this.setState({
            balance: this.setBalance(this.state.currencies.available_balance,
                this.state.currencies.currency.divisibility ),
            active: this.state.currencies.active
        })
    }

    setBalance = (balance, divisibility) => {
        for (let i = 0; i < divisibility; i++) {
            balance = balance / 10
        }
        let balanceString = balance.toString()
        return balance
    }

    render() {
        return (
            <View style={{
                height: 60,
                padding: 10,
                paddingHorizontal: 20,
                borderBottomWidth: 2,
                borderBottomColor: Colors.lightgray,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white'
            }}>

                <View style={{flexDirection: 'row', flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={{color: Colors.darkestgray, fontSize: 14}}>
                            {this.state.currencies.currency.description}
                        </Text>
                        <Text style={{color: Colors.black, fontSize: 18}}>
                            {this.state.currencies.currency.symbol}{this.state.balance.toFixed(4).replace(/0{0,2}$/, "")}
                        </Text>

                    </View>
                    {/*<CheckBox
                     style={{padding: 10}}
                     onClick={() => {
                     this.props.setActiveCurrency(this.state.reference, this.state.code)
                     }}
                     isChecked={this.state.active}
                     />*/}
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.setActiveCurrency(this.state.reference, this.state.currencies.currency.code)
                        }}
                        style={{justifyContent: 'center', alignItems:'center'}} >
                        <IconF
                            name="md-checkbox"
                            size={30}
                            color={this.state.active ? Colors.green : Colors.lightgray}
                        />
                    </TouchableWithoutFeedback>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    options: {
        height: 50,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgray,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    optionsElement: {
        flex: 1,
        flexDirection: 'row',
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
    },
    type: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
})





/**
 * Created by BS-175 on 27-Dec-17.
 */
