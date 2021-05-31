import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { Header, SearchBar, Root, SignupDoubleButton } from '@components'
import { FONTSIZE } from '@utils'
import { connect } from "react-redux";
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAvoidingView } from 'react-native';
import { postData } from '../../../FetchServices'
import { useFirebaseUpload } from '@hooks'
import { Toast } from '../../../app/constants';

export default function ChangePassword(props) {
    const [confirm, confirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const { convertToBlob } = useFirebaseUpload

    const handleData = async () => {
        console.log("both", password, confirmPassword)
        if (password.length <= 6) {
            Toast("Atleast 6 character should be.. !")
        }
        else if (password !== confirm) {
            Toast("Password does not matched !")
        } else {
            props.navigation.navigate("LoginScreen")
        }


    }
    return (
        <Root>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header
                        back
                        headerTitle={"Change Password"}
                        onPress={() => props.navigation.goBack()}
                    />
                    <View style={{ width: '90%', alignSelf: 'center', flex: 1, marginTop: '5%' }}>
                        <TextInput
                            placeholderTextColor={'#999999'}
                            placeholder={"New Password"}
                            style={styles.loginFields}
                            onChange={(value) => setPassword(value)}
                        />
                        <TextInput
                            placeholderTextColor={'#999999'}
                            placeholder={"Confirm Password"}
                            style={styles.loginFields}
                            onChange={(value) => confirmPassword(value)}
                            secureTextEntry
                        />

                        <LinearGradient colors={['#F8A41E', '#FFC700']} style={[styles.linearGradient, { marginVertical: 20 }]}>
                            <TouchableOpacity
                                onPress={() => handleData()}>
                                <Text style={styles.buttonText}>
                                    Submit</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Root>
    )
}
const styles = StyleSheet.create({
    loginFields: {
        borderWidth: 0.5,
        borderColor: '#999999',
        borderRadius: 5,
        fontSize: FONTSIZE.Text16,
        paddingLeft: 20,
        marginVertical: 5
    },

    container: {
        backgroundColor: '#fff',
        flex: 1
    },
    linearGradient: {
        borderRadius: 20,
    },
    buttonText: {
        fontFamily: 'AvenirNext-Regular',
        fontSize: FONTSIZE.Text16,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
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
    TitleStyle: {
        fontFamily: 'AvenirNext-Regular',
        fontSize: 16,
        paddingVertical: 5
    },

})

// const mapStateToProps = (state) => {
//     return {
//         vendorFirstPageDetails: state.mainExpenseByCategory,
//     };
// };
// const mapDispatchToProps = (dispatch) => {
//     return {
//         triggerVendorProfile: (temp) => {
//             dispatch(fetchVendorData(temp));
//         },
//     };
// };
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ChangePassword);