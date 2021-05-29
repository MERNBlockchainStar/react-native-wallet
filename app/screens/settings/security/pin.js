import React, { Component } from 'react'
import { View, Alert, Text, StyleSheet } from 'react-native'
import Colors from './../../../config/colors'
import Header from './../../../components/header'

export default class ChangePassword extends Component {
    static navigationOptions = {
        title: 'Pin',
    }

    constructor() {
        super()
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    back
                    title="Pin"
                />
                <View style={styles.comment}>
                    <Text style={styles.commentText}>
                        Coming soon...
                    </Text>
                </View>
                <View style={[styles.pinInfo, { flex: 6 }]} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    comment: {
        flex: 2,
        backgroundColor: Colors.lightgray,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 30,
        paddingLeft: 30,
    },
    commentText: {
        fontSize: 16,
        textAlign: 'center',
        color: Colors.black,
    },
    pinInfo: {
        flex: 2,
        flexDirection: 'column',
        padding: 20,
    },
})

