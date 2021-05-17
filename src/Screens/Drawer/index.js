import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  BlackClose,
  More,
  BlackBorderPen,
  BlackShare,
  LockBlack,
  Settings,
  WhiteShare
} from "@svg";
import RenderSVG from '@svg/theme';

import { FONTSIZE, bigHitSlop, getWp, getHp } from "@utils";
import { connect, useSelector, useDispatch } from "react-redux";
import { LocalStorage } from "../../app/utils/localStorage";
import MobxStore from '../../mobx';
import { observer } from "mobx-react";
import Themes from '../../app/themes';
import { shareFunction } from '@components'
import EditVendorProfile from '../BounceVendors/EditProfile';
import { useTheme } from '@hooks';

function CustomDrawer({ navigation }) {
  const theme = useTheme();
  const {
    authStore,
    uiStore
  } = MobxStore;
  const [drawer, setDrawer] = useState(true);
  const { vendorProfileData } = useSelector(
    (state) => state.mainExpenseByCategory
  );
  console.log('THEME_SERIALIZE - ', theme.serialize());
  const SERVICES = [
    {
      icon: <RenderSVG
        svgFile={'Drawer_Edit'}
        themeType={uiStore.theme.type}
        svgProp={{
          height: 30,
          width: 30
        }}
      />,
      name: "Edit Profile",
      onPress: () => navigation.navigate(EditVendorProfile.routeName),
    },
    {
      icon: <RenderSVG
        svgFile={'Drawer_Share'}
        themeType={uiStore.theme.type}
        svgProp={{
          height: 30,
          width: 30
        }}
      />,
      name: "Share Profile",
      onPress: () => shareFunction()
    },
    {
      icon: <RenderSVG
        svgFile={'Drawer_More'}
        themeType={uiStore.theme.type}
        svgProp={{
          height: 30,
          width: 30
        }}
      />,
      name: "More",
      onPress: () => setDrawer(!drawer),
    },
  ];
  const MORE = [
    {
      name: "Dark / Light Mode",
      onPress: () => {
        uiStore.toggleTheme();
      }
    },
    {
      name: "Subscription",
      // onPress: () => navigation.navigate("SubscriptionScreen")
    },
    {
      name: "About",
      // onPress: () => navigation.navigate("LoginScreen")
    },
    {
      name: "Log Out",
      onPress: async () => { 
        await LocalStorage.clearToken()
        authStore.logout();
      },
    },
  ];
  const fetchData = () => { };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.renderContainer} key={index.toString()}>
        <TouchableOpacity
          onPress={item.onPress}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          {item.icon}
          <Text
            style={[
              styles.heading,
              {
                marginLeft: 15,
                fontSize: FONTSIZE.Text21,
                fontWeight: "normal",
                color: theme.colors.primaryText1
              },
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
        {item.name === "More" && drawer
          ? MORE.map((item) => {
            return (
              <TouchableOpacity
                style={{
                  paddingLeft: 20,
                  paddingTop: 20,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={item.onPress}
                key={index.toString()}
              >
                {item.icon}
                <Text
                  style={[
                    styles.heading,
                    {
                      marginLeft: 40,
                      fontSize: FONTSIZE.Text18,
                      fontWeight: "normal",
                      color: "#696969",
                      color: uiStore.theme.colors.primaryText1
                    },
                  ]}
                >
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
      <View style={[styles.flex, { padding: 15 }]}>
        <Text style={{ ...styles.heading, color: uiStore.theme.colors.primaryText1 }}>Settings</Text>
        <BlackClose
          hitSlop={bigHitSlop}
          onPress={() => navigation.closeDrawer()}
          height={20}
          width={20}
        />
      </View>
      <FlatList
        data={SERVICES}
        renderItem={renderItem}
        key={(index) => index.toString()}
        keyExtractor={(index) => index.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  renderContainer: {
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    paddingLeft: 20,
    paddingVertical: getHp(20),
  },
  container: {
    paddingTop: 20,
    // flexDirection:'column',
    // justifyContent: 'space-around',
    flex: 1,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: FONTSIZE.Text27,
    color: "#000",
    fontWeight: "bold",
  },
});

export default observer(CustomDrawer);