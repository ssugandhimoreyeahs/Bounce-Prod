import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Scaffold,
  TagsCollapsible,
  Media,
  Header,
  Footer,
  CustomText,
} from '@components';
import {FONTSIZE, getHp, getWp} from '@utils';
import {observer} from 'mobx-react';
import {Spotify, AppleMusic} from '@svg';
import {CreateFormData, PartyService} from '../../../app/services';
import MobxStore from '../../../mobx';
import PlanPartyModel from '../../BounceVendors/PlanParty/PlanPartyModel';
import NewsFeed from './NewsFeed';
import {ApiClient} from '../../../app/services';
import Spinner from 'react-native-loading-spinner-overlay';
import {SelectedTags} from '../../../app/Entities';
import {Toast} from '@constants';


function AddInterest(props) {
  const [selectedTags, setSelectedTags] = useState([]);
  const {tagStore} = MobxStore;
  const {userProfile: userinfo} = MobxStore.authStore;
  const [loader, setLoader] = useState(false);
  const token = userinfo?.token;
  console.log('TOKEN ON MY INTEREST:', JSON.stringify(userinfo));

  useEffect(async () => {
    const Tags = await PartyService.getTags();
    tagStore.setTags(Tags);
  }, []);

  useEffect(() => {
    setSelectedTags(()=>{
        let TestData = PartyService.tagsAssign(userinfo?.user?.userInterest ?? [])
        return TestData;
    })
  },[userinfo]);

  const handleSubmit = async () => {
    // props.navigation.navigate(NewsFeed.routeName)
    setLoader(true);
    await ApiClient.authInstance
      .post(ApiClient.endPoints.addInterest, {
        interest: JSON.parse(JSON.stringify(selectedTags)),
      })
      .then(async i => {
        //MobxStore.authStore.async.reloadUser();
        console.log('RESPONSE - TAGS ADD - ');
        console.log(i.data);
        if (i.status == 201 || i.status == 200) {
          setLoader(false);
          setTimeout(() => {
            Toast('Profile Updated Successfully!');
          }, 100);
        }
      })
      .catch(e => {
        console.log(e.response);
        setLoader(false);
      });

    setLoader(false);
  };

  const onSelectTags = ({tag, subTags}) => {
    try {
      const selectedTagData = SelectedTags.setTags(selectedTags).onSelectTag(
        tag,
        subTags,
      );
      setSelectedTags(i => [...selectedTagData]);
    } catch (error) {
      console.log('ERROR_ONSELECT - ', error);
    }
  };

  console.log('TAG_CAT_STATTE - ', JSON.stringify(selectedTags));
  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFFFFF'}}>
      <Spinner visible={loader} color={'#1FAEF7'} />
      {!loader && (
        <View style={{flex: 1}}>
          <Header
            headerStyleProp={{fontFamily: 'AvenirNext-DemiBold'}}
            back
            headerTitle={'My Interests'}
            onPress={() => {
              props.navigation.goBack();
            }}
            headerBackColor={{backgroundColor: '#fff', elevation: 0}}
          />

          <ScrollView
            style={styles.container}
            contentContainerStyle={{flexGrow: 1}}>
            {true && (
              <View>
                <Text
                  style={[
                    styles.headerTitle,
                    {
                      fontSize: FONTSIZE.Text22,
                      marginTop: getHp(15),
                    },
                  ]}>
                  {'Add Interests'}
                </Text>
                <Text
                  style={[
                    styles.headerTitle,
                    {
                      fontSize: FONTSIZE.Text14,
                      fontFamily: 'AvenirNext-Regular',
                      letterSpacing: 0.2,
                      marginBottom: getHp(15),
                    },
                  ]}>
                  {'Personalize your feed of events!'}
                </Text>
              </View>
            )}

            <Text style={[styles.headerTitle, {marginVertical: getHp(15)}]}>
              {'Music'}
            </Text>
            {/* First Spotify */}
            <TouchableOpacity style={[styles.socialButton, styles.shadowStyle]}>
              <View style={styles.flex}>
                <Spotify height={getHp(30)} width={getHp(30)} />
                <Text
                  style={[
                    styles.headerTitle,
                    {
                      fontFamily: 'AvenirNext-Medium',
                      marginLeft: 13,
                    },
                  ]}>
                  {'Spotify'}
                </Text>
              </View>
              <Text
                style={[
                  styles.headerTitle,
                  {
                    color: '#1FAEF7',
                    fontFamily: 'AvenirNext-Medium',
                    marginRight: getWp(10),
                  },
                ]}>
                {'Connect'}
              </Text>
            </TouchableOpacity>

            {/* Second Apple Music */}
            <TouchableOpacity
              style={[
                styles.socialButton,
                styles.shadowStyle,
                {marginTop: getHp(5), marginBottom: getHp(30)},
              ]}>
              <View style={styles.flex}>
                <AppleMusic height={getHp(30)} width={getHp(30)} />
                <Text
                  style={[
                    styles.headerTitle,
                    {fontFamily: 'AvenirNext-Medium', marginLeft: 13},
                  ]}>
                  {'Apple Music'}
                </Text>
              </View>
              <Text
                style={[
                  styles.headerTitle,
                  {
                    color: '#1FAEF7',
                    fontFamily: 'AvenirNext-Medium',
                    marginRight: getWp(10),
                  },
                ]}>
                {'Connect'}
              </Text>
            </TouchableOpacity>

            {tagStore.getTags().map(t => {
              return (
                <TagsCollapsible
                  MyInterest={true}
                  Data={t.clone()}
                  onAdd={onSelectTags}
                  isOnSelect={({tagObj, item}) => {
                    let isExist = SelectedTags.setTags(
                      selectedTags,
                    ).isTagSelected(tagObj, item);
                    return isExist.tagExist && isExist.subTagExist;
                  }}
                />
              );
            })}

            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.shadowStyle, styles.SaveButton]}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'AvenirNext-DemiBold',
                  fontSize: FONTSIZE.Text21,
                }}>
                {'Save'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </Scaffold>
  );
}
AddInterest.routeName = '/AddInterest';
export default observer(AddInterest);

const styles = StyleSheet.create({
  SaveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHp(50),
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 17,
    marginTop: getHp(15),
    marginBottom: getHp(60),
  },
  smallButtonStyle: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 5,
    elevation: 1,
    backgroundColor: '#EEEEEE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#FBFBFB',
    flex: 1,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  firstBlock: {
    marginBottom: getHp(20),
    paddingTop: getHp(10),
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  addInterest: {
    elevation: 5,
    backgroundColor: '#fff',
    height: getHp(130),
    width: getHp(150),
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#999999',
  },
  headerTitle: {
    color: '#000',
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-DemiBold',
  },
  itemView: {
    height: 35,
    backgroundColor: '#F2F5F6',
    justifyContent: 'center',
    paddingHorizontal: getHp(15),
    borderRadius: 100,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  socialButton: {
    height: getHp(50),
    elevation: 0,
    borderRadius: 13,
    paddingHorizontal: getWp(10),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
