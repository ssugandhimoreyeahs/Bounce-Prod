import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
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
import { Insta, Twitter, Tiktok, Snapchat } from "@svg";
import { styles } from "./indexCss";
import { BlackMenubar, Scanner } from "@svg";
import { Avatar } from "react-native-elements";
import ImagePicker from "react-native-image-crop-picker";
import { FONTSIZE } from "@utils";
import { connect, useSelector, useDispatch } from "react-redux";
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import Spinner from "react-native-loading-spinner-overlay";
import { pickDocument } from "@hooks";
import { fetchGet, postData } from "../../../FetchServices";
import { UserContext } from "../../../context/profiledataProvider";
import MobxStore from '../../../mobx';
import Drawer from '../../Drawer/UserCustomDrawer';
import QRcode from "../../Views/QRcode";



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

export default function UserFriendsProfile(props) {
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
  console.log("PROPS", props);
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
  // }, [props]);

  //   const fetchProfile = async () => {
  //     setLoader(true);
  //     // let token = "Bearer " + AccessToken
  //     console.log("body", body);
  //     let SERVER_RESPONSE = await postData("user/userlogin", body);
  //     console.log("ORIGINL_USER_RES", SERVER_RESPONSE);
  //     // console.log("USER_SERVER_RESPONSE", JSON.stringify(SERVER_RESPONSE));
  //     if (!(SERVER_RESPONSE.statusCode == 401)) {
  //       dispatch(fetchVendorData(["USER_PROFILE_DATA", SERVER_RESPONSE]));
  //       setLoader(false);
  //     }
  //     setLoader(false);
  //   };

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

  return (
    <View style={styles.container}>

      <ScrollView keyboardShouldPersistTaps={"always"}>
        <Spinner visible={loader} color={"#1FAEF7"} />
        {!loader && (
          <>
            <Header
              ACCOUNTS={ACCOUNTS}
              leftDropdown={
                username !== null ? `@${username !== null ? username : ""}` : ""
              }
              DropdownAccounts={DATA}
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
                      fontFamily: "AvenirNext",
                    }}
                  >
                    {fullName}
                  </Text>
                  <Text
                    style={{
                      color: "#696969",
                      fontSize: FONTSIZE.Text14,
                      fontFamily: "AvenirNext",
                    }}
                  >
                    {city}
                  </Text>
                </View>
              </View>

              <View style={[styles.flex, { width: "70%", marginVertical: 10 }]}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => navigation.navigate("HostProfile")}
                >
                  <Text style={styles.editButton}>{"Edit Profile"}</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
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
                </TouchableOpacity> */}
              </View>

              <TextInput
                multiline
                numberOfLines={5}
                placeholder="I like to party..."
                textAlignVertical="top"
                style={styles.Textarea}
                placeholderTextColor='#999999'
              />

              <Tabview
                DATA={DATA}
              />

              <View style={{ marginVertical: 10 }}>
                <Text style={styles.aboutText}>{about}</Text>
              </View>

              <Text
                style={[
                  styles.InstaText,
                  {
                    marginTop: 10,
                    marginBottom: 5,
                  },
                ]}
              >
                {"Instagram"}
              </Text>
              {handleCarousel("Instagram")}

              <Text style={styles.InstaText}>{"Friends"}</Text>
              <Text
                style={[
                  styles.InstaText,
                  { color: "#696969", fontSize: FONTSIZE.Text16 },
                ]}
              >
                {"240 (8 mutual)"}
              </Text>
              {handleCarousel("Friends")}

              <TouchableOpacity style={styles.allFrnds}>
                <Text style={[styles.aboutText, { fontWeight: "bold" }]}>
                  {"All Friends"}
                </Text>
              </TouchableOpacity>

              <View>
                <Text style={styles.InstaText}>{"Favorite Music"}</Text>
                {handleCarousel("Music")}
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <Footer buttonStack={DATA} />
    </View>
  );
}
UserFriendsProfile.routeName = "/UserFriendsProfile";

