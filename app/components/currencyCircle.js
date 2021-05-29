import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native'
import Colors from './../config/colors'

export default class Account extends Component {
    constructor(props) {
        super(props);
        const color = this.props.active === true ? Colors.lightgray : 'orange'
        this.state = {
            balance: 0,
            color,
        }
    }

    render() {
        return (
            <View style={ styles.row}>
                <View style={[styles.options, {backgroundColor: Colors.gold}]}>
                  <Text style={{
                      color:'white',
                      fontSize: this.props.code.length < 4 ? 16 : 8,
                      fontWeight:'bold'}}>
                    {this.props.code.substr(0,6)}
                  </Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    row: {
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    options: {
        height: 70,
        width: 70,
        borderRadius: 35,
        justifyContent: 'center', 
        alignItems: 'center',
    },
})
