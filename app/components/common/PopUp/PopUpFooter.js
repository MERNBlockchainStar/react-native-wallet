import React from 'react';
import { Text, View } from 'react-native';
import Colors from './../../../config/colors';

const PopUpFooter = props => {
  const { viewStyle, textStyleLeft, textStyleRight, borderLine } = styles;

  const { left, right } = props;

  return (
    <View style={borderLine}>
      <View style={viewStyle}>
        <Text style={textStyleLeft}>{left}</Text>
      </View>
      <View style={viewStyle}>
        <Text style={textStyleRight}>{right}</Text>
      </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    flex: 2,
    justifyContent: 'center',
  },
  textStyleLeft: {
    fontSize: 15,
    alignSelf: 'flex-start',
    color: Colors.black,
  },
  textStyleRight: {
    fontSize: 15,
    alignSelf: 'flex-end',
    color: Colors.black,
  },
  borderLine: {
    height: 50,
    flexDirection: 'row',
    borderTopColor: Colors.lightgray,
    borderTopWidth: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
};

export { PopUpFooter };
