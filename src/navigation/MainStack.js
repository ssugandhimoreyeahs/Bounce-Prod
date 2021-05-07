import React from "react";
import { View, Text, Image } from "react-native";
import DjProfileScreen from "../Screens/host/DjProfile";
import BENotification from "../Screens/Notifications/Before/Notifications";
import PrivateNotification from "../Screens/Notifications/Before/Private";
import VendorConfirm from "../Screens/Notifications/Before/VendorConfirm";
import UserProfileVendorView from "../Screens/Notifications/Before/UserProfileVendorView";
import AfterNotification from "../Screens/Notifications/After/AfterNotifications";
import FinalReviews from "../Screens/Notifications/After/FinalReviews";
import HostingScreen from "../Screens/MyEvents/HostingNoEvents";
import AttendingScreen from "../Screens/MyEvents/Attending";
import InterestedScreen from "../Screens/MyEvents/Interested";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  Hosting,
  Attending,
  Interested,
  GreyHome,
  GreyCalender,
  WhiteNotifications,
  GreyNotifications,
  WhiteCalender,
  WhitePerson,
} from "@assets";
import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "@components";
import SubscriptionScreen from "../Screens/BounceVendors/Subscription/Subscription";
import Subscription2Screen from "../Screens/BounceVendors/Subscription/Subscription2";
import Subscription3Screen from "../Screens/BounceVendors/Subscription/Subscription3";
import Subscription4Screen from "../Screens/BounceVendors/Subscription/Subscription4";
import Subscription5Screen from "../Screens/BounceVendors/Subscription/Subscription5";
import VendorSignupScreen from "../Screens/Signup/Vendor/Signup";
import DjSignupScreen from "../Screens/Signup/Vendor/DjSignup";
import PreviewProfileScreen from "../Screens/Signup/Vendor/PreviewProfile";
import EditProfileScreen from "../Screens/Signup/Vendor/EditProfile";
import CreateInvitationScreen from "../Screens/BounceVendors/PlanParty/CreateInvitation";
import CreateInvitationScreen4 from "../Screens/BounceVendors/PlanParty/CreateInvitation4";
import ChooseVendorsScreen from "../Screens/BounceVendors/PlanParty/ChooseVendor/ChooseVendor";
import MusicPageScreen from "../Screens/BounceVendors/PlanParty/MusicPage";
import EventRentalScreen from "../Screens/BounceVendors/PlanParty/EventRental";
import InviteFriendsScreens from "../Screens/BounceVendors/PlanParty/InviteFriends";
import PrivateEventHostView from "../Screens/BounceUsers/EventPage/PrivatePage/HostView";
import LoginScreen from "../Screens/BounceVendors/Onboarding/LoginScreen";
import Name from "../Screens/BounceVendors/Onboarding/Name";
import Username from "../Screens/BounceVendors/Onboarding/Username";
import Birthday from "../Screens/BounceVendors/Onboarding/Birthday";
import Live from "../Screens/BounceVendors/Onboarding/Live";
import ProfilePic from "../Screens/BounceVendors/Onboarding/ProfilePic";
import {
  GreyBell,
  GreyParty,
  GreyPerson,
  BlackBell,
  BlackPerson,
  BlackParty,
} from "@svg";
import VendorProfile from "../Screens/BounceVendors/VendorProfile";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import CustomDrawer from "@screens/Drawer";
import PartyRental from "../Screens/BounceVendors/PartyRentals";
import VendorLogin from "../Screens/BounceVendors/Onboarding/VendorLogin";
import ChangePassword from "../Screens/BounceVendors/Onboarding/ChangePassword";
import VendorEditProfile from "../Screens/BounceVendors/EditProfile";
import NewsFeed from "../Screens/BounceUsers/NewsFeed";
import AddInterest from "../Screens/BounceUsers/NewsFeed/AddInterest";
import HostProfile from "../Screens/BounceUsers/HostProfile/HostProfile";
import UserFriendsProfile from "../Screens/BounceUsers/UserFriendsProfile";
import UserFriendsPage from "../Screens/BounceUsers/UserFriendsPage";
import AccountSetting from "../Screens/Drawer/AccountSetting";
import Animation from "../Animation";
import CallVendorProfile from "../Screens/BounceVendors/VendorProfile/CallVendorProfile";
import UserCustomDrawer from "../Screens/Drawer/UserCustomDrawer";
import UploadMedia from "../Screens/BounceVendors/PlanParty/UploadMedia";
import VendorView from "../Screens/Views/VendorView/VendorView";
import SplashScreen from "../Screens/BounceVendors/Onboarding/Splash";
import UploadInventory from "../Screens/host/UploadInventory";
import UserQrCode from "../Screens/Views/QRcode"
import VendorSearch from '../Screens/BounceVendors/PlanParty/VendorSearch'
import Filter from '../Screens/Views/Filter'
import GuestContactList from '../Screens/Views/GuestContactList'


