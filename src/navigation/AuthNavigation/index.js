import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../Screens/BounceVendors/Onboarding/LoginScreen';

//Vendor Signup screens
import VendorCategory from '../../Screens/Signup/Vendor/VendorCategory';
import VendorSignup from '../../Screens/Signup/Vendor/VendorSignup';
import VendorMarketProfile from '../../Screens/Signup/Vendor/VendorMarketProfile';
//Vendor Signup screens

//User Signup screens
import NameScreen from '../../Screens/BounceVendors/Onboarding/NameScreen';
import ForgotPassword from '../../Screens/BounceVendors/Onboarding/ForgotPassword';
import UserNameScreen from '../../Screens/BounceVendors/Onboarding/UsernameScreen';
import BirthDayScreen from '../../Screens/BounceVendors/Onboarding/BirthDayScreen';
import ProfilePic from '../../Screens/BounceVendors/Onboarding/ProfilePic';
import EmailScreen from '../../Screens/BounceVendors/Onboarding/EmailScreen'
//User Signup screens

//Testing screen
import HostView from '../../Screens/MyEvents/HostView';
//Testing screen

const AuthStack = createStackNavigator();
class AuthStackNavigator {
  static routeName = '/AuthStack';

  static Stack = () => {
    return (
      <AuthStack.Navigator
        headerMode="screen"
        initialRouteName={LoginScreen.routeName}
        screenOptions={{ headerShown: false }}>

        <AuthStack.Screen
          name={LoginScreen.routeName}
          component={LoginScreen}
        />
        <AuthStack.Screen
          name={HostView.routeName}
          component={HostView}
        />
   
        {/* Vendor Signup Screens */}
        <AuthStack.Screen
          name={VendorCategory.routeName}
          component={VendorCategory}
        />
        <AuthStack.Screen
          name={VendorSignup.routeName}
          component={VendorSignup}
        />
        <AuthStack.Screen
          name={VendorMarketProfile.routeName}
          component={VendorMarketProfile}
        />
        {/* Vendor Signup Screens */}

        {/* User Signup Screens */}
        <AuthStack.Screen
          name={NameScreen.routeName}
          component={NameScreen}
        />
        <AuthStack.Screen
          name={ForgotPassword.routeName}
          component={ForgotPassword}
        />
        <AuthStack.Screen
          name={UserNameScreen.routeName}
          component={UserNameScreen}
        />
        <AuthStack.Screen
          name={BirthDayScreen.routeName}
          component={BirthDayScreen}
        />
        <AuthStack.Screen
          name={ProfilePic.routeName}
          component={ProfilePic}
        />
        <AuthStack.Screen
          name={EmailScreen.routeName}
          component={EmailScreen}
        />
        {/* User Signup Screens */}
      </AuthStack.Navigator>
    );
  };
}

export default AuthStackNavigator;
