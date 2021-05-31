import React, {Component, Fragment, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Button,
  Animated,
  StatusBar,
} from 'react-native';
import {AppStatusBar} from '@components';
import {Provider as PaperProvider} from 'react-native-paper';
// import MainStack from './src/navigation/MainStack';
import {Provider} from 'react-redux';
import Store from './src/reducer/store';
import {LogBox} from 'react-native';
import MobxStore from './src/mobx';
import {observer} from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Entypo';
import Navigation from './src/navigation';
import {RNErrorHandlerService} from './src/app/services';

Icon.loadFont();
function App() {
  LogBox.ignoreAllLogs(true);

  useEffect(() => {
    RNErrorHandlerService.getInstance().init();
  }, []);
  const {uiStore} = MobxStore;
  return (
    <Provider store={Store}>
      <Spinner
        visible={MobxStore.appStore.loader}
        //visible={true}
      />
      <PaperProvider theme={uiStore.theme}>
        {/* <MainStack /> */}
        <Navigation theme={uiStore.theme} />
      </PaperProvider>
    </Provider>
  );
}
export default observer(App); 