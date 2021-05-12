import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {QRCodes, Header, CustomButton} from '@components';
import {UserContext} from '../../../context/profiledataProvider';
import {FONTSIZE, getHp, getWp} from '@utils';
import {ApiClient} from '../../../app/services';

export default function QRcode({navigation}) {
  const {loader, userinfo, fetchProfile} = useContext(UserContext);
  const [userQR, setUserQR] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const qrResponse = await ApiClient.authInstance.get(
          ApiClient.endPoints.getQR,
        );
        setUserQR(qrResponse.data.QrValue);
      } catch (error) {
        console.log('QR_USER_ERROR - ', error);
        return Alert.alert('Message', 'Something went wrong!', [
          {
            text: 'Okay',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Header
        back
        onPress={() => navigation.goBack()}
        theme={'#fff'}
        headerBackColor={{backgroundColor: '#000'}}
      />

      <View style={styles.subContainer}>
        {userQR && (
          <View style={styles.QRcontainer}>
            <QRCodes size={200} qrValue={userQR} />
          </View>
        )}
      </View>
      <View style={[styles.barStyle]} />
    </View>
  );
}
const styles = StyleSheet.create({
  barStyle: {
    height: getHp(5),
    backgroundColor: '#fff',
    marginBottom: getHp(5),
    marginTop: getHp(10),
    width: getWp(134),
    alignSelf: 'center',
    borderRadius: 100,
  },
  QRcontainer: {
    elevation: 5,
    padding: 30,
    borderRadius: 42,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
    backgroundColor: '#000',
  },
});
QRcode.routeName = "/QRcode";
