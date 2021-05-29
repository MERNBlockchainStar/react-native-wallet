// import lib for making component
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Colors from './../../config/colors';

class Button extends Component {
  buttonStyle() {
    const { buttonStyle, buttonStyleText } = styles;
    const { type } = this.props;
    switch (type) {
      case 'primary':
        return [buttonStyle, { backgroundColor: Colors.primary }];
      case 'secondary':
        return [buttonStyle, { backgroundColor: Colors.secondary }];
      case 'text':
        return [buttonStyleText];
      default:
        return [buttonStyle, { backgroundColor: Colors.primary }];
    }
  }

  textStyle() {
    const { textStyle, textStyleText } = styles;
    const { type } = this.props;
    switch (type) {
      // case 'primary':
      //   return [textStyle, { color: 'white' }];
      // case 'secondary':
      //   return [textStyle, { color: 'black' }];
      case 'text':
        return [textStyleText];
      default:
        return [textStyle, { color: 'white' }];
    }
  }

  render() {
    const { onPress, label, reference } = this.props;
    const { buttonStyleText, textStyle, containerStyle } = styles;
    return (
      <View style={containerStyle}>
        <TouchableOpacity
          onPress={onPress}
          style={this.buttonStyle()}
          ref={reference}>
          <Text style={this.textStyle()}>{label}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 7,
    backgroundColor: '#00000000',
  },
  buttonStyle: {
    flex: 1,
    height: 38,
    borderRadius: 2,
    // backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyleText: {
    flex: 1,
    height: 28,
    backgroundColor: 'white',
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    // color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textStyleText: {
    color: Colors.primary,
    fontSize: 15,
    // fontWeight: 'bold',
  },
};

export { Button };
