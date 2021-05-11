import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import UserHomeDrawerNavigator from './drawerNavigation';

import UserQrScreen from '../../Screens/Views/QRcode'; 

const UserRootStack = createStackNavigator();

class UserNavigation {
  static routeName = '/UserNavigation';

  static stack = props => {
    return (
      <UserRootStack.Navigator
        headerMode={'none'}
        initialRouteName={UserHomeDrawerNavigator.routeName}>
        <UserRootStack.Screen
          name={UserHomeDrawerNavigator.routeName}
          component={UserHomeDrawerNavigator.drawerHome}
        />
        <UserRootStack.Screen 
          name={UserQrScreen.routeName}
          component={UserQrScreen}
        />
      </UserRootStack.Navigator>
    );
  };
}

export default UserNavigation;
