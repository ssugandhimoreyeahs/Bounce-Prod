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
import {RNErrorHandlerService, NotificationService} from './src/app/services';
import {CustomValidator, ValidationTypes} from './src/app/Validations';
import {Root as NativebaseRoot} from 'native-base';
import transform from 'css-to-react-native';

Icon.loadFont();
function App() {
  LogBox.ignoreAllLogs(true);

  useEffect(() => {
    RNErrorHandlerService.getInstance().init();
    NotificationService.initialize();
    NotificationService.checkPermission();
    console.log('Notification Permission ----> ', NotificationService.hasPermission);
  }, []);
  const {uiStore} = MobxStore;
  return (
    <NativebaseRoot>
      <Provider store={Store}>
        <Spinner
          visible={MobxStore.appStore.loader}
          //visible={true}
        />
        <PaperProvider theme={uiStore.theme}>
          <Navigation theme={uiStore.theme} />
        </PaperProvider>
      </Provider>
    </NativebaseRoot>
  );
}
export default observer(App);

// const App2 = () => {
//   const [txt, setTxt] = useState('');
//   const onCheck = () => {
//     // const data = CustomValidator.validate({
//     //   value: txt,
//     //   [ValidationTypes.required]: 'Required Text',
//     // });
//     // console.log(data);
//     let dt = transform([['box-shadow', '10px 20px 16px rgba(0, 0, 0, 0.08)']]);
//     console.log(dt);
//   };
//   return (
//     <View style={{backgroundColor: 'rgba(251,251,251)', flex: 1}}>
//       <TextInput
//         onChangeText={setTxt}
//         value={txt}
//         placeholder={'Enter title'}
//       />

//       <View
//         style={{
//           backgroundColor: 'white',
//           margin: 30,
//           height: 150,
//           width: 150, 
//           borderColor: 'black', 
//           borderRadius : 20,
//           elevation: 3,
//         }}>
//         <Text>Hello</Text>
//       </View>
//       <Button
//         title={'Press me'}
//         onPress={() => {
//           onCheck();
//         }}
//       />
//     </View>
//   );
// };

// export default App2;
