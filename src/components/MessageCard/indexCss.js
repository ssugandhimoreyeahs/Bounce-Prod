import { FONTSIZE, getHp, getWp } from '@utils'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginVertical: getHp(15)
    },
    makePaymentButton: {
        marginTop: getHp(20),
        backgroundColor: '#fff',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: getHp(42),
        borderRadius: 15
    },
    makePaymentTextStyle: {
        color: "#00E08F",
        fontSize: FONTSIZE.Text20,
        fontFamily: 'AvenirNext-DemiBold',
        letterSpacing: 0.4
    },
    showMoreButtonContainer: {
        marginHorizontal: 20,
        flexDirection: 'row',
        marginTop: getHp(16),
        backgroundColor: '#F2F5F6',
        height: getHp(36),
        borderWidth: 1,
        borderColor: '#E4EEF1',
        borderRadius: getHp(13),
        borderBottomLeftRadius: getHp(10),
        borderBottomRightRadius: getHp(10),
    },
    showMoreTextStyle: {
        fontFamily: 'AvenirNext-Regular',
        fontSize: FONTSIZE.Text16,
        lineHeight: getHp(22),
    },
    headingStyle: {
        color: "#000",
        fontSize: FONTSIZE.Text20,
        fontFamily: 'AvenirNext-DemiBold',
        marginLeft: getWp(10)
    },
    textStyle: {
        color: "#000",
        fontSize: FONTSIZE.Text16,
        fontFamily: 'AvenirNext-Medium'
    },
    timeStyle: {
        color: "#696969",
        marginTop:getHp(10),
        fontSize: FONTSIZE.Text14,
        fontFamily: 'AvenirNext-Regular',
        letterSpacing:0.2,
        // marginLeft:48
    },
    hireButtonStyle: {
        color: "#fff",
        fontSize: FONTSIZE.Text16,
        fontFamily: 'AvenirNext-Medium',
        letterSpacing: 0.4
    },
    moreButton: {
        flexDirection: 'row',
        paddingVertical: 10,
        width: '50%',
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    textinputContainer: {
        marginTop: getHp(15),
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 13,
        height: getHp(36),
        justifyContent: 'center'
    },
    messageTextStyle: {
        fontSize: FONTSIZE.Text14,
        color: '#CCCCCC',
        fontFamily: 'AvenirNext-Medium',
        letterSpacing: 0.4,
        paddingLeft: getWp(20)
    },
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 5,
        shadowOpacity: 0.1,

    },
    renderContainer: {
        backgroundColor: '#FBFBFB',
        elevation: 2,
        padding: 20,

    },
    RequestButton: {
        backgroundColor: '#1FAEF7',
        borderRadius: 15,
        width: 124,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        // width:'60%',
    },
    flexDirectionStyle: {
        flexDirection: 'row',
        // justifyContent: 'space-between',

        alignItems: 'center',
    },
    container: {
        backgroundColor: '#000000'
    },
    TextInputStyle: {
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        fontSize: 18,

    }
})

export {
    styles
}