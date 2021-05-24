import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {FONTSIZE} from '@utils';
import {Avatar} from 'react-native-elements';
import {Girl} from '../../../assets';
import {RenderSmallButton} from '@components';
import {FlatList} from 'react-native-gesture-handler';
import CreateInvitation from '../../BounceVendors/PlanParty/CreateInvitation';
import moment from 'moment';
import {observer} from 'mobx-react';
import { toCurrentTimeZone } from '../../../app/utils';
import { RegexCollection } from '../../../app/constants';

const STATIC_DATA = [
  'Create an event page',
  'Invite friends',
  'Hire vendors',
  'Promote your event',
];

function Tab1(props) {
  const {partyStore} = props;
  const renderItems = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(CreateInvitation.routeName, {
            party: item,
            isEditParty: true,
          })
        }
        key={index}
        style={{backgroundColor: '#FBFBFB', padding: 10}}>
        {/* This can be used as component */}
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            flex: 1,
            flexDirection: 'row',
          }}>
          <Avatar
            source={{uri: item?.gallery[0]?.filePath}}
            size={125}
            avatarStyle={{borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
          />

          {item.isDraft && (
            <Text
              style={[
                styles.textStyle,
                {
                  position: 'absolute',
                  color: '#fff',
                  backgroundColor: '#1FAEF7',
                  borderTopLeftRadius: 10,
                  padding: 5,
                },
              ]}>
              {'Draft'}
            </Text>
          )}

          <View style={{marginLeft: 10, flex: 1, paddingVertical: 5}}>
            <Text
              style={[
                styles.textStyle,
                {color: '#000', marginVertical: 5, fontSize: FONTSIZE.Text16},
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
                  fontFamily: '500',
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
                  fontFamily: '500',
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

  const renderStatic = ({item, index}) => {
    // console.log("DATA STATIC", item);
    return (
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
        <View style={styles.numberingStyle}>
          <Text style={styles.numberTextStyle}>{index + 1}</Text>
        </View>
        <Text
          style={[
            styles.numberTextStyle,
            {fontSize: FONTSIZE.Text16, fontFamily: '500', marginLeft: 10},
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
  return (
    <View>
      {partyStore.party?.length > 0 ? (
        <FlatList
          data={partyStore.party}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItems}
          keyExtractor={index => index}
        />
      ) : (
        <View style={{paddingVertical: 10, backgroundColor: '#FBFBFB'}}>
          <FlatList
            data={STATIC_DATA}
            showsHorizontalScrollIndicator={false}
            renderItem={renderStatic}
            keyExtractor={index => index}
          />
          <Text
            style={[
              styles.numberTextStyle,
              {
                fontSize: FONTSIZE.Text16,
                marginVertical: 15,
                alignSelf: 'center',
              },
            ]}>
            {'Click “+” to get started!'}
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
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
    fontFamily: 'ANB',
  },
  numberTextStyle: {
    color: '#000000',
    fontSize: FONTSIZE.Text14,
    fontFamily: 'ANB',
  },
  numberingStyle: {
    height: 24,
    width: 24,
    backgroundColor: '#F2F5F6',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default observer(Tab1);
