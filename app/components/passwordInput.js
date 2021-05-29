import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import Colors from './../config/colors'
import Icon from "react-native-vector-icons/Ionicons";
import MIcon from 'react-native-vector-icons/MaterialIcons';

export default class Account extends Component {
    constructor() {
        super();
        this.state = {
            textColor: Colors.black,
            borderColor: Colors.lightgray,
            icEye: 'visibility-off',
            password: true
        }
    }

    changePwdType = () => {
        let newState;
        if (this.state.password) {
            newState = {
                icEye: 'visibility',
                password: false
            }
        } else {
            newState = {
                icEye: 'visibility-off',
                password: true
            }
        }

        // set new state value
        this.setState(newState)

    };

    render() {
        return (
            <View style={[styles.inputContainer, {borderBottomColor: this.state.borderColor}]}>
                {   this.props.editable ?
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.text, {color: this.state.textColor, flex: 1}]}>
                            {this.props.title}
                        </Text>
                        <Icon name="md-create"
                              size={35}
                              style={{padding: 10}}
                              onPress={this.props.editable}
                        />
                    </View> :
                    <View style={{flexDirection: 'row'}}>
                        <Text style={[styles.text, {color: this.state.textColor}]}>
                            {this.props.title}
                        </Text>
                        {
                            this.props.required?
                            <Text style={{paddingLeft:2,color: Colors.red}}>
                                *
                            </Text>:null
                        }

                        {
                            this.props.error &&
                                <Text style={[styles.errorText, {fontSize: this.props.error.length>50 ? 10 : 11,}]}
                                        numberOfLines={3}>
                                    {this.props.error}
                                </Text>
                        }
                    </View>
                }
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        onFocus={() => this.setState({
                            textColor: Colors.lightblue,
                            borderColor: Colors.lightblue
                        })}
                        onBlur={() => this.setState({
                            textColor: Colors.black,
                            borderColor: Colors.lightgray
                        })}
                        {...this.props}
                        ref={this.props.reference}
                        underlineColorAndroid="white"
                        secureTextEntry={this.state.password}
                        style={[styles.input, {fontSize: this.props.fontSize ? this.props.fontSize : 22}]}
                    />
                    <View style={{width:30}}>
                        <MIcon style={styles.icon}
                            name={this.state.icEye}
                            size={25}
                            color={this.state.borderColor}
                            onPress={this.changePwdType}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        flex:1,
        height: 50,
        paddingLeft: 0,
        paddingBottom: 10,
        paddingTop:15,
        color: Colors.black,
        fontWeight: 'normal',
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20,
        paddingTop:10,
        borderBottomWidth: 1,
    },
    errorText: {
        paddingTop:5,
        paddingBottom: 10,
        color:Colors.red,
        paddingLeft:5,
    },
    icon: {
        top:15,
        right:0,
        position: 'absolute'
    }
})
