import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {getHp, getWp} from '../../app/utils';
import AntDesign from 'react-native-vector-icons/AntDesign';

AntDesign.loadFont();

const TagsCollapsible = props => {
  const [isVisible, setIsVisible] = useState(false);

  const RenderItems = (item, index) => {
    return (
      <View style={styles.itemView}>
        <Text style={styles.itemTextStyle}>{item}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsVisible(s => !s)}>
        <AntDesign name={'down'} color={'#000'} size={15} />
        <Text style={styles.headingTextStyle}>{props.name}</Text>
      </TouchableOpacity>
      <Collapsible collapsed={isVisible}>
        <View style={styles.collapsedContainer}>
          {props.item.map(RenderItems)}
        </View>
      </Collapsible>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom:10
  },
  heading: {
    alignItems: 'center',
    paddingVertical: getHp(12),
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    flexDirection: 'row',
  },
  headingTextStyle: {
    fontSize: 15,
    color: '#000',
    fontWeight: '400',
    marginLeft: getWp(10),
  },
  collapsedContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  itemView: {
    height: 35,
    backgroundColor: '#F2F5F6',
    justifyContent: 'center',
    paddingHorizontal: getHp(15),
    borderRadius: 100,
  },
  itemTextStyle: {
    fontSize: 12,
    fontWeight: '500',
  },
});
export default TagsCollapsible;
