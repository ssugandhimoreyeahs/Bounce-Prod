import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard, Dimensions } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { FONTSIZE, getHp, getWp } from '@utils';
import { BlueEye, GreyEye } from '@svg';

const { width, height } = Dimensions.get('screen')


const FloatingInput = props => {
  const {
    floatingLabel,
    createEvent = false,
    value,
    uploadInventory = false,
    onChange = () => { },
    Password = false,
    isFocused = false,
    blurOnSubmit = false,
    custom = false,
    keyboardType = '',
    errorMessage = '',
  } = props;
  return (
    <View>
      {custom ? (
        <View
          style={{
            flex: 1,
            marginVertical: getHp(10),
          }}>
          <FloatingLabelInput
            returnKeyType="done"
            blurOnSubmit={blurOnSubmit}
            keyboardType={keyboardType}
            isFocused={isFocused}
            customShowPasswordComponent={<GreyEye height={25} width={33} />}
            customHidePasswordComponent={<BlueEye height={25} width={33} />}
            label={floatingLabel}
            customLabelStyles={{
              colorFocused: '#999999',
              fontSizeBlurred: FONTSIZE.Text15,
              fontSizeFocused: FONTSIZE.Text15,
              colorBlurred: '#999999',
            }}
            isPassword={Password}
            labelStyles={{
              paddingTop: getHp(8),
              fontFamily: 'AvenirNext-Medium',
            }}
            numberOfLines={10}
            inputStyles={{
              paddingLeft: 7,
              fontFamily: 'AvenirNext-Medium',
              color: '#000',
              fontSize: FONTSIZE.Text17,
              paddingBottom: getHp(-10),
              marginTop: getHp(12),
            }}
            value={value}
            onChangeText={onChange}
            containerStyles={{
              fontFamily: 'AvenirNext-Regular',
              paddingHorizontal: getHp(10),
              borderWidth: 0.5,
              borderColor: '#DDDDDD',
              height: getHp(60),
              backgroundColor: '#fff',
              borderRadius: 9.5,
            }}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
          />
          {errorMessage.length > 0 && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}
        </View>
      ) :
        createEvent ? (
          <View
            style={{
              flex: 1,
              marginVertical: getHp(3),
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 1 },
              shadowRadius: 4,
              shadowOpacity: 0.1,
              elevation: 2,
            }}>
            <FloatingLabelInput
              returnKeyType="done"
              blurOnSubmit={blurOnSubmit}
              keyboardType={keyboardType}
              isFocused={isFocused}
              customShowPasswordComponent={<GreyEye height={25} width={33} />}
              customHidePasswordComponent={<BlueEye height={25} width={33} />}
              label={floatingLabel}
              customLabelStyles={{
                colorFocused: '#696969',
                fontSizeBlurred: FONTSIZE.Text15,
                fontSizeFocused: FONTSIZE.Text15,
                colorBlurred: '#696969',
              }}
              isPassword={Password}
              labelStyles={{
                color: '#000',
                fontFamily: 'AvenirNext-Regular',
              }}
              numberOfLines={10}
              inputStyles={{
                fontFamily: 'AvenirNext-DemiBold',
                color: '#000',
                fontWeight: 'bold',
                fontSize: FONTSIZE.Text17,
                // marginTop: 10,
                paddingBottom: getHp(-0),
                marginTop: getHp(15),
                paddingLeft: 7,
              }}
              value={value}
              onChangeText={onChange}
              containerStyles={{
                fontFamily: 'AvenirNext-Regular',
                paddingHorizontal: getHp(10),
                elevation: 2,
                height: getHp(60),
                backgroundColor: '#fff',
                borderRadius: 13,
              }}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            />
            {errorMessage.length > 0 && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            )}
          </View>
        )
          :
          uploadInventory ? (
            <View
              style={{
                flex: 1,
                marginVertical: getHp(3),
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 1 },
                shadowRadius: 4,
                shadowOpacity: 0.1,
                elevation: 2,
              }}>
              <FloatingLabelInput
                returnKeyType="done"
                blurOnSubmit={blurOnSubmit}
                keyboardType={keyboardType}
                isFocused={isFocused}
                customShowPasswordComponent={<GreyEye height={25} width={33} />}
                customHidePasswordComponent={<BlueEye height={25} width={33} />}
                label={floatingLabel}
                customLabelStyles={{
                  colorFocused: '#696969',
                  fontSizeBlurred: FONTSIZE.Text12,
                  fontSizeFocused: FONTSIZE.Text12,
                  colorBlurred: '#000',
                }}
                isPassword={Password}
                labelStyles={{
                  color: '#000',
                  fontFamily: 'AvenirNext-Regular',
                }}
                numberOfLines={10}
                inputStyles={{
                  fontFamily: 'AvenirNext-Medium',
                  color: '#000',
                  fontSize: FONTSIZE.Text14,
                  paddingBottom: getHp(-0),
                  marginTop: getHp(15),
                  paddingLeft: 7,
                }}
                value={value}
                onChangeText={onChange}
                containerStyles={{
                  paddingHorizontal: getHp(10),
                  elevation: 2,
                  height: getHp(52),
                  backgroundColor: '#fff',
                  borderRadius: 13,
                }}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
              />
              {errorMessage.length > 0 && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              )}
            </View>
          )
            :
            (
              <View
                style={{
                  flex: 1,
                  marginVertical: getHp(10),
                  shadowColor: '#000',
                  shadowOffset: { width: 1, height: 1 },
                  shadowRadius: 4,
                  shadowOpacity: 0.1,
                  elevation: 2,
                }}>
                <FloatingLabelInput
                  returnKeyType="done"
                  blurOnSubmit={blurOnSubmit}
                  keyboardType={keyboardType}
                  isFocused={isFocused}
                  customShowPasswordComponent={<GreyEye height={25} width={33} />}
                  customHidePasswordComponent={<BlueEye height={25} width={33} />}
                  label={floatingLabel}
                  customLabelStyles={{
                    colorFocused: '#000',
                    fontSizeBlurred: FONTSIZE.Text15,
                    fontSizeFocused: FONTSIZE.Text15,
                    colorBlurred: '#000',
                  }}
                  isPassword={Password}
                  labelStyles={{
                    color: '#000',
                    fontFamily: 'AvenirNext-Regular',
                  }}
                  numberOfLines={10}
                  inputStyles={{
                    fontFamily: 'AvenirNext-DemiBold',
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: FONTSIZE.Text17,
                    // marginTop: 10,
                    paddingBottom: getHp(-0),
                    marginTop: getHp(15),
                    paddingLeft: 7,
                  }}
                  value={value}
                  onChangeText={onChange}
                  containerStyles={{
                    fontFamily: 'AvenirNext-Regular',
                    paddingHorizontal: getHp(10),
                    elevation: 2,
                    height: getHp(60),
                    backgroundColor: '#fff',
                    borderRadius: 9.5,
                  }}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
                />
                {errorMessage.length > 0 && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                  </View>
                )}
              </View>
            )}
    </View>
  );
};
export default FloatingInput;
const styles = StyleSheet.create({
  TextInputStyle: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: FONTSIZE.Text17,
    fontFamily: 'AvenirNext-Regular',
  },
  ContainerStyle: {
    width: '100%',
  },
  ButtonStyle: {
    backgroundColor: '#f3f7f2',
    borderRadius: 9.5,
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingTop: 5,
    marginVertical: 5,
  },
  Title1Style: {
    fontSize: FONTSIZE.Text15,
    fontWeight: 'bold',
    opacity: 0.7,
    color: '#000',
    fontFamily: 'AvenirNext-Regular',
  },
  Title2Style: {
    fontSize: FONTSIZE.Text15,
    fontFamily: 'AvenirNext-Regular',
    color: '#000',
  },
  errorContainer: {
    marginTop: 10,
    marginLeft: 20,
    backgroundColor: 'white',
  },

  errorText: {
    color: 'red',
  },
});
