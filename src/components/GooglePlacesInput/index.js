import React, { useState, useRef, createRef } from 'react';
import { Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { FONTSIZE, Hp } from '@utils';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getHp } from '../../app/utils';

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
          <TouchableOpacity style={[styles.ButtonStyle1]}>
            <Text style={[styles.Title2Style]}>{floatingLabel}</Text>
            <GooglePlacesAutocomplete
              textInputProps={{ placeholderTextColor: '#000' }}
              placeholder={value}
              filterReverseGeocodingByTypes={[
                'locality',
                'administrative_area_level_3',
              ]}
              onPress={onPress}
              minLength={2}
              renderDescription={row => row.description}
              fetchDetails
              istViewDisplayed={false}
              styles={{
                textInputContainer: {
                  backgroundColor: '#fff',
                  borderRadius: 17,

                },
                textInput: styles.text1,
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              query={{
                key: 'AIzaSyC94iMpGS05cUQVCXQQt5PbSZapY597dPE',
                language: 'en',
              }}
            />
          </TouchableOpacity>
        )
          :
          (
            <TouchableOpacity style={[styles.ButtonStyle]}>
              <Text style={[styles.Title2Style]}>{floatingLabel}</Text>
              <GooglePlacesAutocomplete
                textInputProps={{ placeholderTextColor: '#000' }}
                placeholder={value}
                filterReverseGeocodingByTypes={[
                  'locality',
                  'administrative_area_level_3',
                ]}
                onPress={onPress}
                minLength={2}
                renderDescription={row => row.description}
                fetchDetails
                istViewDisplayed={false}
                styles={{
                  textInputContainer: {
                    backgroundColor: '#fff',
                    borderRadius: 17,
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
            </TouchableOpacity>
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
    fontWeight: 'bold',
    fontSize: FONTSIZE.Text17,
    fontFamily: 'AvenirNext-Regular',
    marginLeft: -10,
  },
  text1: {
    color: '#000',
    opacity: 0.8,
    fontSize: FONTSIZE.Text17,
    fontFamily: 'AvenirNext-Medium',
    marginLeft: -10,
  },
  ButtonStyle: {
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingTop: 5,
    marginVertical: 5,
  },
  ButtonStyle1: {
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    // elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingTop: 5,
    // marginVertical: 5,
  },
  Title2Style: {
    fontSize: FONTSIZE.Text14,
    opacity: 0.8,
    color: '#000',
  },
});
