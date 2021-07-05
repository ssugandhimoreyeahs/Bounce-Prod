import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { FONTSIZE } from '@utils'
import { getWp, getHp } from '@utils'

export const styles = StyleSheet.create({
  toggleView:{
    height: getHp(60),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: getWp(10),
    borderBottomWidth: 0.5,
    borderColor: '#EEEEEE'
  },
    privacyTitle: {
      fontFamily: 'AvenirNext-Medium',
      color: '#000',
      fontSize: FONTSIZE.Text18,
    },
    Tiktok: {
      marginLeft: 10,
      fontFamily: 'AvenirNext-Medium',
      color: '#000',
      width: '100%'
    },
    headerTitle: {
      color: '#000',
      fontSize: FONTSIZE.Text16,
      fontFamily: 'AvenirNext-Regular',
    },
    addInterest: {
      elevation: 2,
      backgroundColor: '#fff',
      height: getHp(130),
      width: getHp(150),
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center'
    },
    flex: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    shadowStyle: {
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 5,
      shadowOpacity: 0.1,
      elevation: 1,
    },
    socialButton: {
      height: getHp(50),
      elevation: 0,
      borderRadius: 13,
      paddingHorizontal: getWp(10),
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 4,
    },
    socialButton2: {
      height: getHp(50),
      borderWidth: 0.5,
      borderColor: '#DDDDDD',
      borderRadius: 13,
      paddingHorizontal: getWp(10),
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 4,
    },
    container: {
      backgroundColor: '#fff',
      flex: 1
    },
    linearGradient: {
      flex: 1,
      borderRadius: 20,
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
    crossButton: {
      elevation: 2,
      backgroundColor: '#fff',
      borderRadius: 50,
      padding: 10,
      position: 'absolute',
      right: -10,
      top: -10
    },
  
  })
   