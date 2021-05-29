import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import Colors from './../config/colors'

export default class Account extends Component {

  render() {
    return (
      <TouchableHighlight
        style={styles.options} >
        <View style={styles.optionsElement}>
          <Text style={{ fontSize: 20, color: Colors.black }}>
            {this.props.email.email}
          </Text>
          {this.props.email.verified === true ?
            <Text style={{ fontSize: 15 }}>
              Verified
            </Text> :
            null
          }

          <View style={styles.buttons}>
            {this.props.email.verified !== true ?
              <TouchableHighlight
                style={[styles.button, { backgroundColor: Colors.lightblue }]}
                onPress={() => this.props.verify(this.props.email.email)} >
                <Text style={styles.buttonText}>
                  Verify
                </Text>
              </TouchableHighlight> :
              null
            }
            {this.props.email.primary === true ?
              <TouchableHighlight
                style={[styles.button, { backgroundColor: Colors.green }]}
                onPress={null} >
                <Text style={styles.buttonText}>
                  Primary
                </Text>
              </TouchableHighlight> :
              <TouchableHighlight
                style={[styles.button, { backgroundColor: Colors.lightblue }]}
                onPress={() => this.props.makePrimary(this.props.email.id)} >
                <Text style={styles.buttonText}>
                  Make Primary
                </Text>
              </TouchableHighlight>
            }
            {this.props.email.primary !== true ?
              <TouchableHighlight
                style={[styles.button, { backgroundColor: Colors.red }]}
                onPress={() => this.props.delete(this.props.email.id)} >
                <Text style={styles.buttonText}>
                  Delete
                </Text>
              </TouchableHighlight> :
              null
            }
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  options: {
    padding: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgray,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  optionsElement: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 6,
    padding: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})
