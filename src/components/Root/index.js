import { observer } from "mobx-react";
import React, { Fragment } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Root as NRoot} from 'native-base';

const MyWrapper = Platform.select({
  ios: SafeAreaView,
  android: View,
});

const RootComponent = ({
  children,
  headerColor,
  footerColor,
  barStyle,
  childViewStyle = {},
}) => {
  const setBarStyle =
    barStyle === "dark"
      ? "dark-content"
      : barStyle === "light"
      ? "light-content"
      : "default";
  return (
    <NRoot >
      
      <MyWrapper
        style={[
          style.customStatusBar,
          headerColor && { backgroundColor: headerColor },
        ]}
      />
      <SafeAreaView
        style={[
          style.body,
          childViewStyle,
          footerColor && { backgroundColor: footerColor },
        ]}
      >
        {children}
      </SafeAreaView>
    </NRoot>
  );
};

const style = StyleSheet.create({
  customStatusBar: {
    flex: 0,
    backgroundColor: "#F8F8F8",
  },
  body: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
});
export default observer(RootComponent);
