import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native'
import Colors from './../config/colors'

export default class Account extends Component {
    constructor(props) {
        super(props);
        const color = this.props.data.active === true ? Colors.lightgray : Colors.green
        this.state = {
            balance: 0,
            color,
        }
    }

    componentWillMount() {
        this.setBalance(this.props.data.balance, this.props.data.currency.divisibility)
    }

    setBalance = (balance, divisibility) => {
        for (let i = 0; i < divisibility; i++) {
            balance = balance / 10
        }

        this.setState({balance})
    }

    render() {
        return (
            <TouchableHighlight
                style={styles.options}>
                <View style={styles.optionsElement}>
                    <View style={styles.icon}>
                        <Image
                            source={require('./../../assets/icons/placeholder.png')}
                            style={{height: 40, width: 40}}
                        />
                    </View>
                    <View style={styles.type}>
                        <View style={styles.accountInfo}>
                            <Text style={{fontSize: 22, color: Colors.black}}>
                                {this.props.data.currency.code}
                            </Text>
                            <Text style={{fontSize: 13, color: Colors.black}}>
                                {this.props.data.currency.symbol + ' ' + this.state.balance}
                            </Text>
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableHighlight
                                style={[styles.button, {backgroundColor: this.state.color}]}
                                onPress={this.props.data.active === true ? null : (code) => this.props.setActive(this.props.data.currency.code)}>
                                <Text style={{color: 'white', fontSize: 18}}>
                                    {this.props.data.active === true ? 'Active' : 'Activate'}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    options: {
        height: 80,
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
        flexDirection: 'row',
    },
    accountInfo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    buttonView: {
        flex: 1,
        paddingVertical: 10,
        paddingLeft: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
})
