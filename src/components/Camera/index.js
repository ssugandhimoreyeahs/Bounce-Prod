import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import {
    Bike,
    Car
} from '@assets'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import {
    UploadBlue,
    Info,
    BlueCamera,
    Add_Outline,
    AddBlue
  } from '@svg';
  import { FONTSIZE, getHp, getWp } from '@utils';


    // const [responseCamera, setResponseCamera] = useState(null);
    // const [responseGallery, setResponseGallery] = useState(null);

   export const openCameraWithPermission = async () => {
    
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'App Camera Permission',
                    message: 'App needs access to your camera ',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                ImagePicker.launchCamera(
                    {
                        mediaType: 'photo',
                        includeBase64: false,
                        maxHeight: 200,
                        maxWidth: 200,
                    },
                    (response) => {
                        console.log("Camera opened ",response);
                       
                    },
                );
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };
