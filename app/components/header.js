import React, {Component} from 'react'
import Expo from 'expo'
import {View, Text, StyleSheet, TouchableOpacity, NetInfo, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from './../config/colors'
import DrawerButton from './drawerButton'

export default class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            offline: false,
            online:false,
            firstTime: true
        }
    }

    componentWillMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({
                offline: !isConnected
            })
        })

        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange
        )
    }


    handleFirstConnectivityChange = (isConnected) => {
        this.setState({
            offline: !isConnected
        })
        if(!this.state.firstTime && isConnected){
            this.setState({
                online:true
            })
            setTimeout(()=>{
                this.setState({
                    online:false
                })
            },5000)
        }

        this.setState({
            firstTime: false
        })
    }

    render() {
        return (
            <View style={{paddingTop: Expo.Constants.statusBarHeight,backgroundColor:Colors.lightblue}}>
                {
                    this.props.noAccounts === true &&
                     <View style={{paddingVertical:4, paddingHorizontal: 20, backgroundColor:Colors.gold, justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white', textAlign: 'center'}}>
                            No accounts added yet.
                        </Text>
                    </View>
                }
                {
                    this.props.creditSwitch === false && this.props.debitSwitch === true &&
                     <View style={{paddingVertical:4, paddingHorizontal: 20, backgroundColor:Colors.red, justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white', textAlign: 'center'}}>
                            Deposits are temporarily disabled.
                        </Text>
                    </View>
                }
                {
                    this.props.debitSwitch === false && this.props.creditSwitch === true &&
                     <View style={{paddingVertical:4, paddingHorizontal: 20, backgroundColor:Colors.red, justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white', textAlign: 'center'}}>
                            Withdrawals are temporarily disabled.
                        </Text>
                    </View>
                }
                {
                    this.props.debitSwitch === false && this.props.creditSwitch === false &&
                     <View style={{paddingVertical:4, paddingHorizontal: 20, backgroundColor:Colors.red, justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white', textAlign: 'center'}}>
                            Transactions are temporarily disabled.
                        </Text>
                    </View>
                }
                {
                    this.state.offline &&
                    <View style={{paddingVertical:4,backgroundColor:Colors.red, justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white'}}>
                            No internet Connection
                        </Text>
                    </View>
                }
                {
                    this.state.online &&
                    <View style={{paddingVertical:4,backgroundColor:Colors.green, justifyContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white'}}>
                            Connected
                        </Text>
                    </View>
                }
                <View style={styles.options}>
                    <View style={styles.left}>
                        {this.props.drawer ?
                            <DrawerButton navigation={this.props.navigation}/> :
                            null
                        }
                        {this.props.back ?
                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack()}
                                style={{padding: 20}}>
                                <Icon
                                    name="ios-arrow-back"
                                    size={35}
                                    color="white"
                                />
                            </TouchableOpacity> :
                            null
                        }
                    </View>
                    <View style={styles.title}>
                        {this.props.title ?
                            <Text style={[styles.titleText, {fontSize: this.props.smallTitle ? 16 : 20}]}>
                                {this.props.title}
                            </Text> :
                            null
                        }
                    </View>
                    <View style={styles.rightIcon}>
                        {this.props.right ?
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('QRcodeScanner')}
                                style={{padding: 10}}>
                                <Icon
                                    name="ios-qr-scanner-outline"
                                    size={30}
                                    color="white"
                                    style={{paddingRight: 10}}
                                />
                            </TouchableOpacity> :
                            null
                        }
                        {this.props.homeRight ?
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('AccountsB')}
                                style={{flex: 1, padding: 10, alignItems: 'flex-end', justifyContent: 'flex-start'}}>
                                <Icon
                                    name="ios-arrow-up-outline"
                                    size={30}
                                    color="white"
                                    style={{paddingRight: 10}}
                                />
                            </TouchableOpacity> :
                            null
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    options: {
        width: "100%",
        flexDirection: 'row',
        backgroundColor: Colors.lightblue,
        height: 55 ,
    },
    left: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightIcon: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    titleText: {
        color: 'white',
        fontSize: 20,
    },
})
