import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';

import AppStatusBar from '../AppStatusBar';
class Scaffold extends Component {
  render() {
    const {
      contentContainerStyle = {},
      statusBarStyle = {},
      scaffoldContainerStyle = {},
    } = this.props;
    return (
      <View style={[styles.container, scaffoldContainerStyle]}>
        <AppStatusBar {...statusBarStyle} />
        <SafeAreaView
          style={[styles.contentContainerStyle, contentContainerStyle]}>
          {this.props.children}
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {flex: 1, backgroundColor: 'white'},
});
export default Scaffold;
