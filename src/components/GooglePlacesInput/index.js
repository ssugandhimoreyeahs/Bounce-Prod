import React, { useState, useRef, createRef } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { FONTSIZE, Hp } from '@utils';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getHp, getWp } from '../../app/utils';

function GooglePlacesInput(props) {
  const { floatingLabel, onPress, value = '', custom } = props;
  const focusRef = useRef(null);
  const [show, setShow] = useState(false);
  const handleRef = () => {
    focusRef.current.focus();
  };

  return (
    <>
      {
        custom ? (
          <View style={[styles.ButtonStyle1]}>
            <Text style={[styles.Title2Style,]}>
              {floatingLabel}
            </Text>
            <GooglePlacesAutocomplete
              textInputProps={{ placeholderTextColor: '#000' }}
              placeholder={value}
              filterReverseGeocodingByTypes={[
                'locality',
                'administrative_area_level_3',
              ]}

              onPress={onPress}
              minLength={1}
              renderDescription={row => row.description}
              fetchDetails
              istViewDisplayed={false}
              styles={{
                textInputContainer: {
                  borderRadius: 9.5,
                },
                textInput: styles.text1,
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              query={{
                key: 'AIzaSyC94iMpGS05cUQVCXQQt5PbSZapY597dPE',
                language: 'en',
                types: ['(cities)'],
              }}
            />
          </View>
        )
          :
          (
            <View style={[styles.ButtonStyle, styles.shadowStyle]}>
              <Text style={[styles.Title2Style, {
                color: '#999999',
                fontFamily: 'AvenirNext-Regular',
                backgroundColor: '#fff',

              }]}>{floatingLabel}</Text>
              <GooglePlacesAutocomplete
                textInputProps={{ placeholderTextColor: '#000' }}
                placeholder={value}
                filterReverseGeocodingByTypes={[
                  'locality',
                  'administrative_area_level_3',
                ]}

                onPress={onPress}
                minLength={1}
                renderDescription={row => row.description}
                fetchDetails
                istViewDisplayed={false}
                styles={{
                  textInputContainer: {
                    backgroundColor: '#fff',
                    borderRadius: 9.5,
                  },
                  textInput: styles.text,
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
                query={{
                  key: 'AIzaSyC94iMpGS05cUQVCXQQt5PbSZapY597dPE',
                  language: 'en',
                }}
              />
            </View>
          )
      }
    </>
  );
}
export default GooglePlacesInput;

const styles = StyleSheet.create({
  text: {
    backgroundColor: '#fff',
    color: '#000',
    // fontWeight: 'bold',
    fontSize: FONTSIZE.Text17,
    fontFamily: 'AvenirNext-Medium',
    marginLeft: getWp(-10),
    backgroundColor: '#fff',
    borderRadius: 20,
    height: getHp(35)
  },
  text1: {
    backgroundColor: '#fff',
    color: '#000',
    opacity: 0.8,
    fontSize: FONTSIZE.Text17,
    fontFamily: 'AvenirNext-Medium',
    marginLeft: getWp(-10),
    height: getHp(35)
  },
  ButtonStyle: {
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'flex-start',
    paddingLeft: getWp(15),
    paddingTop: getHp(5),
    marginVertical: getHp(5),
  },
  ButtonStyle1: {
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    // elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'flex-start',
    paddingLeft: getWp(15),
    paddingTop: getHp(5),
    // marginVertical: 5,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  Title2Style: {
    marginTop: getHp(3),
    fontSize: FONTSIZE.Text15,
    fontFamily: 'AvenirNext-Medium',
    color: '#999999',
  },
});
