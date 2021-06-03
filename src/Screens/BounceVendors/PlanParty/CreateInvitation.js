import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {
  Header,
  CustomButton,
  CustomTextinput,
  FloatingInput,
  Toggle,
  ImageCarousel,
  TicketComponent,
  Scaffold,
} from '@components';
import { UploadCamera } from '@assets';
import {
  UploadBlue,
  Info,
  BlueCamera,
  Add_Outline,
  AddBlue
} from '@svg';
import { Keyboard } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import {FONTSIZE, getHp, getWp} from '@utils';
import {
  AgeField,
  SwitchButton,
  DollarField,
} from '../../../components/BreakedComponents';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PlanPartyModel from './PlanPartyModel';
import {observer} from 'mobx-react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Strings} from '../../../app/constants';
import UploadMedia from './UploadMedia';
import {CreateFormData, PartyService} from '../../../app/services';
import DatePick from '../../../components/DatePick';
import moment from 'moment';
import {Root} from 'native-base';
import {Toast} from '@constants';
import Collapsible from 'react-native-collapsible';
import {useBackHandler} from '@react-native-community/hooks';
import UserHomeScreen from '../../BounceUsers/UserFriendsProfile';
import ToggleSwitch from 'toggle-switch-react-native';

const TAGS = [
  {
    name: 'Entertainment',
    visible: false,
    item: ['Comedy', 'Gaming', 'Gaming'],
  },
];

