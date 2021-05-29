import React, { Component } from 'react';
import { View } from 'react-native';

class ButtonList extends Component {
  render() {
    const { children } = this.props;

    const { containerStyle } = styles;

    return <View style={containerStyle}>{children}</View>;
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    // flexDirection: 1,
    justifyContent: 'flex-start',
    // paddingVertical: 10,
  },
};

export { ButtonList };
