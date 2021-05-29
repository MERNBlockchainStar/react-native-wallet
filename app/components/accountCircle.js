import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native'
import Colors from './../config/colors'

export default class AccountCircle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            color:Colors.darkergray
        }
        //console.log(this.props.activeCurrency)
    }

    render() {
        return (
            <View style={styles.row}>
                <TouchableHighlight
                    underlayColor={this.props.getAccountList.activeCurrency? Colors.gold : Colors.darkergray}
                    onPress={() => {
                        /*this.setState({
                            color: this.props.getAccountList.activeCurrency ? Colors.gold : Colors.darkergray
                        })*/
                        this.props.getSelectedCurrencies(this.props.getAccountList)
                    }}
                    style={[styles.options, {backgroundColor: this.props.getAccountList.activeCurrency? Colors.gold : Colors.darkergray}]}>
                    <Text style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>
                        {this.props.getAccountList ? this.props.getAccountList.name.substr(0, 2).toUpperCase() : ''}
                    </Text>
                </TouchableHighlight>
                <Text style={{color: Colors.darkestgray, paddingTop: 10, paddingBottom: 0, textAlign: 'center'}}>
                    {this.props.getAccountList ? this.props.getAccountList.name : ''}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        width: 80,
        backgroundColor: Colors.whitesmoke,
        alignItems: 'center',

    },
    options: {
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
