import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  Root,
  CustomButton,
  ReviewCard,
  Footer,
  CustomText,
} from '@components';
import {GreyHamburger, BlackCircleCross} from '@svg';
// import { handleImage } from '@components/ImageVideoPlaceholder'
import ImagePicker from 'react-native-image-crop-picker';
import {ImageStore} from 'react-native';
import {FONTSIZE, getHp, getWp} from '@utils';
import {Avatar} from 'react-native-elements';
import Modal from 'react-native-modal';
import {Observer, observer} from 'mobx-react';
import InvitationPartyModel from './model';

function UploadMedia(props) {
  let partyModel = InvitationPartyModel.getInstance();
  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
    })
      .then(images => {
        partyModel.addGallery(images);
      })
      .catch(e => alert(e));
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            marginVertical: getHp(10),
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: getWp(20),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.number, {marginRight: getWp(30)}]}>
              {index + 1}
            </Text>

            <View>
              {index == 0 ? (
                <Text style={[styles.number, {marginVertical: getHp(10)}]}>
                  Cover Photo
                </Text>
              ) : null}
              <View>
                <Avatar
                  source={{uri: item}}
                  avatarStyle={{borderRadius: 13}}
                  size={125}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 3,
                    top: 3,
                    height: 30,
                    width: 30,
                  }}
                  onPress={() => {
                    partyModel.removeGallery(item);
                  }}>
                  <BlackCircleCross height={30} width={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <GreyHamburger height={30} width={30} />
        </View>
        {/* {index !== getMedia.length - 1 ?
                    <View style={{ height: getHp(0.5), width: '100%', backgroundColor: '#CCCCCC' }} />
                    :
                    null} */}
      </View>
    );
  };
  return (
    <Root>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
          <Header
            headerTitle={'Upload Media'}
            back
            onPress={() => props.navigation.goBack()}
            headerBackColor={{backgroundColor: '#fff'}}
          />

          <FlatList
            data={partyModel.partyFields.galleryFiles}
            renderItem={renderItem}
          />
          <View
            style={{
              alignSelf: 'center',
              width: '100%',
              paddingBottom: getHp(0),
            }}>
            <CustomButton
              bar
              colDoubleButton
              ButtonTitle={'Add Images'}
              ButtonTitle2={'Continue'}
              onPress={() => {
                handleImage()
              }}
            />
          </View>
        </ScrollView>
      </View>
    </Root>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  number: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: FONTSIZE.Text20,
  },
});
UploadMedia.routeName = '/UploadMedia';
export default observer(UploadMedia);
