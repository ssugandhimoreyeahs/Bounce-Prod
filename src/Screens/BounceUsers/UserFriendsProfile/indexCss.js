import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { FONTSIZE } from '@utils'
import { getWp, getHp } from '@utils'

const { height, width } = Dimensions.get("screen")

const styles = StyleSheet.create({
   cityAll: {
      color: "#696969",
      fontSize: FONTSIZE.Text14,
      fontFamily: "AvenirNext-Regular",
   },
   buttonText: {
      fontSize: FONTSIZE.Text16,
      // textAlign: 'center',
      fontFamily: 'AvenirNext-Medium',
      // marginVertical: 10,
      color: '#ffffff',
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
   Tiktok: {
      marginLeft: 10,
      fontFamily: 'AvenirNext-Bold',
      color: '#000',
      width: '100%'
   },
   dot: {
      backgroundColor: '#696969',
      borderRadius: 5,
      padding: 4,
      marginHorizontal: getWp(10)
   },
   flex: {
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-between'
   },
   editButtonStyle: {
      flexDirection: 'row',
      elevation: 2,
      borderRadius: 7,
      width: getWp(100),
      height: getHp(26),
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
   },
   socialButton: {
      width: '90%',
      height: 50,
      elevation: 1,
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
      marginVertical: 10,
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
      // width: '40%',
      // justifyContent: 'space-between'
   },
   container: {
      // justifyContent:'center',
      marginBottom:80,
      flex: 1,
      backgroundColor: '#FBFBFB',
   },
   subContainer: {
      // flexDirection: 'column',
      // justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 5,
      // width:'90%'
      // height: height/3
   },
   iconStyle: {
      //   height:20,
      //   width:20,
      paddingRight: 15,
      marginRight: 5

   },
   textStyle: {
      color: '#000',
      fontSize: 18,
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
      fontSize: 18,
      // opacity: 0.5,
      // marginBottom: 5,
      fontFamily: 'AvenirNext-Medium',
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
      fontWeight: '600',
      lineHeight: 28,
      fontFamily: 'AvenirNext-Regular'
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
      fontWeight: 'bold',
      fontFamily: 'AvenirNext-Regular'
   }
})
export {
   styles
}
