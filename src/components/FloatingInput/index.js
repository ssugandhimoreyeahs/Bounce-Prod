import React, { useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { FONTSIZE, getHp, getWp } from '@utils'
import { BlueEye, GreyEye } from '@svg'

const FloatingInput = (props) => {
    const {
        floatingLabel,
        value,
        onChange,
        Password = false,
        multiline = false,
        onFocus = false,
        onBlur = false,
        isFocused = false,
        key = false,
        blurOnSubmit = false,
        placeholder = false,
        custom = false,
        onSubmitEditing = () => { },
        keyboardType = ''
    } = props

    return (
        <View>
            {custom ?
                <View style={{ flex: 1, backgroundColor: '#fff', marginVertical: 10}}>
                    <FloatingLabelInput
                    returnKeyType='done'
                        blurOnSubmit={blurOnSubmit}
                        isFocused={true}
                        label={floatingLabel}
                        onSubmit={onSubmitEditing}
                        keyboardType={keyboardType}
                        customLabelStyles={{
                            fontWeight: 'normal',
                            colorFocused: '#696969',
                            fontSizeBlurred: FONTSIZE.Text12,
                            fontSizeFocused: FONTSIZE.Text12,
                            colorBlurred: '#696969',

                        }}

                        isPassword={Password}

                        labelStyles={{

                            color: 'red'
                        }}
                        numberOfLines={10}
                        inputStyles={{
                            // paddingLeft:getWp(5),
                            marginTop: 5,
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: FONTSIZE.Text14,

                        }}
                        value={value}
                        key={key}
                        onChangeText={onChange}
                        containerStyles={{
                            paddingLeft: 5,
                            elevation: 2,
                            height: getHp(50),
                            backgroundColor: '#fff',
                            borderRadius: 9.5,
                        }}
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                    />
                </View>
                :
                <View style={{ flex: 1, backgroundColor: '#F6F6F6', marginVertical: 10}}>
                    <FloatingLabelInput
                        returnKeyType="done"
                        // placeholder={placeholder}
                        // placeholderTextColor={'#666666'}
                        blurOnSubmit={blurOnSubmit}
                        // onFocus={true}
                        // onBlur={true}
                        keyboardType={keyboardType}
                        isFocused={isFocused}
                        customShowPasswordComponent={<GreyEye height={25} width={33}  />}
                        customHidePasswordComponent={<BlueEye height={25} width={33} />}
                        label={floatingLabel}
                        customLabelStyles={{

                            fontWeight: 'normal',
                            colorFocused: '#000',
                            fontSizeBlurred: FONTSIZE.Text15,
                            fontSizeFocused: FONTSIZE.Text13,
                            colorBlurred: '#000',

                        }}

                        isPassword={Password}

                        labelStyles={{
                            color: '#000',
                            fontFamily: 'AvenirNext'
                        }}
                        numberOfLines={10}
                        inputStyles={{
                            
                            // paddingLeft:getWp(5),
                            fontFamily: 'Roboto-Bold',
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: FONTSIZE.Text17,
                            marginTop: 10,

                        }}
                        value={value}
                        onChangeText={onChange}
                        containerStyles={{
                     
                            fontFamily: 'AvenirNext',
                            paddingHorizontal: 10,
                            elevation: 2,
                            height: getHp(65),
                            backgroundColor: '#fff',
                            borderRadius: 9.5,
                        }}
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                    />
                </View>
            }
        </View>
    );
};
export default FloatingInput;
const styles = StyleSheet.create({
    TextInputStyle: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: FONTSIZE.Text17,
        // backgroundColor:'red',
        // maxHeight:30
        fontFamily: 'AvenirNext',
    },
    ContainerStyle: {
        width: '100%',

    },
    ButtonStyle: {
        backgroundColor: '#f3f7f2',
        borderRadius: 10,
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingTop: 5,
        marginVertical: 5
    },
    Title1Style: {
        fontSize: FONTSIZE.Text15,
        fontWeight: "bold",
        opacity: 0.7,
        color: '#000',
        fontFamily: 'AvenirNext',
    },
    Title2Style: {
        fontSize: FONTSIZE.Text15,
        fontFamily: 'AvenirNext',
        // opacity:0.8,
        // fontWeight: 'bold',
        color: '#000'
    },
})

// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet } from "react-native";
// import { Neomorph ,NeomorphBlur} from "react-native-neomorph-shadows";
// import { FloatingLabelInput } from 'react-native-floating-label-input';
// import { FONTSIZE, getHp, getWp } from '@utils'
// import { BlueEye, GreyEye } from '@svg'

//  const FloatingInput = (props) => {
//     const {
//         floatingLabel,
//         value,
//         onChange,
//         Password = false,
//         multiline = false,
//         onFocus = false,
//         onBlur = false,
//         isFocused = false,
//         key = false,
//         blurOnSubmit = false,
//         placeholder = false,
//         custom = false,
//         onSubmitEditing = () => { },
//         keyboardType = ''
//     } = props

//     return (
//         <View style={{ width: "100%", marginVertical: 10 }}>
//             {/* <Text style={[styles.inputHeadingStyle]}>{inputHeading}</Text> */}
//             <NeomorphBlur
                
