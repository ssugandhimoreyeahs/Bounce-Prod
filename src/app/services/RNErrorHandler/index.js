import {Alert, BackHandler} from 'react-native';

import RNRestart from 'react-native-restart';
import {setJSExceptionHandler} from 'react-native-exception-handler';
// import RNExitApp from 'react-native-exit-app';
class RNErrorHandler {
  static instance;
  jsExceptionHandler = (e, isFatal) => {
    if (isFatal) {
      Alert.alert(
        'Something went wrong!',
        `Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}
                We will need to restart the app.`,
        [
          {
            text: 'Exit App',
            onPress: () => {
              //BackHandler.exitApp();
              // RNExitApp.exitApp();
            },
          },
          {
            text: 'Restart',
            onPress: () => {
              RNRestart.Restart();
            },
          },
        ],
      );
    } else {
    }
  };
  init = () => {
    setJSExceptionHandler((error, isFatal) => {
      this.jsExceptionHandler(error, isFatal);
    }, true);
  };
  test = () => {
    throw new Error('TEST');
  };

  static getInstance = () => {
    if (!this.instance) {
      this.instance = new RNErrorHandler();
    }
    return this.instance;
  };
}

export default RNErrorHandler;
