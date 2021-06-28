import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { FONTSIZE } from '@utils'
import { getWp, getHp } from '@utils'

const { height, width } = Dimensions.get("screen")

const styles = StyleSheet.create({
   cityAll: {
      color: "#999999",
      fontSize: FONTSIZE.Text14,
      fontFamily: "AvenirNext-Medium",
   },
   buttonText: {
      fontSize: FONTSIZE.Text18,
      fontFamily: 'AvenirNext-Medium',
      color: '#fff',
   },
   boxShadow: {
      shadowColor: '#EFEFEF',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 5,
      shadowRadius: 10,
   },
   textImage: {
      color: '#000',
   },
   TiktokStyle: {
      marginLeft: 5,
      fontFamily: 'AvenirNext-DemiBold',
      // color: '#000',
      // height:getHp(36)
   },
   dot: {
      backgroundColor: '#999999',
      borderRadius: 5,
      padding: 2,
      marginHorizontal: getWp(5)
   },
   flex: {
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-between'
   },
   fullTouch: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
   },
   editButtonStyle: {
      flexDirection: 'row',
      elevation: 2,
      borderRadius: 7,
      width: getWp(100),
      // height: getHp(26),
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
   },
   socialButton: {
      width: '90%',
      height: getHp(50),
      // elevation: 1,
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
      // marginVertical:15 ,
      borderRadius: 20,
   },
   allFrnds: {
      marginTop: 10,
      borderRadius: 9,
      alignItems: 'center',
      padding: 5,
      borderWidth: 1,
      borderColor: '#E4EEF1',
      backgroundColor: '#F2F5F6',
      paddingVertical: 10
   },
   // socialButton: {
   //    elevation: 3,
   //    borderRadius: 7,
   //    padding: 5,
   //    paddingHorizontal: 10,
   //    backgroundColor: '#fff',

   // },
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
   },
   container: {
      flex: 1,
      backgroundColor: '#FBFBFB',
   },
   shadowStyle: {
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 4,
      shadowOpacity: 0.1,
      elevation: 2,
   },
   subContainer: {
      paddingHorizontal: 10,
      paddingVertical: 5,
   },
   iconStyle: {
      paddingRight: 15,
      marginRight: 5
   },
   textStyle: {
      color: '#000',
      fontSize: FONTSIZE.Text18,
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
      fontSize: FONTSIZE.Text18,
      fontFamily: 'AvenirNext-Medium',
   },
   connectStyle: {
      color: '#1FAEF7',
      fontFamily: 'AvenirNext-DemiBold',
      marginRight: getWp(10),
      fontSize: FONTSIZE.Text16,
      letterSpacing: 0.4

   },
   socialText: {
      color: '#000',
      marginLeft: 10,
      fontFamily: 'AvenirNext-Medium',
      fontSize: FONTSIZE.Text16
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
      fontWeight: "500",
      marginLeft: 10,
      fontFamily: 'AvenirNext-Bold'
   },
   aboutText: {
      color: '#000',
      fontSize: FONTSIZE.Text16,
      lineHeight: 28,
      fontFamily: 'AvenirNext-Medium'
   },
   Textarea: {
      height: 101,
      borderWidth: .5,
      borderColor: "#DDDDDD",
      backgroundColor: '#FFFFFF',
      marginVertical: getHp(10),
      fontSize: FONTSIZE.Text16,
      borderRadius: getHp(15),
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
      // fontWeight: 'bold',
      fontFamily: 'AvenirNext-DemiBold',
      // fontFamily: 'Comfortaa-Bold'
   }
})
export {
   styles
}
