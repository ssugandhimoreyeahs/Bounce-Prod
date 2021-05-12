import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { FONTSIZE, getHp } from '@utils'

const { height, width } = Dimensions.get("screen")

const styles = (theme) => {
   return StyleSheet.create({
      partition: {
         marginVertical: 10,
         width: '100%',
         height: getHp(1),
         backgroundColor: '#DDD',
         alignSelf: 'center',
 
     },
      mediaText: {
         color: '#1FAEF7',
         fontSize: FONTSIZE.Text20,
         marginLeft: 5,
         fontFamily: 'AvenirNext',
         marginVertical:getHp(5)
      },
      onlyFlex: {
         flexDirection: 'row',
         alignItems: 'center',
         fontFamily: 'AvenirNext',
      },
      addButton: {
         color: '#1FAEF7',
         fontSize: FONTSIZE.Text20,
         marginLeft: 10,
         fontFamily: 'AvenirNext',
      },
      prView: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         paddingHorizontal: 10
      },
      webText: {
         fontFamily: 'AvenirNext',
         color: '#1FAEF7',
         fontSize: FONTSIZE.Text16,
         marginLeft: 10,
         textDecorationLine: 'underline'
      },
      hourStyle: {
         fontFamily: 'AvenirNext',
         color: '#000',
         fontSize: FONTSIZE.Text18,
         marginLeft: 5
      },
      fullName: {
         color: theme.colors.primaryText1,
         fontSize: FONTSIZE.Text16,
         fontWeight: '600'
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
      },
      textStyle: {
         color: '#000',
         fontSize: 18,
         opacity: 0.8,
         fontFamily: 'AvenirNext',
      },
      belowTextStyle: {
         color: '#000',
         fontSize: FONTSIZE.Text18,
         opacity: 0.8,
         fontFamily: 'AvenirNext',
      },
   });
}
export {
   styles
}