const BottomTab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="BottomVendorStack"
      drawerPosition="right"
      // screenOptions={{unmountOnBlur}}
      drawerStyle={{ width: "70%" }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="BottomVendorStack"
        component={BottomVendorStack}
        options={{ drawerLabel: "BottomVendorStack" }}
      />
      <Drawer.Screen
        name="UploadInventory"
        component={UploadInventory}
        options={{ drawerLabel: "UploadInventory" }}
      />


      <Drawer.Screen
        name="VendorView"
        component={VendorView}
        options={{ drawerLabel: "VendorView" }}
      />
      <Drawer.Screen
        name="UploadMedia"
        component={UploadMedia}
        options={{ drawerLabel: "UploadMedia" }}
      />

      <Drawer.Screen
        name="RightDrawer"
        component={RightDrawer}
        options={{ drawerLabel: "RightDrawer" }}
      />

      <Drawer.Screen
        name="CallVendorProfile"
        component={CallVendorProfile}
        options={{ drawerLabel: "CallVendorProfile" }}
      />
      <Drawer.Screen
        name="AccountSetting"
        component={AccountSetting}
        options={{ drawerLabel: "AccountSetting" }}
      />
      <Drawer.Screen
        name="UserFriendsPage"
        component={UserFriendsPage}
        options={{ drawerLabel: "UserFriendsPage" }}
      />
      <Drawer.Screen
        name="Animation"
        component={Animation}
        options={{ drawerLabel: "Animation" }}
      />
      {/* <Drawer.Screen
          name="UserFriendsProfile"
          component={UserFriendsProfile}
          options={{ drawerLabel: 'UserFriendsProfile' }}
        /> */}
      <Drawer.Screen
        name="HostProfile"
        component={HostProfile}
        options={{ drawerLabel: "HostProfile" }}
      />
      <Drawer.Screen
        name="NewsFeed"
        component={NewsFeed}
        options={{ drawerLabel: "NewsFeed" }}
      />
      <Drawer.Screen
        name="AddInterest"
        component={AddInterest}
        options={{ drawerLabel: "AddInterest" }}
      />
      <Drawer.Screen
        name="VendorEditProfile"
        component={VendorEditProfile}
        options={{ drawerLabel: "VendorEditProfile" }}
      />

      {/* <Drawer.Screen
          name="VendorLogin"
          component={VendorLogin}
          options={{ drawerLabel: "VendorLogin" }}
        /> */}
      {/* <Drawer.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ drawerLabel: "ChangePassword" }}
        /> */}

      {/* <Drawer.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ drawerLabel: "LoginScreen", unmountOnBlur: true }}
        /> */}
      <Drawer.Screen
        name="VendorProfile"
        component={VendorProfile}
        options={{ drawerLabel: "UserViewVendorProfile" }}
      />
      <Drawer.Screen
        name="BENotification"
        component={BENotification}
        options={{ drawerLabel: "BENotification" }}
      />
      <Drawer.Screen
        name="PrivateNotification"
        component={PrivateNotification}
        options={{ drawerLabel: "PrivateNotification" }}
      />
      <Drawer.Screen
        name="UserProfileVendorView"
        component={UserProfileVendorView}
        options={{ drawerLabel: "UserProfileVendorView" }}
      />
      <Drawer.Screen
        name="VendorConfirm"
        component={VendorConfirm}
        options={{ drawerLabel: "VendorConfirm" }}
      />
      <Drawer.Screen
        name="AfterNotification"
        component={AfterNotification}
        options={{ drawerLabel: "AfterNotification" }}
      />
      <Drawer.Screen
        name="FinalReviews"
        component={FinalReviews}
        options={{ drawerLabel: "FinalReviews" }}
      />
      <Drawer.Screen
        name="HostingNoEvents"
        component={StackNavigation}
        options={{ drawerLabel: "HostingNoEvents" }}
      />
      <Drawer.Screen
        name="SubscriptionOption"
        component={SubscriptionStackNavigation}
        options={{ drawerLabel: "SubscriptionOption" }}
      />
      <Drawer.Screen
        name="SubscriptionOption2"
        component={SubscriptionStackNavigation}
        options={{ drawerLabel: "SubscriptionOption2" }}
      />

      <Drawer.Screen
        name="SubscriptionOption3"
        component={SubscriptionStackNavigation}
        options={{ drawerLabel: "SubscriptionOption3" }}
      />

      <Drawer.Screen
        name="SubscriptionOption4"
        component={SubscriptionStackNavigation}
        options={{ drawerLabel: "SubscriptionOption4" }}
      />

      <Drawer.Screen
        name="SubscriptionOption5"
        component={SubscriptionStackNavigation}
        options={{ drawerLabel: "SubscriptionOption5" }}
      />

      <Drawer.Screen
        name="VendorSignupScreen"
        component={VendorSignupScreen}
        options={{ drawerLabel: "Signup" }}
      />

      <Drawer.Screen
        name="DjSignup"
        component={DjSignupScreen}
        options={{ drawerLabel: "DjSignup" }}
      />

      <Drawer.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ drawerLabel: "EditProfile" }}
      />

      <Drawer.Screen
        name="PreviewProfile"
        component={PreviewProfileScreen}
        options={{ drawerLabel: "PreviewProfile" }}
      />

      <Drawer.Screen
        name="CreateInvitation"
        component={CreateInvitationScreen}
        options={{ drawerLabel: "CreateInvitation" }}
      />
      <Drawer.Screen
        name="CreateInvitation4"
        component={CreateInvitationScreen4}
        options={{ drawerLabel: "CreateInvitation4" }}
      />
      <Drawer.Screen
        name="ChooseVendors"
        component={ChooseVendorsScreen}
        options={{ drawerLabel: "ChooseVendors" }}
      />
      <Drawer.Screen
        name="MusicPage"
        component={MusicPageScreen}
        options={{ drawerLabel: "MusicPage" }}
      />

      <Drawer.Screen
        name="EventRental"
        component={EventRentalScreen}
        options={{ drawerLabel: "EventRental" }}
      />
      <Drawer.Screen
        name="InviteFriends"
        component={InviteFriendsScreens}
        options={{ drawerLabel: "InviteFriends" }}
      />

      <Drawer.Screen
        name="PrivateEventHostView"
        component={PrivateEventHostView}
        options={{ drawerLabel: "PrivateEventHostView" }}
      />

      <Drawer.Screen
        name="Name"
        component={Name}
        options={{ drawerLabel: "Name" }}
      />
      <Drawer.Screen
        name="Username"
        component={Username}
        options={{ drawerLabel: "Username" }}
      />
      <Drawer.Screen
        name="Birthday"
        component={Birthday}
        options={{ drawerLabel: "Birthday" }}
      />
      <Drawer.Screen
        name="Live"
        component={Live}
        options={{ drawerLabel: "Live" }}
      />
      <Drawer.Screen
        name="ProfilePic"
        component={ProfilePic}
        options={{ drawerLabel: "ProfilePic" }}
      />
    </Drawer.Navigator>
  );
};
const DrawerNavigator1 = () => {
  return (
    <Drawer.Navigator
      initialRouteName="RightDrawer"
      drawerPosition="right"
      // screenOptions={{unmountOnBlur}}
      drawerStyle={{ width: "70%" }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="RightDrawer"
        component={RightDrawer}
        options={{ drawerLabel: "RightDrawer" }}
      />
      {/* <Drawer.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ drawerLabel: "SplashScreen" }}
        /> */}

      <Drawer.Screen
        name="VendorView"
        component={VendorView}
        options={{ drawerLabel: "VendorView" }}
      />
      <Drawer.Screen
        name="UploadMedia"
        component={UploadMedia}
        options={{ drawerLabel: "UploadMedia" }}
      />
      {/* <Drawer.Screen
        name="UploadInventory"
        component={UploadInventory}
        options={{ drawerLabel: "UploadInventory" }}
      /> */}

      <Drawer.Screen
        name="CallVendorProfile"
        component={CallVendorProfile}
        options={{ drawerLabel: "CallVendorProfile" }}
      />
      <Drawer.Screen
        name="AccountSetting"
        component={AccountSetting}
        options={{ drawerLabel: "AccountSetting" }}
      />
      <Drawer.Screen
        name="UserFriendsPage"
        component={UserFriendsPage}
        options={{ drawerLabel: "UserFriendsPage" }}
      />
      <Drawer.Screen
        name="Animation"
        component={Animation}
        options={{ drawerLabel: "Animation" }}
      />
      {/* <Drawer.Screen
          name="UserFriendsProfile"
          component={UserFriendsProfile}
          options={{ drawerLabel: 'UserFriendsProfile' }}
        /> */}
      <Drawer.Screen
        name="HostProfile"
        component={HostProfile}
        options={{ drawerLabel: "HostProfile" }}
      />
      <Drawer.Screen
        name="NewsFeed"
        component={NewsFeed}
        options={{ drawerLabel: "NewsFeed" }}
      />
      <Drawer.Screen
        name="AddInterest"
        component={AddInterest}
        options={{ drawerLabel: "AddInterest" }}
      />
      <Drawer.Screen
        name="VendorEditProfile"
        component={VendorEditProfile}
        options={{ drawerLabel: "VendorEditProfile" }}
      />

      {/* <Drawer.Screen
          name="VendorLogin"
          component={VendorLogin}
          options={{ drawerLabel: "VendorLogin" }}
        /> */}
      {/* <Drawer.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ drawerLabel: "ChangePassword" }}
        /> */}

      <Drawer.Screen
        name="BottomVendorStack"
        component={BottomVendorStack}
        options={{ drawerLabel: "BottomVendorStack" }}
      />
      {/* <Drawer.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ drawerLabel: "LoginScreen", unmountOnBlur: true }}
        /> */}
      <Drawer.Screen
        name="VendorProfile"
        component={VendorProfile}
        options={{ drawerLabel: "UserViewVendorProfile" }}
      />
      <Drawer.Screen
        name="BENotification"
        component={BENotification}
        options={{ drawerLabel: "BENotification" }}
      />
      <Drawer.Screen
        name="PrivateNotification"
        component={PrivateNotification}
        options={{ drawerLabel: "PrivateNotification" }}
      />
      <Drawer.Screen
        name="UserProfileVendorView"
        component={UserProfileVendorView}
        options={{ drawerLabel: "UserProfileVendorView" }}
      />
      <Drawer.Screen
        name="VendorConfirm"
        component={VendorConfirm}
        options={{ drawerLabel: "VendorConfirm" }}
      />
      <Drawer.Screen
        name="AfterNotification"
        component={AfterNotification}
        options={{ drawerLabel: "AfterNotification" }}
      />
      <Drawer.Screen
        name="FinalReviews"
        component={FinalReviews}
        options={{ drawerLabel: "FinalReviews" }}
      />
      <Drawer.Screen
        name="HostingNoEvents"
        component={StackNavigation}
        options={{ drawerLabel: "HostingNoEvents" }}
      />
      <Drawer.Screen
        name="SubscriptionOption"
        component={SubscriptionStackNavigation}
        options={{ drawerLabel: "SubscriptionOption" }}
      />
      <Drawer.Screen
        name="SubscriptionOption2"
        component={SubscriptionStackNavigation}
        options={{ drawerLabel: "SubscriptionOption2" }}
      />

      <Drawer.Screen
        name="SubscriptionOption3"
        component={SubscriptionStackNavigation}
        options={{ drawerLabel: "SubscriptionOption3" }}
      />

      <Drawer.Screen
        name="SubscriptionOption4"
        component={SubscriptionStackNavigation}
        options={{ drawerLabel: "SubscriptionOption4" }}
      />

      <Drawer.Screen
        name="SubscriptionOption5"
        component={SubscriptionStackNavigation}
        options={{ drawerLabel: "SubscriptionOption5" }}
      />

      <Drawer.Screen
        name="VendorSignupScreen"
        component={VendorSignupScreen}
        options={{ drawerLabel: "Signup" }}
      />

      <Drawer.Screen
        name="DjSignup"
        component={DjSignupScreen}
        options={{ drawerLabel: "DjSignup" }}
      />

      <Drawer.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ drawerLabel: "EditProfile" }}
      />

      <Drawer.Screen
        name="PreviewProfile"
        component={PreviewProfileScreen}
        options={{ drawerLabel: "PreviewProfile" }}
      />

      <Drawer.Screen
        name="CreateInvitation"
        component={CreateInvitationScreen}
        options={{ drawerLabel: "CreateInvitation" }}
      />
      <Drawer.Screen
        name="CreateInvitation4"
        component={CreateInvitationScreen4}
        options={{ drawerLabel: "CreateInvitation4" }}
      />
      <Drawer.Screen
        name="ChooseVendors"
        component={ChooseVendorsScreen}
        options={{ drawerLabel: "ChooseVendors" }}
      />
      <Drawer.Screen
        name="MusicPage"
        component={MusicPageScreen}
        options={{ drawerLabel: "MusicPage" }}
      />

      <Drawer.Screen
        name="EventRental"
        component={EventRentalScreen}
        options={{ drawerLabel: "EventRental" }}
      />
      <Drawer.Screen
        name="InviteFriends"
        component={InviteFriendsScreens}
        options={{ drawerLabel: "InviteFriends" }}
      />

      <Drawer.Screen
        name="PrivateEventHostView"
        component={PrivateEventHostView}
        options={{ drawerLabel: "PrivateEventHostView" }}
      />

      <Drawer.Screen
        name="Name"
        component={Name}
        options={{ drawerLabel: "Name" }}
      />
      <Drawer.Screen
        name="Username"
        component={Username}
        options={{ drawerLabel: "Username" }}
      />
      <Drawer.Screen
        name="Birthday"
        component={Birthday}
        options={{ drawerLabel: "Birthday" }}
      />
      <Drawer.Screen
        name="Live"
        component={Live}
        options={{ drawerLabel: "Live" }}
      />
      <Drawer.Screen
        name="ProfilePic"
        component={ProfilePic}
        options={{ drawerLabel: "ProfilePic" }}
      />
    </Drawer.Navigator>
  );
};


