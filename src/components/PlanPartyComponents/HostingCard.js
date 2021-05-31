// import React from 'react'
// import { View, Text, StyleSheet } from 'react-native'
// import { FONTSIZE } from '@utils'
// import { Avatar } from 'react-native-elements'
// import { Girl } from '../../assets'
// import { RenderSmallButton } from '@components'
// import { FONTSIZE, getHp, getWp } from '@utils'
// import Tab1 from '../../Screens/BounceUsers/UserFriendsProfile/Tab1';
// import Tab2 from '../../Screens/BounceUsers/UserFriendsProfile/Tab2';
// import Tab3 from '../../Screens/BounceUsers/UserFriendsProfile/Tab3';

// const DATA = ["⛺  Outdoors", "Fitness"]

// export const Tabview = ({ DATA }) => {

//     return (
//         <View style={{ marginVertical: 10 }}>
//             <Tabs tabBarUnderlineStyle={{ backgroundColor: '#000000' }}>

//                 <Tab tabStyle={{ backgroundColor: '#FBFBFB' }}
//                     textStyle={{ color: '#000', fontFamily: 'AvenirNext-Medium' }}
//                     activeTabStyle={{ backgroundColor: '#FBFBFB' }}
//                     activeTextStyle={{ color: '#000', fontFamily: 'AvenirNext-Medium' }} heading={"Hosting"}>
//                     <Tab1 DATA={DATA} />
//                 </Tab >

//                 <Tab tabStyle={{ backgroundColor: '#FBFBFB' }}
//                     textStyle={{ color: '#000', fontFamily: 'AvenirNext-Medium' }}
//                     activeTabStyle={{ backgroundColor: '#FBFBFB' }}
//                     activeTextStyle={{ color: '#000', fontFamily: 'AvenirNext-Medium' }} heading="Attending">
//                     <Tab2 />
//                 </Tab>

//                 <Tab tabStyle={{ backgroundColor: '#FBFBFB' }}
//                     textStyle={{ color: '#000', fontFamily: 'AvenirNext-Medium' }}
//                     activeTabStyle={{ backgroundColor: '#FBFBFB' }}
//                     activeTextStyle={{ color: '#000', fontFamily: 'AvenirNext-Medium' }} heading="Interested">
//                     <Tab3 />
//                 </Tab>

//             </Tabs>
//         </View>
//     );
// }
// const styles = StyleSheet.create({
//     textStyle: {
//         color: '#FFFFFF',
//         fontSize: FONTSIZE.Text13,
//         fontFamily: 'AvenirNext-Bold',
//     }
// })