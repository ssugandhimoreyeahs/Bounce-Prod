import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Header, CustomTextinput, Root, Footer, VerticalDoubleButton } from '@components'
import { Peoples, Going, Arrived, David, UploadCamera } from '@assets';



export default function CreateInvitation4() {
    return (
        <Root>
            <KeyboardAvoidingView style={{ flex: 1 }} >
                <View style={styles.container}>
                    <ScrollView>
                        <Header
                            back
                            rightTitle={"Save as Draft"}
                            // rightTitle={"Promote Event"}
                            // rightTitleContainer={{ backgroundColor: '#414141', borderRadius: 24, paddingHorizontal: 15, paddingVertical: 5 }}
                            rightTitleStyle={{ fontSize: 20 }}
                        />
                        <View style={{ paddingHorizontal: 0, marginBottom: 100 }}>
                            <View style={{ paddingHorizontal: 10 }}>
                                <CustomTextinput
                                    text={"David’s 20th"}
                                />
                            </View>
                            {false ?
                                <View style={{ padding: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' }}>
                                    <Image source={UploadCamera} />
                                    <Text style={{ color: '#FFFFFF', fontSize: 18, paddingVertical: 5 }}>Upload Media</Text>
                                </View>
                                :
                                <View style={{ marginVertical: 5 }}>
                                    <Image source={David} style={{ height: 300, width: "100%", }} />
                                </View>
                            }

                            <View style={{ paddingHorizontal: 10 }}>
                                <CustomTextinput
                                    text={"David’s 20th"}
                                />
                                <CustomTextinput
                                    text={"David’s 20th"}
                                />
                                <CustomTextinput
                                    text={"Description..."}
                                    multiline
                                />
                            </View>
                        </View>

                        {/* <View style={styles.bottomContainer}>
                    <VerticalDoubleButton
                        icon={Peoples}
                        ButtonTitle={"Invite Friends"}
                        ButtonStyle={styles.bottomButton}
                        indicatorValue={"57"}
                        afterInviteTitle={"Invited"}
                    />
                    <VerticalDoubleButton
                        icon={Peoples}
                        ButtonTitle={"Hire Vendors"}
                        ButtonStyle={styles.bottomButton}
                        indicatorValue={"57"}
                        afterInviteTitle={"Vendors"}
                    />
                </View> */}


                    </ScrollView>
                </View>
                <Footer
                    CompleteButton
                />

            </KeyboardAvoidingView>
        </Root>

    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1
    },
    bottomContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around',
        // position: 'absolute',
        // bottom: 0,
        backgroundColor: '#000000',
        // width: '100%'
    },
    bottomButton: {
        borderRadius: 24,
        backgroundColor: '#333333',
        flexDirection: 'column',
        paddingVertical: 10,
        maxHeight: '100%',
        minWidth: '40%',
        alignItems: 'center'
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
        paddingVertical: 5
    },

})