import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight, Image} from 'react-native'
import Colors from './../config/colors'

export default class Account extends Component {

    render() {
        return (
            <TouchableHighlight
                style={styles.options}
                underlayColor={'white'}
                onPress={() => this.props.getCurrencies(this.props.reference)}>
                <View style={styles.optionsElement}>
                    <View style={styles.icon}>
                        <Image
                            source={require('./../../assets/icons/placeholder.png')}
                            style={{height: 40, width: 40}}
                        />
                    </View>
                    <View style={styles.type}>
                        <Text style={{fontSize: 22, color: Colors.black}}>
                            {this.props.name}
                        </Text>
                        <Text style={{fontSize: 13, color: Colors.black}}>
                            {this.props.reference}
                        </Text>
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
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    optionsElement: {
        flex: 1,
        flexDirection: 'row',
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
    },
    type: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
})
