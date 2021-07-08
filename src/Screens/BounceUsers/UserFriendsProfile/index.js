import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  ImageCarousel,
  Tabview,
  FriendsListRender,
  Footer,
  CustomText,
} from '@components';
import {Message, Favourite, Girl, DJ, DJ1, DJ2} from '@assets';
import {styles} from './indexCss';
import {BlackMenubar, Scanner, AppleMusic, BluePerson} from '@svg';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import {connect, useSelector, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import {pickDocument} from '@hooks';
import {fetchGet, postData} from '../../../FetchServices';
import {UserContext} from '../../../context/profiledataProvider';
import MobxStore from '../../../mobx';
import Drawer from '../../Drawer/UserCustomDrawer';
import QRcode from '../../Views/QRcode';
import LinearGradient from 'react-native-linear-gradient';
import {
  WhitePerson,
  UploadBlue,
  InstaNew,
  GreyCross,
  FavouriteMusic,
  Spotify,
  Insta,
  Twitter,
  Tiktok,
  Linkedin,
  Snapchat,
  BlackPerson,
} from '@svg';
import {AccountService, PartyService} from '../../../app/services';
import CreateInvitation from '../../../Screens/BounceVendors/PlanParty/CreateInvitation';
import {observer} from 'mobx-react';
import {FONTSIZE, getHp, getWp} from '@utils';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import HostProfile from '../HostProfile/HostProfile';
import Right from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Entypo';
import spotifyToken from '../../../app/SDK/Spotify/spotify_token';
import FriendsPage from '../Profile/FriendsPage';
import CommonInterestNewsFeed from '../NewsFeed/CommonInterestNewsFeed';
import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
  ApiConfig,
} from 'react-native-spotify-remote';

const spotifyConfig = {
  clientID: '8d16f72b2b524c36965c7fb88a36e9a6',
  redirectURL: 'https://5f247ddc799b.ngrok.io/spotify/spotifyCallback',
  tokenRefreshURL: 'https://accounts.spotify.com/api/token',
  tokenSwapURL: 'https://accounts.spotify.com/api/token',
  authType: 'TOKEN',
  scopes: [ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope],
};

Text.defaultProps = {
  allowFontScaling: false,
  fontScale: 1,
};

