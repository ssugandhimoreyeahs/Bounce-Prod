import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Back from 'react-native-vector-icons/AntDesign';
import Share from 'react-native-vector-icons/Entypo';
import { shareFunction } from '@components';
import { FONTSIZE, getHp, getWp, smallHitSlop } from '@utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Girl } from '@assets';
import { FlatList } from 'react-native';
import { UserContext } from '../../context/profiledataProvider';
import MobxStore from '../../mobx';
import { observer } from 'mobx-react';
import { LocalStorage } from '../../app/utils/localStorage';
import NameScreen from '../../Screens/BounceVendors/Onboarding/NameScreen';
import LoginScreen from '../../Screens/BounceVendors/Onboarding/LoginScreen';

import AuthStackNavigator from '../../navigation/AuthNavigation';

const { height, width } = Dimensions.get('screen');

function Header(props) {
  const { navigation } = props;
  const {
    headerStyleProp,
    ACCOUNTS = {},
    AllAccounts = [],
    dropdown = false,
    headerTitle,
    onPress,
    back = false,
    share = false,
    headerBackColor = null,
    rightTitle = false,
    onPressRightTitle = () => { },
    rightTitleStyle = null,
    rightTitleContainer = null,
    leftDropdown = null,
    scanner = false,
    onPressScanner = () => { },
    theme = false,
  } = props;

  const { authStore } = MobxStore;
  const { userProfile } = authStore;
  const userinfo = userProfile;
  const [animated, setAnimated] = useState({
    ballAnimation: new Animated.Value(1),
  });
  const [state, setState] = useState(false);
  const [showDropdown, setShow] = useState(false);

  const animateBall = () => {
    setState(!state);
    Animated.timing(animated.ballAnimation, {
      toValue: 85,
      duration: 1500,
    }).start();
  };
  const ballAnimation = {
    transform: [
      {
        translateY: animated.ballAnimation,
      },
    ],
  };
  //   console.log('All Accounts ----> ', AllAccounts);

  return (
    <View>
      <View
        style={[
          styles.container,
          styles.shadowStyle,
          headerBackColor ? headerBackColor : null,
        ]}>
        {back ? (
          <TouchableOpacity onPress={onPress} hitSlop={smallHitSlop}>
            <Back name="left" color={theme ? theme : '#000'} size={25} />
          </TouchableOpacity>
        ) : null}
        {leftDropdown ? (
          <TouchableOpacity onPress={() => setShow(!showDropdown)}>
            <View style={styles.headerDropdown}>
              <Text
                style={[
                  styles.leftTitleStyle,
                  rightTitleStyle,
                  { marginRight: getWp(5) },
                ]}>
                {`${leftDropdown} `}
              </Text>
              <Icon
                name="angle-down"
                size={getHp(30)}
                color="#000"
                style={{ marginHorizontal: 5 }}
              />
            </View>
          </TouchableOpacity>
        ) : null}

        {dropdown ? (
          <TouchableOpacity
            style={[{ flexDirection: 'row', alignItems: 'center' }]}
          // onPress={animateBall}
          >
            <Text
              style={[
                styles.leftTitleStyle,
                { marginRight: 5 },
                rightTitleStyle,
              ]}>
              {`${dropdown}`}
            </Text>
            <Icon
              name="angle-down"
              size={25}
              color={'#000'}
              style={{ marginTop: 2 }}
            />
          </TouchableOpacity>
        ) : null}
        <Text style={[styles.headerTitleStyle, headerStyleProp]}>
          {headerTitle}
        </Text>
        <View>
          <View style={[styles.container, styles.shadowStyle, headerBackColor ? headerBackColor : null]}>

            {
              back ?
                <TouchableOpacity onPress={onPress} hitSlop={smallHitSlop}>
                  <Back name="left" color={theme ? theme : '#000'} size={25} />
                </TouchableOpacity>
                : null
            }
            {
              leftDropdown ?
                <TouchableOpacity onPress={() => setShow(!showDropdown)} >
                  <View style={styles.headerDropdown}>
                    {
                      showDropdown ?
                        <Icon name="angle-down" size={getHp(30)} color="#000" style={{ marginHorizontal: 5 }} />
                        :
                        <Icon name="angle-right" size={getHp(30)} color="#000" style={{ marginHorizontal: 5 }} />
                    }
                    <Text style={[styles.leftTitleStyle, rightTitleStyle, { marginRight: getWp(5) }]}>
                      {` ${leftDropdown}`}
                    </Text>

                  </View>
                </TouchableOpacity>
                : null
            }

            {
              dropdown ?
                <TouchableOpacity style={[{ flexDirection: 'row', alignItems: 'center' }]}
                // onPress={animateBall} 
                >
                  <Text style={[styles.leftTitleStyle, { marginRight: 5 }, rightTitleStyle]}>
                    {`${dropdown}`}
                  </Text>
                  <Icon name="angle-down" size={25} color={"#000"} style={{ marginTop: 2 }} />

                </TouchableOpacity>
                : null
            }
            <Text style={[styles.headerTitleStyle, headerStyleProp]}>
              {headerTitle}
            </Text>
            <View >
              {
                share ?

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                      scanner ?
                        <TouchableOpacity onPress={onPressScanner} style={{ marginRight: getWp(30) }}>
                          {scanner}
                        </TouchableOpacity>
                        :
                        null
                    }

                    <TouchableOpacity onPress={onPress} style={{}}>
                      {share}
                    </TouchableOpacity>
                  </View>
                  : null}
            </View>

            {showDropdown && (
              <View style={styles.dropdownContainer}>
                {showDropdown && (
                  <>
                    {AllAccounts.map((singleAccount, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={[styles.headerDropdown, { paddingVertical: 10 }]}
                          onPress={() => {
                            LocalStorage.onSelectUser(singleAccount);
                            authStore.setUserProfile(singleAccount);
                          }}
                        >
                          <Avatar
                            source={{ uri: singleAccount?.user?.profileImage?.filePath }}
                            size={getHp(50)}
                            rounded
                          />
                          <Text
                            style={[
                              {
                                marginLeft: getWp(20),
                                color: '#000',
                                fontSize: FONTSIZE.Text18,
                                fontFamily: 'AvenirNext-Medium',
                              },
                            ]}>
                            {singleAccount?.user?.username}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}

                    {/* {
                                DropdownAccounts.length - 1 > index ?
                                    <View style={styles.partition} /> : null
                            } */}
                  </>
                )}
                <TouchableOpacity
                  style={styles.newAccountButton}
                  onPress={() => {
                    props.navigation.navigate(AuthStackNavigator.routeName, {
                      screen: LoginScreen.routeName,
                    });
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: FONTSIZE.Text16,
                      fontFamily: 'AvenirNext-Bold',
                    }}>
                    {'New Account'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  newAccountButton: {
    backgroundColor: '#F2F5F6',
    borderRadius: 17,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E4EEF1',
    alignItems: 'center',
    marginVertical: 8,
  },
  dropdownContainer: {
    backgroundColor: 'red',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderWidth: 0.5,
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  partition: {
    height: getHp(0.5),
    backgroundColor: '#CCCCCC',
  },
  headerDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIconStyle: {
    // color: "#000",
  },
  headerTitleStyle: {
    fontFamily: 'AvenirNext-Medium',
    color: '#000',
    fontSize: FONTSIZE.Text22,
    letterSpacing: 0.3,
  },
  rightTitleStyle: {
    color: '#1FAEF7',
    fontSize: FONTSIZE.Text20,
  },
  leftTitleStyle: {
    color: '#000',
    fontSize: FONTSIZE.Text22,
    fontFamily: 'AvenirNext-DemiBold',
    letterSpacing: 0.2,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  container: {
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    // borderBottomWidth: 0.5,
    borderColor: '#696969',
    // overflow: 'visible',
    // position:'absolute'
    // zIndex: 1
  },
});

export default observer(Header);
