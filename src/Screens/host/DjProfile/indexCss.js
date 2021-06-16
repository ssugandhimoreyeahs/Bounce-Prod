import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { FONTSIZE, getHp } from '@utils'

const { height, width } = Dimensions.get("screen")

const styles = (theme) => {
   return StyleSheet.create({
      shadowStyle: {
         shadowColor: '#000',
         shadowOffset: { width: 1, height: 1 },
         shadowRadius: 5,
         shadowOpacity: 0.1,
         elevation: 2,
      },
      partition: {
         marginVertical: 10,
         width: '100%',
         height: 0.8,
         backgroundColor: '#EBEBEB',
         alignSelf: 'center',

      },
      mediaText: {
         color: '#1FAEF7',
         fontSize: FONTSIZE.Text20,
         marginLeft: 5,
         fontFamily: 'AvenirNext-Medium',
         marginVertical: getHp(5)
      },
      onlyFlex: {
         flexDirection: 'row',
         alignItems: 'center',
         fontFamily: 'AvenirNext-Regular',
      },
      addButton: {
         color: '#1FAEF7',
         fontSize: FONTSIZE.Text20,
         marginLeft: 10,
         fontFamily: 'AvenirNext-Regular',
      },
      prView: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         paddingHorizontal: 10
      },
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
         fontSize: FONTSIZE.Text16,
         marginLeft: 5
      },
      fullName: {
         color: theme.colors.primaryText1,
         fontSize: FONTSIZE.Text18,
         fontFamily: 'AvenirNext-Medium'
      },
      addMediaButton: {
         elevation: 10,
         backgroundColor: '#fff',
         width: '80%',
         alignSelf: 'center',
         borderRadius: 24,
         alignItems: 'center',
         paddingVertical: 5,
         marginTop: 10,
         marginBottom: 20
      },
      websiteView: {
         flexDirection: 'row',
         alignItems: 'center',
         paddingTop: 10,
         paddingBottom: 5
      },
      container: {
         flex: 1,
         backgroundColor: theme.colors.primaryBG1,
      },
      subContainer: {
         paddingHorizontal: 0,
         paddingVertical: 5,
         backgroundColor: '#FBFBFB'
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
   });
}
export {
   styles
}
