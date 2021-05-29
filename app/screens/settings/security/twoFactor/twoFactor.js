import React, {Component} from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import Colors from '../../../../config/colors'
import Header from '../../../../components/header'
import Option from '../../../../components/settingsOption'
import AuthService from '../../../../services/authService'

export default class TwoFactor extends Component {
    static navigationOptions = {
        title: 'Two factor',
    }

    goTo = async (path) => {
        let responseJson = await AuthService.twoFactorAuth()
        if (responseJson.status === "success") {
            const authInfo = responseJson.data
            this.props.navigation.navigate(path, {authInfo})
        }
        else {
            Alert.alert('Error',
                responseJson.message,
                [{text: 'OK'}])
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    back
                    title="Two factor"
                />
                <Option name="SMS" gotoAddress="TwoFactorSmsAuth" goTo={this.goTo}/>
                <Option name="Token" gotoAddress="TwoFactorToken" goTo={this.goTo}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    comment: {
        flex: 1,
        backgroundColor: Colors.lightgray,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 30,
        paddingLeft: 30,
    },
    commentText: {
        fontSize: 16,
        textAlign: 'center',
    },
})