export default function MainStack(props) {
  return (
    <AuthStack.Navigator
      headerMode="screen"
      initialRouteName="Filter"
      screenOptions={{ headerShown: false }}>

      <AuthStack.Screen name="GuestContactList" component={GuestContactList} />
      <AuthStack.Screen name="Filter" component={Filter} />
      <AuthStack.Screen name="VendorSearch" component={VendorSearch} />
      <AuthStack.Screen name="ChooseVendorsScreen" component={ChooseVendorsScreen} />
      <AuthStack.Screen name="InviteFriendsScreens" component={InviteFriendsScreens} />
      <AuthStack.Screen name="UploadMedia" component={UploadMedia} />
      <AuthStack.Screen name="CreateInvitationScreen" component={CreateInvitationScreen} />
      <AuthStack.Screen name="CreateInvitationScreen4" component={CreateInvitationScreen4} />
      <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
      <AuthStack.Screen name="VendorLogin" component={VendorLogin} />
      <AuthStack.Screen name="ChangePassword" component={ChangePassword} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="btmstack" component={DrawerNavigator} />
      <AuthStack.Screen name="VendorSignupScreen" component={VendorSignupScreen}
      />
      <AuthStack.Screen name="UploadInventory" component={UploadInventory}
      />
      <AuthStack.Screen name="DjSignup" component={DjSignupScreen} />
      <AuthStack.Screen name="EditProfile" component={EditProfileScreen}
      />
      <AuthStack.Screen name="rdrawer" component={DrawerNavigator1} />
      <AuthStack.Screen name="Name" component={Name} />
      <AuthStack.Screen name="Username" component={Username} />
      <AuthStack.Screen name="Birthday" component={Birthday} />
      <AuthStack.Screen name="Live" component={Live} />
      <AuthStack.Screen name="ProfilePic" component={ProfilePic} />
      <AuthStack.Screen name="UserFriendsProfile" component={UserFriendsProfile} {...props} />
      <AuthStack.Screen name="UserQrCode" component={UserQrCode} {...props} />
      <AuthStack.Screen name="HostProfile" component={HostProfile} {...props} />

    </AuthStack.Navigator>
  );
}

