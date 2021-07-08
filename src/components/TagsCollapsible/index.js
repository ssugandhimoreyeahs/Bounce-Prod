import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {FONTSIZE, getHp, getWp} from '../../app/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {BackBlack} from '@svg';

AntDesign.loadFont();

const TagsCollapsible = props => {
  const [isVisible, setIsVisible] = useState(true);

  const RenderItems = (item, index) => { 
    let tagObj = Object.assign({}, props.Data);
    delete tagObj.subTags;
    let isPartySelected = props.isOnSelect({ tagObj, item });
     

  return (
    <TouchableOpacity
      key={index}
      onPress={() => {
        
        props.onAdd({
          tag: tagObj,
          subTags: item.clone() ?? item,
        });
      }}>
        <View
          style={[
            styles.itemView,
            isPartySelected && {backgroundColor: 'rgba(0, 224, 143, 0.24)'},
          ]}>
          <Text style={styles.itemTextStyle}>
            {item.emoji + ' ' + item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      {!props?.MyInterest ? (
        <View key={props.Data.id} style={styles.container}>
          <TouchableOpacity
            style={styles.heading}
            onPress={() => setIsVisible(s => !s)}>
            <BackBlack height={13} width={6} />
            <Text style={styles.headingTextStyle}>{props.Data.name}</Text>
          </TouchableOpacity>
          <Collapsible collapsed={isVisible}>
            <View style={styles.collapsedContainer}>
              {props.Data.subTags?.map(RenderItems)}
            </View>
          </Collapsible>
        </View>
      ) : (
        <View
          key={props.Data.id}
          style={[
            styles.container,
            {backgroundColor: '#FBFBFB', marginVertical: getHp(15)},
          ]}>
          <Text style={[styles.headerTitle, {marginLeft: getWp(10)}]}>
            {props.Data.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              marginTop: 5,
              flexWrap: 'wrap',
            }}>
            {props.Data.subTags?.map(RenderItems)}
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginBottom: 2,
  },
  heading: {
    alignItems: 'center',
    paddingVertical: getHp(12),
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDDDDD',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  headingTextStyle: {
    fontSize: FONTSIZE.Text15,
    color: '#000',
    fontFamily: 'AvenirNext-Regular',
    marginLeft: getWp(10),
  },
  collapsedContainer: {
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerTitle: {
    color: '#000',
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-DemiBold',
  },
  itemView: {
    height: 35,
    backgroundColor: '#F2F5F6',
    justifyContent: 'center',
    paddingHorizontal: getHp(15),
    borderRadius: 100,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  itemTextStyle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 28,
    color: '#000',
  },
});
export default TagsCollapsible;
