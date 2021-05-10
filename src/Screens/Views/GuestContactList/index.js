import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { Header, SearchBar, Footer, CustomButton, Toggle, Calender, ModalPopup, Root, PastGuestList, CustomSearchbar } from '@components'
import { Girl } from '@assets';
import {

} from '@svg'
import { KeyboardAvoidingView } from 'react-native';
import { FONTSIZE, getHp, getWp } from '@utils'




export default function InviteFriends(props) {
    console.log("invirttefd", props.route.params)

    return (
        <Root>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ overflow: 'visible', flex: 1 }}>
                    <Header
                        back
                        headerTitle={props?.route?.params?.heading}
                        onPress={() => props.navigation.goBack()}
                        headerBackColor={{ backgroundColor: '#fff' }}
                    />

                </ScrollView>
            </View>
        </Root>
    )
}
const styles = StyleSheet.create({
    past: {
        marginVertical: 10,
        borderRadius: 15,
        elevation: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingVertical: 30,
        justifyContent: 'space-evenly'
    },
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
    container: {
        backgroundColor: '#F2F2F2',
        flex: 1,
        // overflow: 'visible'
    },
    fullInventoryTitleStyle: {
        marginLeft: 10,
        color: '#1FAEF7',
        fontSize: 18,
        letterSpacing: 0.8,
    },
    reviewsTitleStyle: {
        marginVertical: 30,
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold'
    },
    TextInputStyle: {
        backgroundColor: '#fff',
        // borderRadius: 24,
        paddingLeft: 25,
        fontSize: 18,
        // borderWidth: 1,

        width: '80%',
        borderRadius: 10
    },
    bottomContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#000000',
        width: '100%'
    },
    bottomButton: {
        borderRadius: 24,
        backgroundColor: '#333333',
        flexDirection: 'column',
        paddingVertical: 10,
        maxHeight: '100%',
        minWidth: '45%',
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
        paddingVertical: 0
    },


})