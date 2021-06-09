import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';

const RailSelected = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 10,
    backgroundColor: '#1FAEF7',
    borderRadius: 2,
  },
});
