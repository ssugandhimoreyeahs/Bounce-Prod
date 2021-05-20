import React, { Fragment, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import {
    Header,
    Root,
    CustomButton,
    CustomTextinput,
    FloatingInput,
    InputBox,
    TagsCollapsible,
    TicketComponent,
} from '@components';
import { UploadCamera } from '@assets';
import { UploadBlue, BlackClose, BlueCamera } from '@svg';
import { Keyboard } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import { FONTSIZE, getHp, getWp } from '@utils';
import {
    AgeField,
    SwitchButton,
    DollarField,
} from '../../../components/BreakedComponents';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PlanPartyModel from './PlanPartyModel';
import { observer } from 'mobx-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Strings } from '../../../app/constants';
import UploadMedia from './UploadMedia';
import { CreateFormData, PartyService } from '../../../app/services';
import DatePick from '../../../components/DatePick';
import moment from 'moment';
import { Root as NRoot } from 'native-base';
import { Toast } from '../../../app/constants';
import Collapsible from 'react-native-collapsible';

const TAGS = [
    {
        name: 'Entertainment',
        visible: false,
        item: ['Comedy', 'Gaming', 'Gaming'],
    },
];
function CreateInvitationTemplate(props) {
    console.log("PROPS FROM OLD CI", props?.route?.params?.saveThisDraft)
    const { saveThisDraft } = props?.route?.params
    let party = {};
    let isEditParty = false;
    if (props.route?.params) {
        party = props.route?.params?.party;
        isEditParty = props.route?.params?.isEditParty;
    }
    const partyModel = PlanPartyModel.getInstance();
    const [picture, setPicture] = useState(null);
    const [footer, openFooter] = useState(false);
    const [state, setState] = useState({});
    useEffect(() => {
        const listener = partyModel.party?.subscribe(() => {
            setState(() => ({}));
        });
        // if (isEditParty) {
        //     partyModel.setEditParty(party);
        // }
        return () => {
            partyModel.reset();
            console.log('UMOUNTED');
            listener.unSubscribe();
        };
    }, []);
    const handleOnPress = async isDraftMode => {
        try {
            const res = await partyModel.party.isPartyValid(isDraftMode);
            if (!res.success) {
                let key = Object.keys(res.error)[0];
                let msg = res.error[key] || 'Something went wrong!';
                Toast(msg);
                return;
            }
            const formData = CreateFormData.objectToFormData(props?.route?.params?.saveThisDraft);
            const savePartyResponse = await PartyService.createParty(formData);
            Toast(
                isDraftMode ? 'Party saved to Draft' : 'Party Created Successfully',
            );
            partyModel.reset();
            console.log('CREATE_PARTY_RES - ', savePartyResponse);
        } catch (error) {
            console.log('ERROR - ', error);
        }
    };
    const handleImage = async () => {
        return props.navigation.navigate(UploadMedia.routeName, {
            goBack: true,
        });
        ImagePicker.openPicker({
            multiple: true,
            width: 300,
            height: 300,
            cropping: true,
        }).then(images => {
            partyModel.party.addGallery(images.map(i => i.path));
        });
    };
    const ImageFooter = () => {
        return (
            <TouchableOpacity
                onPress={() => setPicture(null)}
                style={styles.crossButton}>
                <BlackClose height={15} width={15} />
            </TouchableOpacity>
        );
    };
    const SmallButton = ({ item }) => {
        console.log('ase', item);
        return (
            <TouchableOpacity style={styles.smallButtonStyle}>
                <Text style={[styles.headerTitle]}>{item}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <Root>
            <NRoot>
                <View style={styles.container}>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                        <Header
                            back
                            rightTitle={'Save as Draft'}
                            onPress={() => handleOnPress(true)}
                        />
                        {/* First Section */}
                        <View
                            style={{
                                paddingHorizontal: 10,
                                marginBottom: 3,
                                backgroundColor: '#fff',
                                paddingBottom: 20,
                            }}>
                            <FloatingInput
                                floatingLabel={'Event title'}
                                value={saveThisDraft?.title?.toString()}
                                onChange={title => {
                                    partyModel.party.set({ title: title });
                                }}
                                errorMessage={partyModel.party?.partyError?.title}
                                styleProp={{ borderRadius: 19 }}
                            />

                            {picture == null ? (
                                <TouchableOpacity
                                    onPress={handleImage}
                                    style={{
                                        marginVertical: getHp(40),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            borderRadius: 100,
                                            elevation: 10,
                                            backgroundColor: '#fff',
                                        }}>
                                        <UploadBlue height={getHp(100)} width={getHp(100)} />
                                    </View>
                                    <Text
                                        style={{
                                            fontSize: FONTSIZE.Text14,
                                            color: '#000',
                                            marginTop: 10,
                                            fontFamily: 'AvenirNext',
                                        }}>
                                        {'Upload Media'}
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                    <>
                                        <View
                                            style={{
                                                marginVertical: getHp(23),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <TouchableOpacity
                                                onPress={() => openFooter(true)}
                                                style={{ marginVertical: 30 }}>
                                                <Avatar
                                                    source={{
                                                        uri: picture.path,
                                                    }}
                                                    size="xlarge"
                                                    rounded
                                                />
                                                <View>
                                                    <UploadBlue
                                                        height={50}
                                                        width={50}
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: -25,
                                                            left: 55,
                                                            resizeMode: 'contain',
                                                        }}
                                                    />
                                                </View>
                                                {footer ? <ImageFooter /> : null}
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}

                            <DatePick
                                placeholder={'Date / Time'}
                                handleChange={date => partyModel.party.set({ date })}
                                value={saveThisDraft?.date}
                                pickerMode={'datetime'}
                                minimumDate={moment().add(1, 'day').toDate()}
                                maximumDate={moment().add(7, 'day').toDate()}
                                errorMessage={partyModel.party?.partyError?.date}
                            />
                            <FloatingInput
                                floatingLabel={'Address'}
                                value={saveThisDraft?.location?.addressStr?.toString()}
                                onChange={address => {
                                    partyModel.party.setAddress(address);
                                }}
                                errorMessage={partyModel.party?.partyError?.address}
                            />
                            <CustomTextinput
                                text={'Description...'}
                                multiline
                                value={saveThisDraft?.description?.toString()}
                                onChange={description => {
                                    partyModel.party.set({ description: description });
                                }}
                                errorMessage={partyModel.party?.partyError?.description}
                            />
                            {/* {INTEREST.map((item) => {
                            return (
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={[styles.headerTitle, { fontSize: FONTSIZE.Text20, marginVertical: 0 }]}>
                                        {item.categoryHeading}
                                    </Text>

                                    <View style={{ flexDirection: 'row', marginVertical: 5, flexWrap: 'wrap' }}>
                                        {
                                            item.categoryList.map((item) => <SmallButton item={item} />
                                            )
                                        }
                                    </View>

                                </View>
                            )
                        })} */}
                        </View>

                        {/* Second Section */}
                        <View
                            style={{
                                paddingHorizontal: 10,
                                marginVertical: 3,
                                backgroundColor: '#fff',
                                justifyContent: 'center',
                                paddingVertical: 20,
                            }}>
                            {/* <View style={styles.eventContainer}> */}
                            <Text
                                style={[
                                    styles.headerTitle,
                                    { fontSize: FONTSIZE.Text20, marginRight: 5 },
                                ]}>
                                {'Event Settings'}
                            </Text>
                            {/* <Icon name="chevron-down" size={15} color="#000" /> */}
                            {/* </View> */}

                            {/*  
//             <View style={{marginVertical: 10}}>
//               <SwitchButton
//                 onPrivatePress={() => setPrivate()}
//                 onPublicPress={() => setPrivate()}
//               />
//             </View>
//             <DollarField />
//             <AgeField />
//           </View> */}

                            <View style={{ marginVertical: 10 }}>
                                <SwitchButton
                                    value={partyModel.party.isPrivate}
                                    onPrivatePress={() => partyModel.party.set({ isPrivate: true })}
                                    onPublicPress={() => partyModel.party.set({ isPrivate: false })}
                                />
                            </View>

                            <View
                                style={[
                                    styles.eventContainer,
                                    { justifyContent: 'space-between' },
                                ]}>
                                <Text
                                    style={[
                                        styles.headerTitle,
                                        { fontSize: FONTSIZE.Text20, marginRight: 5 },
                                    ]}>
                                    {'Minimum Age'}
                                </Text>
                                <TextInput
                                    keyboardType={'numeric'}
                                    placeholder={'0'}
                                    value={partyModel.party.fromAge?.toString()}
                                    onChangeText={fromAge => {
                                        partyModel.party.set({ fromAge: fromAge });
                                    }}
                                    errorMessage={partyModel.party?.partyError?.fromAge}
                                    style={[
                                        styles.textInput,
                                        {
                                            width: '35%',
                                            textAlign: 'center',
                                            fontSize: FONTSIZE.Text18,
                                            color: 'black',
                                        },
                                    ]}
                                />
                            </View>

                            <View
                                style={[
                                    styles.eventContainer,
                                    { justifyContent: 'space-between' },
                                ]}>
                                <Text
                                    style={[
                                        styles.headerTitle,
                                        { fontSize: FONTSIZE.Text20, marginRight: 5 },
                                    ]}>
                                    {'Maximum Age'}
                                </Text>
                                <TextInput
                                    keyboardType={'numeric'}
                                    value={partyModel.party.toAge?.toString()}
                                    onChangeText={toAge => {
                                        partyModel.party.set({ toAge: toAge });
                                    }}
                                    errorMessage={partyModel.party?.partyError?.toAge}
                                    placeholder={'0'}
                                    style={[
                                        styles.textInput,
                                        {
                                            width: '35%',
                                            textAlign: 'center',
                                            fontSize: FONTSIZE.Text18,
                                            color: 'black',
                                        },
                                    ]}
                                />
                            </View>
                            {/* <DollarField />
                    <AgeField /> */}
                        </View>

                        {/* Tickets Section */}
                        {/* <View>
            {TAGS.map(t => {
                return <TagsCollapsible {...t} />;
              })} 
            </View> */}
                        <TouchableOpacity
                            onPress={() => {
                                partyModel.party.addTicketType();
                            }}
                            style={{
                                backgroundColor: '#F2F5F6',
                                borderRadius: 9,
                            }}>
                            <Text
                                style={[
                                    styles.headerTitle,
                                    {
                                        fontSize: FONTSIZE.Text18,
                                        color: '#1FAEF7',
                                        paddingVertical: 10,
                                        textAlign: 'center',
                                    },
                                ]}>
                                {'Add Ticket Type'}
                            </Text>
                        </TouchableOpacity>
                        {saveThisDraft?.ticket?.map((t, index) => {
                            return (
                                <TicketComponent
                                    data={t}
                                    onChangeText={data => {
                                        partyModel.party.onTicketChangeText(data, index);
                                    }}
                                    onTicketDelete={() => {
                                        partyModel.party.onTicketDelete(index);
                                    }}
                                />
                            );
                        })}
                        <CustomButton
                            bar
                            rowDoubleButton
                            ButtonTitle={'Save As Draft'}
                            ButtonTitle2={'Complete'}
                            onPress={() => handleOnPress(false)}
                        />

                        {/* <View style={styles.bottomContainer}>
                            <TouchableButton
                                icon={<Peoples height={30} width={30} />}
                                ButtonTitle={"Invite Friends"}
                                ButtonStyle={styles.bottomButton}
                            />
                            <TouchableButton
                                icon={<HirePeople height={20} width={20} />}
                                ButtonTitle={"Hire Vendors"}
                                ButtonStyle={styles.bottomButton}
                            />
                        </View> */}
                    </ScrollView>
                </View>
                {/* <View style={{ paddingBottom: 15 }}> */}

                {/* </View> */}
            </NRoot>
        </Root>
    );
}

const styles = StyleSheet.create({
    textInput: {
        elevation: 0,
        borderWidth: 0.3,
        borderColor: '#999999',
        fontSize: FONTSIZE.Text16,
        backgroundColor: '#fff',
        paddingLeft: 10,
        marginVertical: 5,
        borderRadius: 9.5,
        color: '#999999',
    },
    eventContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallButtonStyle: {
        margin: getWp(5),
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginRight: 5,
        elevation: 1,
        backgroundColor: '#EEEEEE',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        // alignContent: 'center',
        color: '#000',
        fontSize: FONTSIZE.Text14,
        // fontWeight: 'bold',
        fontFamily: '500',
    },

    cameraStyle: {
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    bottomContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around',
        backgroundColor: '#000000',
        width: '100%',
    },
    bottomButton: {
        borderRadius: 24,
        backgroundColor: '#333333',
        flexDirection: 'column',
        paddingVertical: 10,
        maxHeight: '100%',
        minWidth: '45%',
        alignItems: 'center',
    },
    ContainerStyle: {
        width: '100%',
        marginVertical: 4,
    },
    ButtonStyle: {
        backgroundColor: '#212121',
        borderRadius: 10,
        justifyContent: 'flex-start',
        paddingLeft: 20,
    },
    crossButton: {
        elevation: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 10,
        position: 'absolute',
        right: -10,
        top: -10,
    },
});
CreateInvitationTemplate.routeName = '/CreateInvitationTemplate';

export default observer(CreateInvitationTemplate);
