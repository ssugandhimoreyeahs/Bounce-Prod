import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
   bottomContainer: {
      flexDirection: 'row',
      padding: 10,
      justifyContent: 'space-around',
      // position: 'absolute',
      // bottom: 0,
      backgroundColor: '#000000',
      width: '100%'
  },
  bottomButton: {
      borderRadius: 24,
      backgroundColor: '#333333',
      flexDirection: 'column',
      paddingVertical: 10,
      maxHeight: '100%',
      minWidth: '33%',
      alignItems: 'center'
  },
  bottomButtonPen: {
   borderRadius: 50,
   justifyContent:'center',
   backgroundColor: '#333333',
   flexDirection: 'column',
   // paddingVertical: 10,
   maxHeight: '100%',
   minWidth: '20%',
   alignItems: 'center'
},
   threeBlocksContainer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderRadius: 20,
   },
   threeBlockHeading: {
      fontSize: 17,
      color:'#fff',
      opacity:0.8
   },
   threeBlockBodyText: {
      fontSize: 24,
      color:'#fff',
      // opacity:0.8
   },
   threeBlocks: {
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center'
   },
   directionView: {
      borderRadius: 20,
      padding: 15,
      marginVertical: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor: '#212121',
   },
   flex: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
   },
   container: {
      flex: 1,
      // flexDirection: 'row',
      backgroundColor: '#000000',

   },
   iconStyle: {
      //   height:20,
      //   width:20,
      paddingRight: 0,
      marginRight: 5

   },
   textStyle: {
      color: '#fff',
      fontSize: 20,
      opacity: 0.8,
      //  textAlign:'left'
   },
   belowTextStyle: {
      color: '#fff',
      fontSize: 18,
      opacity: 0.8,
   },
   headerTitle: {
      color: '#fff',
      fontSize: 18,
      opacity: 0.5,
      marginBottom: 5
   },
   BasePackageTitle: {
      color: '#fff',
      fontSize: 18,
      opacity: 0.5,
      marginBottom: 5
   },
   websiteImageStyle: {
      height: 80,
      width: 150,
      borderRadius: 15
   },
   subContainer: {
      // flex:1,
      // flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20
   },
   websiteUrlStyle: {
      alignSelf: 'center',
      color: '#1FAEF7',
      fontSize: 12,
   },
   hostDetail: {
      color: '#fff',
      fontSize: 20,
      opacity: 0.9,
      // marginBottom:10,
      textAlign: 'center',
      marginVertical: 15

   },
   iconWithBelowTextStyle: {
      height: 80,
      width: 80,
      // marginRight:15

   },
})
export {
   styles
}
