import React, {useState} from 'react';
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
} from '@components';
import {UploadCamera} from '@assets';
import {UploadBlue, BlackClose, BlueCamera} from '@svg';
import {Keyboard} from 'react-native';
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
import InvitationPartyModel from './model';
import { observer } from 'mobx-react';

const INTEREST = [
  {
    categoryHeading: 'Add Tags',
    categoryList: [
      'Concerts',
      'Broadway',
      'Comedy',
      'Gaming',
      'Concerts',
      'Broadway',
      'Comedy',
      'Gaming',
    ],
  },
];
function CreateInvitation(props) {
  //const [partyModel] = useState(() => InvitationPartyModel.getInstance());
  const partyModel = InvitationPartyModel.getInstance();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null);
  const [footer, openFooter] = useState(false);
  const [getPrivate, setPrivate] = useState(false);

  const handleImage = async () => {
    ImagePicker.openPicker({
      multiple: true,
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log('IMAGES', image);
      props.navigation.navigate('UploadMedia', {
        image,
      });
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
  const SmallButton = ({item}) => {
    console.log('ase', item);
    return (
      <TouchableOpacity style={styles.smallButtonStyle}>
        <Text style={[styles.headerTitle]}>{item}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Root>
      <View style={styles.container}>
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
          <Header back rightTitle={'Save as Draft'} />
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
              value={partyModel.partyFields.title}
              onChange={title => partyModel.setFields({'title': title})}
              styleProp={{borderRadius: 19}}
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
                    style={{marginVertical: 30}}>
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

            <FloatingInput
              floatingLabel={'Date / Time'}
              value={date}
              onChange={value => setDate(value)}
            />
            <FloatingInput
              floatingLabel={'Address'}
              value={address}
              onChange={value => setAddress(value)}
            />
            <CustomTextinput
              text={'Description...'}
              multiline
              onChange={value => setDescription(value)}
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
                {fontSize: FONTSIZE.Text20, marginRight: 5},
              ]}>
              {'Event Settings'}
            </Text>
            {/* <Icon name="chevron-down" size={15} color="#000" /> */}
            {/* </View> */}

            <View style={{marginVertical: 10}}>
              <SwitchButton
                onPrivatePress={() => setPrivate()}
                onPublicPress={() => setPrivate()}
              />
            </View>
            <DollarField />
            <AgeField />
          </View>

          {/* Tickets Section */}
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 3,
              backgroundColor: '#fff',
              justifyContent: 'center',
              paddingVertical: 20,
            }}>
            <Text
              style={[
                styles.headerTitle,
                {fontSize: FONTSIZE.Text20, marginRight: 5, marginBottom: 10},
              ]}>
              {'Tickets'}
            </Text>

            <TextInput placeholder="Ticket Title" style={styles.textInput} />
            <TextInput placeholder="Description" style={styles.textInput} />

            <View
              style={[
                styles.eventContainer,
                {justifyContent: 'space-between'},
              ]}>
              <Text
                style={[
                  styles.headerTitle,
                  {fontSize: FONTSIZE.Text20, marginRight: 5},
                ]}>
                {'Price'}
              </Text>
              <TextInput
                placeholderTextColor={'#000'}
                placeholder={'$0'}
                style={[
                  styles.textInput,
                  {
                    width: '35%',
                    textAlign: 'center',
                    fontSize: FONTSIZE.Text18,
                  },
                ]}
              />
            </View>
            <View
              style={[
                styles.eventContainer,
                {justifyContent: 'space-between'},
              ]}>
              <Text
                style={[
                  styles.headerTitle,
                  {fontSize: FONTSIZE.Text20, marginRight: 5},
                ]}>
                {'Quantity Available'}
              </Text>
              <TextInput
                placeholderTextColor={'#000'}
                placeholder={'0'}
                style={[
                  styles.textInput,
                  {
                    width: '35%',
                    textAlign: 'center',
                    fontSize: FONTSIZE.Text18,
                  },
                ]}
              />
            </View>

            <TouchableOpacity
              style={{
                marginTop: 10,
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
          </View>

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

      <CustomButton
        bar
        rowDoubleButton
        ButtonTitle={'Save As Draft'}
        ButtonTitle2={'Complete'}
        onPress={() => SwitchButton('props')}
      />

      {/* </View> */}
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
    fontWeight: 'bold',
    fontFamily: 'AvenirNext',
  },

  cameraStyle: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#F2F5F6',
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

export default observer(CreateInvitation);