function UserFriendsProfile(props) {
  const {authStore} = MobxStore;
  const {navigation} = props;
  const [spotifyModal, setSpotifyModal] = useState(false);
  const userinfo = authStore.userProfile;
  const [getMedia, setMedia] = useState(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const imageArray = [DJ, DJ1, DJ2];
  const [state, setState] = useState(0);
  const [getSpotify, setSpotifyData] = useState([]);

  const {
    friends,
    username,
    fullName,
    city,
    about,
    profession,
    snapchatUsername,
    instagramUsername,
    tiktokUsername,
    twitterUsername,
    linkedInUsername,
    profileImage = {},
    age,
  } = userinfo?.user;

  const connectSpotify = async () => {
    try {
      const session = await SpotifyAuth.authorize(spotifyConfig);
      console.log('Spotify Response ----> ', JSON.stringify(session));
    } catch (e) {
      console.log('Spotify Error ----> ', e);
    }
  };

  var gapi = window;
  // console.log("WINDOW ", gapi)
  /* 
    Update with your own Client Id and Api key 
  */
  var CLIENT_ID =
    '134657981675-fl066gbb2k5rrf97ku4vk310egbt3t6m.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyCP8xA958flEdsdFnGZROsi1IKyc8y70WA';
  var DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  ];
  var SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  // Calender Function start

  const handleClick = () => {
    gapi.load('client:auth2', () => {
      // console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load('calendar', 'v3', () => console.log('bam!'));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          var event = {
            summary: 'Awesome Event!',
            location: '800 Howard St., San Francisco, CA 94103',
            description: 'Really great refreshments',
            start: {
              dateTime: '2020-06-28T09:00:00-07:00',
              timeZone: 'America/Los_Angeles',
            },
            end: {
              dateTime: '2020-06-28T17:00:00-07:00',
              timeZone: 'America/Los_Angeles',
            },
            recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
            attendees: [
              {email: 'lpage@example.com'},
              {email: 'sbrin@example.com'},
            ],
            reminders: {
              useDefault: false,
              overrides: [
                {method: 'email', minutes: 24 * 60},
                {method: 'popup', minutes: 10},
              ],
            },
          };

          var request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });

          request.execute(event => {
            console.log(event);
            window.open(event.htmlLink);
          });

          /*
              Uncomment the following block to get events
          */
          /*
          // get events
          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
          }).then(response => {
            const events = response.result.items
            console.log('EVENTS: ', events)
          })
          */
        });
    });
  };

  // Calender Function end

  useEffect(() => {
    PartyService.getParty();
    setAccounts();
  }, [authStore.userProfile]);

  const setAccounts = async () => {
    await authStore.setAllAccounts();
  };

  const handleCarousel = () => {
    return (
      <View
        style={
          {
            // flexDirection: 'row',
            // flexWrap: 'wrap',
            // width: '100%'
          }
        }>
        <FlatList
          data={friends}
          renderItem={item => {
            return <FriendsListRender item={item} />;
          }}
          keyExtractor={index => index}
          // horizontal
          // style={{flexWrap: 'wrap',}}
          contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
        />
      </View>
    );
  };

  const handleImage = async () => {
    {
      vendorType !== 'Bartender' &&
      vendorType !== 'Catering' &&
      vendorType !== 'Event Rentals'
        ? ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true,
          }).then(images => {
            setMedia(
              images.map(i => {
                return i.path;
              }),
            );
          })
        : pickDocument();
    }
  };

  const RenderSpotify = ({items}) => {
    // console.log("PROPS OF SPOTIFY", items.track)
    return (
      <View
        style={{
          marginRight: 10,
          flexDirection: 'row',
          marginVertical: 10,
          paddingVertical: 10,
          flex: 1,
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri: items.track.album.images[0].url}}
            style={{borderRadius: 7, width: 150, height: 150, margin: 2}}
          />

          <Text
            style={[
              styles.textImage,
              {
                marginVertical: 5,
                paddingBottom: 0,
                fontSize: FONTSIZE.Text16,
                fontFamily: 'AvenirNext-Medium',
              },
            ]}>
            {items.track.name}
          </Text>

          <Text
            style={[
              styles.textImage,
              {marginVertical: 5, paddingBottom: 0, fontSize: FONTSIZE.Text13},
            ]}>
            {items.track.artists[0].name}
          </Text>

          <Text
            style={[
              styles.textImage,
              {color: '#696969', paddingBottom: 0, fontSize: FONTSIZE.Text12},
            ]}>
            {items.track.album.album_type}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Scaffold statusBarStyle={{backgroundColor: '#FFFFFF'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{flexGrow: 1}}
        style={{
          backgroundColor: '#FBFBFB',
        }}>
        <Spinner visible={loader} color={'#1FAEF7'} />
        {!loader && (
          <View>
            <Header
              AllAccounts={authStore.AllAccounts}
              leftDropdown={
                username !== null ? `@${username !== null ? username : ''}` : ''
              }
              scanner={<Scanner height={25} width={25} />}
              share={<BlackMenubar height={25} width={25} />}
              onPressScanner={() => props.navigation.navigate(QRcode.routeName)}
              onPress={() => {
                props.navigation.openDrawer();
              }}
              headerBackColor={{backgroundColor: '#FFFFFF'}}
              {...props}
            />
            <View style={styles.subContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 5,
                }}>
                <Avatar
                  source={{uri: `${profileImage?.filePath}`}}
                  size="large"
                  rounded
                />

                <View style={{paddingLeft: 15}}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: FONTSIZE.Text20,
                      fontFamily: 'AvenirNext-Medium',
                      marginBottom: getHp(5),
                    }}>
                    {fullName}
                  </Text>

                  <View style={[styles.flex]}>
                    {
                      <>
                        <Text style={styles.cityAll}>{age}</Text>
                        <View style={styles.dot} />
                      </>
                    }

                    {!(city == '' || city == 'null' || city == null) && (
                      <>
                        <Text style={styles.cityAll}>
                          {city.split(',', 1)}
                          {/* {city} */}
                        </Text>
                        <View style={styles.dot} />
                      </>
                    )}

                    {!(
                      profession == null ||
                      profession == '' ||
                      profession == 'null'
                    ) ? (
                      <Text style={styles.cityAll}>{profession}</Text>
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.editButtonStyle,
                          styles.shadowStyle,
                          {
                            width: getWp(48),
                            paddingHorizontal: getWp(0),
                            paddingVertical: 1,
                            marginLeft: 2,
                          },
                        ]}
                        onPress={() =>
                          props.navigation.navigate(HostProfile.routeName)
                        }>
                        <Icon name="plus" color={'#1FAEF7'} size={15} />
                        <Text style={[styles.editButton, {}]}>{'Job'}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>

              <View
                style={[
                  styles.flex,
                  {width: '80%', marginVertical: 10, alignItems: 'center'},
                ]}>
                <TouchableOpacity
                  style={[
                    styles.editButtonStyle,
                    styles.shadowStyle,
                    {paddingVertical: 5, marginRight: getWp(15)},
                  ]}
                  onPress={() =>
                    props.navigation.navigate(HostProfile.routeName)
                  }>
                  <Text style={styles.editButton}>{'Edit Profile'}</Text>
                </TouchableOpacity>

                {instagramUsername != null && (
                  <TouchableOpacity
                    style={{marginRight: getWp(15)}}
                    onPress={() =>
                      Linking.openURL(
                        `https://www.instagram.com/${instagramUsername}`,
                      )
                    }>
                    <Insta height={getHp(30)} width={getWp(30)} />
                  </TouchableOpacity>
                )}

                {!(
                  tiktokUsername == null ||
                  tiktokUsername == '' ||
                  tiktokUsername == 'null'
                ) && (
                  <TouchableOpacity
                    style={{marginRight: getWp(15)}}
                    onPress={() =>
                      Linking.openURL(
                        `https://www.tiktok.com/${tiktokUsername}`,
                      )
                    }>
                    <Tiktok height={getHp(28)} width={getWp(28)} />
                  </TouchableOpacity>
                )}

                {!(
                  twitterUsername == null ||
                  twitterUsername == '' ||
                  twitterUsername == 'null'
                ) && (
                  <TouchableOpacity
                    style={{marginRight: getWp(15)}}
                    onPress={() =>
                      Linking.openURL(`https://twitter.com/${twitterUsername}`)
                    }>
                    <Twitter height={getHp(29)} width={getWp(29)} />
                  </TouchableOpacity>
                )}

                {!(
                  snapchatUsername == null ||
                  snapchatUsername == '' ||
                  snapchatUsername == 'null'
                ) && (
                  <TouchableOpacity
                    style={{marginRight: getWp(15)}}
                    onPress={() =>
                      Linking.openURL(
                        `https://www.snapchat.com/add/${snapchatUsername}`,
                      )
                    }>
                    <Snapchat height={getHp(31)} width={getWp(31)} />
                  </TouchableOpacity>
                )}

                {!(
                  linkedInUsername == null ||
                  linkedInUsername == '' ||
                  linkedInUsername == 'null'
                ) && (
                  <TouchableOpacity
                    style={{marginRight: getWp(15)}}
                    onPress={() => Linking.openURL(`${linkedInUsername}`)}>
                    <Linkedin height={getHp(31)} width={getWp(30)} />
                  </TouchableOpacity>
                )}
              </View>

              {!(about == '' || about == 'null' || about == null) && (
                <>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        marginTop: getHp(15),
                        marginBottom: 10,
                        lineHeight: 22,
                        fontSize: FONTSIZE.Text16,
                      },
                    ]}>
                    {about}
                  </Text>
                </>
              )}

              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={['#16B0FE', '#3FBEFF']}
                style={[
                  styles.linearGradient,
                  {
                    width: '100%',
                    height: getHp(38),
                    borderRadius: 13,
                    marginTop: 10,
                    marginBottom: 10,
                  },
                ]}>
                <TouchableOpacity
                  style={[
                    styles.fullTouch,
                    {
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}
                  // onPress={() => props.navigation.navigate(CommonInterestNewsFeed.routeName)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        marginRight: 15,
                        fontSize: FONTSIZE.Text16,
                      },
                    ]}>
                    {'Bounce with Friends'}
                  </Text>
                  <Right name="angle-right" color="#FFFFFF" size={25} />
                </TouchableOpacity>
              </LinearGradient>

              {/* <TextInput
                multiline
                numberOfLines={5}
                placeholder="I like to party..."
                textAlignVertical="top"
                style={styles.Textarea}
                placeholderTextColor='#999999'
              /> */}
            </View>
            {/* Subcontainer view end  */}

            <Tabview {...props} />

            <View
              style={{
                height: 1,
                backgroundColor: '#EEEEEE',
                marginTop: 10,
                marginBottom: 15,
              }}
            />

            <View style={{paddingHorizontal: 10}}>
              {/* First Gallery Block of Friends */}
              {friends?.length == 0 || friends?.length == undefined ? (
                <TouchableOpacity
                  style={[
                    styles.fullTouch,
                    styles.linearGradient,
                    styles.shadowStyle,
                    {
                      height: getHp(50),
                      borderRadius: 13,
                      flexDirection: 'row',
                    },
                  ]}
                  onPress={() =>
                    props.navigation.navigate(FriendsPage.routeName, {
                      contactTitle: 'Find Friends',
                    })
                  }>
                  <BluePerson height={25} width={19} style={{}} />
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        marginLeft: 20,
                        fontFamily: 'AvenirNext-DemiBold',
                        color: '#1FAEF7',
                      },
                    ]}>
                    {'Find Friends'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={{marginVertical: 5, paddingVertical: 10}}>
                  <View style={[styles.flex]}>
                    <BlackPerson height={20} width={14} />
                    <Text style={[styles.InstaText]}>
                      {' '}
                      {'Friends '}
                      <Text style={[styles.InstaText, {color: '#696969'}]}>
                        {friends?.length}
                      </Text>
                    </Text>
                  </View>

                  {handleCarousel()}

                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(FriendsPage.routeName, {
                        contactTitle: 'See All Friends',
                        FriendsList: friends,
                      })
                    }
                    style={styles.allFrnds}>
                    <Text style={[styles.aboutText]}>{'See All Friends'}</Text>
                  </TouchableOpacity>
                </View>
              )}
              {/*END*** First Gallery Block of Friends */}

              <View
                style={{
                  backgroundColor: '#EEEEEE',
                  height: 1,
                  marginVertical: 15,
                }}
              />

              {/* Social Media Section Start */}
              {/* 1st */}
              <View style={styles.flex}>
                <TouchableOpacity
                  style={[styles.socialButton, styles.shadowStyle]}>
                  <View style={styles.flex}>
                    <Insta height={getHp(30)} width={getHp(30)} />
                    <Text style={styles.socialText}>{'Instagram'}</Text>
                  </View>
                  <Text style={[styles.headerTitle, styles.connectStyle]}>
                    {'Connect'}
                  </Text>
                </TouchableOpacity>
                <GreyCross
                  height={getHp(15)}
                  width={getWp(15)}
                  style={{marginLeft: 20}}
                />
              </View>

              {/* 2nd */}
              <View style={styles.flex}>
                <TouchableOpacity
                  onPress={() => {
                    connectSpotify();
                  }}
                  style={[styles.socialButton, styles.shadowStyle]}>
                  <View style={styles.flex}>
                    <Spotify height={getHp(30)} width={getHp(30)} />
                    <Text style={styles.socialText}>{'Spotify'}</Text>
                  </View>
                  <Text style={[styles.headerTitle, styles.connectStyle]}>
                    {'Connect'}
                  </Text>
                </TouchableOpacity>
                <GreyCross
                  height={getHp(15)}
                  width={getWp(15)}
                  style={{marginLeft: 20}}
                />
              </View>

              {/* 3rd */}
              <View style={[styles.flex, {marginBottom: getHp(30)}]}>
                <TouchableOpacity
                  style={[styles.socialButton, styles.shadowStyle]}>
                  <View style={styles.flex}>
                    <AppleMusic height={getHp(30)} width={getHp(30)} />
                    <Text style={styles.socialText}>{'Apple Music'}</Text>
                  </View>
                  <Text style={[styles.headerTitle, styles.connectStyle]}>
                    {'Connect'}
                  </Text>
                </TouchableOpacity>
                <GreyCross
                  height={getHp(15)}
                  width={getWp(15)}
                  style={{marginLeft: 20}}
                />
              </View>

              {/* 4th */}
              {(tiktokUsername == null || tiktokUsername == '') && (
                <View style={styles.flex}>
                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      {
                        borderWidth: 1,
                        borderColor: '#DDDDDD',
                        elevation: 0,
                      },
                    ]}>
                    <View style={styles.flex}>
                      <Tiktok height={getHp(30)} width={getHp(30)} />
                      <TextInput
                        placeholder={`@tiktok`}
                        placeholderTextColor={'#999999'}
                        // onChangeText={value => setTiktok(value)}
                        style={[styles.socialText, styles.TiktokStyle]}
                        // value={tiktok}
                      />
                    </View>
                  </TouchableOpacity>
                  <GreyCross
                    height={getHp(15)}
                    width={getWp(15)}
                    style={{marginLeft: 20}}
                  />
                </View>
              )}

              {/* 5th */}
              {(snapchatUsername == null || snapchatUsername == '') && (
                <View style={styles.flex}>
                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      {
                        borderWidth: 1,
                        borderColor: '#DDDDDD',
                        elevation: 0,
                      },
                    ]}>
                    <View style={styles.flex}>
                      <Snapchat height={getHp(30)} width={getHp(30)} />
                      <TextInput
                        placeholder={`@snapchat`}
                        placeholderTextColor={'#999999'}
                        // onChangeText={value => setSnapchat(value)}
                        style={[styles.socialText, styles.TiktokStyle]}
                        // value={snapchat == '' ? '' : snapchat}
                      />
                    </View>
                  </TouchableOpacity>
                  <GreyCross
                    height={getHp(15)}
                    width={getWp(15)}
                    style={{marginLeft: 20}}
                  />
                </View>
              )}

              {/* 6th */}
              {(twitterUsername == null || twitterUsername == '') && (
                <View style={styles.flex}>
                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      {
                        borderWidth: 1,
                        borderColor: '#DDDDDD',
                        elevation: 0,
                      },
                    ]}>
                    <View style={styles.flex}>
                      <Twitter height={getHp(30)} width={getHp(30)} />
                      <TextInput
                        placeholder={`@twitter`}
                        placeholderTextColor={'#999999'}
                        // onChangeText={value => setTwitter(value)}
                        style={[styles.socialText, styles.TiktokStyle]}
                        // value={twitter}
                      />
                    </View>
                  </TouchableOpacity>
                  <GreyCross
                    height={getHp(15)}
                    width={getWp(15)}
                    style={{marginLeft: 20}}
                  />
                </View>
              )}

              {/* 7th */}
              {(linkedInUsername == null || linkedInUsername == '') && (
                <View style={styles.flex}>
                  <TouchableOpacity
                    style={[
                      styles.socialButton,
                      {
                        borderWidth: 1,
                        borderColor: '#DDDDDD',
                        elevation: 0,
                      },
                    ]}>
                    <View style={styles.flex}>
                      <Linkedin height={getHp(30)} width={getHp(30)} />
                      <TextInput
                        placeholder={`@linkedin `}
                        placeholderTextColor={'#999999'}
                        // onChangeText={value => setTwitter(value)}
                        style={[styles.socialText, styles.TiktokStyle]}
                        // value={twitter}
                      />
                    </View>
                  </TouchableOpacity>
                  <GreyCross
                    height={getHp(15)}
                    width={getWp(15)}
                    style={{marginLeft: 20}}
                  />
                </View>
              )}

              {/* Social Media Section */}

              {/* <View style={{ height: 1, backgroundColor: '#EEEEEE', marginVertical: 10 }} /> */}
            </View>
            {/* <View style={{
            height: 1, backgroundColor: '#EEEEEE', marginTop: 10,
            marginBottom: 25
          }} /> */}

            {/*Start*** Second Gallery Block of Instagram */}
            {/* <View style={[styles.flex, {
            margin: 10,
          }]}>
            <InstaNew height={20} width={14} />
            <Text style={styles.InstaText} >
              {"Instagram"}
            </Text>
          </View>
          {handleCarousel("Instagram")} */}
            {/*END*** Second Gallery Block of Instagram */}

            {/* <View style={{
            height: 1, backgroundColor: '#EEEEEE', marginTop: 10,
            marginBottom: 25
          }} /> */}

            <View
              style={[
                styles.flex,
                {
                  paddingHorizontal: 10,
                  marginBottom: getHp(60),
                },
              ]}>
              {/* <FavouriteMusic height={17} width={10} />
            <Text style={styles.InstaText} >
              {"Favourite Music"}
            </Text> */}
            </View>

            <View style={{paddingVertical: 10}} />

            {/* <View> */}

            {/* <ScrollView horizontal >
                  {getSpotify.length == 0 ?
                    null :
                    getSpotify.items.map((items) => {
                      // console.log("THIS IS SINGLE ITEM:", items)
                      return <RenderSpotify items={items} />
                    })
                  }
                </ScrollView> */}
            {/* </View> */}
          </View>
        )}
      </ScrollView>
      {/* </View> */}
    </Scaffold>
  );
}
UserFriendsProfile.routeName = '/UserFriendsProfile';
export default observer(UserFriendsProfile);
