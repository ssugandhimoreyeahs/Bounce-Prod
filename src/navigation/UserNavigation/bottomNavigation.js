import React, { useEffect } from 'react';
import { Button, TouchableOpacity, View } from 'react-native';

import { Avatar } from 'react-native-elements';
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
import { Placeholderr, Placeholder } from '@assets';

import Temp from '../../Screens/BounceUsers/Temp';
import UserHomeScreen from '../../Screens/BounceUsers/UserFriendsProfile';
import DesignCanva from '../../Screens/Views/Canva/DesignCanva';

import CreateInvitation from '../../Screens/BounceVendors/PlanParty/CreateInvitation';
import MobxStore from '../../mobx';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FONTSIZE, getHp } from '../../app/utils';
import BENotification from '../../Screens/BounceUsers/Notifications/Before/Notifications';
import HostProfile from '../../Screens/BounceUsers/HostProfile/HostProfile';

const UserHomeBottomTab = createBottomTabNavigator();


class UserHomeBottomNavigation {
  static routeName = '/UserHomeBottomNavigation';
  static homeBottomNav = props => {
    const { authStore } = MobxStore;
    const userinfo = authStore.userProfile;
    const { profileImage = {} } = userinfo?.user;

    return (
      <UserHomeBottomTab.Navigator
        initialRouteName={UserHomeScreen.routeName}
        tabBarOptions={{
          activeTintColor: '#000000',
          inactiveTintColor: '#000000',
          fontSize: FONTSIZE.Text16,
          paddingVertical: 10,
          showLabel: false,
          
          style: {
            position: 'absolute',
            bottom: 0,
            height: getHp(80), 
          }
        }}
        sceneContainerStyle={{
          backgroundColor: '#FBFBFB',
          elevation: 5,
          // height: 100,
          fontSize: FONTSIZE.Text16,
        }}
      >
        <UserHomeBottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ tintColor, focused }) => {
              return focused ? (
                <Home_Fill height={25} width={32} />
              ) : (
                  <Home_Outline height={25} width={32} />
                );
            },
          }}
          name={UserHomeScreen.routeName}
          component={UserHomeScreen}
        />

        <UserHomeBottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ tintColor, focused }) => {
              return focused ? (
                <Search_Fill height={21} width={21} />
              ) : (
                  <Search_Outline height={21} width={21} />
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
                <Add_Outline height={26} width={26} />
              ) : (
                  <Add_Outline height={26} width={26} />
                );
            },
            tabBarVisible: false,
          }}
          name={CreateInvitation.routeNameForBottom}
          component={(_) => <CreateInvitation {..._} />}
        />

        <UserHomeBottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ tintColor, focused }) => {
              return focused ? (
                <Bell_Fill height={22} width={19} />
              ) : (
                  <Bell_Outline height={22} width={19} />
                );
            },
          }}
          name={BENotification.routeName}
          component={BENotification}
        />

        {/* User profile image will come here */}
        <UserHomeBottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({ tintColor, focused }) => {
              return focused ? (
                <View style={{
                  borderWidth: 1,
                  borderRadius: 50,
                  padding: 2,
                  borderColor: 'black'
                }}>
                <Avatar
                  rounded
                  source={{ uri: `${profileImage?.filePath}` }}
                  // source={Placeholder}
                  style={{ resizeMode: 'contain', height: 23, width: 23 }}
                />
                </View>
              ) : (
                  <View style={{
                    borderWidth: 1,
                    borderRadius: 50,
                    padding: 2,
                    borderColor: 'black'
                  }}>
                    <Avatar
                      rounded
                      // source={Placeholderr}
                      source={{ uri: `${profileImage?.filePath}` }}
                      style={{ resizeMode: 'contain', height: 23, width: 23 }}
                    />
                  </View>
                );
            },
          }}
          name={HostProfile.routeName}
          component={HostProfile}
        />
      </UserHomeBottomTab.Navigator>
    );
  };
}

export default UserHomeBottomNavigation;