function StackNavigation() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Home"
        component={BottomNavigationStack}
        options={{
          header: (props) => <Header back headerTitle={"My Events"} />,
        }}
      />
    </Stack.Navigator>
  );
}
function UserStackNavigation() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="RightDrawer">
      <Stack.Screen name="RightDrawer" component={RightDrawer} />
    </Stack.Navigator>
  );
}
function RightDrawer(props) {
  return (
    <Drawer.Navigator
      initialRouteName="UserFriendsProfile"
      drawerPosition="right"
      drawerContent={(props) => <UserCustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="UserFriendsProfile"
        component={UserFriendsProfile}
        options={{ drawerLabel: "UserFriendsProfile" }}
      />
    </Drawer.Navigator>
  );
}

function SubscriptionStackNavigation() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Subscription"
        component={SubscriptionBottomStack}
        options={{
          header: (props) => (
            <Header back headerTitle={"Jamon, attract more clients!"} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
// function VendorProfileStackNavigation() {
//   return (
//     <Stack.Navigator headerMode='none'>
//       <Stack.Screen name="BottomVendorStack" component={BottomVendorStack}
//       />
//     </Stack.Navigator>

//   );
// }

function SubscriptionBottomStack() {
  return (
    <BottomTab.Navigator
      labeled={false}
      barStyle={{ backgroundColor: "#000000" }}
    >
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ tintColor }) => {
            return <GreyParty height={20} width={20} />;
          },
        }}
        name="Subscription5Screen"
        component={Subscription5Screen}
      />

      <BottomTab.Screen
        options={{
          tabBarIcon: ({ tintColor }) => {
            return <GreyParty height={20} width={20} />;
          },
        }}
        name="Subscription4Screen"
        component={Subscription4Screen}
      />

      <BottomTab.Screen
        options={{
          tabBarIcon: ({ tintColor }) => {
            return <GreyParty height={20} width={20} />;
          },
        }}
        name="Subscription3Screen"
        component={Subscription3Screen}
      />
      <BottomTab.Screen
        options={{
          title: null,
          tabBarIcon: ({ tintColor }) => {
            return <Image source={GreyNotifications} />;
          },
        }}
        name="Subscription2Screen"
        component={Subscription2Screen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ tintColor }) => {
            return <Image source={GreyPerson} />;
          },
        }}
        name="SubscriptionScreen"
        component={SubscriptionScreen}
      />
    </BottomTab.Navigator>
  );
}

