import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Root } from "@component";
import Feather from "react-native-vector-icons/Feather";

import HomeScreen from '../components/home/';
import HomeScreen2 from '../components/home/HomeScreen/HomeScreen';
import JoinEventScreen from '../components/home/event/joinEvent';
//import WatchEventScreen from '../components/home/event/watchEvent';
import BookEventScreen from '../components/home/event/bookEvent';
import GamesListScreen from '../components/gamelist';
import ChallengesListScreen from '../components/challenges';
import GameScreen from '../components/game';
import UpcomingGameView from '../components/game/upcomingGameView';
import CompletedGameView from '../components/game/completedGameView';
import CompletedGameWithRecordingsView from '../components/game/completedGameView/CompletedGameWithRecordingsView';
import LoginScreen from '../components/auth/login';
import ResetPasswordScreen from '../components/auth/resetPassword';
import RegisterScreen from '../components/auth/register';
import CreateInitialProfileScreen from '../components/auth/createProfile';
import TermsConditionsScreen from '../screens/TermsConditions';
import PrivacyPolicyScreen from '../screens/PrivacyPolicy';
import PlayerListScreen from '../screens/PlayerProfileList';
import PlayerProfileScreen from '../components/home/user/profile/index';
import CreateEventScreen from '../components/home/event/createEvent';
import ContestTypeScreen from '../components/home/event/contestType';
import CutomizeContestScreen from '../components/home/event/customizeContest';
import CreateContestScreen from '../components/home/event/createContest';
import EventProfileCreateScreen from '../components/home/event/createProfile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GameChallengesView from '../components/challenges/GameChallengesView';
import EventFeesScreen from '../components/home/event/eventFees';
import ViewCharityScreen from '../screens/Charity/charity';
import EditCharityScreen from '../screens/EditCharity/editCharity';
import EventPaymentSignupScreen from '../components/home/event/eventPaymentSignup';
import EventInfoScreen from '../screens/EventInfoScreen';
import ContestInfoScreen from '../screens/ContestInfoScreen';
import AboutScreen from "../screens/AboutUs";
import EPConfirmationScreen from '../screens/EPConfirmation';
import EPCreditCardScreen from '../screens/EPCreditCard';
export const Drawer = createDrawerNavigator();
import CreateCharityScreen from "../components/home/charity/createCharity";

import ReviewProfileScreen from '../components/home/user/ReviewProfile';


import UserSettingScreen from '../screens/UserSetting'
import RegisterPageNew from '../components/auth/RegisterPageNew'

export const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" headerMode={"none"}>
      <Stack.Screen name="HomeScreen" component={HomeScreen2} />
      <Stack.Screen name="ReviewProfileScreen" component={ReviewProfileScreen} />
      {/* <Stack.Screen name="Profile Screen" component={ProfileScreen} /> */}
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export const GamesListStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator initialRouteName="Games List Screen">
      <Stack.Screen
        name="All Games"
        component={GamesListScreen}
        options={{ headerShown: false }}
        initialParams={{ isMine: route.params.isMine }}
      />
      <Stack.Screen
        name="GameScreen"
        component={GameScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpcomingGameScreen"
        component={UpcomingGameView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameChallengesView"
        component={GameChallengesView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CompletedGameScreen"
        component={CompletedGameWithRecordingsView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const ChallengesListStack = () => {
  return (
    <Stack.Navigator initialRouteName="Challenges List Screen">
      <Stack.Screen
        name="Challenges List"
        options={{ headerShown: false }}
        component={ChallengesListScreen}
      />
    </Stack.Navigator>
  );
};

export const UserSettingStack = () => {
  return (
    <Stack.Navigator initialRouteName="UserSettingScreen">
      <Stack.Screen
        name="UserSettingScreen"
        options={{ headerShown: false }}
        component={UserSettingScreen}
      />

    </Stack.Navigator>
  );
};

export const EventInfoStack = () => {
  return (
    <Stack.Navigator initialRouteName="JoinEventScreen" headerMode={"none"}>
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="JoinEventScreen"
        component={JoinEventScreen}
      />

      {/* <Stack.Screen
        options={{ gestureEnabled: false }}
        name="WatchEventScreen"
        component={WatchEventScreen}
      /> */}
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="PlayerListScreen"
        component={PlayerListScreen} />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="PlayerProfileScreen"
        component={PlayerProfileScreen} />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="EventInfoScreen"
        component={EventInfoScreen} />
      <Stack.Screen
        name="ContestInfoScreen"
        component={ContestInfoScreen} />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="EventPaymentSignupScreen"
        component={EventPaymentSignupScreen} />

      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="EPCreditCardScreen"
        component={EPCreditCardScreen} />

      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="EPConfirmationScreen"
        component={EPConfirmationScreen} />
    </Stack.Navigator>
  );
}
export const EventStack = () => {
  return (
    <Stack.Navigator initialRouteName="CreateEventScreen" headerMode={"none"}>

      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="CreateEventScreen"
        component={CreateEventScreen}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="ContestTypeScreen"
        component={ContestTypeScreen}
      />
      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="CutomizeContestScreen"
        component={CutomizeContestScreen}
      />

      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="CreateContestScreen"
        component={CreateContestScreen}
      />

      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="EventProfileCreateScreen"
        component={EventProfileCreateScreen}
      />

      <Stack.Screen
        options={{ gestureEnabled: false }}
        name="EventFeesScreen"
        component={EventFeesScreen}
      />
    </Stack.Navigator>
  )
}

const AuthStackNav = createStackNavigator();
export const AuthStack = () => {
  return (
    <AuthStackNav.Navigator
      initialRouteName={"LoginScreen"}
      headerMode={"none"}
      //screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name={"LoginScreen"}
        component={LoginScreen}
        options={{
          gestureEnabled: false
        }}
      />
      <Stack.Screen name={"RegisterScreen"} component={RegisterScreen} />
      <Stack.Screen name="RegisterPageNew" component={RegisterPageNew}
        options={{
          gestureEnabled: false
        }} />
      <Stack.Screen
        name={"CreateInitialProfileScreen"}
        component={CreateInitialProfileScreen}
      />
      <Stack.Screen
        name={"ResetPasswordScreen"}
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        name={"TermsConditionsScreen"}
        component={TermsConditionsScreen}
      />
      <Stack.Screen
        name={"PrivacyPolicyScreen"}
        component={PrivacyPolicyScreen}
      />
    </AuthStackNav.Navigator>
  );
};

const CharitiesStackNav = createStackNavigator();
export const CharitiesStack = () => {
  return (
    <CharitiesStackNav.Navigator
      initialRouteName={"ViewCharityScreen"}
      headerMode={"none"}
    >
      <CharitiesStackNav.Screen
        options={{ gestureEnabled: false }}
        name="CreateCharityScreen"
        component={CreateCharityScreen}
      />
      <CharitiesStackNav.Screen
        name={"ViewCharityScreen"}
        component={ViewCharityScreen}
      />
      <CharitiesStackNav.Screen
        name={"EditCharityScreen"}
        component={EditCharityScreen}
      />
    </CharitiesStackNav.Navigator>
  );
};
