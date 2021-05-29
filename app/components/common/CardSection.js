// import lib for making component
import React from 'react';
import { View } from 'react-native';

// make component
const CardSection = (props) => {

  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: 5,
    position: 'relative'
  }
};

// make component available to other parts of app
export { CardSection };
