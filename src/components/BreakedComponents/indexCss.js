import { StyleSheet } from 'react-native'
import { FONTSIZE, getHp, getWp } from '@utils'

export const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.1,
    
        },
    bottomContainer: {
        height: getHp(62),
        width: getWp(105),
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F5F6',
        elevation: 2,
    },
    bottomButton: {
        borderRadius: 24,
        backgroundColor: '#333333',
        flexDirection: 'column',
        paddingVertical: 10,
        maxHeight: '100%',
        minWidth: '45%',
        alignItems: 'center',
    },
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
    doubleSubcontainer: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        borderRadius: 17,
        height: getHp(38),
        width: '80%',
        alignSelf: 'center'
    },
    doubleButton: {
        justifyContent: 'center',
        flexDirection: 'row',
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
        justifyContent: 'center',
        height: getHp(46),
        //   backgroundColor: '#fff',
        marginVertical: 10,

        alignItems: 'center',
        flex: 1,
    },

})