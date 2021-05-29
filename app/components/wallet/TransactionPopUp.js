import React from 'react';
import { Text, View } from 'react-native';
// import Colors from './../../config/colors';
import moment from 'moment';

import {
  PopUp,
  PopUpInfoLine,
  PopUpInfo,
  PopUpFooter,
} from './../common/PopUp';

const TransactionPopUp = ({ popupDialog, transactionDetails }) => {
  const {
    label,
    amount,
    total_amount,
    currency,
    fee,
    balance,
    created,
    status,
  } = transactionDetails;

  getAmount = (amount = 0, divisibility) => {
    for (let i = 0; i < divisibility; i++) {
      amount = amount / 10;
    }

    return amount.toFixed(8).replace(/\.?0+$/, '');
  };

  return (
    <PopUp
      popupDialog={popupDialog}
      width={0.9}
      height={320}
      title={'Transaction Details'}>
      <View style={{ flex: 4, padding: 10 }}>
        <View style={{ flex: 1 }}>
          <PopUpInfo textSize={19} label={'Type:'} value={label} />
          <PopUpInfo
            textSize={19}
            label={'Total amount:'}
            sign={total_amount < 0 ? '-' : ''}
            currency={currency}
            value={total_amount}
          />
          <PopUpInfoLine />
          <PopUpInfo
            textSize={17}
            label={'Amount:'}
            sign={amount < 0 ? '-' : ''}
            currency={currency}
            value={amount}
          />
          <PopUpInfo
            textSize={17}
            label={'Fees:'}
            sign={fee < 0 ? '-' : ''}
            currency={currency}
            value={fee}
          />
          <PopUpInfoLine />
          <PopUpInfo
            textSize={19}
            label={'Balance:'}
            sign={balance < 0 ? '-' : ''}
            currency={currency}
            value={balance}
          />
        </View>
      </View>
      <PopUpFooter left={moment(created).format('lll')} right={status} />
    </PopUp>
  );
};

export default TransactionPopUp;
