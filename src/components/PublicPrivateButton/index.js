import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {getHp, getWp, FONTSIZE} from '../../app/utils';
import LinearGradient from 'react-native-linear-gradient';

const SingleButtonGradient = props => {
  const {reverse, children, selected = false} = props;
  if (!selected) {
    return children;
  }
  return (
    <LinearGradient
      // start={{x: 79.9, y: 22.3}}
      // end={{x: 88.68}}
      style={{
        height: '100%',
        width: '100%',
        ...styles.viewContainer,
        ...styles.borderStyles(reverse),
      }}
      colors={['#3CBDFF', '#6FD0FF']}>
      {children}
    </LinearGradient>
  );
};
const SingleButton = props => {
  const {reverse, heading, selected, onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: getHp(46),
        width: "45%",
        ...styles.viewContainer,
        backgroundColor: 'rgba(238,238,238,0.6',
        backgroundColor: '#EEEEEE',
        ...styles.borderStyles(reverse),
      }}>
      <SingleButtonGradient reverse={reverse} selected={selected}>
        <Text
          style={{
            color: selected ? 'white' : 'black',
            fontWeight: selected ? '600' : '400',
            fontFamily: 'AvenirNext-Regular',
            fontSize: selected ? FONTSIZE.Text18 : FONTSIZE.Text16,
          }}>
          {heading}
        </Text>
      </SingleButtonGradient>
    </TouchableOpacity>
  );
};

const PublicPrivateButton = props => {
  const {containerStyle = {}, value, onPrivatePress, onPublicPress} = props;
  return (
    <View
      style={{alignSelf: 'center', flexDirection: 'row', ...containerStyle}}>
      <SingleButton
        onPress={onPrivatePress}
        selected={value == true}
        heading={'Private'}
      />
      <SingleButton
        onPress={onPublicPress}
        selected={value == false}
        reverse
        heading={'Public'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderStyles: reverse => {
    return {
      borderTopRightRadius: reverse ? getHp(15) : 0,
      borderBottomRightRadius: reverse ? getHp(15) : 0,
      borderTopLeftRadius: !reverse ? getHp(15) : 0,
      borderBottomLeftRadius: !reverse ? getHp(15) : 0,
    };
  },
});
export default PublicPrivateButton;
