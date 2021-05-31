import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Header, SearchBar, Root, SignupDoubleButton } from '@components'
import { FONTSIZE } from '@utils'
import { connect } from "react-redux";
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAvoidingView } from 'react-native';
import { postData } from '../../../FetchServices'
import { Alert } from 'react-native';
import { useFirebaseUpload } from '@hooks'
import axios from 'axios';
import { Toast } from '@constants'

function VendorLogin(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { convertToBlob } = useFirebaseUpload

    const handleData = async () => {
        let body = {
            "username": email,
            "password": password
        }
        console.log("email,pass", email, password);
        let LOGIN_SERVER_RESPONSE = await axios.post('https://b8342a721168.ngrok.io/user/vendorlogin', body)
        var jsonResponse = await JSON.stringify(LOGIN_SERVER_RESPONSE.data)
        // console.log("jsonResponse", JSON.parse(jsonResponse));
        var parsed = await JSON.parse(jsonResponse)
        // console.log("pasdadasd", parsed.success);
        if (parsed.success) {
            props.navigation.navigate("BottomVendorStack", {
                screen: "DjProfileScreen",
                params: {
                    AccessToken: parsed.token
                }
            })
        } else if (!(parsed.success)) {
            Toast("Login Failed :( ")
        }
    }
    return (
        <Root>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Header
                        back
                        headerTitle={"Vendor Login"}
                        onPress={() => props.navigation.goBack()}
                    />
                    <View style={{ width: '90%', alignSelf: 'center', flex: 1, marginTop: '5%' }}>
                        <TextInput
                            placeholderTextColor={'#999999'}
                            placeholder={"Phone number, username, or email"}
                            style={styles.loginFields}
                            onChangeText={(event) => setEmail(event)}
                            value={email}
                        />
                        <TextInput
                            placeholderTextColor={'#999999'}
                            placeholder={"Password"}
                            style={styles.loginFields}
                            onChangeText={(event) => setPassword(event)}
                            secureTextEntry
                            value={password}
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

const mapStateToProps = (state) => {
    return {
        vendorFirstPageDetails: state.mainExpenseByCategory,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        triggerVendorProfile: (temp) => {
            dispatch(fetchVendorData(temp));
        },
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorLogin);