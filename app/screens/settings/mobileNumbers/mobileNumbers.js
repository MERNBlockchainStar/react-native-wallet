import React, {Component} from 'react'
import {View, StyleSheet, ListView, Alert, AsyncStorage, TouchableHighlight, Text, RefreshControl} from 'react-native'
import {NavigationActions} from 'react-navigation'
import Spinner from 'react-native-loading-spinner-overlay'
import MobileNumber from './../../../components/mobileNumber'
import ResetNavigation from './../../../util/resetNavigation'
import SettingsService from './../../../services/settingsService'
import Colors from './../../../config/colors'
import Header from './../../../components/header'

export default class Settings extends Component {
    static navigationOptions = {
        title: 'Mobile numbers',
    }

    constructor(props) {
        super(props);
        this.state = {
            routeName: this.props.navigation.state.params ? this.props.navigation.state.params.name:null,
            refreshing: false,
            loading: false,
            loadingMessage: "",
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
            }),
            empty: false
        }
    }

    componentWillMount() {
        this.getData()
    }

    getData = async () => {
        this.setState({
            refreshing: true,
        })
        let responseJson = await SettingsService.getAllMobiles()
        if (responseJson.status === "success") {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)});
            const data = responseJson.data
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
        ResetNavigation.dispatchUnderDrawer(this.props.navigation, this.state.routeName != null ? 'GetVerified' : 'Settings', 'SettingsMobileNumbers')
    }

    makePrimary = async (id) => {
        this.setState({
            loading: true,
            loadingMessage: 'Updating...',
        })
        const body = {"primary": true}
        let responseJson = await SettingsService.makeMobilePrimary(id, body)

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
            mobile: number,
            company: user.company,
        }

        let responseJson = await SettingsService.resendMobileVerification(body)

        if (responseJson.status === "success") {
            this.setState({loading: false})
            this.props.navigation.navigate("VerifyMobileNumber", {routeName: this.state.routeName})
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

        let responseJson = await SettingsService.deleteMobile(id)

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
                    title="Mobile numbers"
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
                                No mobile number added yet
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
                        renderRow={(rowData) => <MobileNumber mobile={rowData} makePrimary={this.makePrimary}
                                                            verify={this.verify} delete={this.delete}
                                                            reload={this.reload}/>}
                    />
                }
                
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => this.props.navigation.navigate("AddMobileNumber", {routeName: this.state.routeName})}>
                    <Text style={{color: 'white', fontSize: 20}}>
                        Add mobile number
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
