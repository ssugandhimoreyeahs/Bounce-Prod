
 
import React, { Component, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import {
  NavigationContainer,

  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
} from 'react-native-paper'
import MainStack from './src/navigation/MainStack';
import { Provider } from "react-redux";
import Store from "./src/reducer/store";
import { LogBox } from 'react-native';
import { AuthContext } from './src/context'
import { UserInfoProvider } from './src/context/profiledataProvider';
import { Button } from 'react-native';
import MobxStore from './src/mobx';
import { observer } from 'mobx-react';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Entypo';

import ModalDropdown from 'react-native-modal-dropdown-v2'; 

Icon.loadFont();
function App() {
  LogBox.ignoreAllLogs(true);

  const {
    uiStore
  } = MobxStore;
  return (
    <Provider store={Store}>
      <Spinner
        visible={MobxStore.appStore.loader}
      //visible={true}
      />
      <PaperProvider theme={uiStore.theme}>
        <NavigationContainer theme={uiStore.theme}>
          <SafeAreaView style={{flex:1}}>
          <MainStack />
          </SafeAreaView>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
export default observer(App); 
const country = [
  {
    id: 1,
    name: 'India'
  },
  {
    id: 2,
    name: 'China'
  },
  {
    id: 3,
    name: 'Australia'
  }, 
];
const App2 = () => {
  const [countries, setCountries] = useState([...country]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const onSelectDropDown = (countryData) => {
    let findIndex = selectedIndex.findIndex(c => c.id == countryData.id);
    console.log('TEST_SEL - ', JSON.stringify(selectedIndex));
    console.log('FIND_IN - ', findIndex);
    if (findIndex > -1) {
      setSelectedIndex(i => {
        return i.filter((c, i) => c.id != countryData.id);
      });
      return;
    }
    setSelectedIndex(i => {
      return [...i, { ...countryData }];
    });
  }
  const dropDownRef = useRef();
  let selectedValue = '';
  selectedIndex.map(i => {
    selectedValue = selectedValue + i.name + ', ';
  });
  selectedValue = selectedValue.slice(0, selectedValue.length - 2);
  return <View style={{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }}>
    <View>
    <ModalDropdown
      ref={dropDownRef}
      textStyle={{
        fontSize: 20,
        color: 'black',
        marginLeft: 10,
      }}
      style={{
        height: 40,
        width: 300,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center'
      }}
      dropdownStyle={{
        width: 300,
        height: 200
      }}
      multipleSelect={true}
      defaultValue={'Select Languages...'}
      options={[...countries]}
      renderRowComponent={(data) => {
        return <TouchableOpacity
          style={{ height: 40, justifyContent: 'center', paddingHorizontal: 20 }}
          onPress={() => { data.onPress(); }}>
          {data.children}
        </TouchableOpacity>;
      }}
      renderRow={(option, index) => {
        let isSelected = selectedIndex.findIndex(c => option.id == c.id);
        return <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{color:'black'}}>{option.name}</Text>
          {
            isSelected > -1
            && <Icon name={'check'} />
          }

        </View>;
      }}
      onSelect={(index) => {
        onSelectDropDown({ ...countries[index] });
      }}
      dropdownStyle={{marginTop:7, width: 300}}
    >

    </ModalDropdown>
    <TouchableOpacity
      onPress={() => dropDownRef.current.show()}
      activeOpacity={1}
      style={{
        position: 'absolute',
        borderWidth: 1,
        borderColor: 'red',
        height: 40,
        width: 300,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        backgroundColor: 'white'
      }}>
      <Text style={{
        color: 'black'
      }}>
        {
          selectedValue.length > 0 ? selectedValue : 'Please Select Countries'
        }
      </Text>
    </TouchableOpacity>
    </View>
      <TextInput 
        style={{
          borderWidth:1,
          borderColor:'red'
        }}
        placeholder={'Enter Your Name'}
        />
  </View>
} 
 
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * Generated with the TypeScript template
//  * https://github.com/react-native-community/react-native-template-typescript
//  *
//  * @format
//  */

//  import React from 'react';
//  import {
//    SafeAreaView,
//    ScrollView,
//    StatusBar,
//    StyleSheet,
//    Text,
//    useColorScheme,
//    View,
//  } from 'react-native';

//  import {
//    Colors,
//    DebugInstructions,
//    Header,
//    LearnMoreLinks,
//    ReloadInstructions,
//  } from 'react-native/Libraries/NewAppScreen';

//  const Section: React.FC<{
//    title: string;
//  }> = ({children, title}) => {
//    const isDarkMode = useColorScheme() === 'dark';
//    return (
//      <View style={styles.sectionContainer}>
//        <Text
//          style={[
//            styles.sectionTitle,
//            {
//              color: isDarkMode ? Colors.white : Colors.black,
//            },
//          ]}>
//          {title}
//        </Text>
//        <Text
//          style={[
//            styles.sectionDescription,
//            {
//              color: isDarkMode ? Colors.light : Colors.dark,
//            },
//          ]}>
//          {children}
//        </Text>
//      </View>
//    );
//  };

//  const App = () => {
//    const isDarkMode = useColorScheme() === 'dark';

//    const backgroundStyle = {
//      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//    };

//    return (
//      <SafeAreaView style={backgroundStyle}>
//        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//        <ScrollView
//          contentInsetAdjustmentBehavior="automatic"
//          style={backgroundStyle}>
//          <Header />
//          <View
//            style={{
//              backgroundColor: isDarkMode ? Colors.black : Colors.white,
//            }}>
//            <Section title="Step One">
//              Edit <Text style={styles.highlight}>App.js</Text> to change this
//              screen and then come back to see your edits.
//            </Section>
//            <Section title="See Your Changes">
//              <ReloadInstructions />
//            </Section>
//            <Section title="Debug">
//              <DebugInstructions />
//            </Section>
//            <Section title="Learn More">
//              Read the docs to discover what to do next:
//            </Section>
//            <LearnMoreLinks />
//          </View>
//        </ScrollView>
//      </SafeAreaView>
//    );
//  };

//  const styles = StyleSheet.create({
//    sectionContainer: {
//      marginTop: 32,
//      paddingHorizontal: 24,
//    },
//    sectionTitle: {
//      fontSize: 24,
//      fontWeight: '600',
//    },
//    sectionDescription: {
//      marginTop: 8,
//      fontSize: 18,
//      fontWeight: '400',
//    },
//    highlight: {
//      fontWeight: '700',
//    },
//  });

//  export default App;
