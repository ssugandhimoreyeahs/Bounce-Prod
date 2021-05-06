import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'

export default function ImagePicker(props) {

    const picker = async () => {
        let options = [{ mediaType: 'photo' }, { saveToPhotos: true }]
        launchCamera(options, () => {
            console.log("INSIDE CALL BACK")
        })
    }

    return (
        <View>
            <Button title="camera" onPress={picker} />
        </View>
    )
}
