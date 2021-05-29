import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from './../config/colors'

export default class Options extends Component {

    render() {
        return (
            <TouchableHighlight
                style={styles.options}
                underlayColor={'white'}
                onPress={() => this.props.goTo(this.props.gotoAddress)}>
                <View style={styles.optionsElement}>
                    <Text style={styles.optionsText}>
                        {this.props.name}
                    </Text>
                    <View style={styles.optionsIcon}>
                        <Icon
                            name="angle-right"
                            size={32}
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsElement: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    optionsText: {
        flex: 1,
        fontSize: 18,
        color: Colors.black,
    },
    optionsIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
})
