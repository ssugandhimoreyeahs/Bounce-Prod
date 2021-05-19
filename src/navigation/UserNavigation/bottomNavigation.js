import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Avatar } from 'react-native-elements'
import {
  Add_Outline,
  Bell_Outline,
  Home_Outline,
  Search_Outline,

  Add_Fill,
  Bell_Fill,
  Home_Fill,
  Search_Fill,

} from '@svg';
import {
  Placeholderr,
  Placeholder
} from '@assets'

import Temp from '../../Screens/BounceUsers/Temp'
import UserHomeScreen from '../../Screens/BounceUsers/UserFriendsProfile';
import DesignCanva from '../../Screens/Views/Canva/DesignCanva'

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
                <Home_Outline height={30} width={30} />
              ) : (
                  <Home_Outline height={30} width={30} />
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
                <Search_Outline height={30} width={30} />
              ) : (
                  <Search_Outline height={30} width={30} />
                );
            },
          }}
          name={DesignCanva.routeName}
          component={DesignCanva}
        />

        <UserHomeBottomTab.Screen
          options={{
            unmountOnBlur: true,
            // tabBarColor: 'red',
            tabBarIcon: ({ tintColor, focused }) => {
              return focused ? (
                <Add_Outline height={30} width={30} />
              ) : (
                  <Add_Outline height={30} width={30} />
                );
            },
          }}
          name={"Qr"}
          component={() => {
            return null;
          }}
          unmountOnBlur={true}
        />

        <UserHomeBottomTab.Screen
          options={{
            unmountOnBlur: true,
            // tabBarColor: 'red',
            tabBarIcon: ({ tintColor, focused }) => {
              return focused ? (
                <Bell_Outline height={30} width={30} />
              ) : (
                  <Bell_Outline height={30} width={30} />
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
