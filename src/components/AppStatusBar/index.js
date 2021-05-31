import React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
const AppStatusBar = props => {
  const {
    backgroundColor = '#FBFBFB', 
    statusBarHeight = StatusBar.currentHeight,
    ...statusBarProps
  } = props;
  return (
    <View style={{height: statusBarHeight, backgroundColor}}>
      <SafeAreaView>
        <StatusBar
          translucent
          backgroundColor={backgroundColor}
          barStyle={'dark-content'}
          {...statusBarProps}
        />
      </SafeAreaView>
    </View>
  );
};

export default AppStatusBar;
