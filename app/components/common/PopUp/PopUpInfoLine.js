import React from 'react';
import { View } from 'react-native';
import Colors from './../../../config/colors';

const PopUpInfoLine = () => {
  const { borderLine } = styles;

  return <View style={borderLine} />;
};

const styles = {
  borderLine: {
    height: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgray,
    paddingLeft: 10,
    paddingRight: 10,
  },
};

export { PopUpInfoLine };
