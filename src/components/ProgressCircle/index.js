import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ProgressCircle = props => {
  const {progress = 4, currentProgress = 1, containerStyle = {}} = props;

  const RenderProgress = (_, i) => {
    return (
      <View
        style={[
          style.progressContainer,
          i + 1 == currentProgress
            ? style.progressActive
            : style.progressInActive,
        ]}></View>
    );
  };
  return (
    <View style={[style.container, containerStyle]}>
      {Array(progress).fill(0).map(RenderProgress)}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  progressContainer: {
    height: 10,
    width: 10,
    borderRadius: 100,
    marginHorizontal: 2,
  },
  progressActive: {
    backgroundColor: '#1FAEF7',
  },
  progressInActive: {
    backgroundColor: '#AAAAAA',
  },
});
export default ProgressCircle;
