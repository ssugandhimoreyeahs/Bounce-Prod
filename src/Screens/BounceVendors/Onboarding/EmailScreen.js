import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Root, CustomButton, ProgressCircle } from '@components';
import { connect, useSelector, useDispatch } from 'react-redux';
import { fetchVendorData } from '../../../reducer/mainexpensecategory';
import { FONTSIZE } from '@utils';
import { ScrollView } from 'react-native';
import UserNameScreen from './UsernameScreen';
import { Scaffold } from '@components';
import { Toast } from '@constants';
import { useKeyboardStatus } from '@hooks';
import BirthDayScreen from './BirthDayScreen';

export default function EmailScreen(props) {
    const { navigation } = props;
    const { name, username, password } = props?.route?.params
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const isKeyboardOpen = useKeyboardStatus();

    const handleSubmit = async () => {
        if (email.length > 0) {
            navigation.navigate(BirthDayScreen.routeName, {
                email: email,
                name,
                username,
                password,
            });
        } else {
            Toast('Please enter your email!');
        }
    };


    return (
        <Scaffold>
            <ScrollView
                style={{ flex: 1, backgroundColor: '#FBFBFB' }}
                contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.HeadingStyle}>{'What’s your email? 👋'}</Text>
                    <View style={{ marginTop: 100 }}>
                        <TextInput
                            placeholder={'Email'}
                            placeholderTextColor="#999"
                            style={styles.textInput}
                            onChangeText={value => setEmail(value)}
                            value={email}
                        />
                    </View>
                    {!isKeyboardOpen && (
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                alignSelf: 'center',
                            }}>
                            <ProgressCircle    
                            currentProgress={3} 
                            containerStyle={{ marginBottom: 20 }} />
                            <CustomButton userContinue onPress={handleSubmit} />
                        </View>
                    )}
                </View>
            </ScrollView>
        </Scaffold>
    );
}
EmailScreen.routeName = '/EmailScreen';

const styles = StyleSheet.create({
    infoText: {
        fontSize: FONTSIZE.Text16,
        color: '#999999',
        fontFamily: 'AvenirNext-Medium',
        letterSpacing: 0.1,
        marginTop: 10,
    },
    container: {
        flex: 1,
        padding: 15,
        flexDirection: 'column',
    },
    HeadingStyle: {
        marginTop: 40,
        fontFamily: 'AvenirNext-Medium',
        letterSpacing: 0.2,
        color: '#1FAEF7',
        fontSize: FONTSIZE.Text26,
    },
    textInput: {
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 2,
        fontSize: FONTSIZE.Text22,
        fontFamily: 'AvenirNext-Medium',
        marginTop: 10,
        color: '#000000',
    },
});
