import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from './../config/colors'

export default class Account extends Component {

    render() {
        return (
            <TouchableHighlight
                style={styles.options}
                underlayColor={'white'}
                onPress={() => this.props.onPress(this.props.reference)}>
                <View style={styles.optionsElement}>
                    <View style={styles.optionsText}>
                        <Image
                            source={require('./../../assets/icons/placeholder.png')}
                            style={{height: 40, width: 40}}
                        />
                        {
                            this.props.name ?
                                <Text style={{fontSize: 18, paddingLeft: 20, color: Colors.black}}>
                                    {this.props.name}
                                </Text> :
                                <Text style={{fontSize: 18, paddingLeft: 20, fontStyle: 'italic', color: Colors.black}}>
                                    Incomplete
                                </Text>
                        }

                    </View>
                    <View style={styles.optionsIcon}>
                        <IconFontAwesome
                            name="angle-right"
                            size={45}
                            color={Colors.black}
                        />
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    options: {
        height: 80,
        paddingHorizontal: 20,

        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgray,
    },
    optionsElement: {
        flex: 1,
        flexDirection: 'row',
    },
    optionsText: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    optionsIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
})
