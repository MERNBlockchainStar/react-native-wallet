import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    AsyncStorage,
    Alert,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from './../../../config/colors'
import Header from './../../../components/header'
import Option from './../../../components/getVerifiedOption'
import SettingsService from './../../../services/settingsService'
import UserInfoService from './../../../services/userInfoService'

export default class GetVerified extends Component {
    static navigationOptions = {
        title: 'Get verified',
    }

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            email: '',
            email_status: '',
            mobile_number: '',
            mobile_number_status: '',
            basic_info: '',
            basic_info_status: '',
            address: '',
            address_status: '',
            proof_of_identity: '',
            proof_of_identity_status: '',
            advance_proof_of_identity: '',
            advance_proof_of_identity_status: '',
            proof_of_address: '',
            proof_of_address_status: '',
            loading: true
        }
    }

    async componentWillMount() {
        this.getData()

        this.emails()

        this.mobiles()

        this.addresses()

        this.documents()
    }

    goTo = (path, name) => {
        this.props.navigation.navigate(path, {name})
    }

    getData = async () => {
        let user = await AsyncStorage.getItem('user')
        user = JSON.parse(user)
        this.setState({
            user: user,
            email: user.email,
            mobile_number: user.mobile_number,
            basic_info: user.first_name + ' ' + user.last_name,
            basic_info_status: user.status,
            address_status:user.kyc.addresses.status?user.kyc.addresses.status:'incomplete'
        })
    }

    emails = async () => {
        let responseJson = await SettingsService.getAllEmails()
        if (responseJson.status === "success") {
            const data = responseJson.data;
            for (let i = 0; i < data.length; i++) {
                if (data[i].verified === true) {
                    this.setState({
                        email_status: 'Verified'
                    })
                }
                if (data[i].primary === true) {
                    this.setState({
                        email: data[i].email
                    })
                }
            }
            if (this.state.email_status !== 'Verified') {
                this.setState({
                    email_status: 'Pending',
                })
            }
        }
        else {
            Alert.alert('Error',
                responseJson.message,
                [{text: 'OK'}])
        }
    }

    mobiles = async () => {
        let responseJsonMobile = await SettingsService.getAllMobiles()
        if (responseJsonMobile.status === 'success') {
            const data = responseJsonMobile.data
            if (data.length == 0) {
                this.setState({
                    mobile_number_status: 'Incomplete',
                    mobile_number: 'Not yet provided'
                })
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].verified) {
                        this.setState({
                            mobile_number_status: 'Verified'
                        })
                    }
                    if (data[i].primary) {
                        this.setState({
                            mobile_number: data[i].number
                        })
                    }
                }
                if (this.state.mobile_number_status != 'Verified') {
                    this.setState({
                        mobile_number_status: 'Pending',
                        mobile_number:data[0].number
                    })
                }
            }
        } else {
            Alert.alert('Error',
                responseJsonMobile.message,
                [{text: 'OK'}])
        }
    }

    addresses = async () => {
        let responseJsonAddress = await UserInfoService.getAddress()
        if (responseJsonAddress.status === 'success') {
            const data = responseJsonAddress.data
            let address='';
            if(data.line_1){
                address=address+data.line_1+','
            }
            if(data.line_2){
                address=address+data.line_2+','
            }
            if(data.city){
                address=address+data.city+','
            }
            if(data.state_province){
                address=address+data.state_province+','
            }
            if(data.country){
                address=address+data.country+','
            }
            if(data.postal_code){
                address=address+data.postal_code
            }

            this.setState({
                address: address
            })
        } else {
            Alert.alert('Error',
                responseJsonAddress.message,
                [{text: 'OK'}])
        }
    }

    documents = async () => {
        let responseJsonDocuments = await UserInfoService.getAllDocuments()

        if (responseJsonDocuments.status === 'success') {
            const data = responseJsonDocuments.data.results
            let idDocuments = data.filter(doc => doc.document_category === "Proof Of Identity")
            let idSelfieDocuments = data.filter(doc => doc.document_category === "Advanced Proof Of Identity")
            let addressDocuments = data.filter(doc => doc.document_category === "Proof Of Address")

            let idVerified = idDocuments.filter(doc => doc.status === 'verified')
            let idPending = idDocuments.filter(doc => doc.status === 'pending')
            let idDenied = idDocuments.filter(doc => doc.status === 'denied')
            if (idVerified.length > 0) {
                this.setState({
                    proof_of_identity_status: 'verified',
                    proof_of_identity: 'Verified'
                })
            } else if (idPending.length > 0) {
                this.setState({
                    proof_of_identity_status: 'pending',
                    proof_of_identity: 'Waiting for approval'
                })
            } else if (idDenied.length) {
                this.setState({
                    proof_of_identity_status: 'denied',
                    proof_of_identity: idDenied[0].note
                })
            } else {
                this.setState({
                    proof_of_identity_status: 'incomplete',
                    proof_of_identity: 'Not yet provided'
                })
            }

            let idSelfieVerified = idSelfieDocuments.filter(doc => doc.status === 'verified')
            let idSelfiePending = idSelfieDocuments.filter(doc => doc.status === 'pending')
            let idSelfieDenied = idSelfieDocuments.filter(doc => doc.status === 'denied')

            if (idSelfieVerified.length > 0) {
                this.setState({
                    advance_proof_of_identity_status: 'verified',
                    advance_proof_of_identity: 'Verified'
                })
            } else if (idSelfiePending.length > 0) {
                this.setState({
                    advance_proof_of_identity_status: 'pending',
                    advance_proof_of_identity: 'Waiting for approval'
                })
            } else if (idSelfieDenied.length > 0) {
                this.setState({
                    advance_proof_of_identity_status: 'denied',
                    advance_proof_of_identity: idSelfieDenied[0].note
                })
            } else {
                this.setState({
                    advance_proof_of_identity_status: 'incomplete',
                    advance_proof_of_identity: 'Not yet provided'
                })
            }

            let addressVerified = addressDocuments.filter(doc => doc.status === 'verified')
            let addressPending = addressDocuments.filter(doc => doc.status === 'pending')
            let addressDenied = addressDocuments.filter(doc => doc.status === 'denied')

            if (addressVerified.length > 0) {
                this.setState({
                    proof_of_address_status: 'verified',
                    proof_of_address: 'Verified'
                })
            } else if (addressPending.length > 0) {
                this.setState({
                    proof_of_address_status: 'pending',
                    proof_of_address: 'Waiting for approval'
                })
            } else if (addressDenied.length > 0) {
                this.setState({
                    proof_of_address_status: 'denied',
                    proof_of_address: idDenied[0].note
                })
            } else {
                this.setState({
                    proof_of_address_status: 'incomplete',
                    proof_of_address: 'Not yet provided'
                })
            }
            this.setState({
                loading: false
            })
        } else {
            Alert.alert('Error',
                responseJsonDocuments.message,
                [{text: 'OK'}])
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    drawer
                    title="Get verified"
                />
                <View style={styles.mainContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={{fontSize: 16}}>
                            Your default account is currently on tier 1. You can view your limits and fees by following
                            the links below. Complete the steps below if you want to increase your verification level.
                        </Text>
                        <View style={styles.buttonsContainer}>
                            <Text style={[styles.buttonText, {paddingRight: 8}]}>
                                Limits
                            </Text>
                            <Text style={[styles.buttonText, {paddingLeft: 8}]}>
                                Fees
                            </Text>
                        </View>
                    </View>
                    {
                        this.state.loading &&
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <ActivityIndicator size="large"/>
                        </View>
                    }
                    {   !this.state.loading &&
                    <ScrollView style={{flex: 1}}>
                        <Option title="Email address" subtitle={this.state.email}
                                buttonText={this.state.email_status.toUpperCase()}
                                gotoAddress="SettingsEmailAddresses" goTo={this.goTo}/>

                        <Option title="Mobile number" subtitle={this.state.mobile_number}
                                 buttonText={this.state.mobile_number_status.toUpperCase()}
                                 gotoAddress="SettingsMobileNumbers" goTo={this.goTo}/>

                        <Option title="Basic Info" subtitle={this.state.basic_info}
                                buttonText={this.state.basic_info_status.toUpperCase()}
                                gotoAddress="SettingsPersonalDetails" goTo={this.goTo}/>

                        <Option title="Address" subtitle={this.state.address}
                                buttonText={this.state.address_status.toUpperCase()}
                                gotoAddress="SettingsAddress" goTo={this.goTo}/>

                        <Option title="Proof of Identity" subtitle={this.state.proof_of_identity}
                                buttonText={this.state.proof_of_identity_status.toUpperCase()}
                                gotoAddress="Document" goTo={this.goTo}/>

                        {/* <Option title="Advanced Proof of Identity" subtitle={this.state.advance_proof_of_identity}
                                buttonText={this.state.advance_proof_of_identity_status.toUpperCase()}
                                gotoAddress="Document" goTo={this.goTo}/> */}

                        <Option title="Proof of Address" subtitle={this.state.proof_of_address}
                                buttonText={this.state.proof_of_address_status.toUpperCase()}
                                gotoAddress="Document" goTo={this.goTo}/>
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
        backgroundColor: 'white',
    },
    mainContainer: {
        flex: 1,
    },
    titleContainer: {
        padding: 20,
        backgroundColor: Colors.lightgray
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 10,
    },
    buttonText: {
        color: Colors.lightblue,
        fontSize: 16,
    }

})
