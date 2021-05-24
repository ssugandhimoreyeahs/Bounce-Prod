import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
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
import PlanPartyModel from './PlanPartyModel';
import { Toast } from '../../../app/constants';

function UploadMedia(props) {
  let goBack = false;
  if (props.route?.params) {
    goBack = props.route?.params.goBack;
  }
  let partyModel = PlanPartyModel.getInstance();
  const [state, setState] = useState({});
  useEffect(() => {
    const listener = partyModel.party?.subscribe(() => {
      setState(() => ({}));
    });
    return () => {
      listener.unsubscribe();
    };
  }, []);
  const handleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: true,
    })
      .then(images => {
        partyModel.party.addGallery(images);
      })
      .catch(e => {
        Toast('Invalid Files');
      });
  };
  const deleteImage = (action, path) => {
    partyModel.party.removeGallery(action,path);
  }
  const renderItem = ({item, index}) => {
    if (item == undefined) {
      return false;
    }
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
                  source={{uri: item.path || item.filePath}}
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
                    if (partyModel.isEditMode && item.filePath) {
                      return Alert.alert('Message', 'Sure Delete Image?', [
                        {
                          text: 'Okay',
                          onPress: () => {
                              deleteImage(true, item.filePath)
                          }
                        },
                        {
                          text: 'Cancel'
                        }
                      ]);
                    }
                    return deleteImage(false, item.path);
                    
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
            data={[...partyModel.party.galleryFiles.filter(i => i!=undefined), ...partyModel.party.gallery]}
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
              onPress1={handleImage}
              onPress={() => {
                if (goBack) {
                  return props.navigation.goBack();
                }
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
