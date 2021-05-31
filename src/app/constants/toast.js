import {Toast as NToast} from 'native-base';
import {StyleSheet} from 'react-native';

const Toast = (text = '', prop = {}) => {
  return NToast({
    text: text,
    duration: 1000,
    style: style.toastStyle,
    buttonText: 'Okay',
    ...prop,
  });
};

const style = StyleSheet.create({
  toastStyle: {width: '80%', alignSelf: 'center', bottom: 80},
});
export default Toast;