//                 style={{
//                     // shadowOffset:5,
//                     // shadowOpacity:0.5,
//                     shadowRadius: 2,
//                     width: 320,
//                    paddingHorizontal:10,
//                     height: getHp(90),
//                     borderRadius: 9.5,
//                     backgroundColor: "#F8F8F8",
// // elevation:5
//                 }}
//             >
//                 {custom ?
//                     <View style={{ flex: 1,marginVertical: 10 }}>
//                         <FloatingLabelInput
//                             blurOnSubmit={blurOnSubmit}
//                             isFocused={true}
//                             label={floatingLabel}
//                             onSubmit={onSubmitEditing}
//                             keyboardType={keyboardType}
//                             customLabelStyles={{
//                                 fontWeight: 'normal',
//                                 colorFocused: '#696969',
//                                 fontSizeBlurred: FONTSIZE.Text12,
//                                 fontSizeFocused: FONTSIZE.Text12,
//                                 colorBlurred: '#696969',

//                             }}

//                             isPassword={Password}

//                             labelStyles={{

//                                 color: 'red'
//                             }}
//                             numberOfLines={10}
//                             inputStyles={{
//                                 // paddingLeft:getWp(5),
//                                 marginTop: 5,
//                                 color: '#000',
//                                 fontWeight: 'bold',
//                                 fontSize: FONTSIZE.Text14,

//                             }}
//                             value={value}
//                             key={key}
//                             onChangeText={onChange}
//                             containerStyles={{
//                                 paddingLeft: 5,
//                                 elevation: 2,
//                                 height: getHp(50),
//                                 backgroundColor: '#fff',
//                                 borderRadius: 9.5,
//                             }}
//                         />
//                     </View>
//                     :
//                     <View style={{ flex: 1,marginVertical: 10 }}>
//                         <FloatingLabelInput
//                             // placeholder={placeholder}
//                             // placeholderTextColor={'#666666'}
//                             blurOnSubmit={blurOnSubmit}
//                             // onFocus={true}
//                             // onBlur={true}
//                             keyboardType={keyboardType}
//                             isFocused={isFocused}
//                             customShowPasswordComponent={<GreyEye height={25} width={33} />}
//                             customHidePasswordComponent={<BlueEye height={25} width={33} />}
//                             label={floatingLabel}
//                             customLabelStyles={{

//                                 fontWeight: 'normal',
//                                 colorFocused: '#000',
//                                 fontSizeBlurred: FONTSIZE.Text15,
//                                 fontSizeFocused: FONTSIZE.Text13,
//                                 colorBlurred: '#000',

//                             }}

//                             isPassword={Password}

//                             labelStyles={{
//                                 color: '#000',
//                                 fontFamily: 'AvenirNext'
//                             }}
//                             numberOfLines={10}
//                             inputStyles={{
//                                 // paddingLeft:getWp(5),
//                                 fontFamily: 'Roboto-Bold',
//                                 color: '#000',
//                                 fontWeight: 'bold',
//                                 fontSize: FONTSIZE.Text17,
//                                 marginTop: 10,

//                             }}
//                             value={value}
//                             onChangeText={onChange}
//                             containerStyles={{
//                                 fontFamily: 'AvenirNext',
//                                 paddingHorizontal: 10,
//                                 // elevation: 1,
//                                 height: getHp(65),
//                                 backgroundColor: '#fff',
//                                 borderRadius: 9.5,
//                             }}
//                         />
//                     </View>
//                 }

//             </NeomorphBlur>

//         </View>

//     );
// }
// export default FloatingInput;
// const styles = StyleSheet.create({
//     numberStyle: {
//         fontSize: 14,
//         fontWeight: "bold",
//         color: "#000000",
//         // marginRight:-80,
//     },
//     container: {
//         // width: '100%',

//         borderRadius: 30,
//         paddingHorizontal: 20,
//         // flex:1,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         backgroundColor: "#ECF0F3",
//     },
//     TextInputStyle: {
//         // backgroundColor: '#ECF0F3',
//         borderRadius: 24,
//         // paddingLeft: 20,
//         fontSize: 16,
//     },
//     inputHeadingStyle: {
//         paddingLeft: 20,
//         paddingBottom: 5,
//         lineHeight: 26.77,
//         letterSpacing: 1.6,
//         color: "#000000",
//         fontSize: 16,
//         // textAlign: 'center',
//         fontFamily: "AveriaSerifLibre-Bold",
//     },
//     TextInputStyle: {
//         color: 'red',
//         fontWeight: 'bold',
//         fontSize: FONTSIZE.Text17,
//         // backgroundColor:'red',
//         // maxHeight:30
//         fontFamily: 'AvenirNext',
//     },
//     ContainerStyle: {
//         width: '100%',

//     },
//     ButtonStyle: {
//         backgroundColor: '#f3f7f2',
//         borderRadius: 10,
//         justifyContent: 'flex-start',
//         paddingLeft: 10,
//         paddingTop: 5,
//         marginVertical: 5
//     },
//     Title1Style: {
//         fontSize: FONTSIZE.Text15,
//         fontWeight: "bold",
//         opacity: 0.7,
//         color: '#000',
//         fontFamily: 'AvenirNext',
//     },
//     Title2Style: {
//         fontSize: FONTSIZE.Text15,
//         fontFamily: 'AvenirNext',
//         // opacity:0.8,
//         // fontWeight: 'bold',
//         color: '#000'
//     },
// });


