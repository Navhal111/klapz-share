import React from 'react';
import {View, StatusBar, StyleSheet, Platform, Dimensions} from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height, width} = Dimensions.get('window');

const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 60 : StatusBar.currentHeight;

const GeneralStatusBarColor = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
  </View>
);

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.select({
      ios: isIPhoneX() ? 54 : 30,
      android: StatusBar.currentHeight,
      default: 0,
    }),
  },
});

export default GeneralStatusBarColor;
