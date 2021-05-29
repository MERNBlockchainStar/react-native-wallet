import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Date from './../util/date.js'
import Colors from './../config/colors'

export default class Withdraw extends Component {

  getAmount = (amount, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      amount = amount / 10
    }

    return amount.toFixed(8).replace(/\.?0+$/, "")
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <View style={styles.icon}>
            <Image
              source={require('./../../assets/icons/profile.png')}
              style={{height:40, width:40}}
            />
          </View>
          <View style={styles.type}>
            <Text style={{ fontSize: 18, fontWeight: 'normal', color: Colors.black }}>
              {this.props.data.label}
            </Text>
            <Text style={{ fontSize: 13, color: '#4D4D4D' }}>
              {this.props.data.note}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <Text style={{ fontSize: 20, fontWeight: 'normal', color: Colors.black }}>
            {this.props.data.currency.symbol + " " + this.getAmount(this.props.data.amount, this.props.data.currency.divisibility)}
          </Text>
          <Text style={{ fontSize: 14, color: Colors.black }}>
            {Date.getDateFromMiliseconds(this.props.data.updated)} | {this.props.data.status}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgray,
    height: 70,
    backgroundColor: Colors.transactionBackground,
  },
  left: {
    flex: 220,
    flexDirection: 'row',
  },
  icon: {
    flex: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  type: {
    flex: 150,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  right: {
    flex: 150,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
})
