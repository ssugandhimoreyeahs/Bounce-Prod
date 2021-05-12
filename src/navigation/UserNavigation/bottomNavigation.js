import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'; 

import {
  GreyBell,
  GreyParty,
  GreyPerson,
  BlackBell,
  BlackPerson,
  BlackParty,
} from '@svg';

import UserHomeScreen from '../../Screens/BounceUsers/UserFriendsProfile';
const UserHomeBottomTab = createMaterialBottomTabNavigator();

class UserHomeBottomNavigation {
  static routeName = '/UserHomeBottomNavigation';
  static homeBottomNav = props => {
    return (
      <UserHomeBottomTab.Navigator
        initialRouteName={UserHomeScreen.routeName}
        labeled={false}
        barStyle={{backgroundColor: '#FBFBFB', elevation: 5}}
        unmountOnBlur={true}
        keyboardHidesNavigationBar
        screenOptions={{unmountOnBlur: true}}>
        <UserHomeBottomTab.Screen
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
          name={UserHomeScreen.routeName}
          component={UserHomeScreen}
        />

        <UserHomeBottomTab.Screen
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
          name={"2"}
          component={() => {
            return null;
          }}
        />

        <UserHomeBottomTab.Screen
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
          name={"Home"}
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
