import {StackNavigator} from 'react-navigation'

import Home from './drawerNavigator'
import Login from './../screens/auth/login'
import InitialScreen from './../screens/home/initialScreen'
import Signup from './../screens/auth/signup'
import AuthVerifyMobile from './../screens/auth/verifyMobile'
import ForgetPassword from './../screens/auth/forgetPassword'
import BankAccounts from './../screens/withdraw/bankAccounts'
import BitcoinAddresses from './../screens/withdraw/bitcoinAddresses'
import WithdrawalAmountEntry from './../screens/withdraw/amountEntry'
import SendMoney from './../screens/transfer/amountEntry'
import SendTo from './../screens/transfer/sendTo'
import QRcodeScanner from './../screens/transfer/qrcodeScanner'
import AccountsB from './../screens/accounts/accountsB'
import NewAccount from './../screens/accounts/newAccount'
import AddAccountB from './../screens/accounts/addAccountB'
import AccountCurrencies from './../screens/accounts/accountCurrencies'
import UploadImage from './../screens/settings/profileImage/uploadImage'
import SettingsPersonalDetails from './../screens/settings/personalDetails'
import SettingsMobileNumbers from './../screens/settings/mobileNumbers/mobileNumbers'
import AddMobileNumber from './../screens/settings/mobileNumbers/addMobileNumber'
import VerifyMobileNumber from './../screens/settings/mobileNumbers/verifyMobile'
import SettingsEmailAddresses from './../screens/settings/emailAddresses/emailAddresses'
import AddEmailAddress from './../screens/settings/emailAddresses/addEmailAddress'
import SettingsGetVerified from './../screens/settings/getVerified/getVerified'
import Document from './../screens/settings/getVerified/document'
import DocumentUpload from './../screens/settings/getVerified/documentUpload'
import SettingsAddress from './../screens/settings/address'
import SettingsBankAccounts from './../screens/settings/bankAccounts/bankAccounts'
import SettingsBitcoinAddresses from './../screens/settings/bitcoinAddresses/bitcoinAddresses'
import AddBankAccount from './../screens/settings/bankAccounts/addBankAccount'
import EditBankAccount from './../screens/settings/bankAccounts/editBankAccount'
import AddBitcoinAddress from './../screens/settings/bitcoinAddresses/addBitcoinAddress'
import EditBitcoinAddress from './../screens/settings/bitcoinAddresses/editBitcoinAddress'
import SettingsCards from './../screens/settings/cards'
import SettingsSecurity from './../screens/settings/security/security'
import ChangePassword from './../screens/settings/security/changePassword'
import TwoFactor from '../screens/settings/security/twoFactor/twoFactor'
import TwoFactorSmsAuth from '../screens/settings/security/twoFactor/twoFactorSmsAuth'
import TwoFactorToken from '../screens/settings/security/twoFactor/twoFactorToken'
import AuthVerifySms from '../screens/settings/security/twoFactor/authoVerifySms'
import Pin from './../screens/settings/security/pin'
import SettingsNotifications from './../screens/settings/notifications/notifications'
import EmailNotifications from './../screens/settings/notifications/emailNotifications'
import MobileNotifications from './../screens/settings/notifications/mobileNotifications'
import NoNetConnection from './../screens/home/noNetConnection'

