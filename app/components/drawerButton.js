import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import PropTypes from 'prop-types'

const DrawerButton = ({ navigation }) => (
  <TouchableOpacity
      onPress={() => navigation.navigate('DrawerOpen')}
      style={{padding: 20}}>
    <Icon
      name="ios-menu-outline"
      size={30}
      color="white"
    />
  </TouchableOpacity>
)

DrawerButton.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DrawerButton
