import React, {Component} from 'react'
import {View, StyleSheet, ListView, Alert, AsyncStorage, TouchableHighlight, Text, RefreshControl} from 'react-native'
import {NavigationActions} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import EmailAddress from './../../../components/emailAddress'
import ResetNavigation from './../../../util/resetNavigation'
import SettingsService from './../../../services/settingsService'
import Colors from './../../../config/colors'
import Header from './../../../components/header'

export default class Settings extends Component {
    static navigationOptions = {
        title: 'Email addresses',
    }

    constructor(props) {
        super(props);
        this.state = {
            routeName: this.props.navigation.state.params ? this.props.navigation.state.params.name:null,
            refreshing: false,
            loading: false,
            loadingMessage: '',
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
            }),
            empty: false,
        }
    }

    componentWillMount() {
        this.getData()
    }

    getData = async () => {
        this.setState({
            refreshing: true,
        })
        let responseJson = await SettingsService.getAllEmails()

        if (responseJson.status === "success") {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)});
            const data = responseJson.data;
            //console.log(data)
            if(data.length===0){
                this.setState({
                    empty:true,
                })
            }
            else {
                this.setState({
                    empty: false,
                })
            }
            let ids = data.map((obj, index) => index);
            this.setState({
                refreshing: false,
                dataSource: ds.cloneWithRows(data, ids),
            })
        }
        else {
            Alert.alert('Error',
                responseJson.message,
                [{text: 'OK'}])
        }
    }

    reload = () => {
        ResetNavigation.dispatchUnderDrawer(this.props.navigation, this.state.routeName != null ? 'GetVerified' : 'Settings', 'SettingsEmailAddresses')
    }

    makePrimary = async (id) => {
        this.setState({
            loading: true,
            loadingMessage: 'Updating...',
        })
        const body = {"primary": true}
        let responseJson = await SettingsService.makeEmailPrimary(id, body)

        if (responseJson.status === "success") {
            this.reload()
        }
        else {
            Alert.alert('Error',
                responseJson.message,
                [{text: 'OK'}])
        }
    }

    verify = async (number) => {
        this.setState({
            loading: true,
            loadingMessage: 'Sending verification code...',
        })
        const userData = await AsyncStorage.getItem('user')

        const user = JSON.parse(userData)

        const body = {
            email: number,
            company: user.company,
        }

        let responseJson = await SettingsService.resendEmailVerification(body)

        if (responseJson.status === "success") {
            Alert.alert(
                "Email Sent",
                "A verification email has been sent, please check your email box.",
                [{text: 'OK', onPress: () => this.setState({loading: false})}],
            )
        }
        else {
            Alert.alert('Error',
                responseJson.message,
                [{text: 'OK'}])
        }
    }

    delete = async (id) => {
        this.setState({
            loading: true,
            loadingMessage: 'Deleting...',
        })
        let responseJson = await SettingsService.deleteEmail(id)

        if (responseJson.status === "success") {
            this.reload()
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
                    title="Email addresses"
                />
                <Spinner
                    visible={this.state.loading}
                    textContent={this.state.loadingMessage}
                    textStyle={{color: '#FFF'}}
                />
                { this.state.empty &&
                    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 10}}>
                        <View style={{
                            marginTop: 10, flexDirection: 'column', backgroundColor: Colors.lightgray, padding: 20, alignItems:'center'
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: 'normal', color: Colors.black }}>
                                No email address added yet
                            </Text>
                        </View>
                    </View>
                }
                { !this.state.empty &&
                    <ListView
                        refreshControl={<RefreshControl refreshing={this.state.refreshing}
                                                        onRefresh={this.getData.bind(this)}/>}
                        dataSource={this.state.dataSource}
                        enableEmptySections
                        renderRow={(rowData) => <EmailAddress email={rowData} makePrimary={this.makePrimary}
                                                            verify={this.verify} delete={this.delete}
                                                            reload={this.reload}/>}
                    />
                }
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => this.props.navigation.navigate("AddEmailAddress",{routeName:this.state.routeName})}>
                    <Text style={{color: 'white', fontSize: 20}}>
                        Add email address
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    submit: {
        marginBottom: 10,
        marginHorizontal: 20,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.lightblue,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
