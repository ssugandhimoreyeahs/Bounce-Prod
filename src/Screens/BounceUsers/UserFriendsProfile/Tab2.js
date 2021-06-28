import React, { useState, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { FONTSIZE } from '@utils';
import { Avatar } from 'react-native-elements';
import { Girl } from '../../../assets';
import { RenderSmallButton } from '@components';
import { FlatList } from 'react-native-gesture-handler';
import CreateInvitation from '../../BounceVendors/PlanParty/CreateInvitation';
import moment from 'moment';
import { observer } from 'mobx-react';
import { getHp, toCurrentTimeZone } from '../../../app/utils';
import { RegexCollection } from '../../../app/constants';
import { Button } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import AddInterest from '../NewsFeed/AddInterest';

AntDesign.loadFont();
const STATIC_DATA = [
  'Personalize your feed of events',
  'Find friends with common interests',
  'See which events and activities you both like',
];

function Tab2(props) {
  const { partyStore } = props;
  const [showMore, setShowMore] = useState(false);

  const renderItems = ({ item, index }) => {
    console.log("RENDER ITEM-->", item.isPrivate)
    return (
      <TouchableOpacity
        style={styles.shadowStyle}
        onPress={() =>
          props.navigation.navigate(CreateInvitation.routeName, {
            party: item,
            isEditParty: true,
          })
        }
        key={index}
        style={{ backgroundColor: '#F5F5F5', padding: 10 }}>
        {/* This can be used as component */}
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            flex: 1,
            flexDirection: 'row',
          }}>
          <Avatar
            source={{ uri: item?.gallery[0]?.filePath }}
            size={125}
            avatarStyle={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
          />


          {
            item.isDraft ?
              <View style={[
                styles.textStyle,
                {
                  position: 'absolute',
                  bottom: 0,
                  backgroundColor: '#F8A41E',
                  borderBottomLeftRadius: 10,
                  borderTopRightRadius: 3,
                  paddingHorizontal: 5,
                  paddingVertical: 2
                },
              ]}>
                {item.isDraft && (
                  <Text style={{
                    color: '#fff',
                    fontFamily: 'AvenirNext-Medium',
                    fontSize: FONTSIZE.Text13
                  }}>{'Draft'}</Text>
                )
                }
              </View>
              :
              (item.isPrivate && <View style={[
                styles.textStyle,
                {
                  position: 'absolute',
                  bottom: 0,
                  backgroundColor: '#1FAEF7',
                  borderBottomLeftRadius: 10,
                  borderTopRightRadius: 3,
                  paddingHorizontal: 5,
                  paddingVertical: 2
                },
              ]}>
                {item.isPrivate &&
                  (
                    <Text style={{
                      color: '#fff',
                      fontFamily: 'AvenirNext-Medium',
                      fontSize: FONTSIZE.Text13
                    }}>{'Private'}</Text>
                  )
                }
              </View>)


          }


          <View style={{ marginLeft: 10, flex: 1, paddingVertical: 5 }}>
            <Text
              style={[
                styles.textStyle,
                { color: '#000', marginVertical: 5, fontSize: FONTSIZE.Text16 },
              ]}>
              {item?.title}
            </Text>
            <Text
              style={[
                styles.textStyle,
                {
                  color: '#000',
                  marginVertical: 3,
                  fontSize: FONTSIZE.Text13,
                  fontFamily: 'AvenirNext-Medium',
                },
              ]}>
              {item?.location?.addressStr}
            </Text>
            <Text
              style={[
                styles.textStyle,
                {
                  color: '#000',
                  marginVertical: 3,
                  fontSize: FONTSIZE.Text13,
                  fontFamily: 'AvenirNext-Medium',
                },
              ]}>
              {/* {'Dec. 31, 7:00 PM'} */}
              {moment.utc(item?.date).format(RegexCollection.PartyTimeFormat)}
            </Text>
          </View>
        </View>
        {/* This can be used as component */}
      </TouchableOpacity>
    );
  };

  const renderStatic = ({ item, index }) => {
    // console.log("DATA STATIC", item);
    return (
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
        <View style={styles.numberingStyle}>
          <Text style={styles.numberTextStyle}>{index + 1}</Text>
        </View>
        <Text
          style={[
            styles.numberTextStyle,
            {
              fontSize: FONTSIZE.Text14,
              fontFamily: 'AvenirNext-Regular',
              marginLeft: 10,
              letterSpacing: 0.2
            },
          ]}>
          {item}
        </Text>
      </View>
    );
  };

  if (partyStore.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={'grey'} size={'large'} />
      </View>
    );
  }
  let partyData = partyStore.party ?? [];

  return (
    <View style={{}}>
      {partyData.length > 0 ? (
        <Fragment >
          <FlatList
            scrollEnabled={false}
            data={!showMore ? partyData.slice(0, 2) : partyData}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItems}
            keyExtractor={index => index}
          />
          {partyData.length > 2 && (
            <View style={{ backgroundColor: '#FBFBFB', paddingBottom: 10 }}>
              <Button
                onPress={() => {
                  setShowMore(i => !i);
                }}
                full
                light
                style={[styles.showMoreButtonContainer, { elevation: 0 }]}>
                <Text style={[styles.showMoreTextStyle, { fontFamily: 'AvenirNext-Medium', letterSpacing: 0.2 }]}>
                  {!showMore ? `${partyData.length - 2} More` : `Hide`}
                </Text>
                <View style={{ marginStart: getHp(10) }}>
                  <AntDesign
                    color={'black'}
                    size={getHp(16)}
                    name={!showMore ? 'down' : 'up'}
                  />
                </View>
              </Button>
            </View>
          )}
        </Fragment>
      ) : (
          <View style={{ padding: 10 }}>
            <FlatList
              data={STATIC_DATA}
              showsHorizontalScrollIndicator={false}
              renderItem={renderStatic}
              keyExtractor={index => index}
            />
            <TouchableOpacity onPress={() =>
              props.navigation.navigate(CreateInvitation.routeName, {
                // party: item,
                isEditParty: false,
              })
            }>

              <View style={{ backgroundColor: '#EEEEEE', height: 1, marginVertical: 5 }} />
              <LinearGradient
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                colors={['#27F4AA', '#0BEEB7']}
                style={[
                  styles.linearGradient,
                  {
                    width: '100%',
                    height: getHp(38),
                    borderRadius: 13,
                    marginTop: 10,
                    //   marginBottom: 10
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate(AddInterest.routeName)}
                  style={[styles.fullTouch, {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }]} >
                  <Text style={[styles.buttonText, { marginRight: 15 }]}>{'Add Interests'}</Text>

                </TouchableOpacity>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
}
const styles = StyleSheet.create({
  buttonText: {
    fontSize: FONTSIZE.Text18,
    fontFamily: 'AvenirNext-DemiBold',
    color: '#fff',
  },
  fullTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHp(56),
    elevation: 2,
    backgroundColor: '#fff',
    // marginVertical:15 ,
    borderRadius: 20,
  },
  showMoreButtonContainer: {
    // alignItems:'center',
    marginHorizontal: 10,
    flexDirection: 'row',
    marginTop: getHp(16),
    backgroundColor: '#F2F5F6',
    borderWidth: 1,
    borderColor: '#E4EEF1',
    borderRadius: getHp(10),
    borderBottomLeftRadius: getHp(10),
    borderBottomRightRadius: getHp(10),
  },
  showMoreTextStyle: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: FONTSIZE.Text16,
    lineHeight: getHp(22),
  },
  loadingContainer: {
    flex: 1,
    height: 300,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: FONTSIZE.Text13,
    fontFamily: 'AvenirNext-Bold',
  },
  numberTextStyle: {
    color: '#000',
    fontSize: FONTSIZE.Text14,
    fontFamily: 'AvenirNext-DemiBold',
  },
  numberingStyle: {
    height: 24,
    width: 24,
    backgroundColor: '#F2F5F6',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default observer(Tab2);
