import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableHighlight, ScrollView, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import Colors from './../config/colors'

export default class Options extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: Colors.black
        }
    }

    componentWillMount() {
        let color;
        if (this.props.buttonText === 'PENDING') {
            color = Colors.black
        } else if (this.props.buttonText === 'VERIFIED') {
            color = Colors.green
        } else if (this.props.buttonText === 'INCOMPLETE' || this.props.buttonText === 'DENIED') {
            color = Colors.red
        }

        this.setState({
            color: color
        })
    }

    render() {
        return (
            <View style={styles.options}>
                <TouchableWithoutFeedback onPress={() => this.props.goTo(this.props.gotoAddress, this.props.title)}>
                    <View style={styles.optionsElement}>
                        <ScrollView style={{flex: 1, marginRight: 8}}>
                            <TouchableOpacity onPress={() => this.props.goTo(this.props.gotoAddress, this.props.title)}>
                                <Text numberOfLines={1} style={[styles.optionsText, {color: Colors.black, fontSize: 16}]}>
                                    {this.props.title}
                                </Text>
                                <Text numberOfLines={1} style={styles.optionsText}>
                                    {this.props.subtitle}
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                        <View style={[styles.submit, {borderColor: this.state.color}]}>
                            <Text style={[styles.optionsText, {fontSize:13,color: this.state.color}]}>
                                {this.props.buttonText}
                            </Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    options: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgray
    },
    optionsElement: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionsText: {
        fontSize: 13,
        color: Colors.black,
    },
    submit: {
        paddingHorizontal: 10,
        height: 24,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
