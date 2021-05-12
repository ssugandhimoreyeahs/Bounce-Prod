import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {BlackClose, More, BlackShare, LockBlack, Settings} from '@svg';
import {FONTSIZE, bigHitSlop, smallHitSlop} from '@utils';
import {useTheme, Switch} from 'react-native-paper';
import {AuthContext} from '../../context';
import {LocalStorage} from '../../app/utils/localStorage';
import MobxStore from '../../mobx';

export default function UserCustomDrawer(props) {
  const {authStore} = MobxStore;
  // const { toggleTheme } = React.useContext(AuthContext)
  const {colors} = useTheme();
  const paperTheme = useTheme();
  const SERVICES = [
    {
      icon: <Settings height={30} width={30} />,
      name: 'Account Settings',
      onPress: () => {
        //navigation.navigate("AccountSetting")
      },
    },
    {
      icon: <LockBlack height={30} width={30} />,
      name: 'Privacy Settings',
      onPress: () => {
        //navigation.navigate("VendorEditProfile")
      },
    },
    {
      icon: <BlackShare height={30} width={30} />,
      name: 'Share Profile',
      onPress: () => {
        //navigation.navigate("DjSignup")
      },
    },
    {
      icon: <More height={30} width={30} />,
      name: 'More',
      onPress: () => {},
    },
  ];

  const MORE = [
    {
      name: 'Dark / Light Mode',
      // onPress: () => toggleTheme()
    },
    {
      name: 'Subscription',
      // onPress: () => navigation.navigate("SubscriptionScreen")
    },
    {
      name: 'About',
      // onPress: () => navigation.navigate("LoginScreen")
    },
    {
      name: 'Log Out',
      onPress: async () => { 
        await LocalStorage.clearToken();
        authStore.logout();
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
        </TouchableOpacity>
        {item.name === 'More'  
          ? MORE.map(item => {
              return (
                <TouchableOpacity
                  style={{
                    paddingLeft: 20,
                    paddingTop: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={item.onPress}
                  key={index.toString()}>
                  {/* {item.name == "Dark / Light Mode" ?
                                        <View pointerEvents="none">
                                            {console.log("paperTheme.dark",paperTheme.dark)}
                                            <Switch value={paperTheme.dark} />
                                        </View>
                                        : null
                                    } */}

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
      <View style={[styles.flex, {padding: 15}]}>
        <Text style={styles.heading}>Settings</Text>
        <BlackClose
          hitSlop={bigHitSlop}
          onPress={() => {
            props.navigation.closeDrawer();
          }}
          height={20}
          width={20}
        />
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
    fontWeight: 'bold',
  },
});
