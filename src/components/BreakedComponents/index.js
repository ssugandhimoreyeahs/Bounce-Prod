import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {
  Header,
  SearchBar,
  Footer,
  CustomText,
  Toggle,
  Calender,
  ModalPopup,
  Root,
} from '@components';
import {Girl} from '@assets';
import {
  Info,
  GreenTick,
  WhiteTick,
  BlackOutlineHeart,
  DollarOnlyWhite,
  FavouritedHeart,
  BlackPen,
  Dollar,
} from '@svg';
import {KeyboardAvoidingView} from 'react-native';
import {FONTSIZE, getHp, getWp} from '@utils';
import {FlatList} from 'react-native';
import {Avatar} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Ratings from '../../components/RatingStar/Ratings';
import {BlackShare} from '../../assets/Svg';

export const VendorCard = ({item}) => {
  let {icon, name, city, rating, price, desc, liked = false} = item?.item;

  return (
    <View
      style={{
        // flex:1,
        paddingVertical: 25,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        marginVertical: 5,
      }}>
      <View
        style={{
          // flex:1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar source={icon} size={getHp(60)} rounded />
          <View style={{paddingLeft: 15}}>
            <Text style={[styles.fullName, {marginBottom: 4}]}>{name}</Text>
            <Text
              style={[
                styles.fullName,
                {
                  color: '#696969',
                  fontSize: FONTSIZE.Text14,
                  marginTop: 0,
                },
              ]}>
              {city}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.fourItems,
            {
              backgroundColor: 'rgba(31, 174, 247, 0.7)',
              borderRadius: 50,
              padding: 10,
            },
          ]}>
          <WhiteTick height={21} width={21} />
        </TouchableOpacity>
      </View>

      <CustomText
        TextData={desc}
        styleProp={{
          color: '#000',
          fontSize: FONTSIZE.Text18,
          marginVertical: getHp(15),
        }}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* Rating and Hourly Rate */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ratings rating={rating} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 15,
            }}>
            <View
              style={{
                backgroundColor: '#00E08F',
                borderRadius: 5,
                padding: 2,
              }}>
              <DollarOnlyWhite height={18} width={18} />
            </View>
            <Text style={styles.hourStyle}>
              {price} {'/ hour'}
            </Text>
          </View>
        </View>
        {/* Heart Share */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 15,
          }}>
          {liked ? (
            <BlackOutlineHeart height={22} width={24} />
          ) : (
            <FavouritedHeart height={22} width={24} />
          )}
          <BlackShare height={25} width={27} style={{marginLeft: 30}} />
        </View>
      </View>
    </View>
  );
};

export const ChooseVendorCard = ({item}) => {
  // console.log("ITEMS IN CHOOSE FUNCTIONS -->", item)
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#F2F5F6',
        borderRadius: 24,
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginLeft: 10,
        marginRight: 1,
      }}>
      <Avatar source={item.icon} rounded size={getHp(60)} />
      <Text style={[styles.allTitleStyle, {marginVertical: 5}]}>
        {item.messageName}
      </Text>
      <View style={{marginTop: 5}}>
        <Ratings rating={item.rating} />
      </View>
    </View>
  );
};

export const InputBox = ({placeholder, onChangeText, styleProp}) => {
  return (
    <TextInput
      placeholderTextColor={'#999999'}
      placeholder={placeholder}
      style={[styles.textInput, styleProp]}
      onChangeText={onChangeText}
    />
  );
};

export const PastGuestList = ({
  PAST_LIST_ARRAY,
  heading,
  pen = false,
  onPressGuessList = () => {},
}) => {
  const RenderItem = ({item}) => {
    return (
      <View style={{}}>
        {item.index < 4 ? (
          <View
            style={
              item.index
                ? styles.congested
                : [styles.congested, {marginLeft: 0}]
            }>
            <Avatar source={item.item.icon} rounded size={getHp(30)} />
            {item.index == 3 ? (
              <Text
                style={[
                  styles.TitleStyle,
                  {color: '#000', marginLeft: 15, fontSize: FONTSIZE.Text16},
                ]}>{`${PAST_LIST_ARRAY.length - 4} guests`}</Text>
            ) : null}
          </View>
        ) : null}
      </View>
    );
  };

  const bridge = item => {
    console.log('fdfdfsd', item);
    return (
      <TouchableOpacity onPress={onPressGuessList}>
        <RenderItem item={item} />
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPressGuessList}
      style={styles.pastGuestContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={[
            styles.TitleStyle,
            {color: '#000', fontWeight: 'bold', paddingVertical: 5},
          ]}>
          {heading}
        </Text>
        {!pen && <BlackPen height={28} width={25} />}
      </View>
      <View style={{paddingVertical: 5}}>
        <FlatList
          data={PAST_LIST_ARRAY}
          renderItem={item => <RenderItem item={item} />}
          horizontal
        />
      </View>
    </TouchableOpacity>
  );
};

export const SwitchButton = props => {
  const {value = true,onPrivatePress = () => {}, onPublicPress = () => {}} = props;
  const onValues = {
    backgroundColor: '#fff',
    height: getHp(46),
    elevation: 10,
  };
  const offValues = {
    backgroundColor: '#EEEEEE',
    height: getHp(38),
  };
  return (
    <View style={styles.doubleButton}>
      <View style={styles.doubleSubcontainer}>
        <TouchableOpacity
          style={[styles.private, value ? onValues : offValues]}
          onPress={() => onPrivatePress()}>
          <Text
            style={[
              styles.TitleStyle,
              value
                ? {color: '#1FAEF7', fontWeight: 'bold'}
                : {color: '#000', fontWeight: 'normal'},
            ]}>
            {'Private'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.private, value ? offValues : onValues]}
          onPress={() => onPublicPress()}>
          <Text
            style={[
              styles.TitleStyle,
              !value
                ? {color: '#1FAEF7', fontWeight: 'bold'}
                : {color: '#000', fontWeight: 'normal'},
            ]}>
            {'Public'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{position: 'absolute', right: -45}}>
        <Info height={25} width={25} />
      </View>
    </View>
  );
};

