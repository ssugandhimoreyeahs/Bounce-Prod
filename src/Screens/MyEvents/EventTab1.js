import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {
    Header,
    ImageCarousel,
    Tabview,
    ReviewCard,
    Footer,
    CustomText,
} from "@components";
import { Girl, DJ1, DJ2 } from "@assets";
import { FONTSIZE } from "@utils";

export default function EventTab1() {
    const imageArray = [Girl, DJ1, DJ2];
    const [state, setState] = useState(0);

    const handleCarousel = (value) => {
        return (
            <ImageCarousel
                imageArray={imageArray}
                onSnapToItem={(index) => setState(index)}
                state={state}
                value={"Friends"}
            />
        );
    };
    return (
        <View style={{ flex: 1, marginHorizontal: 10, backgroundColor: '#FBFBFB' }}>
            {/* First Gallery Block of Friends */}
            <View style={{ marginVertical: 5, paddingVertical: 10 }}>

                {handleCarousel("Friends")}

            </View>
            {/*END*** First Gallery Block of Friends */}

            <View style={[styles.flex, { padding: 5, borderRadius: 13, backgroundColor: 'rgba(0, 224, 143, 0.1)' }]}>
                {/* First Partition */}
                <View style={{ width: '40%', alignItems: 'center' }}>
                    <Text style={[styles.aboutText, { fontWeight: "bold" }]}>
                        {"Guest Interests"}
                    </Text>
                    <View>
                        <Text style={[styles.aboutText, { fontFamily: 'AvenirNext-Medium' }]}>
                            {"  ⛺  Outdoors"}
                        </Text>
                        <Text style={[styles.aboutText, { fontFamily: 'AvenirNext-Medium' }]}>
                            {"  ⛺  Outdoors"}
                        </Text>
                        <Text style={[styles.aboutText, { fontFamily: 'AvenirNext-Medium' }]}>
                            {"  ⛺  Outdoors"}
                        </Text>
                    </View>
                </View>
                {/* Partition Line */}
                <View style={{ backgroundColor: 'rgba(0, 224, 143, 0.33)', height: '100%', width: 1 }} />
                {/* Partition Line */}

                {/* Second Partition */}
                <View style={{ justifyContent: 'space-between', flexDirection: 'column', width: '60%' }}>

                    <Text style={[styles.aboutText, { width: '80%', alignSelf: 'center' }]}>
                        <Text style={[styles.aboutText, { fontFamily: 'AvenirNext-Bold' }]}>
                            {"90% "}
                        </Text>
                        {"of your guests enjoy EDM music"}
                    </Text>

                    <View style={{ backgroundColor: 'rgba(0, 224, 143, 0.33)', width: '100%', height: 1 }} />

                    <Text style={[styles.aboutText, { width: '80%', alignSelf: 'center' }]}>
                        <Text style={[styles.aboutText, { fontFamily: 'AvenirNext-Bold' }]}>
                            {"90% "}
                        </Text>
                        {"of your guests enjoy EDM music"}
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.allFrnds}>
                <Text style={[styles.aboutText, { fontWeight: "bold" }]}>
                    {"All Friends"}
                </Text>
            </TouchableOpacity>




        </View>
    )
}
const styles = StyleSheet.create({
    Tiktok: {
        marginLeft: 10,
        fontFamily: 'AvenirNext-Bold',
        color: '#000',
        width: '100%'
    },
    flex: {
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between'
    },
    editButtonStyle: {
        elevation: 2,
        borderRadius: 7,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#fff',
    },
    socialButton: {
        width: '90%',
        height: 50,
        elevation: 1,
        borderRadius: 13,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    linearGradient: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        elevation: 2,
        backgroundColor: '#fff',
        marginVertical: 10,
        borderRadius: 20,
    },
  
    partition: {
        width: '90%',
        height: 0.1,
        backgroundColor: '#ddd',
        alignSelf: 'center'
    },
    addMediaButton: {
        elevation: 5,
        backgroundColor: '#fff',
        width: '80%',
        alignSelf: 'center',
        borderRadius: 24,
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 10,
        marginBottom: 20
    },
    websiteView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 25
        // width: '40%',
        // justifyContent: 'space-between'
    },
    container: {
        // justifyContent:'center',
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
    subContainer: {
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        // width:'90%'
        // height: height/3
    },
    iconStyle: {
        //   height:20,
        //   width:20,
        paddingRight: 15,
        marginRight: 5

    },
    textStyle: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'AvenirNext-Regular',
    },
    belowTextStyle: {
        color: '#000',
        fontSize: FONTSIZE.Text18,
        opacity: 0.8,
        fontFamily: 'AvenirNext-Regular',
    },
    headerTitle: {
        color: '#000',
        fontSize: 18,
        // opacity: 0.5,
        // marginBottom: 5,
        fontFamily: 'AvenirNext-Medium',
    },
    BasePackageTitle: {
        color: '#000',
        fontSize: 18,
        opacity: 0.5,
        marginBottom: 5,
        fontFamily: 'AvenirNext-Regular',
    },
    websiteImageStyle: {
        height: 80,
        width: 150,
        borderRadius: 15
    },

    websiteUrlStyle: {
        alignSelf: 'center',
        color: '#1FAEF7',
        fontSize: 12,
        fontFamily: 'AvenirNext-Regular',
    },
    hostDetail: {
        color: '#000',
        fontSize: 20,
        opacity: 0.9,
        fontFamily: 'AvenirNext-Regular',
        textAlign: 'center',
        marginVertical: 15

    },
    InstaText: {
        color: '#000',
        fontSize: FONTSIZE.Text14,
        marginLeft: 10,
        fontFamily: 'AvenirNext-Bold'
    },
    allFrnds: {
        elevation: 2,
        marginVertical: 20,
        borderRadius: 9,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10
    },
    aboutText: {
        marginVertical: 3,
        color: '#000',
        fontSize: FONTSIZE.Text16,
        fontFamily: 'AvenirNext-Regular'
    },
    Textarea: {
        borderWidth: 1,
        borderColor: "#DDDDDD",
        backgroundColor: '#FFFFFF',
        marginVertical: 10,
        fontSize: FONTSIZE.Text16,
        borderRadius: 15,
        paddingLeft: 20,
    }
    ,

    iconWithBelowTextStyle: {
        height: 0,
        width: 0,
        // marginRight:15

    },
    editButton: {
        color: '#1FAEF7',
        fontSize: FONTSIZE.Text14,
        fontWeight: 'bold',
        fontFamily: 'AvenirNext-Regular'
    }
})


