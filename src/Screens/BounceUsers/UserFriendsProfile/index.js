import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  Linking,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  Header,
  ImageCarousel,
  Tabview,
  ReviewCard,
  Footer,
  CustomText,
} from "@components";
import { Message, Favourite, Girl, DJ, DJ1, DJ2 } from "@assets";
import { styles } from "./indexCss";
import { BlackMenubar, Scanner } from "@svg";
import { Avatar } from "react-native-elements";
import ImagePicker from "react-native-image-crop-picker";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import Spinner from "react-native-loading-spinner-overlay";
import { pickDocument } from "@hooks";
import { fetchGet, postData } from "../../../FetchServices";
import { UserContext } from "../../../context/profiledataProvider";
import MobxStore from '../../../mobx';
import Drawer from '../../Drawer/UserCustomDrawer';
import QRcode from "../../Views/QRcode";
import LinearGradient from 'react-native-linear-gradient';
import {
  WhitePerson
  , UploadBlue,
  InstaNew,
  GreyCross,
  FavouriteMusic,
  Spotify,
  Insta,
  Twitter,
  Tiktok,
  Linkedin,
  Snapchat
} from "@svg";
import { BlackPerson } from "../../../assets/Svg";
import { PartyService } from '../../../app/services';
import CreateInvitation from '../../../Screens/BounceVendors/PlanParty/CreateInvitation'
import { observer } from 'mobx-react';
import axios from "axios";
import { FONTSIZE, getHp, getWp } from '@utils'
import { Scaffold } from '@components'
import { Toast } from '@constants';
import HostProfile from "../HostProfile/HostProfile";
import Right from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Entypo'


const ACCOUNTS = [
  {
    id: "0",
    icon: Girl,
    messageName: "Favourite",
  },
  {
    id: "1",
    icon: Girl,
    messageName: "Message",
  },
];

const DATA = [{
  eventTitle: "Rich Little - Live in Las Vegas",
  name: 'Laugh Factory',
  icon: Girl,
  time: "Dec 31, 8:00 PM",
},
{
  eventTitle: "Rich Little - Live in Las Vegas",
  name: 'Laugh Factory',
  icon: Girl,
  time: "Dec 31, 8:00 PM",
}
]

const STATIC_DATA = ["Create an event page", "Invite friends", "Hire vendors", "Promote your event"]

