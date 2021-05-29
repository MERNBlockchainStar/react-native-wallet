import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Alert,
  AsyncStorage,
  findNodeHandle,
} from 'react-native';

import { Input, Button, InputForm } from './../common';
import Colors from './../../config/colors';
import AuthService from './../../services/authService';
import Auth from './../../util/auth';
import { IsEmail } from './../../util/validation';

class LoginForm extends Component {
  state = {
    email: '',
    emailStatus: false,
    emailError: '',
    company: '',
    companyStatus: false,
    companyError: '',
    password: '',
    passwordStatus: false,
    passwordError: '',
    loading: false,
    toFocus: null,
  };

  componentDidMount() {
    this.checkLoggedIn();
    this.getStoredValues();
  }

  clearInputs() {
    this.setState({
      email: '',
      company: '',
      password: '',
    });
  }

  getStoredValues = async () => {
    let storedEmail = '';
    let storedCompany = '';
    try {
      storedEmail = await AsyncStorage.getItem('email');
      storedCompany = await AsyncStorage.getItem('company');
    } catch (error) {}

    this.setState({
      email: storedEmail,
      company: storedCompany,
    });
  };

  checkLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token != null) {
        ResetNavigation.dispatchToSingleRoute(this.props.navigation, 'Home');
      }
      return token;
    } catch (error) {}
  };

  onButtonPress() {
    if (this.validation()) {
      let data = {
        user: this.state.email,
        company: this.state.company,
        password: this.state.password,
      };
      this.performLogin(data);
    }
  }

  validation() {
    let emailStatus = this.validationEmail();
    let companyStatus = this.validationCompany();
    let passwordStatus = this.validationPassword();

    let nodeToScrollTo = null;

    if (!emailStatus) {
      nodeToScrollTo = this.email;
    } else if (!companyStatus) {
      nodeToScrollTo = this.company;
    } else if (!passwordStatus) {
      nodeToScrollTo = this.password;
    }

    if (emailStatus && companyStatus && passwordStatus) {
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
      passwordError = 'Must be at least 8 characters';
    }
    this.setState({ passwordError });
    return passwordStatus;
  }

  performLogin = async data => {
    let responseJson = await AuthService.login(data);

    if (responseJson.status === 'success') {
      const loginInfo = responseJson.data;
      await AsyncStorage.setItem('token', loginInfo.token);
      let twoFactorResponse = await AuthService.twoFactorAuth();
      if (twoFactorResponse.status === 'success') {
        const authInfo = twoFactorResponse.data;
        await AsyncStorage.setItem('email', data.user);
        await AsyncStorage.setItem('company', data.company);
        if (authInfo.sms === true || authInfo.token === true) {
          this.props.navigation.navigate('AuthVerifySms', {
            loginInfo: loginInfo,
            isTwoFactor: true,
          });
        } else {
          Auth.login(this.props.navigation, loginInfo);
        }
      } else {
        Alert.alert('Error', twoFactorResponse.message, [{ text: 'OK' }]);
      }
    } else {
      Alert.alert(
        'Invalid Credentials',
        'Unable to log in with provided credentials.',
        [{ text: 'OK' }],
      );
    }
  };

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
      email,
      emailError,
      company,
      companyError,
      password,
      passwordError,
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
            placeholder="e.g. user@gmail.com"
            label="Email"
            value={email}
            required
            requiredError={emailError}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            returnKeyType="next"
            autoFocus
            scrollView={this.myScrollView}
            reference={input => {
              this.email = input;
            }}
            onSubmitEditing={() => {
              this.validationEmail();
              this.company.focus();
            }}
          />
          <Input
            placeholder="e.g. bitmedsa"
            label="Company"
            required
            requiredError={companyError}
            value={company}
            onChangeText={company => this.setState({ company })}
            scrollView={this.myScrollView}
            reference={input => {
              this.company = input;
            }}
            onSubmitEditing={() => {
              this.password.focus();
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
            returnKeyType="done"
            scrollView={this.myScrollView}
            reference={input => {
              this.password = input;
            }}
            onSubmitEditing={this.onButtonPress.bind(this)}
          />
          <Button
            label="LOG IN"
            type="primary"
            onPress={this.onButtonPress.bind(this)}
          />
          <Button
            label="Forgot password?"
            type="text"
            onPress={() => this.props.navigation.navigate('ForgetPassword')}
          />
        </InputForm>
        {/* <ButtonList>
          
        </ButtonList> */}
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
  containerStyleInputs: {
    paddingRight: 25,
    paddingBottom: 15,
  },
};

export default LoginForm;
