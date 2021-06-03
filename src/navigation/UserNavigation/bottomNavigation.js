import React, {useEffect} from 'react';
import {Button, TouchableOpacity} from 'react-native';

import {Avatar} from 'react-native-elements';
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
import {Placeholderr, Placeholder} from '@assets';

import Temp from '../../Screens/BounceUsers/Temp';
import UserHomeScreen from '../../Screens/BounceUsers/UserFriendsProfile';
import DesignCanva from '../../Screens/Views/Canva/DesignCanva';

import CreateInvitation from '../../Screens/BounceVendors/PlanParty/CreateInvitation';
import MobxStore from '../../mobx';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FONTSIZE, getHp} from '../../app/utils';  

const UserHomeBottomTab = createBottomTabNavigator();

//const UserHomeBottomTab = createMaterialBottomTabNavigator();

class UserHomeBottomNavigation {
  static routeName = '/UserHomeBottomNavigation';
  static homeBottomNav = props => {
    const {authStore} = MobxStore;
    const userinfo = authStore.userProfile;
    const {profileImage = {}} = userinfo?.user;

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
          height: 100,
          fontSize: FONTSIZE.Text16,
        }} 
      >
        <UserHomeBottomTab.Screen
          options={{ 
            unmountOnBlur: true,
            tabBarIcon: ({tintColor, focused}) => {
              return focused ? (
                <Home_Fill height={33} width={33} />
              ) : (
                <Home_Outline height={33} width={33} />
              );
            },
          }}
          name={UserHomeScreen.routeName}
          component={UserHomeScreen}
        />

        <UserHomeBottomTab.Screen
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({tintColor, focused}) => {
              return focused ? (
                <Search_Outline height={33} width={33} />
              ) : (
                <Search_Outline height={33} width={33} />
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
            tabBarIcon: ({tintColor, focused}) => {
              return focused ? (
                <Add_Outline height={33} width={33} />
              ) : (
                <Add_Outline height={33} width={33} />
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
            tabBarIcon: ({tintColor, focused}) => {
              return focused ? (
                <Bell_Outline height={33} width={33} />
              ) : (
                <Bell_Outline height={33} width={33} />
              );
            },
          }}
          name={'Home'}
          component={() => { return null; }}
        />

        {/* User profile image will come here */}
        <UserHomeBottomTab.Screen
          options={{
            unmountOnBlur: true, 
            tabBarIcon: ({tintColor, focused}) => {
              return focused ? (
                <Avatar
                  rounded
                  source={{uri: `${profileImage?.filePath}`}}
                  // source={Placeholder}
                  style={{resizeMode: 'contain', height: 33, width: 33}}
                />
              ) : (
                <Avatar
                  rounded
                  // source={Placeholderr}
                  source={{uri: `${profileImage?.filePath}`}}
                  style={{resizeMode: 'contain', height: 33, width: 33}}
                />
              );
            },
          }}
          name={'Temp'}
          component={() => { return null; }}
        />
      </UserHomeBottomTab.Navigator>
    );
  };
}

export default UserHomeBottomNavigation;
