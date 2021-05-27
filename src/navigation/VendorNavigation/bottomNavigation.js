import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import DjProfileScreen from '../../Screens/host/DjProfile';
import BENotification from '../../Screens/BounceUsers/Notifications/Before/Notifications';
import PartyRental from '../../Screens/BounceVendors/PartyRentals';
import {
  GreyBell,
  GreyParty,
  GreyPerson,
  BlackBell,
  BlackPerson,
  BlackParty,
} from '@svg';
import MobxStore from '../../mobx';
import { Avatar } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FONTSIZE } from '../../app/utils';
const VendorBottomTab = createBottomTabNavigator();

// const VendorBottomTab = createMaterialBottomTabNavigator();

class VendorBottomNavigation {
  static routeName = '/HomeBottom';
  static bottom = props => {
    const {
      authStore
    } = MobxStore;
    const userinfo = authStore.userProfile;
    const { profileImage = {} } = userinfo?.user;
    return (
      <VendorBottomTab.Navigator
        initialRouteName={DjProfileScreen.routeName}
        // labeled={false}
        // barStyle={{backgroundColor: '#FBFBFB', elevation: 5,height:65}}
        // unmountOnBlur={true}
        // keyboardHidesNavigationBar
        // screenOptions={{unmountOnBlur: true}}
        >
        <VendorBottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({tintColor, focused}) => {
              return !focused ? (
                <GreyParty height={33} width={33} />
              ) : (
                <BlackParty height={33} width={33} />
              );
            },
          }}
          name={PartyRental.routeName}
          component={PartyRental}
        />

        <VendorBottomTab.Screen
          options={{
            title: '',
            tabBarIcon: ({tintColor, focused}) => {
              return !focused ? (
                <GreyBell height={33} width={33} />
              ) : (
                <BlackBell height={33} width={33} />
              );
            },
          }}
          name={BENotification.routeName}
          component={BENotification}
        />

        <VendorBottomTab.Screen
          options={{
            unmountOnBlur: true,
            // tabBarColor: 'red',
            tabBarIcon: ({tintColor, focused}) => {
              return !focused ? (
                // <GreyPerson height={33} width={33} />
                <Avatar
                rounded
                source={{ uri: `${profileImage?.filePath}` }}
                // source={Placeholder}
                style={{ resizeMode: 'contain', height: 33, width: 33 }}
              />
              ) : (
                // <BlackPerson height={33} width={33} />
                <Avatar
                rounded
                source={{ uri: `${profileImage?.filePath}` }}
                // source={Placeholder}
                style={{ resizeMode: 'contain', height: 33, width: 33 }}
              />
              );
            },
          }}
          name={DjProfileScreen.routeName}
          component={DjProfileScreen}
          // unmountOnBlur={true}
        />
      </VendorBottomTab.Navigator>
    );
  };
}

export default VendorBottomNavigation;
