import React, { useState, useRef, createRef } from 'react'
import { Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { FONTSIZE } from '@utils'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


function GooglePlacesInput(props) {
  const {
    floatingLabel,
    onPress,
    value = '',
  } = props
  const focusRef = useRef(null)
  const [show, setShow] = useState(false)
  const handleRef = () => {
    focusRef.current.focus();
  }

  return (
    <TouchableOpacity style={[styles.ButtonStyle]}
    >

      <Text style={[styles.Title2Style]}>
        {floatingLabel}
      </Text>

      {true ?
        <GooglePlacesAutocomplete
          textInputProps={{ placeholderTextColor: '#000' }}
          placeholder={value}

          onPress={onPress}
          minLength={2}
          renderDescription={row => row.description}
          fetchDetails
          istViewDisplayed={false}
          styles={{
            textInputContainer: {
              backgroundColor: '#fff',
              borderRadius: 17,
              // flexWrap: 'nowrap',
              // justifyContent:'center',
              // alignContent:'center',
              // alignItems:'center',
              // height:'auto'
            },
            textInput:
              styles.text
            ,
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          query={{
            key: 'AIzaSyC94iMpGS05cUQVCXQQt5PbSZapY597dPE',
            language: 'en',

          }}
        />
        : null
      }
    </TouchableOpacity>

  )
}
export default GooglePlacesInput;


const styles = StyleSheet.create({
  text: {
    // height: 38,
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: 'bold',
    fontSize: FONTSIZE.Text17,
    fontFamily: 'AvenirNext',
    marginLeft: -10,
    // textAlign: 'center'

  },
  TextInputStyle: {
    marginTop: -10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: FONTSIZE.Text17,
    fontFamily: 'AvenirNext',
  },
  ContainerStyle: {
    width: '100%',

  },
  ButtonStyle: {
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingTop: 5,
    marginVertical: 5
  },
  Title1Style: {
    fontSize: FONTSIZE.Text15,
    opacity: 0.7,
    color: '#000',
    fontFamily: 'AvenirNext',
  },
  Title2Style: {
    fontSize: FONTSIZE.Text13,
    // opacity:0.7,
    // fontWeight: 'bold',
    color: '#000'
  },
})
