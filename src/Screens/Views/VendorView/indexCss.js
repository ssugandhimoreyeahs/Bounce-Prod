import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { FONTSIZE, getHp } from '@utils'

const { height, width } = Dimensions.get("screen")

const styles = StyleSheet.create({
   webText: {
      fontFamily: 'AvenirNext-Regular',
      color: '#1FAEF7',
      fontSize: FONTSIZE.Text16,
      marginLeft: 10,
      textDecorationLine: 'underline'
   },
   hourStyle: {
      fontFamily: 'AvenirNext-Regular',
      color: '#000',
      fontSize: FONTSIZE.Text18,
      marginLeft: 5
   },
   fullName: {
      // fontFamily: 'AvenirNext-Regular',
      color: '#000',
      fontSize: FONTSIZE.Text20,
   },
   partition: {
      width: '90%',
      height: getHp(1),
      backgroundColor: '#DDD',
      alignSelf: 'center',

   },
   addMediaButton: {
      elevation: 5,
      backgroundColor: '#fff',
      width: '80%',
      alignSelf: 'center',
      borderRadius: 24,
      alignItems: 'center',
      paddingVertical: 10,
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
      flex: 1,
      backgroundColor: '#fff',
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
      opacity: 0.8,
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
      opacity: 0.5,
      marginBottom: 5,
      fontFamily: 'AvenirNext-Regular',
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
   iconWithBelowTextStyle: {
      height: 0,
      width: 0,
      // marginRight:15

   },
})
export {
   styles
}
