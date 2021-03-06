import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserHomeDrawerNavigator from './drawerNavigation';

import UserQrScreen from '../../Screens/Views/QRcode';

import CreateInvitation from '../../Screens/BounceVendors/PlanParty/CreateInvitation';

import UploadMedia from '../../Screens/BounceVendors/PlanParty/UploadMedia';
import AccountSetting from '../../Screens/Drawer/AccountSetting';
import HostProfile from '../../Screens/BounceUsers/HostProfile/HostProfile';
import AboutUs from '../../Screens/Views/About/AboutUs';
import CreateInvitationTemplate from '../../Screens/BounceVendors/PlanParty/CreateInvitationTemplate';
import CallVendorProfile from '../../Screens/BounceVendors/VendorProfile/CallVendorProfile'
import VendorProfile from '../../Screens/BounceVendors/VendorProfile'
import ScrollCarousel from '../../Screens/BounceVendors/VendorProfile/ScrollCarousel'
import PurchaseTickets from '../../Screens/BounceUsers/EventPage/Public/PurchaseTickets';
import HostView from '../../Screens/MyEvents/HostView';
import Featuring from '../../Screens/BounceUsers/EventPage/Public/Featuring'
import PartyRental from '../../Screens/BounceVendors/PartyRentals'
import AuthNavigation from '../AuthNavigation';

import InviteFriends from '../../Screens/BounceVendors/PlanParty/InviteFriends'
import FriendsPage from '../../Screens/BounceUsers/Profile/FriendsPage'
import GuestProfile from '../../Screens/BounceUsers/Profile/GuestProfile';
import AddInterest from '../../Screens/BounceUsers/NewsFeed/AddInterest';
import NewsFeed from '../../Screens/BounceUsers/NewsFeed/NewsFeed';
import CommonInterestNewsFeed from '../../Screens/BounceUsers/NewsFeed/CommonInterestNewsFeed'
import RatingPage from '../../components/ReviewCard/RatingPage'

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
          name={CallVendorProfile.routeName}
          component={CallVendorProfile}
        />
      
        <UserRootStack.Screen
          name={NewsFeed.routeName}
          component={NewsFeed}
        />
        <UserRootStack.Screen
          name={VendorProfile.routeName}
          component={VendorProfile}
        />
        <UserRootStack.Screen
          name={ScrollCarousel.routeName}
          component={ScrollCarousel}
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
          name={PurchaseTickets.routeName}
          component={PurchaseTickets}
        />
        <UserRootStack.Screen
          name={HostView.routeName}
          component={HostView}
        />
        <UserRootStack.Screen
          name={RatingPage.routeName}
          component={RatingPage}
        />
        <UserRootStack.Screen
          name={Featuring.routeName}
          component={Featuring}
        />

        <UserRootStack.Screen
          name={PartyRental.routeName}
          component={PartyRental}
        />
        <UserRootStack.Screen
          name={CreateInvitation.routeName}
          component={CreateInvitation}
        />
        <UserRootStack.Screen
          name={InviteFriends.routeName}
          component={InviteFriends}
        />
        <UserRootStack.Screen
          name={FriendsPage.routeName}
          component={FriendsPage}
        />
        <UserRootStack.Screen
          name={GuestProfile.routeName}
          component={GuestProfile}
        />
        <UserRootStack.Screen
          name={AddInterest.routeName}
          component={AddInterest}
        />
        <UserRootStack.Screen
          name={CommonInterestNewsFeed.routeName}
          component={CommonInterestNewsFeed}
        />

        <UserRootStack.Screen
          name={CreateInvitationTemplate.routeName}
          component={CreateInvitationTemplate}
        />
        <UserRootStack.Screen
          name={UploadMedia.routeName}
          component={UploadMedia}
        />
        <UserRootStack.Screen
          name={AboutUs.routeName}
          component={AboutUs}
        />
        <UserRootStack.Screen 
          component={AuthNavigation.Stack}
          name={AuthNavigation.routeName}
        />
      </UserRootStack.Navigator>
    );
  };
}

export default UserNavigation;