const HomeScreen = () => {
  return <Text>Homescreen</Text>;
};
function EventScreenStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        iconStyle: { marginVertical: 10, marginLeft: -10 },
        activeTintColor: "#ffffff",
        showIcon: true,
        indicatorStyle: {
          backgroundColor: "#ffffff",
          height: 5,
          color: "#000000",
        },
        style: {
          backgroundColor: "#000000",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ tintColor }) => {
            return <Image source={Hosting} />;
          },
        }}
        name="Hosting"
        component={HostingScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ tintColor }) => {
            return <Image source={Attending} />;
          },
        }}
        name="Attending"
        component={AttendingScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ tintColor }) => {
            return <Image source={Attending} />;
          },
        }}
        name="Interested"
        component={InterestedScreen}
      />
    </Tab.Navigator>
  );
}
function BottomVendorStack(props) {
  // console.log('Vendor Props ----> ', props);
  return (
    <BottomTab.Navigator
      initialRouteName={"DjProfileScreen"}
      labeled={false}
      barStyle={{ backgroundColor: "#FBFBFB", elevation: 5 }}
      unmountOnBlur={true}
      keyboardHidesNavigationBar
      screenOptions={{ unmountOnBlur: true }}
    >
      <BottomTab.Screen
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ tintColor, focused }) => {
            return !focused ? (
              <GreyParty height={30} width={30} />
            ) : (
                <BlackParty height={30} width={30} />
              );
          },
        }}
        name="PartyRental"
        component={PartyRental}
      />

      <BottomTab.Screen
        options={{
          title: null,
          tabBarIcon: ({ tintColor, focused }) => {
            return !focused ? (
              <GreyBell height={30} width={30} />
            ) : (
                <BlackBell height={30} width={30} />
              );
          },
        }}
        name="BENotification"
        component={BENotification}
      />

      <BottomTab.Screen
        options={{

          unmountOnBlur: true,
          tabBarColor: "red",
          tabBarIcon: ({ tintColor, focused }) => {
            return !focused ? (
              <GreyPerson height={30} width={30} />
            ) : (
                <BlackPerson height={30} width={30} />
              );
          },

        }}
        name="DjProfileScreen"
        component={DjProfileScreen}
        unmountOnBlur={true}
      />
    </BottomTab.Navigator>
  );
}

function BottomNavigationStack() {
  return (
    <BottomTab.Navigator
      labeled={false}
      barStyle={{ backgroundColor: "#000000" }}
    >
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ tintColor }) => {
            return <Image source={GreyHome} />;
          },
        }}
        name="Home"
        component={HomeScreen}
      />
      <BottomTab.Screen
        options={{
          title: null,
          tabBarIcon: ({ tintColor }) => {
            return <Image source={GreyCalender} />;
          },
        }}
        name="Events"
        component={EventScreenStack}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: ({ tintColor }) => {
            return <Image source={GreyNotifications} />;
          },
        }}
        name="Notifications"
        component={HomeScreen}
      />
      <BottomTab.Screen
        options={{
          title: null,

          tabBarIcon: ({ tintColor }) => {
            return <Image source={GreyCalender} />;
          },
        }}
        name="Event"
        component={EventScreenStack}
      />
    </BottomTab.Navigator>
  );
}
