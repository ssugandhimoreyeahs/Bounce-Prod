import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {FONTSIZE, getHp, getWp} from '@utils';
import LinearGradient from 'react-native-linear-gradient';
import RadialGradient from 'react-native-radial-gradient';

export default function CustomButton(props) {
  const {
    onSaveDraftPress = () => {},
    onContinuePress = () => {},
    ButtonTitle = false,
    ButtonTitle2 = false,
    bar = false,
    complete = false,
    onPress = () => {},
    linear = false,
    rowDoubleButton = false,
    colDoubleButton = false,
    theme = false,
    onPress1 = () => {},
    userContinue = false,
  } = props;
  return (
    <View>
      {userContinue && (
        <TouchableOpacity
          style={[styles.linearGradient, {backgroundColor: '#FFFFFF'}]}
          onPress={onPress}>
          <Text
            style={[
              styles.titleStyle,
              {
                letterSpacing: 0.6,
                color: '#1FAEF7',
              },
            ]}>
            {ButtonTitle ? ButtonTitle : 'Continue'}
          </Text>
        </TouchableOpacity>
      )}
      {linear ? (
        <>
          <TouchableOpacity style={{}} onPress={onPress}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={['#1FAEF7', '#1FAEF7', '#AEE4FF']}
              style={styles.linearGradient}>
              <Text style={[styles.titleStyle]}>
                {ButtonTitle ? ButtonTitle : 'Continue'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {bar ? (
            <View
              style={[styles.barStyle, theme ? {backgroundColor: theme} : null]}
            />
          ) : null}
        </>
      ) : null}
      {complete ? (
        <View style={{backgroundColor: '#FEFEFE'}}>
          <Button
            title={ButtonTitle ? ButtonTitle : 'Continue'}
            containerStyle={[styles.container, {}]}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            onPress={onPress}
          />
          {bar ? (
            <View
              style={[styles.barStyle, theme ? {backgroundColor: theme} : null]}
            />
          ) : null}
        </View>
      ) : null}
      {rowDoubleButton ? (
        <>
          <View style={styles.rowButton}>
            <TouchableOpacity
              style={styles.DoubleButton}
              onPress={onSaveDraftPress}>
              <Text
                style={[
                  styles.titleStyle,
                  {
                    color: '#1FAEF7',
                    fontSize: FONTSIZE.Text20,
                    letterSpacing: 0.2,
                  },
                ]}>
                {ButtonTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.DoubleButton, {backgroundColor: '#1FAEF7'}]}
              onPress={onContinuePress}>
              <Text
                style={[
                  styles.titleStyle,
                  {
                    color: '#fff',
                    fontSize: FONTSIZE.Text20,
                    letterSpacing: 0.2,
                  },
                ]}>
                {ButtonTitle2}
              </Text>
            </TouchableOpacity>
          </View>
          {bar ? (
            <View
              style={[styles.barStyle, theme ? {backgroundColor: theme} : null]}
            />
          ) : null}
        </>
      ) : null}
      {colDoubleButton ? (
        <>
          <View
            style={{
              alignItems: 'center',
              marginVertical: getHp(0),
              borderTopWidth: 0.5,
              borderColor: '#CCCCCC',
              paddingTop: 10,
            }}>
            <TouchableOpacity style={styles.colButtonStyle} onPress={onPress1}>
              <Text
                style={[
                  styles.titleStyle,
                  {
                    color: '#1FAEF7',
                    fontSize: FONTSIZE.Text20,
                    fontWeight: 'bold',
                    letterSpacing: 0.2,
                  },
                ]}>
                {ButtonTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.colButtonStyle, {backgroundColor: '#1FAEF7'}]}
              onPress={onPress}>
              <Text
                style={[
                  styles.titleStyle,
                  {
                    color: '#fff',
                    fontSize: FONTSIZE.Text20,
                    fontWeight: 'bold',
                    letterSpacing: 0.2,
                  },
                ]}>
                {ButtonTitle2}
              </Text>
            </TouchableOpacity>
          </View>
          {bar ? (
            <View
              style={[styles.barStyle, theme ? {backgroundColor: theme} : null]}
            />
          ) : null}
        </>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  rowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: getHp(0),
    borderTopWidth: 0.5,
    borderColor: '#CCCCCC',
    paddingTop: 10,
  },

  colButtonStyle: {
    width: '95%',
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 19,
    alignItems: 'center',
    height: getHp(54),
    justifyContent: 'center',
    marginVertical: getHp(5),
  },
  DoubleButton: {
    height: getHp(50),
    width: getWp(166),
    elevation: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 13,
    marginTop: 10,
    marginBottom: 5,
  },
  barStyle: {
    height: getHp(5),
    backgroundColor: '#FEFEFE',
    marginBottom: getHp(5),
    marginTop: getHp(10),
    width: getWp(134),
    alignSelf: 'center',
    borderRadius: 100,
  },
  buttonStyle: {
    backgroundColor: '#1FAEF7',
    height: getHp(54),
    borderRadius: 13,
  },
  titleStyle: {
    fontSize: FONTSIZE.Text21,
    color: '#fff',
    fontFamily: 'AvenirNext-Medium',
  },
  linearGradient: {
    borderRadius: 17,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.3,
    elevation: 2,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },
});
