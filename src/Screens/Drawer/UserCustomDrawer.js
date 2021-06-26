import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {
  BlackClose,
  More,
  BlackOutlineShare,
  LockBlack,
  Settings,
  Account_Outline,
} from '@svg';
import {FONTSIZE, bigHitSlop, smallHitSlop, getHp, getWp} from '@utils';
import {useTheme, Switch} from 'react-native-paper';
import {AuthContext} from '../../context';
import {LocalStorage} from '../../app/utils/localStorage';
import MobxStore from '../../mobx';
import AboutUs from '../Views/About/AboutUs';
import {shareFunction} from '@components';
import ScrollCarousel from '../BounceVendors/VendorProfile/ScrollCarousel';
import AccountSetting from './AccountSetting';
import Back from 'react-native-vector-icons/AntDesign';
import PurchaseTickets from '../BounceUsers/EventPage/Public/PurchaseTickets';
import HostView from '../MyEvents/HostView';
import FeaturingPage from '../BounceUsers/EventPage/Public/Featuring';
import PartyRental from '../BounceVendors/PartyRentals';
import { AccountService } from '../../app/services';

export default function UserCustomDrawer(props) {
  const {authStore} = MobxStore;
  const userinfo = authStore.userProfile;
  const {
    username,
    fullName,
    city,
    snapchatUsername,
    instagramUsername,
    about,
    profileImage = {},
  } = userinfo?.user;

  const {colors} = useTheme();
  const paperTheme = useTheme();
  const SERVICES = [
    {
      icon: <Account_Outline height={getHp(32)} width={getWp(30)} />,
      name: 'My Account',
      onPress: () => {
        props.navigation.navigate(AccountSetting.routeName);
      },
    },

    // {
    //   icon: <LockBlack height={30} width={30} />,
    //   name: 'Privacy Settings',
    //   onPress: () => {
    //     //navigation.navigate("VendorEditProfile")
    //   },
    // },
    {
      icon: <BlackOutlineShare height={getHp(31)} width={getWp(28)} />,
      name: 'Share Profile',
      onPress: () => {
        shareFunction(userinfo?.user);
      },
    },
    {
      icon: <More height={getHp(30)} width={getWp(30)} />,
      name: 'More',
      onPress: () => {},
    },
    // {
    //   icon: <Settings height={30} width={30} />,
    //   name: 'Vendor Profiles',
    //   onPress: () => {
    //     props.navigation.navigate(ScrollCarousel.routeName)
    //   },
    // },
    // {
    //   icon: <Settings height={30} width={30} />,
    //   name: 'Purchase Tickets',
    //   onPress: () => {
    //     props.navigation.navigate(PurchaseTickets.routeName)
    //   },
    // },
    // {
    //   // icon: <Settings height={30} width={30} />,
    //   name: 'Host View 3',
    //   onPress: () => {
    //     props.navigation.navigate(HostView.routeName)
    //   },
    // },
    // {
    //   // icon: <Settings height={30} width={30} />,
    //   name: 'Featuring Page 4',
    //   onPress: () => {
    //     props.navigation.navigate(FeaturingPage.routeName)
    //   },
    // },
    // {
    //   // icon: <Settings height={30} width={30} />,
    //   name: 'PartyRental 5',
    //   onPress: () => {
    //     props.navigation.navigate(PartyRental.routeName)
    //   },
    // },
  ];

  const MORE = [
    {
      name: 'Dark / Light Mode',
      // onPress: () => toggleTheme()
    },
    // {
    //   name: 'Subscription',
    //   // onPress: () => navigation.navigate("SubscriptionScreen")
    // },
    {
      name: 'About',
      onPress: () => props.navigation.navigate(AboutUs.routeName),
    },
    {
      name: 'Log Out1',
      onPress: async () => {
        await AccountService.removeAccount(authStore.userProfile.user.id)
      },
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View
        style={styles.renderContainer}
        onPress={item.onPress}
        key={index.toString()}>
        <TouchableOpacity
          onPress={item.onPress}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          {item.icon}
          <Text
            style={[
              styles.heading,
              {
                color: colors.text,
                marginLeft: 15,
                fontSize: FONTSIZE.Text21,
                fontWeight: 'normal',
              },
            ]}>
            {item.name}
          </Text>
          {item.name === 'More' && (
            <TouchableOpacity>
              <Back
                name="right"
                color={'#000'}
                size={18}
                style={{marginLeft: getWp(140)}}
              />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        {item.name === 'More'
          ? MORE.map(item => {
              return (
                <TouchableOpacity
                  style={{
                    paddingLeft: 30,
                    paddingTop: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={item.onPress}
                  key={index.toString()}>
                  {/* {item.name == 'Dark / Light Mode' ? (
                    <View pointerEvents="none">
                      {console.log('paperTheme.dark', paperTheme.dark)}
                      <Switch value={paperTheme.dark} />
                    </View>
                  ) : null} */}

                  <Text
                    style={[
                      styles.heading,
                      {
                        marginLeft: 15,
                        fontSize: FONTSIZE.Text18,
                        fontWeight: 'normal',
                        color: '#696969',
                      },
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })
          : null}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={[styles.flex, {padding: 15, marginTop: 20}]}>
        <Text style={styles.heading}>{'Settings'}</Text>

        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
          }}
          hitSlop={bigHitSlop}>
          <BlackClose height={20} width={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={SERVICES}
        renderItem={renderItem}
        key={index => index.toString()}
        keyExtractor={index => index.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  renderContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'white',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: FONTSIZE.Text27,
    color: '#000',
    fontFamily: 'AvenirNext-DemiBold',
  },
});
