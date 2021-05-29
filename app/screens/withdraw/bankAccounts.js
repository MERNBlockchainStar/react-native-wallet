import React, { Component } from 'react'
import { View, ListView, StyleSheet, Alert, TouchableHighlight, Text, RefreshControl } from 'react-native'
import Account from './../../components/bankAccount'
import SettingsService from './../../services/settingsService'
import Colors from './../../config/colors'
import Header from './../../components/header'

export default class BankAccounts extends Component {
    static navigationOptions = {
        title: 'Select bank account',
    }

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
            }),
            empty:false,
        }
    }

    componentWillMount() {
        this.getData()
    }

    getAmount = (reference) => {
        this.props.navigation.navigate("WithdrawalAmountEntry", { reference })
    }

    getData = async () => {
        this.setState({
            refreshing: true,
        })
        let responseJson = await SettingsService.getAllBankAccounts()
        //console.log(responseJson)
        if (responseJson.status === "success") {
            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) =>
                    JSON.stringify(r1) !== JSON.stringify(r2),
            })
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

            if (data.length === 0) {
                Alert.alert('No bank accounts exists',
                    'Do you want to create new bank account?',
                    [
                        {
                            text: 'Yes',
                            onPress: () => this.props.navigation.navigate("AddBankAccount", {
                                parentRoute: 'Withdraw',
                                nextRoute: 'BankAccounts'
                            })
                        },
                        { text: 'No' },
                    ]
                )
            }
        }
        else {
            this.setState({
                refreshing: false,
            })
            Alert.alert('Error',
                responseJson.message,
                [{ text: 'OK' }])
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    back
                    title="Select bank account"
                />
                { this.state.empty &&
                    <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 10}}>
                        <View style={{
                            marginTop: 10, flexDirection: 'column', backgroundColor: Colors.lightgray, padding: 20, alignItems:'center'
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: 'normal', color: Colors.black }}>
                                No bank accounts added yet
                            </Text>
                        </View>
                    </View>
                }
                { !this.state.empty &&
                    <ListView
                        refreshControl={<RefreshControl refreshing={this.state.refreshing}
                            onRefresh={this.getData.bind(this)} />}
                        dataSource={this.state.dataSource}
                        enableEmptySections
                        renderRow={(rowData) => <Account onPress={this.getAmount} reference={rowData.code}
                            name={rowData.bank_name} />}
                    />
                }
                
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => this.props.navigation.navigate("AddBankAccount", {
                        parentRoute: 'Withdraw',
                        nextRoute: 'BankAccounts'
                    })}>
                    <Text style={{ color: 'white', fontSize: 20 }}>
                        Add bank account
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
        backgroundColor: Colors.lightblue,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
