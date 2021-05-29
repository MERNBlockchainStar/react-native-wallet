import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native'
import Colors from './../config/colors'

export default class Contact extends Component {

  render() {
    return (
      <TouchableHighlight
        style={styles.contact}
        underlayColor={'white'}
        onPress={() => this.props.selected(this.props.rowData.contact)} >
        <View style={styles.container}>
          <View style={styles.profile}>
          {this.props.rowData.image ?
            <Image
              style={{height:40, width:40,borderRadius: 20}}
              source={{ uri: this.props.rowData.image, cache: 'only-if-cached' }}
            /> :
            <Image
              source={require('./../../assets/icons/profile.png')}
              style={{height:40, width:40}}
            />
          }
            
          </View>
          <View style={styles.contactInfo}>
            <Text style={{fontSize: 20, color: Colors.black}}>
              {this.props.rowData.name}
            </Text>
            <Text style={{fontSize: 14, color: 'darkgray'}}>
              {this.props.rowData.contact}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  profile: {
    width: 60,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contact: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgray,
  },
})