function CreateInvitation(props) {
  let party = {};
  let isEditParty = false;
  if (props.route?.params) {
    party = props.route?.params?.party;
    isEditParty = props.route?.params?.isEditParty;
  }
  const partyModel = PlanPartyModel.getInstance();
  const [state, setState] = useState({});
  const [getImageState, setImageState] = useState(0);

  useEffect(() => {
    const listener = partyModel.party?.subscribe(() => {
      setState(() => ({}));
    });
    if (isEditParty) {
      partyModel.setEditParty(party);
    }
    return () => {
      partyModel.reset();
      console.log('UMOUNTED');
      listener.unsubscribe();
    };
  }, []);
  useBackHandler(() => {
    props.navigation.navigate(UserHomeScreen.routeName);
    return false;
  });
  const handleOnPress = async isDraftMode => {
    try {
      console.log('DFMD - ', isDraftMode);
      const res = await partyModel.party.isPartyValid(
        isDraftMode,
        partyModel.isEditMode,
      );
      if (!res.success) {
        let key = Object.keys(res.error)[0];
        let msg = res.error[key] || 'Something went wrong!';
        Toast(msg);
        return;
      }

      const savePartyResponse = await PartyService.createOrUpdateParty(
        res.partyFields,
        partyModel.editParty?.id,
      );

      Toast(
        partyModel.isEditMode
          ? 'Party Updated Successfully'
          : isDraftMode
          ? 'Party saved to Draft'
          : 'Party Created Successfully',
      );
      if (!isEditParty) {
        partyModel.reset();
      }
      console.log('CREATE_PARTY_RES - ', savePartyResponse);
    } catch (error) {
      console.log('ERROR - ', error);
      Toast('Something went wrong!');
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
  // const ImageFooter = () => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => setPicture(null)}
  //       style={styles.crossButton}>
  //       <BlackClose height={15} width={15} />
  //     </TouchableOpacity>
  //   );
  // };
  // const SmallButton = ({ item }) => {
  //   console.log('ase', item);
  //   return (
  //     <TouchableOpacity style={styles.smallButtonStyle}>
  //       <Text style={[styles.headerTitle]}>{item}</Text>
  //     </TouchableOpacity>
  //   );
  // };

  // console.log("partyModel.party",partyModel?.party?.galleryFiles);
  const handleCarousel = () => {
    let img = [];
    if (partyModel?.party?.galleryFiles?.length > 0) {
      partyModel.party.galleryFiles.map(i => i?.path && img.push(i.path));
    }
    if (partyModel?.party?.gallery?.length > 0) {
      partyModel.party.gallery.map(i => img.push(i.filePath));
    }
    console.log('IMG_TEST ', img);
    return (
      <View>
        <ImageCarousel
          onPre
          value={'CreateInvitation'}
          // onPress={handleImage}
          pagination
          imageArray={img.length == 0 ? [] : img}
          onSnapToItem={index => setImageState(index)}
          state={getImageState}
        />
        <TouchableOpacity
          onPress={() => {
            handleImage();
          }}
          style={{position: 'absolute', bottom: 10, right: 20}}>
          <AddBlue height={33} width={33} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Scaffold> 
        <View style={styles.container}>
          <ScrollView
            style={{ flex: 1, backgroundColor: '#FBFBFB' }}
            contentContainerStyle={{ flexGrow: 1 }}>
            <Header
              headerBackColor={{ backgroundColor: '#FBFBFB' }}
              back
              // rightTitle={'Save as Draft'}
              onPressRightTitle={() => handleOnPress(true)}
              onPress={() => {
                if (
                  partyModel?.party?.title === undefined ||
                  partyModel?.party?.title === ''
                ) {
                  props.navigation.goBack();
                } else {
                  Alert.alert(
                    'Alert !',
                    'Are you sure you want to go back ?. All your changes will be lost!',
                    [
                      {
                        text: 'OK',
                        onPress: () => props.navigation.goBack(),
                      },
                      {
                        text: 'Cancel',
                      },
                    ],
                    { cancelable: true },
                  );
                }

                // Alert.alert("All changes will be lost! Are you sure ? ")
              }}
            />
            <View
              style={{
                paddingHorizontal: 10,
                marginBottom: 3,
                backgroundColor: '#FBFBFB',
                paddingBottom: 20,
              }}>
              <FloatingInput
                floatingLabel={'Event title'}
                value={partyModel.party.title?.toString()}
                onChange={title => {
                  partyModel.party.set({title: title});
                }}
                errorMessage={partyModel.party?.partyError?.title}
                styleProp={{
                  borderRadius: 19,
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
                  shadowOpacity: 0.8,
                  elevation: 6,
                  shadowRadius: 15,
                  shadowOffset: {width: 1, height: 13},
                }}
              />


            <View
              style={{
                paddingHorizontal: 10,
                backgroundColor: '#FBFBFB',
              }}>

              <FloatingInput
                floatingLabel={'Event title'}
                value={partyModel.party.title?.toString()}
                onChange={title => {
                  partyModel.party.set({ title: title });
                }}
                errorMessage={partyModel.party?.partyError?.title}
                styleProp={{ borderRadius: 19 }}
              />

              {!partyModel.isEditMode ? (
                partyModel?.party?.galleryFiles?.length == 0 ? (
                  <TouchableOpacity
                    onPress={handleImage}
                    style={{
                      marginVertical: getHp(40),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={[styles.shadowStyle,{
                        borderRadius: 100,
                        elevation: 2,
                        backgroundColor: '#fff',
                      }]}>
                      <UploadBlue height={getHp(100)} width={getHp(100)} />
                    </View>
                    <Text
                      style={{
                        fontSize: FONTSIZE.Text14,
                        color: '#000',
                        marginTop: 10,
                        fontFamily: 'AvenirNext-Regular',
                      }}>
                      {'Upload Media'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                    // null
                    handleCarousel()
                  )
              ) : (
                  handleCarousel()
                )}

              <DatePick
                placeholder={'Date / Time'}
                handleChange={date => {
                  console.log('DATE_ON_CHANGE - ', date);
                  partyModel.party.set({ date });
                }}
                value={partyModel.party.date}
                pickerMode={'datetime'}
                minimumDate={moment().toDate()}
                maximumDate={moment().add(30, 'day').toDate()}
                errorMessage={partyModel.party?.partyError?.date}
              />
              <FloatingInput
                floatingLabel={'Address'}
                value={partyModel.party.location?.addressStr?.toString()}
                onChange={address => {
                  partyModel.party.setAddress(address);
                }}
                errorMessage={partyModel.party?.partyError?.address}
              />

              <CustomTextinput
                text={'Description...'}
                multiline
                value={partyModel.party.description?.toString()}
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

            <View
              style={{
                paddingHorizontal: 10,
                justifyContent: 'center',
              }}>


              <View style={[styles.flex]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[{
                    fontFamily: 'AvenirNext-Regular',
                    marginRight: getWp(10),
                    fontSize: FONTSIZE.Text20
                  }]}>
                    {"Custom Invitation"}
                  </Text>
                  <Info height={20} width={20} />
                </View>
                <Toggle />
              </View>

              <View style={{ marginVertical: 10 }}>
                <SwitchButton
                  value={partyModel.party.isPrivate}
                  onPrivatePress={() => partyModel.party.setIsPrivate(true)}
                  onPublicPress={() => partyModel.party.setIsPrivate(false)}
                />
              </View>

              <View
                style={[
                  styles.eventContainer,
                  { justifyContent: 'space-between' },
                ]}>

                <TextInput
                  keyboardType={'numeric'}
                  placeholder={'Min Age'}
                  placeholderTextColor={"#999999"}
                  value={partyModel.party.fromAge?.toString()}
                  onChangeText={fromAge => {
                    partyModel.party.set({ fromAge: fromAge });
                  }}
                  errorMessage={partyModel.party?.partyError?.fromAge}
                  style={[
                    styles.textInput,
                    {
                      width: getWp(168),
                      height: getHp(46),
                      backgroundColor: 'rgba(238, 238, 238, 0.5)',
                      fontSize: FONTSIZE.Text18,
                      color: 'black',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      minHeight: 0,
                    },
                  ]}
                />
                <TextInput
                  keyboardType={'numeric'}
                  value={partyModel.party.toAge?.toString()}
                  onChangeText={toAge => {
                    partyModel.party.set({ toAge: toAge });
                  }}
                  errorMessage={partyModel.party?.partyError?.toAge}
                  placeholder={'Max Age'}
                  placeholderTextColor={"#999999"}
                  style={[
                    styles.textInput,
                    {
                      width: getWp(168),
                      height: getHp(46),
                      backgroundColor: 'rgba(238, 238, 238, 0.5)',
                      fontSize: FONTSIZE.Text18,
                      color: 'black',
                      height: 45,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      minHeight: 0,
                    },
                  ]}
                />
              </View>


              {/* <DollarField />
                    <AgeField /> */}
            </View>

            {/* <View>
            {TAGS.map(t => {
                return <TagsCollapsible {...t} />;
              })} 
            </View> */}
            <TouchableOpacity
              onPress={() => {
                partyModel.party.addTicketType();
              }}
              style={[styles.shadowStyle, {
                alignSelf: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 13,
                width: '95%',
                elevation: 2,
                marginVertical: getHp(20)
              }]}>
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


            {partyModel.party.tickets?.map((t, index) => {
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
              // bar
              rowDoubleButton
              ButtonTitle={'Save As Draft'}
              ButtonTitle2={'Complete'}
              onSaveDraftPress={() => handleOnPress(true)}
              onContinuePress={() => handleOnPress(false)}
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
            </View>
          </ScrollView>
          
        </View> 
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: getHp(5),
    height: getHp(60),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#EEEEEE'
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
  },
  textInput: {
    borderWidth: 0.3,
    borderColor: '#EEEEEE',
    fontSize: FONTSIZE.Text16,
    backgroundColor: '#fff',
    paddingLeft: 10,
    marginVertical: 5,
    borderRadius: 9.5,
    color: '#999999',
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: getHp(10),
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
    fontFamily: 'AvenirNext-Medium',
  },

  cameraStyle: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FBFBFB',
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
CreateInvitation.routeName = '/CreateInvitation';
CreateInvitation.routeNameForBottom = '/CreateInvitationForBottom';
export default observer(CreateInvitation);
