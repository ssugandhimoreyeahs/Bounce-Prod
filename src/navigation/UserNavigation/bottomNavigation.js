import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Avatar } from 'react-native-elements'
import {
  GreyBell,
  GreyParty,
  GreyPerson,
  BlackBell,
  BlackPerson,
  BlackParty,
  GreyHome,
  GreyEvent,
  BlackEvent,
  BlackHome,
} from '@svg';
import {
  Placeholderr,
  Placeholder
} from '@assets'

import Temp from '../../Screens/BounceUsers/Temp'
import UserHomeScreen from '../../Screens/BounceUsers/UserFriendsProfile';
const UserHomeBottomTab = createMaterialBottomTabNavigator();

class UserHomeBottomNavigation {
  static routeName = '/UserHomeBottomNavigation';
  static homeBottomNav = props => {
    return (
      <UserHomeBottomTab.Navigator
        initialRouteName={UserHomeScreen.routeName}
        labeled={false}
        barStyle={{ backgroundColor: '#FBFBFB', elevation: 5 }}
        unmountOnBlur={true}
        keyboardHidesNavigationBar
        screenOptions={{ unmountOnBlur: true }}>
        <UserHomeBottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ tintColor, focused }) => {
              return focused ? (
                <BlackHome height={30} width={30} />
              ) : (
                  <GreyHome height={30} width={30} />
                );
            },
          }}
          name={UserHomeScreen.routeName}
          component={UserHomeScreen}
        />

        <UserHomeBottomTab.Screen
          options={{
            title: null,
            tabBarIcon: ({ tintColor, focused }) => {
              return focused ? (
                <BlackEvent height={30} width={30} />
              ) : (
                  <GreyEvent height={30} width={30} />
                );
            },
          }}
          name={"2"}
          component={() => {
            return null;
          }}
        />

        <UserHomeBottomTab.Screen
          options={{
            unmountOnBlur: true,
            // tabBarColor: 'red',
            tabBarIcon: ({ tintColor, focused }) => {
              return focused ? (
                <BlackBell height={30} width={30} />
              ) : (
                  <GreyBell height={30} width={30} />
                );
            },
          }}
          name={"Home"}
          component={() => {
            return null;
          }}
          unmountOnBlur={true}
        />

        {/* User profile image will come here */}
        <UserHomeBottomTab.Screen
          options={{
            unmountOnBlur: true,
            // tabBarColor: 'red',
            tabBarIcon: ({ tintColor, focused }) => {
              return focused ? (
                <Avatar rounded source={Placeholder} style={{ resizeMode: 'contain', height: 26, width: 26 }} />
              ) : (
                  <Avatar rounded source={Placeholderr} style={{ resizeMode: 'contain', height: 26, width: 26 }} />
                );
            },
          }}
          name={"Temp"}
          component={() => {
            return null;
          }}
          unmountOnBlur={true}
        />

      </UserHomeBottomTab.Navigator>
    );
  };
}

export default UserHomeBottomNavigation;