function UserFriendsProfile(props) {
  // const { loader, userinfo, fetchProfile } = useContext(UserContext);
  const {
    authStore
  } = MobxStore;
  const { navigation } = props;
  const userinfo = authStore.userProfile;
  const [showDrawer, setShowDrawer] = useState(false);
  const [getMedia, setMedia] = useState(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const imageArray = [DJ, DJ1, DJ2];
  const [state, setState] = useState(0);
  const [getSpotify, setSpotifyData] = useState([])

  console.log("PROPS", props);

  //Social media states
  const [snapchat, setSnapchat] = useState(null)
  const [instagram, setInstagram] = useState(null)
  const [picture, setPicture] = useState(null)
  const [footer, openFooter] = useState(false)
  const [twitter, setTwitter] = useState('')
  const [tiktok, setTiktok] = useState('')
  //Social media states end

  // const { body = {} } = props.route.params;
  // const { user = {} } = useSelector(
  //   (state) => state.mainExpenseByCategory.userProfileData
  // );
  const {
    username,
    fullName,
    city,
    snapchatUsername,
    instagramUsername,
    about,
    profileImage = {},
  } = userinfo?.user;
  console.log("userinfo", userinfo)

  useEffect(() => {

    PartyService.getParty();
  }, []);
  const handleCarousel = (value) => {
    return (
      <ImageCarousel
        imageArray={imageArray}
        onSnapToItem={(index) => setState(index)}
        state={state}
        value={value}
        pagination={value == "Friends" ? false : true}
      />
    );
  };

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  const fetchProfile = async () => {
    const SERVER_RESPONSE = await postData()
    console.log("Spotify_all_playlist", SERVER_RESPONSE);
    setSpotifyData(SERVER_RESPONSE)
  };

  const handleImage = async () => {
    {
      vendorType !== "Bartender" &&
        vendorType !== "Catering" &&
        vendorType !== "Event Rentals"
        ? ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          multiple: true,
        }).then((images) => {
          setMedia(
            images.map((i) => {
              return i.path;
            })
          );
        })
        : pickDocument();
    }
  };

  const RenderSpotify = ({ items }) => {
    console.log("PROPS OF SPOTIFY", items.track)
    return (
      <View style={{ marginRight: 10, flexDirection: 'row', marginVertical: 10, paddingVertical: 10, flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: items.track.album.images[0].url }} style={{ borderRadius: 7, width: 150, height: 150, margin: 2 }} />

          <Text style={[styles.textImage, { marginVertical: 5, paddingBottom: 0, fontSize: FONTSIZE.Text16, fontFamily: 'AvenirNext-Medium' }]}>{items.track.name}</Text>

          <Text style={[styles.textImage, { marginVertical: 5, paddingBottom: 0, fontSize: FONTSIZE.Text13 }]}>{items.track.artists[0].name}</Text>

          <Text style={[styles.textImage, { color: '#696969', paddingBottom: 0, fontSize: FONTSIZE.Text12 }]}>{items.track.album.album_type}</Text>
        </View>
      </View>
    )
  }

  return (<Scaffold
    contentContainerStyle={{}}
    statusBarStyle={{ backgroundColor: '#FFFFFF' }}
  >
    <View style={styles.container}>

      <ScrollView keyboardShouldPersistTaps={"always"} style={{marginBottom: 60}}>
        <Spinner visible={loader} color={"#1FAEF7"} />
        {!loader && (
          <>
            <Header
              leftDropdown={
                username !== null ? `@${username !== null ? username : ""}` : ""
              }
              scanner={<Scanner height={25} width={25} />}
              share={<BlackMenubar height={25} width={25} />}
              onPressScanner={() => props.navigation.navigate(QRcode.routeName)}
              onPress={() => {
                // console.log("TEST - ", authStore.isVendor);
                // return false;
                props.navigation.openDrawer()
              }}
              headerBackColor={{ backgroundColor: "#FFFFFF" }}
            />
            <View style={styles.subContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 5,
                }}
              >
                <Avatar
                  source={{ uri: `${profileImage?.filePath}` }}
                  size="large"
                  rounded
                />

                <View style={{ paddingLeft: 15 }}>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: FONTSIZE.Text20,
                      fontFamily: "AvenirNext-Regular",
                      marginBottom: getHp(5)
                    }}
                  >
                    {fullName}
                  </Text>

                  <View style={styles.flex}>
                    <Text style={styles.cityAll}>
                      {'19'}
                    </Text>
                    <View style={styles.dot} />
                    <Text style={styles.cityAll}>
                      {city}
                    </Text>
                    <View style={styles.dot} />
                    <TouchableOpacity
                      style={[styles.editButtonStyle, { width: getWp(45), paddingHorizontal: 2 }]}
                      onPress={() => props.navigation.navigate(HostProfile.routeName)}
                    >
                      <Icon name="plus" color={'#1FAEF7'} size={15} />
                      <Text style={[styles.editButton, {
                        marginLeft: 2
                      }]}>
                        {"Job"}
                      </Text>
                    </TouchableOpacity>

                  </View>


                </View>
              </View>

              <View style={[styles.flex, { width: "90%", marginVertical: 10, justifyContent: 'space-between' }]}>
                <TouchableOpacity
                  style={[styles.editButtonStyle]}
                  onPress={() => props.navigation.navigate(HostProfile.routeName)}
                >
                  <Text style={styles.editButton}>{"Edit Profile"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `https://www.instagram.com/${instagramUsername}`
                    )
                  }
                >
                  <Insta height={30} width={30} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(`https://twitter.com/narendramodi`)
                  }
                >
                  <Twitter height={30} width={30} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `https://www.snapchat.com/add/${snapchatUsername}`
                    )
                  }
                >
                  <Snapchat height={30} width={30} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(`https://www.tiktok.com/@davidwarner31`)
                  }
                >
                  <Tiktok height={30} width={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(`https://www.tiktok.com/@davidwarner31`)
                  }
                >
                  <Linkedin height={32} width={32} />
                </TouchableOpacity>
              </View>

              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#16B0FE', '#3FBEFF']}
                style={[
                  styles.linearGradient,
                  { marginVertical: 20, width: '100%', height: getHp(38), borderRadius: 13 },
                ]}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                  <Text style={[styles.buttonText, { marginRight: 15 }]}>{'Things to do with Friends'}</Text>
                  <Right name="angle-right" color='#FFFFFF' size={25} />
                </TouchableOpacity>
              </LinearGradient>


              <TextInput
                multiline
                numberOfLines={5}
                placeholder="I like to party..."
                textAlignVertical="top"
                style={styles.Textarea}
                placeholderTextColor='#999999'
              />

              {/* <Tabview
                {...props}
              /> */}
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#69CCFF', '#8CDDFF']}
                style={[
                  styles.linearGradient
                ]}>
                <TouchableOpacity style={{ flexDirection: "row" }}
                  onPress={() => props.navigation.navigate(CreateInvitation.routeName)}>
                  <WhitePerson height={27} width={19} />
                  <Text style={[styles.textStyle, { marginLeft: 20, fontFamily: 'AvenirNext-Medium', color: '#FFFFFF' }]}>
                    {'Add Friend'}</Text>
                </TouchableOpacity>
              </LinearGradient>

              <View style={{ backgroundColor: '#EEEEEE', height: 1, marginVertical: 10 }} />

              {/* Social Media Section Start */}
              {/* 1st */}
              {/* <View style={styles.flex}>
                <TouchableOpacity style={styles.socialButton}>
                  <View style={styles.flex}>
                    <Insta height={30} width={30} />
                    <TextInput
                      placeholder={`Instagram `}
                      placeholderTextColor={'#000'}
                      // value={instagram == null ? user.instagramUsername : instagram}
                      onChangeText={(value) => setInstagram(value)}
                      style={[styles.headerTitle, { marginLeft: 10, fontWeight: 'bold' }]}
                    />
                  </View>
                  <Text style={[styles.headerTitle, { color: '#1FAEF7', }]}>{"Connect"}</Text>
                </TouchableOpacity>
                <GreyCross height={15} width={15} style={{ marginLeft: 20 }} />
              </View> */}

              {/* 2nd */}
              {/* <View style={styles.flex}>
                <TouchableOpacity style={styles.socialButton}>
                  <View style={styles.flex}>
                    <Spotify height={30} width={30} />
                    <Text style={[styles.headerTitle, { fontWeight: 'bold', marginLeft: 10 }]}>{"Spotify"}</Text>
                  </View>
                  <Text style={[styles.headerTitle, { color: '#1FAEF7', }]}>{"Connect"}</Text>
                </TouchableOpacity>
                <GreyCross height={15} width={15} style={{ marginLeft: 20 }} />
              </View> */}


              {/* 3rd */}
              {/* <View style={[styles.flex, { marginTop: 15 }]}>
                <TouchableOpacity style={[styles.socialButton, {
                  borderWidth: 1,
                  borderColor: '#DDDDDD',
                  elevation: 0
                }]}>
                  <View style={styles.flex}>
                    <Twitter height={30} width={30} />
                    <TextInput
                      placeholder={`@twitter`}
                      placeholderTextColor={'#999999'}
                      onChangeText={(value) => setTwitter(value)}
                      style={[styles.headerTitle, styles.Tiktok]}
                      value={twitter}
                    />
                  </View>
                </TouchableOpacity>
                <GreyCross height={15} width={15} style={{ marginLeft: 20 }} />
              </View> */}

              {/* 4th */}
              {/* <View style={styles.flex}>
                <TouchableOpacity style={[styles.socialButton, {
                  borderWidth: 1,
                  borderColor: '#DDDDDD',
                  elevation: 0
                }]}>
                  <View style={styles.flex}>
                    <Tiktok height={30} width={30} />
                    <TextInput
                      placeholder={`@tiktok`}
                      placeholderTextColor={'#999999'}
                      onChangeText={(value) => setTiktok(value)}
                      style={[styles.headerTitle, styles.Tiktok]}
                      value={tiktok}
                    />
                  </View>
                </TouchableOpacity>
                <GreyCross height={15} width={15} style={{ marginLeft: 20 }} />
              </View> */}

              {/* 5th */}
              {/* <View style={styles.flex}>
                <TouchableOpacity style={[styles.socialButton, {
                  borderWidth: 1,
                  borderColor: '#DDDDDD',
                  elevation: 0
                }]}>
                  <View style={styles.flex}>
                    <Snapchat height={30} width={30} />
                    <TextInput
                      placeholder={`@snapchat`}
                      placeholderTextColor={'#999999'}

                      onChangeText={(value) => setSnapchat(value)}
                      style={[styles.headerTitle, styles.Tiktok]}
                    // value={snapchat == null ? user.snapchatUsername : snapchat}
                    />
                  </View>
                </TouchableOpacity>
                <GreyCross height={15} width={15} style={{ marginLeft: 20 }} />
              </View> */}
              {/* Social Media Section */}

              {/* <View style={{ height: 1, backgroundColor: '#EEEEEE', marginVertical: 10 }} /> */}
              {/* First Gallery Block of Friends */}
              <View style={{ marginVertical: 5, paddingVertical: 10 }}>
                <View style={[styles.flex]}>
                  <BlackPerson height={20} width={14} />
                  <Text style={[styles.InstaText]}> {"Friends "}
                  <Text style={[styles.InstaText, {color: '#696969'}]}>{" 240"}</Text>
                  </Text>
                </View>
                {handleCarousel("Friends")}
                <TouchableOpacity style={styles.allFrnds}>
                  <Text style={[styles.aboutText]}>
                    {"See All Friends"}
                  </Text>
                </TouchableOpacity>
              </View>
              {/*END*** First Gallery Block of Friends */}


            </View>
            <View style={{
              height: 1, backgroundColor: '#EEEEEE', marginTop: 10,
              marginBottom: 25
            }} />

            {/*Start*** Second Gallery Block of Friends */}
            <View style={[styles.flex, {
              margin: 10,
            }]}>
              <InstaNew height={20} width={14} />
              <Text style={styles.InstaText} >
                {"Instagram"}
              </Text>
            </View>
            {handleCarousel("Instagram")}
            {/*END*** Second Gallery Block of Friends */}

            <View style={[styles.flex, {
              margin: 10,
            }]}>
              <FavouriteMusic height={17} width={10} />
              <Text style={styles.InstaText} >
                {"Favourite Music"}
              </Text>
            </View>
            <View>

              {/* <ScrollView horizontal >
                  {getSpotify.length == 0 ?
                    null :
                    getSpotify.items.map((items) => {
                      // console.log("THIS IS SINGLE ITEM:", items)
                      return <RenderSpotify items={items} />
                    })
                  }
                </ScrollView> */}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  </Scaffold>
  );
}
UserFriendsProfile.routeName = "/UserFriendsProfile";


export default observer(UserFriendsProfile)