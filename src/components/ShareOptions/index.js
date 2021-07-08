import React from 'react'
import { View, Text } from 'react-native'
import Share from 'react-native-share';



export const shareFunction = async (props) => {
    // console.log("Share options props", props)
    const {
        fullName
    } = props

    const shareOptions = {
        message: "Hi" +` ${fullName} I’m interested in hiring you for my upcoming event, *(Event Title)* \n Date - Saturday, October 3rd \n Time - 9:00pm \n Location - 8990 Durango Dr., Las Vegas, NV, 89134 \n Click Here to view the event page- www.google.com`
        // excludedActivityTypes:[
        //     {
        //         // FACEBOOK: NativeModules.RNShare.FACEBOOK || 'facebook',
        //         // FACEBOOK_STORIES: NativeModules.RNShare.FACEBOOK_STORIES || 'facebook-stories',
        //         // PAGESMANAGER: NativeModules.RNShare.PAGESMANAGER || 'pagesmanager',
        //         // TWITTER: NativeModules.RNShare.TWITTER || 'twitter',
        //         // WHATSAPP: NativeModules.RNShare.WHATSAPP || 'whatsapp',
        //         // INSTAGRAM: NativeModules.RNShare.INSTAGRAM || 'instagram',
        //         // INSTAGRAM_STORIES: NativeModules.RNShare.INSTAGRAM_STORIES || 'instagram-stories',
        //         // GOOGLEPLUS: NativeModules.RNShare.GOOGLEPLUS || 'googleplus',
        //         // EMAIL: NativeModules.RNShare.EMAIL || 'email',
        //         // PINTEREST: NativeModules.RNShare.PINTEREST || 'pinterest',
        //         // LINKEDIN: NativeModules.RNShare.LINKEDIN || 'linkedin',
        //       }
        // ]
    }
    try {
        const response = await Share.open(shareOptions)
        console.log("Response", JSON.stringify(response))
    } catch (error) {
        console.log("ERROR", error)
    }

}
