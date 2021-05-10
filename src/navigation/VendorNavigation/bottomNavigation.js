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

const VendorBottomTab = createMaterialBottomTabNavigator();

class VendorBottomNavigation {
  static routeName = '/HomeBottom';
  static bottom = props => {
    return (
      <VendorBottomTab.Navigator
        initialRouteName={DjProfileScreen.routeName}
        labeled={false}
        barStyle={{backgroundColor: '#FBFBFB', elevation: 5}}
        unmountOnBlur={true}
        keyboardHidesNavigationBar
        screenOptions={{unmountOnBlur: true}}>
        <VendorBottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({tintColor, focused}) => {
              return !focused ? (
                <GreyParty height={30} width={30} />
              ) : (
                <BlackParty height={30} width={30} />
              );
            },
          }}
          name={PartyRental.routeName}
          component={PartyRental}
        />

        <VendorBottomTab.Screen
          options={{
            title: null,
            tabBarIcon: ({tintColor, focused}) => {
              return !focused ? (
                <GreyBell height={30} width={30} />
              ) : (
                <BlackBell height={30} width={30} />
              );
            },
          }}
          name={BENotification.routeName}
          component={BENotification}
        />

        <VendorBottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarColor: 'red',
            tabBarIcon: ({tintColor, focused}) => {
              return !focused ? (
                <GreyPerson height={30} width={30} />
              ) : (
                <BlackPerson height={30} width={30} />
              );
            },
          }}
          name={DjProfileScreen.routeName}
          component={DjProfileScreen}
          unmountOnBlur={true}
        />
      </VendorBottomTab.Navigator>
    );
  };
}

export default VendorBottomNavigation;
