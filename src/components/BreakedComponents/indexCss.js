import { StyleSheet } from 'react-native'
import { FONTSIZE, getHp, getWp } from '@utils'

export const styles = StyleSheet.create({
    pastGuestContainer: {
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginVertical: 2
    },
    hourStyle: {
        color: '#000',
        fontSize: FONTSIZE.Text18,
        marginLeft: 5
    },
    fullName: {
        color: '#000',
        fontSize: FONTSIZE.Text20,
    },
    textInput: {
        fontSize: FONTSIZE.Text16,
        elevation: 5,
        backgroundColor: '#fff',
        paddingLeft: 10,
        marginVertical: 5,
        borderRadius: 9.5,
        color: '#999999'
    },
    allButtonStyle: {
        // width: '10%',
        borderRadius: 24,
        // backgroundColor: '#1FAEF7',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    allTitleStyle: {
        fontSize: FONTSIZE.Text14,
        color: '#000'
    },
    congested: {
        marginLeft: getWp(-17),
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 66,
        flexDirection: 'row',
        alignItems: 'center'
    },
    PastList: {
        flexDirection: 'row',
    },
    DollarView: {
        height: getHp(44),
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 17,
        width: '80%',
        alignSelf: 'center',
        marginVertical: getHp(15),
    },
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
        borderRadius: 17,
        alignItems: 'center',
        // paddingVertical: 15,
        flex: 1,
        justifyContent: 'center',
    },
    doubleSubcontainer: {
        alignItems: 'center',
        flexDirection: 'row',
        // elevation: 10,
        backgroundColor: '#EEEEEE',
        borderRadius: 17,
        height: getHp(38),
        width: '80%',
        alignSelf: 'center'
    },
    doubleButton: {
        marginVertical: getHp(15),
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // marginVertical: 20,
        // elevation: 10,
        backgroundColor: '#fff',
        // flex: 1,
        borderRadius: 10,
    },
    container: {
        backgroundColor: '#fff',
        flex: 1,
        overflow: 'visible'
    },
    fullInventoryTitleStyle: {
        marginLeft: 10,
        color: '#1FAEF7',
        fontSize: FONTSIZE.Text18,
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
        fontSize: FONTSIZE.Text18,
        // borderWidth: 1,
        height: getHp(44),
        width: '80%',
        borderRadius: 17
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
        fontSize: FONTSIZE.Text18,
        paddingVertical: 0
    },
    linearGradient: {
        // flex: 1,
        // width: '48%',
        alignSelf: 'flex-start',
        borderRadius: 20,
    },

})