import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import Colors from './../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountryPicker from 'react-native-country-picker-modal';

class Input extends Component {
  state = {
    textColor: Colors.black,
    borderColor: Colors.lightgray,
    iconNameVisibility: 'visibility-off',
    secureTextEntry: this.props.password,
    cca2: 'US',
    countryCode: '+1',
  };

  updateColorOnBlur() {
    this.setState({
      textColor: Colors.black,
      borderColor: Colors.lightgray,
    });
  }

  updateColorOnFocus() {
    this.setState({
      textColor: Colors.lightblue,
      borderColor: Colors.lightblue,
    });
  }

  togglePasswordVisibility = () => {
    if (this.state.secureTextEntry) {
      this.setState({
        iconNameVisibility: 'visibility-off',
        secureTextEntry: false,
      });
    } else {
      this.setState({
        iconNameVisibility: 'visibility',
        secureTextEntry: true,
      });
    }
  };

  renderInput() {
    const {
      label,
      placeholder,
      value,
      onChangeText,
      reference,
      keyboardType,
      returnKeyType,
      onSubmitEditing,
      autoCapitalize,
      autoFocus,
      type,
      countryCode,
      changeCountryCode,
    } = this.props;

    const {
      viewStyleInput,
      textStyleInput,
      iconStyleVisibility,
      countryPicker,
      code,
    } = styles;

    const {
      borderColor,
      textColor,
      secureTextEntry,
      iconNameVisibility,
      cca2,
    } = this.state;

    switch (type) {
      case 'password':
        return (
          <View style={viewStyleInput}>
            <TextInput
              style={textStyleInput}
              onFocus={() => this.updateColorOnFocus()}
              onBlur={() => this.updateColorOnBlur()}
              underlineColorAndroid="white"
              autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              ref={reference}
              selectTextOnFocus
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              returnKeyType={returnKeyType}
              onSubmitEditing={onSubmitEditing}
              autoFocus={autoFocus}
              blurOnSubmit={false}
            />
            <View style={{ width: 30 }}>
              <Icon
                style={iconStyleVisibility}
                name={iconNameVisibility}
                size={25}
                color={borderColor}
                onPress={this.togglePasswordVisibility}
              />
            </View>
          </View>
        );

      case 'mobile':
        return (
          <View style={countryPicker}>
            <CountryPicker
              onChange={value => {
                this.setState({ cca2: value.cca2 });
                changeCountryCode(value.callingCode);
              }}
              closeable
              filterable
              cca2={cca2}
              translation="eng"
              styles={{ width: 60, justifyContent: 'center' }}
            />
            <TextInput value={countryCode} editable={false} style={code} />
            <TextInput
              style={textStyleInput}
              onFocus={() => this.updateColorOnFocus()}
              onBlur={() => this.updateColorOnBlur()}
              underlineColorAndroid="white"
              autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              ref={reference}
              selectTextOnFocus
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              returnKeyType={returnKeyType}
              onSubmitEditing={onSubmitEditing}
              autoFocus={autoFocus}
              blurOnSubmit={false}
            />
          </View>
        );

      default:
        return (
          <View style={viewStyleInput}>
            <TextInput
              style={textStyleInput}
              onFocus={() => this.updateColorOnFocus()}
              onBlur={() => this.updateColorOnBlur()}
              underlineColorAndroid="white"
              autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
              ref={reference}
              selectTextOnFocus
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              returnKeyType={returnKeyType}
              onSubmitEditing={onSubmitEditing}
              autoFocus={autoFocus}
              blurOnSubmit={false}
            />
          </View>
        );
    }
  }

  render() {
    const { label, required, requiredError } = this.props;

    const {
      viewStyleContainer,
      viewStyleLabel,
      textStyleLabel,
      textStyleRequired,
    } = styles;

    const { borderColor, textColor, secureTextEntry } = this.state;

    return (
      <View style={[viewStyleContainer, { borderBottomColor: borderColor }]}>
        <View style={viewStyleLabel}>
          <Text style={[textStyleLabel, { color: textColor }]}>{label}</Text>
          {required ? <Text style={textStyleRequired}>*</Text> : null}

          {requiredError ? (
            <Text style={textStyleRequired}>{requiredError}</Text>
          ) : null}
        </View>
        {this.renderInput()}
      </View>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 15,
    borderBottomWidth: 1,
    flexWrap: 'wrap',
  },
  viewStyleLabel: {
    flexDirection: 'row',
  },
  viewStyleInput: {
    flexDirection: 'row',
  },
  textStyleLabel: {
    fontSize: 16,
  },
  textStyleRequired: {
    color: Colors.red,
    paddingRight: 5,
    flexWrap: 'wrap',
  },
  textStyleInput: {
    height: 40,
    paddingLeft: 0,
    paddingBottom: 5,
    paddingTop: 5,
    color: Colors.black,
    fontWeight: 'normal',
    borderColor: 'white',
    borderWidth: 1,
    flex: 1,
    // alignItems: 'center',
    fontSize: 18,
  },
  iconStyleVisibility: {
    top: 15,
    right: 0,
    position: 'absolute',
  },
  countryPicker: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  code: {
    width: 60,
    height: 50,
    fontSize: 18,
    color: Colors.black,
    textAlign: 'right',
    fontWeight: 'normal',
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
  },
};

export { Input };
