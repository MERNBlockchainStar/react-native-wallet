import React, { Component } from 'react';
import moment from 'moment';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  RefreshControl,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import TransactionService from './../../services/transactionService';
import UserInfoService from './../../services/userInfoService';
import SettingsService from './../../services/settingsService';
import Colors from './../../config/colors';
import Big from 'big.js';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noTransaction: false,
      verified: true,
      initialLoading: true,
      loading: false,
      data: [],
      nextUrl: null,
      error: null,
      refreshing: false,
      company: {},
      profile: null,
      user: this.props.currency,
      updateBalance: this.props.updateBalance,
      showDialog: this.props.showDialog,
    };
  }

  async componentDidMount() {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    this.setState({
      profile: user,
    });
    this.getData(this.state.currency);
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.currency !== nextProps.currency) {
      this.setState({
        initialLoading: true,
        currency: nextProps.currency,
        updateBalance: nextProps.updateBalance,
        showDialog: nextProps.showDialog,
      });
      this.getData(nextProps.currency);
    }
  }

  setData = async responseJson => {
    if (responseJson.status === 'success') {
      const data = this.state.data.concat(responseJson.data.results);
      this.setState({
        data,
        noTransaction: false,
        initialLoading: false,
        nextUrl: responseJson.data.next,
      });
    } else {
      this.props.logout();
    }

    if (this.state.data.length === 0) {
      let responseJson = await UserInfoService.getCompany();
      let responseEmails = await SettingsService.getAllEmails();
      if (
        responseJson.status === 'success' &&
        responseEmails.status === 'success'
      ) {
        let emails = responseEmails.data;
        let verified = emails.filter(function(node) {
          return node.verified === true;
        });
        if (verified.length !== 0) {
          this.setState({
            company: responseJson.data,
            noTransaction: true,
            verified: true,
          });
        } else {
          this.setState({
            company: responseJson.data,
            noTransaction: true,
            verified: false,
          });
        }
      } else {
        this.props.logout();
      }
    }
    if (this.state.data.length > 0) {
      this.setState({
        noTransaction: false,
      });
    }
  };

  getData = async currency => {
    this.setState({
      data: [],
      initialLoading: true,
    });
    let responseJson = await TransactionService.getAllTransactionsByCurrecny(
      currency,
    );
    this.setData(responseJson);
  };

  async handleRefresh() {
    this.state.updateBalance();
    if (this.state.loading !== true) {
      this.setState({ refreshing: true });
      this.getData(this.state.currency).then(() => {
        this.setState({ refreshing: false });
      });
    }
  }

  handleLoadMore = async () => {
    if (
      this.state.refreshing !== true &&
      this.state.loading !== true &&
      this.state.nextUrl
    ) {
      this.setState({ loading: true });
      let responseJson = await TransactionService.getNextTransactions(
        this.state.nextUrl,
      );
      this.setData(responseJson);
      this.setState({ loading: false });
    }
  };

  getAmount = (amount, divisibility) => {
    amount = new Big(amount);
    for (let i = 0; i < divisibility; i++) {
      amount = amount.div(10);
    }

    return amount.toFixed(8).replace(/\.?0+$/, '');
  };

  render() {
    if (this.state.noTransaction) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.lightgray,
            paddingHorizontal: 10,
          }}>
          {this.state.initialLoading && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {!this.state.initialLoading && (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh.bind(this)}
                />
              }>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'column',
                  backgroundColor: 'white',
                  padding: 20,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'normal',
                    color: Colors.black,
                  }}>
                  {this.state.verified
                    ? 'No transactions yet.'
                    : 'Please verify your email address to redeem any unclaimed transactions. Pull to refresh your balance.'}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'normal',
                    color: Colors.black,
                  }}>
                  Swipe down to refresh
                </Text>
                <Icon
                  name="ios-arrow-down-outline"
                  size={40}
                  color={Colors.black}
                  style={{ paddingTop: 20 }}
                />
              </View>
            </ScrollView>
          )}
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: Colors.lightgray }}>
          {this.state.initialLoading && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" />
            </View>
          )}
          {!this.state.initialLoading && (
            <FlatList
              data={this.state.data}
             renderItem={({ item }) => {
              let sender = 'Received',
                receiver = 'Sent';

              if (item && item.tx_type == 'debit' && item.status == 'Complete') {
                if (item.destination_transaction) {
                  let { user } = item.destination_transaction;
                  receiver = `Paid to ${user.first_name} ${user.last_name}`;
                }
              }
              if (item.tx_type == 'credit' && item.status == 'Complete') {
                if (item.source_transaction) {
                  let { user } = item.source_transaction;

                  sender = `From ${user.first_name} ${user.last_name}`;
                } else {
                  sender = 'From BitMedSA';
                }
              }
              return (
                <ListItem
                  avatar={
                   this.state.profile.profile != null
                   ? this.state.profile.profile
                    :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgmT5tM-IGcFDpqZ87p9zKGaWQuzpvAcDKfOTPYfx5A9zOmbTh8RMMFg'
                  }
                  title={item.tx_type === 'credit' ? sender : receiver}
                  subtitle={moment(item.created).format('DD/MM/YYYY HH:MM')}
                  rightTitle={`${item.amount < 0 ? '- ' : ''}${
                    item.currency.symbol
                  }${this.getAmount(item.amount, item.currency.divisibility).replace('-','')}`}
                  rightTitleStyle={{ color: '#bdc6cf' }}
                  hideChevron
                  roundAvatar
                  onPress={() => {
                    this.props.showDialog(item);
                  }}
                  titleStyle={{ fontSize: 12 }}
                  subtitleStyle={{ fontSize: 12 }}
                  //containerStyle={{'backgroundColor':'#FAFBFC'}}
                />
              );
            }}
              keyExtractor={tx => tx.id}
              onRefresh={this.handleRefresh.bind(this)}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore.bind(this)}
              onEndReachedThreshold={50}
            />
          )}
        </View>
      );
    }
  }
}
