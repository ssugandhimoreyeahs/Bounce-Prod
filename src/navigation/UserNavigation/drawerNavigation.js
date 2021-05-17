import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UserDrawer from '../../Screens/Drawer/UserCustomDrawer';
import UserHomeBottomNavigator from './bottomNavigation';

const UserHomeDrawer = createDrawerNavigator();
class UserHomeDrawerNavigator {
  static routeName = '/Home';
  static drawerHome = () => {
    return (
      <UserHomeDrawer.Navigator
        initialRouteName={UserHomeBottomNavigator.routeName}
        drawerPosition="right"
        drawerStyle={{width: '70%'}}
        drawerContent={props => <UserDrawer {...props} />}>
        <UserHomeDrawer.Screen
          name={UserHomeBottomNavigator.routeName}
          component={UserHomeBottomNavigator.homeBottomNav}
          options={{drawerLabel: ''}}
        />
      </UserHomeDrawer.Navigator>
    );
  };
}

export default UserHomeDrawerNavigator;
