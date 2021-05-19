import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import UserHomeDrawerNavigator from './drawerNavigation';

import UserQrScreen from '../../Screens/Views/QRcode'; 

import CreateInvitation from '../../Screens/BounceVendors/PlanParty/CreateInvitation';

import UploadMedia from '../../Screens/BounceVendors/PlanParty/UploadMedia';
import AccountSetting from '../../Screens/Drawer/AccountSetting';
import HostProfile from '../../Screens/BounceUsers/HostProfile/HostProfile';
import AboutUs from '../../Screens/Views/About/AboutUs';

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
         <UserRootStack.Screen
          name={HostProfile.routeName}
          component={HostProfile}
        />
        <UserRootStack.Screen 
          name={AccountSetting.routeName}
          component={AccountSetting}
        />
        <UserRootStack.Screen 
          name={CreateInvitation.routeName}
          component={CreateInvitation}
        />
        <UserRootStack.Screen 
          name={UploadMedia.routeName}
          component={UploadMedia}
        />
        <UserRootStack.Screen 
          name={AboutUs.routeName}
          component={AboutUs}
        />
      </UserRootStack.Navigator>
    );
  };
}

export default UserNavigation;
