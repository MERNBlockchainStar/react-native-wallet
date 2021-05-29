import React, {Component} from 'react'
import Expo from 'expo'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    NetInfo,
    Alert,
    Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from './../config/colors'
import DrawerButton from './drawerButton'

export default class HomeCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCard: true
        }
    }

    goto = (navigation) => {
        if (navigation) {
            this.props.navigation.navigate('GetVerified')
        } else {
            this.setState({
                showCard: false
            })
        }
    }

    render() {
        return (
            this.state.showCard ?
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={this.props.image}
                            resizeMode="contain"
                            style={styles.image}/>
                    </View>
                    <Text style={[styles.titleText, {fontWeight: 'bold'}]}>
                        {this.props.title}
                    </Text>
                    <Text style={[styles.titleText, {fontSize: 18}]}>
                        {this.props.text}
                    </Text>
                    <View style={styles.falseView}/>
                    <View style={{flexDirection:'row',flex:1,justifyContent:'flex-end',alignItems:'center'}}>
                        <Text style={styles.buttonText}
                              onPress={() => this.goto(this.props.navigation ? this.props.navigation : null)}>
                            {this.props.buttonText}
                        </Text>
                    </View>
                </View> :
                null

        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 15,
        marginTop: 20,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        marginVertical: 20,
        maxWidth: 250,
        height: 120,
    },
    logoimage: {
        maxWidth: 250,
        height: 120,
    },
    titleText: {
        color: Colors.black,
        fontSize: 20,
        paddingVertical: 5
    },
    buttonBar: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        paddingVertical: 10,
        justifyContent: 'center',
    },
    submit: {
        backgroundColor: 'white',
        height: 50,
        flex: 1,
        borderRadius: 25,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.lightblue,
        fontSize: 18,
    },
    falseView: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgray,
        marginVertical: 15,
        marginHorizontal: -20
    }
})
