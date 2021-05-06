import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Header, SearchBar, CustomButton, Calender, Toggle } from '@components'
import { Girl } from '@assets';
import {
    Info,
    BlackCircleCross,
    BounceLogo,
    InfoWhite,
    InfoBlackBorder,
    ToggleGrey,
    Dollar
} from '@svg'
import { BlurView, VibrancyView } from "@react-native-community/blur";

export default function ModalPopup(props) {
    const { width, height } = Dimensions.get('screen')
    const {
        visible = false,
        infoModel = false,
        alertModel = false,
        customModel = false,
        otherModel = false
    } = props
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <Modal isVisible={visible} style={{}} >
            <BlurView
                style={[styles.absolute, {}]}
                // viewRef={this.state.viewRef}
                blurType="light"
                blurAmount={15}
                reducedTransparencyFallbackColor="white"
            />
            {
                otherModel ?
                    // <View style={{ height:'100%' }}>
                    <Calender />
                    //  </View>
                    : null
            }
            { alertModel ? <View style={styles.alertContainer}>

                <Text style={{ color: '#fff', fontSize: 26, position: 'absolute', top: 25 }}>Are you sure?</Text>

                <Text style={styles.bbText}>By adding a cohost, your friend(s) will have all the same editing capabilities</Text>
            </View> : null}
            {
                infoModel ?

                    <View style={{ flex: 1, marginTop: '10%' }}>
                        <View style={styles.doubleButton}>
                            <View style={styles.doubleSubcontainer}>
                                <TouchableOpacity style={styles.private}>
                                    <Text style={[styles.TitleStyle, { fontSize: 18, color: '#fff' }]}>Private</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.private, { backgroundColor: '#fff' }]}>
                                    <Text style={[styles.TitleStyle, { fontSize: 18, color: '#000' }]}>Private</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ position: 'absolute', right: -45 }}>
                                <Info height={25} width={25} />
                            </View>
                        </View>

                        <View style={styles.mainCardContainer}>
                            <View style={[styles.bbHeader, {
                            }]}>
                                <BounceLogo height={50} width={50} />
                                <Text style={styles.bbText}>BB</Text>

                            </View>
                            <Text style={styles.bodyText}>Private events are only visible to friends you invite. Select ‘Public’ to post your event on the news feed.</Text>

                            <TouchableOpacity style={[styles.private, { elevation: 10, paddingVertical: 20, justifyContent: 'center' }]}>
                                <Text style={[styles.TitleStyle, { fontSize: 18, color: '#fff' }]}>Confirm</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ position: 'absolute', bottom: '10%', alignSelf: 'center' }}>
                            <BlackCircleCross height={60} width={60} />

                        </View>
                        <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#000000', height: 5, width: '30%', borderRadius: 40, marginTop: 15, alignSelf: 'center' }} />
                    </View>
                    : null
            }
            {
                customModel ?

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
                        <View style={{ alignItems: 'center', marginTop: 30 }}>
                            <BlackCircleCross height={60} width={60} />
                        </View>
                    </View>
                    : null
            }
        </Modal>


    );
}
const styles = StyleSheet.create({
    private: {
        backgroundColor: '#1FAEF7',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 15,
        flex: 1
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
        fontFamily: 'Comfortaa',
        letterSpacing: 0.8,
        lineHeight: 32,
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 20
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
        fontFamily: 'Comfortaa',
        letterSpacing: 1.6,
        color: '#000',
        fontSize: 22,
        marginLeft: 15
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
