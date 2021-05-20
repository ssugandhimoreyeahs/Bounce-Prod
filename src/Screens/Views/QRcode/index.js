import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { QRCodes, Header, CustomButton } from '@components';
import { UserContext } from '../../../context/profiledataProvider';
import { FONTSIZE, getHp, getWp } from '@utils';
import { ApiClient } from '../../../app/services';
import { Girl } from '../../../assets';
import { UploadBlue } from '@svg'
import mobxStore from '../../../mobx'


export default function QRcode({ navigation }) {
  const { authStore } = mobxStore
  const userinfo = authStore.userProfile;
  // const { loader, userinfo, fetchProfile } = useContext(UserContext);
  const [userQR, setUserQR] = useState(null);
  const { profileImage = {},
  } = userinfo?.user;
  console.log("userinfo", userinfo)

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
        headerStyleProp={{ color: '#1FAEF7' }}
        headerTitle={"Bounce Code"}
        back
        onPress={() => navigation.goBack()}
        theme={'#fff'}
        headerBackColor={{ backgroundColor: '#000' }}
      />


      <View style={styles.subContainer}>
        <Text
          style={[styles.textStyle, { alignSelf: 'center', marginTop: 20 }]}
        >
          {"Scan into events and add friends"}
        </Text>

        {userQR && (
          <View style={styles.QRcontainer}>
            <QRCodes size={200} qrValue={userQR} qrUserPic={profileImage?.filePath} />
          </View>
        )}

        <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{
            alignItems: 'center'
          }}>
            <View style={{ borderRadius: 100, elevation: 10, backgroundColor: '#fff', }}>
              <UploadBlue height={getHp(100)} width={getHp(100)} />
            </View>
            <Text style={{
              fontSize: FONTSIZE.Text16, color: '#1FAEF7', marginTop: 15, fontFamily: 'ANB',
            }}>{"Camera"}</Text>
          </TouchableOpacity>
        </View>


      </View>
      {/* <View style={[styles.barStyle]} /> */}
    </View>
  );
}
QRcode.routeName = '/QRcode'

const styles = StyleSheet.create({
  // barStyle: {
  //   height: getHp(5),
  //   backgroundColor: '#fff',
  //   marginBottom: getHp(5),
  //   marginTop: getHp(10),
  //   width: getWp(134),
  //   alignSelf: 'center',
  //   borderRadius: 100,
  // },
  QRcontainer: {
    elevation: 5,
    padding: 30,
    borderRadius: 42,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
    backgroundColor: '#000',
  },
  textStyle: {
    color: '#FBFBFB',
    fontSize: FONTSIZE.Text16,

  },
});