export const DollarField = props => {
  // console.log("props breaked", props);
  return (
    <View style={styles.DollarView}>
      <View style={{paddingHorizontal: 20}}>
        <Dollar height={20} width={20} style={{margin: 0}} />
      </View>
      <View
        style={{height: getHp(40), borderWidth: 0.5, borderColor: '#999999'}}
      />
      <TextInput
        placeholder={'Entry Fee'}
        style={styles.TextInputStyle}
        placeholderTextColor={'#909090'}
      />
    </View>
  );
};

export const AgeField = props => {
  // console.log("props breaked", props);
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        width: '80%',
        alignSelf: 'center',
        marginVertical: getHp(15),
        justifyContent: 'space-between',
        borderRadius: 17,
      }}>
      <TextInput
        placeholder={'Min Age'}
        style={[
          styles.TextInputStyle,
          {elevation: 5, backgroundColor: '#fff', width: '48%'},
        ]}
        placeholderTextColor={'#909090'}
      />
      <TextInput
        placeholder={'Max Age'}
        style={[
          styles.TextInputStyle,
          {elevation: 5, backgroundColor: '#fff', width: '48%'},
        ]}
        placeholderTextColor={'#909090'}
      />
    </View>
  );
};

export const RenderSmallButton = ({item}) => {
  console.log('props', item);
  // const { onPress,
  //  } = props
  return (
    <LinearGradient
      colors={['#1FAEF7', '#AEE4FF']}
      style={[
        styles.linearGradient,
        {
          marginTop: getHp(15),
          marginBottom: 0,
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}>
      <TouchableOpacity style={[styles.allButtonStyle, {marginRight: 5}]}>
        <Text style={styles.allTitleStyle}>{item}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  pastGuestContainer: {
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginVertical: 2,
  },
  hourStyle: {
    color: '#000',
    fontSize: FONTSIZE.Text18,
    marginLeft: 5,
  },
  fullName: {
    color: '#000',
    fontSize: FONTSIZE.Text20,
  },
  textInput: {
    fontSize: FONTSIZE.Text16,
    elevation: 5,
    backgroundColor: '#fff',
    paddingLeft: 10,
    marginVertical: 5,
    borderRadius: 9.5,
    color: '#999999',
  },
  allButtonStyle: {
    // width: '10%',
    borderRadius: 24,
    // backgroundColor: '#1FAEF7',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  allTitleStyle: {
    fontSize: FONTSIZE.Text14,
    color: '#000',
  },
  congested: {
    marginLeft: getWp(-17),
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 66,
    flexDirection: 'row',
    alignItems: 'center',
  },
  PastList: {
    flexDirection: 'row',
  },
  DollarView: {
    height: getHp(44),
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 17,
    width: '80%',
    alignSelf: 'center',
    marginVertical: getHp(15),
  },
  past: {
    marginVertical: 10,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 30,
    justifyContent: 'space-evenly',
  },
  private: {
    borderRadius: 17,
    alignItems: 'center',
    // paddingVertical: 15,
    flex: 1,
    justifyContent: 'center',
  },
  doubleSubcontainer: {
    alignItems: 'center',
    flexDirection: 'row',
    // elevation: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 17,
    height: getHp(38),
    width: '80%',
    alignSelf: 'center',
  },
  doubleButton: {
    marginVertical: getHp(15),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // marginVertical: 20,
    // elevation: 10,
    backgroundColor: '#fff',
    // flex: 1,
    borderRadius: 10,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    overflow: 'visible',
  },
  fullInventoryTitleStyle: {
    marginLeft: 10,
    color: '#1FAEF7',
    fontSize: FONTSIZE.Text18,
    letterSpacing: 0.8,
  },
  reviewsTitleStyle: {
    marginVertical: 30,
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  TextInputStyle: {
    backgroundColor: '#fff',
    // borderRadius: 24,
    paddingLeft: 25,
    fontSize: FONTSIZE.Text18,
    // borderWidth: 1,
    height: getHp(44),
    width: '80%',
    borderRadius: 17,
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#000000',
    width: '100%',
  },
  bottomButton: {
    borderRadius: 24,
    backgroundColor: '#333333',
    flexDirection: 'column',
    paddingVertical: 10,
    maxHeight: '100%',
    minWidth: '45%',
    alignItems: 'center',
  },
  ContainerStyle: {
    width: '100%',
    marginVertical: 4,
  },
  ButtonStyle: {
    backgroundColor: '#212121',
    borderRadius: 10,
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  TitleStyle: {
    fontSize: FONTSIZE.Text18,
    paddingVertical: 0,
  },
  linearGradient: {
    // flex: 1,
    // width: '48%',
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
});
