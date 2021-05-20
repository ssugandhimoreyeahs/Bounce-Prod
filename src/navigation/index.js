import React, {Component} from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import SplashScreen from '../Screens/BounceVendors/Onboarding/Splash';
import {connect} from 'react-redux';
import {fetchMiscData} from '../reducer/CurrentData';
import MobxStore from '../mobx';
import {observer} from 'mobx-react';
import AuthStackNavigator from './AuthNavigation';
import VendorNavigation from './VendorNavigation';
import UserNavigation from './UserNavigation';

@observer
class Navigation extends Component {
  componentDidMount = () => {
    MobxStore.authStore.async.autoLogin(true);
    this.props.fetchMiscData();
  };
  createAppNavigation = () => {
    const {authStore} = MobxStore; 
    if (!authStore.isAutoLoginDone) {
      return SplashScreen;
    }
    if (authStore.isAutoLoginDone && authStore.isAuthenticated) {
      if (authStore?.userProfile?.user?.vendorType == 2) {
        return UserNavigation.stack;
      }else {
        return VendorNavigation.stack;
      }
    } else {
      return AuthStackNavigator.Stack;
    }
  };
  render() { 
    const Navigator = this.createAppNavigation();
    return (
      <NavigationContainer theme={this.props.theme}>
        <Navigator />
      </NavigationContainer>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchMiscData: () => {
      dispatch(fetchMiscData());
    },
  };
};
export default connect(null, mapDispatchToProps)(observer(Navigation));
