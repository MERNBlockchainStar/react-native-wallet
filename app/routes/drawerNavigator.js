import React from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'
import {DrawerNavigator, DrawerItems} from 'react-navigation'
import Home from './../screens/home/home'
import Deposit from './../screens/deposit/deposit'
import Settings from './../screens/settings/settings'
import Withdraw from './../screens/withdraw/withdraw'
import About from './../screens/about/about'
import Accounts from './../screens/accounts/accounts'
import NewAccounts from './../screens/accounts/newAccount'
import Receive from './../screens/receive/receive'
import Logout from './../screens/auth/logout'
import DrawerHeader from './../components/drawerHeader'
import GetVerified from './../screens/settings/getVerified/getVerified2'
import Colors from './../config/colors'
import Currencies from './../screens/accounts/accountsB'
import Transactions from './../screens/transactionHistory/transactionHistory'
import SendTo from './../screens/transfer/sendTo'

const RouteConfigs = {
    Home: {
        screen: Home,
    },
    Accounts: {
        screen: NewAccounts,
    },
    /*Currencies:{
        screen:Currencies
    },*/
    Transactions:{
        screen:Transactions
    },
    Deposit: {
        screen: Deposit,
    },
    Withdraw: {
        screen: Withdraw,
    },
    SendTo: {
        screen: SendTo,
    },
    Receive: {
        screen: Receive,
    },
    GetVerified:{
        screen: GetVerified,
    },
    Settings: {
        screen: Settings,
    },
    About: {
        screen: About,
    },
    Logout: {
        screen: Logout,
    },
}

export default DrawerNavigator(RouteConfigs, {
    drawerWidth: 300,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentComponent: (props) => (
        <View style={styles.container}>
            <DrawerHeader navigation={props.navigation}/>
            <ScrollView>
                <DrawerItems
                    {...props}
                    activeTintColor="#6EBDF7"
                    activeBackgroundColor="#485159"
                    inactiveTintColor="white"
                    inactiveBackgroundColor="transparent"
                    labelStyle={{margin: 15, alignItems: 'center', fontSize: 16, fontWeight: 'normal'}}
                />
            </ScrollView>
        </View>
    ),
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.drawerColor,
    },
})
