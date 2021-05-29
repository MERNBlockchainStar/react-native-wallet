import React, {Component} from 'react'
import {
    ScrollView,
    View,
    ListView,
    StyleSheet,
    Text,
    Alert,
    RefreshControl,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import UserInfoService from './../../services/userInfoService'
import AccountService from './../../services/accountService'
import CurrencyCircle from './../../components/currencyCircle'
import AccountsBCurrency from './../../components/accountsBCurrency'
import CurrencyCircleUnselected from './../../components/currencyCircleUnselected'
import Header from './../../components/header'
import ResetNavigation from './../../util/resetNavigation'
import Account from './../../components/accountB'
import Colors from './../../config/colors'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2)});

export default class Accounts extends Component {
    static navigationOptions = {
        title: 'Currencies',
    }

    constructor(props) {
        super(props);
        this.state = {
            activeCurrency: '',
            isShown: true,
            balance: 0,
            symbol: '',
            loading: true,
            currencyLoading: true,
            activeCurrencyDescription: '',
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
            }),
            accountDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
            }),
            showIcon: false,
        }
    }

    componentWillMount() {
        //this.getAllCompanyCurrencies()
        this.getActiveAccount()
    }

    getActiveAccount = async () => {
        let responseJson = await UserInfoService.getActiveAccount()
        if (responseJson.status === 'success') {
            let data = responseJson.data.results
            this.setViewAccount(data[0].currencies[0].currency)
        }
    }
    setBalance = (balance, divisibility) => {
        for (let i = 0; i < divisibility; i++) {
            balance = balance / 10
        }
        let balanceString = balance.toString()
        return balance
    }
    setViewAccount = async (rowData) => {
        this.setState({
            activeCurrency: rowData.code,
            symbol: rowData.symbol,
            activeCurrencyDescription: rowData.description,
            isShown: true,
            currencyLoading:true,
            loading: true,
        })
        this.getSelectedCurrencyBalance(rowData.code)
    }

    setActiveCurrency = async (reference, code) => {
        Alert.alert(
            'Are you sure?',
            'Change your active account.',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                {
                    text: 'OK', onPress: async () => {
                    let responseJson = await AccountService.setActiveCurrency(reference, code)
                    if (responseJson.status === 'success') {
                        this.getActiveAccount()

                    } else {
                        Alert.alert('Error',
                            responseJson.message,
                            [{text: 'OK'}])
                    }
                }
                },
            ]
        )
    }

    getSelectedCurrencyBalance = async (code) => {
        let companyCurrencyResponse = await UserInfoService.getAllCompanyCurrencies()
        if (companyCurrencyResponse.status === 'success') {
            let data = companyCurrencyResponse.data.results
            let uniqueCompanyCurrencyResponse = data.filter((currency) => {
                return currency.code != code
            })
            let length = uniqueCompanyCurrencyResponse.length
            for (let i = 0; i < length; i++) {
                let responseJson = await AccountService.getSelectedCurrency(uniqueCompanyCurrencyResponse[i].code)
                if (responseJson.data.count === 0) {
                    uniqueCompanyCurrencyResponse.splice(i, 1)
                }
            }
            if (uniqueCompanyCurrencyResponse.length > 0) {
                this.setState({
                    showIcon: true,
                })
            }
            this.setState({
                dataSource: ds.cloneWithRows(uniqueCompanyCurrencyResponse),
                currencyLoading: false,
            })
        }
        this.getAccountList(code)
    }

    getAccountList = async (code) => {
        let responseJson = await AccountService.getSelectedCurrency(code)
        if (responseJson.status === 'success') {
            let data = responseJson.data.results
            let i, j, balance = 0, account = [];
            for (i = 0; i < data.length; i++) {
                account = data[i].currencies.filter(account => account.currency.code === code)
                if (account.length > 0) {
                    balance = balance + account[0].available_balance
                }
            }
            if (account.length > 0) {
                this.setState({
                    balance: this.setBalance(balance, account[0].currency.divisibility),
                    accountDataSource: ds.cloneWithRows(data),
                    loading: false,
                })
                return true;
            }
            else {
                Alert.alert('Error',
                    'No account available for this currency.',
                    [{
                        text: 'OK', onPress: () => {
                            this.setState({
                                balance: this.setBalance(0, 2),
                                accountDataSource: ds.cloneWithRows([]),
                                loading: false,
                            })
                        }
                    }])
            }
        } else {
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
                    drawer
                    title="Currencies"
                />
                <ScrollView showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            style={{backgroundColor: Colors.whitesmoke, height: 40}}>
                    <View style={styles.currencyListHeader}>
                        <CurrencyCircle code={this.state.activeCurrency}/>
                        <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10}}>
                            {
                                this.state.currencyLoading &&
                                <View style={{
                                    backgroundColor: Colors.whitesmoke,
                                    height: 70,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <ActivityIndicator size="large"
                                    />
                                </View>
                            }
                            {
                                !this.state.currencyLoading &&
                                <ListView
                                    pagingEnabled={true}
                                    horizontal={true}
                                    removeClippedSubviews={false}
                                    showsHorizontalScrollIndicator={false}
                                    style={{flexDirection: 'row'}}
                                    dataSource={this.state.dataSource}
                                    enableEmptySections
                                    renderRow={(rowData) => <CurrencyCircleUnselected currency={rowData}
                                                                                      setViewAccount={this.setViewAccount}/>}
                                />
                            }
                        </View>
                    </View>
                </ScrollView>
                <View style={{flex: 1, flexDirection: 'row', backgroundColor: Colors.whitesmoke}}>
                    <View style={{flex: 1, paddingHorizontal: 20, justifyContent: 'center'}}>
                        <Text style={{color: Colors.darkestgray, fontSize: 16}}>
                            {this.state.activeCurrencyDescription}
                        </Text>
                        <Text style={{color: Colors.darkestgray, fontSize: 16}}>
                            {this.state.symbol}{this.state.balance.toFixed(4).replace(/0{0,2}$/, "")}
                        </Text>
                    </View>
                    {
                        this.state.showIcon &&
                        <TouchableHighlight
                            style={{paddingHorizontal: 20, justifyContent: 'center'}}
                            underlayColor={Colors.whitesmoke}
                            onPress={() => this.setState({
                                isShown: !this.state.isShown
                            })}>
                            <Icon
                                name="ios-arrow-up-outline"
                                size={30}
                                color={Colors.darkestgray}
                            />
                        </TouchableHighlight>
                    }
                </View>
                <View style={{flex: 7, flexDirection: 'column', backgroundColor: 'white'}}>
                    {!this.state.isShown &&
                    <ScrollView>
                        <ListView
                            style={{backgroundColor: 'white', borderTopColor: Colors.lightgray, borderTopWidth: 1}}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => <AccountsBCurrency currency={rowData}
                                                                       setViewAccount={this.setViewAccount}/>}
                        />
                    </ScrollView>
                    }
                    {this.state.isShown &&
                    <ScrollView>
                        <View style={{
                            padding: 10,
                            paddingHorizontal: 20,
                            justifyContent: 'center',
                            backgroundColor: Colors.darkergray,
                        }}>
                            <Text style={{color: Colors.darkestgray, fontWeight: 'bold', fontSize: 12}}>
                                DEFAULT ACCOUNTS
                            </Text>
                        </View>
                        {
                            this.state.loading &&
                            <ActivityIndicator style={{padding: 10}}
                                               size="large"
                            />
                        }
                        {
                            !this.state.loading &&
                            <ListView
                                style={{backgroundColor: 'white', borderTopColor: Colors.lightgray, borderTopWidth: 1}}
                                dataSource={this.state.accountDataSource}
                                renderRow={(rowData) => <Account
                                    name={rowData.name}
                                    reference={rowData.reference}
                                    symbol={this.state.symbol}
                                    setActiveCurrency={this.setActiveCurrency}
                                    enableEmptySections
                                    code={this.state.activeCurrency}
                                    currencies={rowData.currencies}/>}

                            />
                        }
                        {/*<Account name={"Cheque account"} symbol={"R"} amount={500.00} active={true}/>
                         <Account name={"Savings account"} symbol={"R"} amount={500.00} active={false}/>
                         <View style={styles.account}>
                         <Text style={{color: Colors.black, fontSize: 20}}>
                         Your ACCOUNTS
                         </Text>
                         </View>
                         <Account name={"Cheque account"} symbol={"R"} amount={500.00} active={false}/>
                         <Account name={"Savings account"} symbol={"R"} amount={500.00} active={false}/>*/}
                        {/*<Text style={styles.addAccountText}
                         onPress={() => this.props.navigation.navigate('AddAccountB')}>
                         Add account
                         </Text>*/}
                    </ScrollView>
                    }
                </View>
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
    currencyListHeader: {
        paddingVertical: 20,
        paddingBottom: 0,
        paddingLeft: 20,
        flexDirection: 'row',
        backgroundColor: Colors.whitesmoke
    },
    account: {
        height: 50,
        padding: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: Colors.lightgray
    },
    addAccountText: {
        color: Colors.lightblue,
        padding: 10,
        paddingHorizontal: 20,
        fontSize: 17
    },
})
