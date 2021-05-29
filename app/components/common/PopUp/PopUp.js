import React from 'react';
import { Text, View } from 'react-native';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';

const PopUp = ({ popupDialog, width, height, title, children }) => {
  return (
    <PopupDialog
      ref={popupDialog}
      width={width}
      height={height}
      dialogTitle={<DialogTitle title={title} />}>
      <View style={{ flex: 1 }}>{children}</View>
    </PopupDialog>
  );
};

export { PopUp };
