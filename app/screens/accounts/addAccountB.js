import React, {Component} from 'react'
import {
    ScrollView,
    View,
    ListView,
    StyleSheet,
    Text,
    Alert,
    RefreshControl,
    KeyboardAvoidingView,
    TouchableHighlight
} from 'react-native'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons'
import AccountService from './../../services/accountService'
import CurrencyCircle from './../../components/currencyCircle'
import CurrencyCircleUnselected from './../../components/currencyCircleUnselected'
import Header from './../../components/header'
import Account from './../../components/accountB'
import Colors from './../../config/colors'
import TextInput from "../../components/textInput";

export default class Accounts extends Component {
    static navigationOptions = {
        title: 'Add Account',
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => JSON.stringify(r1) !== JSON.stringify(r2),
            }),
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    back
                    title="Accounts"
                />
                {/*<KeyboardAvoidingView style={styles.mainContainer} behavior={'padding'}>
                    <TextInput
                        title="Account Name"
                        placeholder="e.g. savings"
                        underlineColorAndroid="white"
                    />
                    <TouchableHighlight
                        style={styles.submit}
                        onPress={() => console.log("Next button Pressed")}>
                        <Text style={{color: 'white', fontSize: 20}}>
                            Next
                        </Text>
                    </TouchableHighlight>
                </KeyboardAvoidingView>*/}
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
        flexDirection: 'column',
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
    mainContainer: {
        flex: 1,
        paddingTop:10,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    account: {
        height: 50,
        padding: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: Colors.lightgray
    },
    addAccount: {
        color: Colors.lightblue,
        padding: 10,
        paddingHorizontal: 20,
        fontSize: 17
    },
    submit: {
        marginHorizontal: 20,
        marginBottom:10,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.lightblue,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
