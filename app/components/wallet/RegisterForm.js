import React, { Component } from 'react';
import { KeyboardAvoidingView, findNodeHandle } from 'react-native';

import { Input, Spinner, Button, InputForm, Checkbox } from './../common';
import Colors from './../../config/colors';
import AuthService from './../../services/authService';
import Auth from './../../util/auth';
import { IsEmail } from './../../util/validation';

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

class RegisterForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    emailError: '',
    mobileNumber: null,
    mobileNumberError: null,
    countryName: 'US',
    countryCode: '+1',
    lineNumber: null,
    company: '',
    companyError: null,
    password: '',
    passwordError: true,
    password2: '',
    password2Error: true,
    terms: false,
    termsError: '',
    loading: false,
    nodeToScrollTo: null,
  };

  onButtonPress() {
    if (this.validation()) {
      let lineNumber = this.state.lineNumber;
      let mobileNumber = '';
      if (lineNumber != null && lineNumber.length > 0) {
        mobileNumber = this.state.countryCode + lineNumber;
      }
      let data = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        company: this.state.company,
        password1: this.state.password,
        password2: this.state.password2,
        mobile_number: mobileNumber,
        terms_and_conditions: this.state.terms,
      };
      this.performRegister(data);
    }
  }

  validation() {
    let emailStatus = this.validationEmail();
    let mobileNumberStatus = this.validationMobileNumber();
    let companyStatus = this.validationCompany();
    let passwordStatus = this.validationPassword();
    let password2Status = this.validationPassword2();

    let nodeToScrollTo = null;

    if (!emailStatus) {
      nodeToScrollTo = this.email;
    } else if (!mobileNumberStatus) {
      nodeToScrollTo = this.lineNumber;
    } else if (!companyStatus) {
      nodeToScrollTo = this.company;
    } else if (!passwordStatus) {
      nodeToScrollTo = this.password;
    } else if (!password2Status) {
      nodeToScrollTo = this.password2;
    }

    if (
      emailStatus &&
      companyStatus &&
      passwordStatus &&
      password2Status &&
      mobileNumberStatus
    ) {
      return true;
    }

    this._scrollToInput(nodeToScrollTo);
    return false;
  }

  validationEmail() {
    const { email } = this.state;

    let emailStatus = false;
    let emailError = null;

    if (email != null && IsEmail(email)) {
      emailStatus = true;
    } else {
      emailError = 'Please enter a valid email address';
    }
    this.setState({ emailError });
    return emailStatus;
  }

  validationMobileNumber() {
    const { lineNumber, countryCode } = this.state;

    let mobileNumberStatus = true;
    let mobileNumberError = null;
    let mobileNumber = null;
    if (lineNumber != null && lineNumber.length > 0) {
      mobileNumberStatus = false;
      mobileNumber = countryCode + lineNumber;
      const number = phoneUtil.parseAndKeepRawInput(mobileNumber);
      if (phoneUtil.isValidNumber(number)) {
        mobileNumberStatus = true;
      } else {
        mobileNumberError =
          '  Please enter a valid mobile number or leave blank';
      }
    }
    this.setState({ mobileNumber, mobileNumberError });
    return mobileNumberStatus;
  }

  validationCompany() {
    const { company } = this.state;
    let companyStatus = false;
    let companyError = null;
    if (company != null && company.length > 0) {
      companyStatus = true;
    } else {
      companyError = 'Please enter a company ID';
    }
    this.setState({ companyError });
    return companyStatus;
  }

  validationPassword() {
    const { password } = this.state;
    let passwordStatus = false;
    let passwordError = null;
    if (password != null && password.length >= 8) {
      passwordStatus = true;
    } else {
      passwordError =
        'Must be at least 8 characters aand test the length liek this ';
    }
    this.setState({ passwordError });
    return passwordStatus;
  }

  validationPassword2() {
    const { password, password2 } = this.state;
    let password2Status = false;
    let password2Error = null;
    if (password2 == null && password2.length == 0) {
      password2Error = 'Please confirm your password';
    } else if (password2.length < 8) {
      password2Error = 'Must be at least 8 characters';
    } else if (password != password2) {
      password2Error = 'Passwords do not match';
    } else {
      password2Status = true;
    }
    this.setState({ password2Error });
    return password2Status;
  }

  changeCountryCode = (code, cca2) => {
    this.setState({
      countryCode: '+' + code,
      countryName: cca2,
    });
  };

  performRegister = async data => {
    let responseJson = await AuthService.signup(data);
    if (responseJson.status === 'success') {
      const loginInfo = responseJson.data;
      if (data.mobile_number) {
        this.props.navigation.navigate('AuthVerifyMobile', {
          loginInfo,
          signupInfo: this.state,
        });
      } else {
        Auth.login(this.props.navigation, loginInfo);
      }
    } else {
      this.handleFailedResponse(responseJson.data);
    }
  };

  handleFailedResponse(data) {
    if (data.email) {
      this.setState({
        emailError: data.email,
      });
    }
    if (data.mobile_number) {
      this.setState({
        mobileNumberError: ' ' + data.mobile_number,
      });
    }
    if (data.company) {
      this.setState({
        companyError: data.company,
      });
    }
    if (data.terms_and_conditions) {
      this.setState({
        termsError: '* Please accept the terms of use',
      });
    }
  }

  _scrollToInput(inputHandle) {
    inputHandle.focus();
    setTimeout(() => {
      let scrollResponder = this.myScrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(inputHandle),
        200,
        true,
      );
    }, 100);
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      emailError,
      lineNumber,
      countryName,
      countryCode,
      mobileNumberError,
      company,
      companyError,
      password,
      passwordError,
      password2,
      password2Error,
      terms,
      termsError,
    } = this.state;

    const { containerStyle } = styles;

    return (
      <KeyboardAvoidingView
        style={containerStyle}
        behavior={'padding'}
        keyboardVerticalOffset={5}>
        <InputForm
          reference={scrollView => {
            this.myScrollView = scrollView;
          }}>
          <Input
            label="First name"
            placeholder="e.g. Jon"
            onChangeText={firstName => this.setState({ firstName })}
            value={firstName}
            autoCapitalize={'words'}
            autoFocus
            returnKeyType="next"
            reference={input => {
              this.firstName = input;
            }}
            onSubmitEditing={() => {
              this._scrollToInput(this.lastName);
            }}
          />
          <Input
            label="Last name"
            placeholder="e.g. Snow"
            onChangeText={lastName => this.setState({ lastName })}
            value={lastName}
            autoCapitalize={'words'}
            returnKeyType="next"
            reference={input => {
              this.lastName = input;
            }}
            onSubmitEditing={() => {
              this._scrollToInput(this.email);
            }}
          />
          <Input
            placeholder="e.g. user@gmail.com"
            label="Email"
            value={email}
            required
            requiredError={emailError}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            returnKeyType="next"
            reference={input => {
              this.email = input;
            }}
            onSubmitEditing={() => {
              this.validationEmail();
              this._scrollToInput(this.lineNumber);
            }}
          />
          <Input
            type="mobile"
            placeholder="12345678"
            label="Mobile"
            value={lineNumber}
            requiredError={mobileNumberError}
            keyboardType="numeric"
            onChangeText={lineNumber => this.setState({ lineNumber })}
            returnKeyType="next"
            changeCountryCode={this.changeCountryCode}
            countryCode={countryCode}
            countryName={countryName}
            reference={input => {
              this.lineNumber = input;
            }}
            onSubmitEditing={() => {
              this.validationMobileNumber();
              this._scrollToInput(this.company);
            }}
          />
          <Input
            placeholder="e.g. bitmedsa"
            label="Company"
            required
            requiredError={companyError}
            value={company}
            onChangeText={company => this.setState({ company })}
            reference={input => {
              this.company = input;
            }}
            onSubmitEditing={() => {
              this.validationCompany();
              this._scrollToInput(this.password);
            }}
            returnKeyType="next"
          />
          <Input
            type="password"
            placeholder="Password"
            label="Password"
            required
            requiredError={passwordError}
            value={password}
            password={true}
            onChangeText={password => this.setState({ password })}
            returnKeyType="next"
            reference={input => {
              this.password = input;
            }}
            onSubmitEditing={() => {
              this.validationPassword();
              this._scrollToInput(this.password2);
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            label="Confirm password"
            required
            requiredError={password2Error}
            value={password2}
            password={true}
            onChangeText={password2 => this.setState({ password2 })}
            returnKeyType="done"
            reference={input => {
              this.password2 = input;
            }}
            onSubmitEditing={this.onButtonPress.bind(this)}
          />
          <Checkbox
            onPress={() =>
              this.setState({
                terms: !terms,
              })
            }
            value={terms}
            requiredError={termsError}
            label={'I agree to the'}
            link={'https://rehive.com/legal/'}
            linkLabel={'terms of use'}
          />
          <Button label="REGISTER" onPress={this.onButtonPress.bind(this)} />
        </InputForm>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    // backgroundColor: 'white',
    backgroundColor: '#00000000',
    // paddingVertical: 10,
    justifyContent: 'flex-start',
    // paddingRight: 25,
  },
};

export default RegisterForm;
