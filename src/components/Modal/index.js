import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Header, SearchBar, CustomButton, Calender, Toggle } from '@components'
import { Girl } from '@assets';
import {
    Info,
    BlackClose,
    BounceLogo,
    InfoWhite,
    InfoBlackBorder,
    ToggleGrey,
    Dollar
} from '@svg'
import { BlurView, VibrancyView } from "@react-native-community/blur";

import { Avatar } from 'react-native-elements'
import { FONTSIZE, getHp, getWp } from '../../app/utils';


// const modalFunction =()=>{
//     return (
//         <Modal isVisible={true} style={{}} >
//         <BlurView
//             style={[styles.absolute, {}]}
//             blurType="light"
//             blurAmount={10}

//         />

//         </Modal>
//     )
// }
export default function ModalPopup(props) {
    const { width, height } = Dimensions.get('screen')
    const {
        visible = false,
        infoModel = false,
        alertModel = false,
        customModel = false,
        otherModel = false,
        onPress = () => { },
        closePopup = false,
        name,
        icon,
        desc,
    } = props
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <Modal isVisible={closePopup} style={{}} >
            <BlurView
                style={[styles.absolute, {}]}
                blurType="light"
                blurAmount={10}

            />

            {
                otherModel && <Calender />

            }

            { alertModel &&
                <View style={styles.alertContainer}>
                    <Text style={{ color: '#fff', fontSize: 26, position: 'absolute', top: 25 }}>Are you sure?</Text>
                    <Text style={styles.bbText}>{"By adding a cohost, your friend(s) will have all the same editing capabilities"}</Text>
                </View>
            }


            {
                infoModel &&

                <View style={{ flex: 1, marginTop: '50%' }}>
                                       <View style={styles.mainCardContainer}>
                        <View style={[styles.bbHeader, {
                        }]}>
                            <Avatar source={icon} size={50} rounded />

                            <Text style={styles.bbText}>
                                {name}
                            </Text>

                        </View>
                        <Text style={styles.bodyText}>
                            {desc}
                        </Text>

                        <TouchableOpacity style={[styles.private]}>
                            <Text style={styles.confirmButton}>
                                {"Confirm"}
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity
                        onPress={onPress}
                        style={styles.whiteClose}
                    >
                        <BlackClose height={getHp(34)} width={getWp(34)} />

                    </TouchableOpacity>
                </View>

            }


            {
                customModel &&

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ padding: 15, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: '#1A1A1A', borderRadius: 15, marginBottom: 2 }}>

                        <Text style={{ color: '#FFFFFF', fontSize: 22, paddingVertical: 5 }}>Custom Invitation</Text>


                        <Info height={30} width={30} />

                    </View>

                    <View style={styles.mainCardContainer}>
                        <View style={styles.bbHeader}>
                            <BounceLogo height={50} width={50} />
                            <Text style={styles.bbText}>BB</Text>

                        </View>
                        <Text style={styles.bodyText}>A great addition to your event page! Send a custom invitation to your guests to recieve RSVPs before your event. Enjoy our many templates and easy to use customizations!</Text>


                    </View>
                    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', marginTop: 30 }}>
                        <BlackClose height={60} width={60} />
                    </TouchableOpacity>
                </View>

            }
        </Modal>


    );
}
const styles = StyleSheet.create({
    private: {
        width: '100%',
        height: getHp(50),
        justifyContent: 'center',
        backgroundColor: '#1FAEF7',
        borderRadius: 17,
        alignItems: 'center',
    },
    whiteClose: {
        position: 'absolute',
        bottom: '10%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 100,
        height: getHp(74),
        width: getWp(74),
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmButton: {
        fontSize: FONTSIZE.Text21,
        color: '#fff',
        letterSpacing: 0.6,
        fontFamily: 'AvenirNext-Medium',
    },
    doubleSubcontainer: {
        flexDirection: 'row',
        elevation: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '70%',
        alignSelf: 'center'
    },
    doubleButton: {
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20,
        // elevation: 10,
        backgroundColor: '#fff',
        // flex: 1,
        borderRadius: 10,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        margin: -25
    },


    bodyText: {
        lineHeight: 30,
        fontFamily: 'AvenirNext-Regular',
        letterSpacing: 0.2,
        color: '#000',
        fontSize: FONTSIZE.Text16,
        marginVertical: getHp(16)
    },
    alertContainer: {
        backgroundColor: '#212121',
        justifyContent: 'center',
        height: '60%',
        width: '100%',
        borderRadius: 25,
        alignItems: 'center',
        paddingHorizontal: 30
    },
    flexStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15
    },
    bbText: {
        fontFamily: 'AvenirNext-Bold',
        color: '#000',
        fontSize: FONTSIZE.Text22,
        marginLeft: getWp(15)
    },
    bbHeader: {
        // paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    mainCardContainer: {
        backgroundColor: '#fff',
        // flexDirection: 'column',
        // justifyContent: 'space-evenly',
        // height: '65%',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        width: '100%',
        borderRadius: 25,
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    ContainerStyle: {
        width: '100%',
        marginVertical: 4,
    },
    ButtonStyle: {
        backgroundColor: '#212121',
        borderRadius: 10,
        justifyContent: 'flex-start',
        paddingLeft: 20
    },
    TitleStyle: {
        fontSize: 16,
        paddingVertical: 0
    },
})