const Stack = {
    Home: {
        screen: Home,
    },
    NoNetConnection: {
        screen: NoNetConnection,
    },
    InitialScreen: {
        screen: InitialScreen
    },
    Login: {
        screen: Login,
    },
    Signup: {
        screen: Signup,
    },
    AuthVerifyMobile: {
        screen: AuthVerifyMobile,
    },
    ForgetPassword: {
        screen: ForgetPassword,
    },
    BankAccounts: {
        screen: BankAccounts,
    },
    BitcoinAddresses: {
        screen: BitcoinAddresses,
    },
    WithdrawalAmountEntry: {
        screen: WithdrawalAmountEntry,
    },
    SendMoney: {
        screen: SendMoney,
    },
    // SendTo: {
    //     screen: SendTo,
    // },
    QRcodeScanner: {
        screen: QRcodeScanner,
    },
    AccountsB: {
        screen: AccountsB,
    },
    NewAccount:{
        screen:NewAccount
    },
    AddAccountB: {
        screen: AddAccountB
    },
    AccountCurrencies: {
        screen: AccountCurrencies,
    },
    UploadImage: {
        screen: UploadImage,
    },
    SettingsPersonalDetails: {
        screen: SettingsPersonalDetails,
    },
    SettingsMobileNumbers: {
        screen: SettingsMobileNumbers,
    },
    AddMobileNumber: {
        screen: AddMobileNumber,
    },
    VerifyMobileNumber: {
        screen: VerifyMobileNumber,
    },
    SettingsEmailAddresses: {
        screen: SettingsEmailAddresses,
    },
    AddEmailAddress: {
        screen: AddEmailAddress,
    },
    SettingsGetVerified: {
        screen: SettingsGetVerified,
    },
    Document: {
        screen: Document,
    },
    DocumentUpload: {
        screen: DocumentUpload,
    },
    SettingsAddress: {
        screen: SettingsAddress,
    },
    SettingsBankAccounts: {
        screen: SettingsBankAccounts,
    },
    SettingsBitcoinAddresses: {
        screen: SettingsBitcoinAddresses,
    },
    AddBankAccount: {
        screen: AddBankAccount,
    },
    EditBankAccount: {
        screen: EditBankAccount,
    },
    AddBitcoinAddress: {
        screen: AddBitcoinAddress,
    },
    EditBitcoinAddress: {
        screen: EditBitcoinAddress,
    },
    SettingsCards: {
        screen: SettingsCards,
    },
    SettingsSecurity: {
        screen: SettingsSecurity,
    },
    ChangePassword: {
        screen: ChangePassword,
    },
    TwoFactor: {
        screen: TwoFactor,
    },
    TwoFactorSmsAuth: {
        screen: TwoFactorSmsAuth,
    },
    TwoFactorToken: {
        screen: TwoFactorToken,
    },
    AuthVerifySms: {
        screen: AuthVerifySms
    },
    Pin: {
        screen: Pin,
    },
    SettingsNotifications: {
        screen: SettingsNotifications,
    },
    EmailNotifications: {
        screen: EmailNotifications,
    },
    MobileNotifications: {
        screen: MobileNotifications,
    },
}


export default StackNavigator(Stack, {
    headerMode: 'none',
})
// export default StackNavigator({
//   Home: {
//     name: 'Home',
//     screen: DrawerNavigator(
//       DrawerRoutes,
//         {
//           navigationOptions: StackNavigationOptions,
//         // contentComponent: (props) => (
//         //   <View style={styles.container}>
//         //     <DrawerHeader navigation={props.navigation} />
//         //     <ScrollView >
//         //       <DrawerOption name="Home" gotoAddress="Home" navigation={props.navigation} />
//         //       <DrawerOption name="Deposit" gotoAddress="Deposit" navigation={props.navigation} />
//         //       <DrawerOption name="Withdraw" gotoAddress="Withdraw" navigation={props.navigation} />
//         //       <DrawerOption name="Receive" gotoAddress="Receive" navigation={props.navigation} />
//         //       <DrawerOption name="Accounts" gotoAddress="Accounts" navigation={props.navigation} />
//         //       <DrawerOption name="Settings" gotoAddress="Settings" navigation={props.navigation} />
//         //       <DrawerOption name="About" gotoAddress="About" navigation={props.navigation} />
//         //       <DrawerOption name="Logout" gotoAddress="Logout" navigation={props.navigation} />
//         //     </ScrollView>
//         //   </View>
//         // ),
//         contentComponent: (props) => (
//           <View style={styles.container}>
//             <DrawerHeader navigation={props.navigation} />
//             <ScrollView >
//               <DrawerItems
//                 {...props}
//                 activeTintColor="#6EBDF7"
//                 activeBackgroundColor="#485159"
//                 inactiveTintColor="white"
//                 inactiveBackgroundColor="transparent"
//                 labelStyle={{ margin: 15, alignItems: 'center', fontSize: 16, fontWeight: 'normal' }}
//               />
//             </ScrollView>
//           </View>
//         ),
//       }
//     ),
//   },
//   Stack: {
//     screen: StackNavigator(Stack, {
//       initialRouteName: 'Home',
//       navigationOptions: StackNavigationOptions,
//     }),
//   },
// },
//   {
//     headerMode: 'none',
//   }
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: Colors.drawerColor,
//   },
// })
