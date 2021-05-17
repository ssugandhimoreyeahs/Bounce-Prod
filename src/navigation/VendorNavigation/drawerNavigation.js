import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import VendorHomeBottomNavigator from './bottomNavigation';

import EditVendorProfile from '../../Screens/BounceVendors/EditProfile';
import CustomDrawer from '../../Screens/Drawer/index';
import UploadInventoryScreen from '../../Screens/host/UploadInventory';

const VendorHomeDrawer = createDrawerNavigator();
class VendorHomeDrawerNavigator {
  static routeName = '/Home';
  static drawer = () => {
    return (
      <VendorHomeDrawer.Navigator
        initialRouteName={VendorHomeBottomNavigator.routeName}
        drawerPosition="right"
        drawerStyle={{width: '70%'}}
        drawerContent={props => <CustomDrawer {...props} />}>
        <VendorHomeDrawer.Screen
          name={VendorHomeBottomNavigator.routeName}
          component={VendorHomeBottomNavigator.bottom}
          options={{drawerLabel: 'BottomVendorStack'}}
        />

        <VendorHomeDrawer.Screen
          name={EditVendorProfile.routeName}
          component={EditVendorProfile} 
        />
        {/* <VendorHomeDrawer.Screen
          name={UploadInventoryScreen.routeName}
          component={UploadInventoryScreen}
        /> */}
      </VendorHomeDrawer.Navigator>
    );
  };
}

export default VendorHomeDrawerNavigator;
