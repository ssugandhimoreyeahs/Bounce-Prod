'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';
import { getHp } from '@utils';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import QRCode from 'react-native-qrcode-svg';

export default class ScanScreen extends Component {
  onSuccess = e => {
    console.log('VALUE GOT MATCHED? ', e.data);
    if (e.data == 'https://qrstud.io/qrmnky') {
      console.log('YOU ARE INVITED');
    } else {
      console.log('NOT INVITED');
    }

    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };

  render() {
    const { qrValue, qrUserPic } = this.props;
    console.log("asdasdasa", qrUserPic)
    return (
      <View style={{ backgroundColor: '#fff', borderRadius: 42 }}>
        <QRCode
          // style={{ borderRadius: 20 }}
          value={qrValue}
          logo={{ uri: qrUserPic }}
          logoBorderRadius={100}
          logoSize={50}
          color="#04A9FF"
          logoBackgroundColor="transparent"
          size={getHp(270)}

        // logoMargin={100}
        ></QRCode>
      </View>
    );
  }

  // render() {
  //   return (
  //     <QRCodeScanner

  //       onRead={this.onSuccess}
  //       flashMode={RNCamera.Constants.FlashMode.torch}
  //       topContent={
  //         <Text style={styles.centerText}>
  //           Go to{' '}
  //           <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
  //           your computer and scan the QR code.
  //         </Text>
  //       }
  //       bottomContent={
  //         <TouchableOpacity style={styles.buttonTouchable}>
  //           <Text style={styles.buttonText}>OK. Got it!</Text>
  //         </TouchableOpacity>
  //       }
  //     />
  //   );
  // }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
