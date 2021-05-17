import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FONTSIZE} from '@utils';
import {Avatar} from 'react-native-elements';
import {Girl} from '../../../assets';
import {RenderSmallButton} from '@components';
import {FlatList} from 'react-native-gesture-handler';
import CreateInvitation from '../../BounceVendors/PlanParty/CreateInvitation';
import moment from 'moment';

export default function Tab1(props) {
  const {hosting} = props;
  const renderItems = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate(CreateInvitation.routeName, {
            party: item
        })}
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
            source={Girl}
            size={125}
            avatarStyle={{borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}
          />

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
              {moment(item?.date).format('MMM. DD, HH:MM A')}
            </Text>
          </View>
        </View>
        {/* This can be used as component */}
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={hosting}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItems}
      keyExtractor={index => index}
    />
  );
}
const styles = StyleSheet.create({
  textStyle: {
    color: '#FFFFFF',
    fontSize: FONTSIZE.Text13,
    fontFamily: 'ANB',
  },
});
