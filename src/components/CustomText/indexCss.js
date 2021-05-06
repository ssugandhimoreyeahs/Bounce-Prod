import { StyleSheet } from 'react-native'
import { FONTSIZE,getHp } from '@utils'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        paddingVertical:0
    },
    readMoreStyle: {
        color: '#1FAEF7',
        fontSize: FONTSIZE.Text16,
        textAlign: 'right',
        marginBottom:0
    },
    hostDetail: {
        // marginTop: getHp(20),
        color: '#000',
        fontSize: FONTSIZE.Text16,
        lineHeight:27,
        letterSpacing:0.2,
        opacity: 0.9,
        // textAlign: 'center',


    },

})
export {
    styles
}
