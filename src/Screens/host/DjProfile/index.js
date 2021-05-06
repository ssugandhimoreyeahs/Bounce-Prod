import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  Linking,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import {
  Header,
  ImageCarousel,
  IconTitle,
  ReviewCard,
  Footer,
  CustomText,
} from "@components";
import { Girl } from "@assets";
import { styles as PageStyle } from "./indexCss";
import {
  AddBlueWhite,
  AddBlue,
  DollarOnlyWhite,
  Webpin,
  BlackMenubar,
  Certified,
  Armed,
  Multilingual,
  Services,
  Cuisines,
  Equipments,
  Pdf,
} from "@svg";
import Ratings from "../../../components/RatingStar/Ratings";
import { Avatar } from "react-native-elements";
import ImagePicker from "react-native-image-crop-picker";
import { FONTSIZE, getHp, getWp } from "@utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchVendorData } from "../../../reducer/mainexpensecategory";
import Spinner from "react-native-loading-spinner-overlay";
import { pickDocument } from "@hooks";
import { postData } from "../../../FetchServices";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../../../context/profiledataProvider";
import DocumentPicker from 'react-native-document-picker';
import MobxStore from '../../../mobx';
import { observer } from "mobx-react";

const DATA = [
  {
    id: "0",
    icon: Girl,
    messageName: "Lindas",
  },
  {
    id: "1",
    icon: Girl,
    messageName: "Fernandez",
  },
];
var imgTemp = [];
function DjProfile(props) {
  let loader = false;
  const { authStore: {
    userProfile,
    async: authStoreAsync
  },
    uiStore
  } = MobxStore;
  let styles = PageStyle(uiStore.theme);
  const [getState, setState] = useState(0);
  const [getPRState, setPRState] = useState(0);
  const [getMedia, setMedia] = useState(null);
  const [getPdf, setPdf] = useState(null);
  const dispatch = useDispatch();
  const token = userProfile?.token;


  useEffect(() => {
  }, []);


  if (userProfile?.user == undefined) {
    return null;
  }
  const {
    about,
    fullName,
    city,
    language,
    username,
    vendor = {},
    vendorCategoryName = {},
    profileImage,
    menu,
    gallery,
  } = userProfile?.user; 

  const {
    equipment,
    cuisines,
    services,
    armed,
    website,
    genres = {},
    guardCertification,
    hourlyRate,
    inventory
  } = vendor; 


  const handleCarousel = () => {
    return (
      <ImageCarousel
        onPress={handleImage}
        pagination
        imageArray={gallery.length == 0 ? [] : gallery}
        onSnapToItem={(index) => setState(index)}
        state={getState}
      />
    );
  };
  const PRhandleCarousel = () => {
    return <ImageCarousel
      onPress={onlyPartyRentalImage}
      imageBottomLeftText
      imageBottomRightRate
      pagination
      imageArray={inventory.length == 0 ? [] : inventory}
      onSnapToItem={(index) => setPRState(index)}
      state={getPRState}
    />
  }
  const onlyPartyRentalImage = async () => {

    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      let len = 1;
      let propsImages = [];
      res.map((i) => {
        let selectedImage = {
          id: Date.now() + len,
          uploaded: false,
          itemImage: i.uri,
          itemName: "",
          itemCost: "",
          fromPrevious: true,
        };
        propsImages.push(selectedImage);
        len++;
      });
      props.navigation.navigate('UploadInventory', {
        editMode: false,
        propsImages
      })
    } catch (error) {
      console.log('ERROR - ', error);

    }
    return;
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      multiple: true
    }).then(image => {
      console.log("IMAGES", image)

      props.navigation.navigate('UploadInventory', {
        image
      })
    })
  }
   
  const handleImagesArray = async (images) => { 
    let milliseconds = new Date().getTime();
    let formData = new FormData();
    images.forEach((item) => {
      formData.append("galleryFiles", {
        uri: item.path,
        type: "image/jpeg",
        name: `image-${milliseconds}.jpg`,
      });
    });
    // console.log("INSIDE before api call");
    const RES_IMAGE = await axios.post(
      "http://3.12.168.164:3000/vendor/addmedia",
      formData,
      {
        headers: {
          Authorization: "Bearer " + `${token}`,
        },
      }
    );
    // console.log("RES_IMAGE", RES_IMAGE);
    await authStoreAsync.fetchProfile();
    let strrr = await RES_IMAGE.data;
    await strrr.map((item) => {
      imgTemp.push(item.data.filePath);
    });

    // console.log("imgTemp", imgTemp);
    setMedia(imgTemp);
    if (RES_IMAGE.status == 201 || RES_IMAGE.status == 200) {
      ToastAndroid.show("Media Added Successfully!", ToastAndroid.SHORT);

    }
  };
  // Handle Image not working after the UI change
  // Also check the ImageCarousel.js file in correspondance

  const handleImage = async () => {
    // console.log("called handle images");
    {
      vendorCategoryName !== "Bartenders" &&
        vendorCategoryName !== "Catering" &&
        vendorCategoryName !== "Event Rentals"
        ? ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
          multiple: true,
        }).then((images) => {
          // console.log("REACHED IMAGES PICKING")
          handleImagesArray(images);
        })
        : pickDocument().then(async (res) => {
          // console.log("RESPONSE PDF", res);
          let milliseconds = new Date().getTime();
          let formData = new FormData();
          let imgObj = {
            uri: `${res.fileCopyUri}`,
            type: "application/pdf",
            name: `pdf-${milliseconds}.pdf`,
          };
          console.log("TOKEN", token);
          formData.append("pdf", imgObj); //Set method
          axios
            .post("http://3.12.168.164:3000/menu/addmenu", formData, {
              headers: {
                Authorization: "bearer " + `${token}`,
              },
            }).then(async (SERVER_PDF) => {
              console.log("SERVER_PDF", SERVER_PDF.data.userData.menu.filePath);
              await authStoreAsync.fetchProfile();
              setPdf(SERVER_PDF.data.userData.menu.filePath);
            });
        });
    }
  };

  const handleUploadPdf = async () => {
    // console.log(menu?.filePath)
    if (menu != null) {
      Linking.openURL(menu?.filePath);
    } else {
      Linking.openURL(getPdf);
    }
  };

 

  return (
    <View style={styles.container}>
      <Spinner visible={loader} color={"#1FAEF7"} />
      {!loader && (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>

            <Header
              leftDropdown={
                username !== null ? `@${username !== null ? username : ""}` : ""
              }
              DropdownAccounts={DATA}
              share={<BlackMenubar height={25} width={25} />}
              onPress={() => props.navigation.openDrawer()}
              HeaderBackColor={{ backgroundColor: "rgba(238, 238, 238, 0.5)" }}
            />

            <View style={styles.subContainer}>
              <View style={{ paddingHorizontal: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 5,

                  }}
                >
                  {profileImage != null ? (
                    <Avatar
                      source={{ uri: `${profileImage.filePath}` }}
                      size={getHp(80)}
                      rounded
                    />
                  ) : null}

                  <View style={{
                    paddingLeft: 15, minWidth: '55%',
                    maxWidth: '65%',
                  }}>
                    {fullName !== null ? (
                      <Text style={[styles.fullName, { marginBottom: 4 }]}>
                        {fullName}
                      </Text>
                    ) : null}
                    {city !== null ? (
                      <Text
                        style={[
                          styles.fullName,
                          {
                            color: uiStore.theme.colors.primaryText1,
                            fontSize: FONTSIZE.Text14,
                            marginTop: 4,
                          },
                        ]}
                      >
                        {city}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <View style={{ flexDirection: "row", marginVertical: 15 }}>
                  <Ratings rating={"N/A"} />

                  {hourlyRate != null && vendorCategoryName !== "Event Rentals" ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: 15,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#00E08F",
                          borderRadius: 5,
                          padding: 2,
                        }}
                      >
                        <DollarOnlyWhite height={18} width={18} />
                      </View>
                      {vendorCategoryName == "DJ" ? (
                        <>
                          <Text style={styles.hourStyle}>
                            {hourlyRate} / hour
                        </Text>

                          <Text
                            style={[
                              styles.hourStyle,
                              { color: "#696969", fontSize: FONTSIZE.Text14 },
                            ]}
                          >
                            {" "}
                          (Base Package)
                        </Text>
                        </>
                      ) : vendorCategoryName == "Catering" ? (
                        <>
                          <Text style={styles.hourStyle}>
                            {hourlyRate} / guest
                        </Text>

                          <Text
                            style={[
                              styles.hourStyle,
                              { color: "#696969", fontSize: FONTSIZE.Text14 },
                            ]}
                          >
                            {" "}
                          (Base Package)
                        </Text>
                        </>
                      ) : (
                            <Text style={styles.hourStyle}>{hourlyRate} / hour</Text>
                          )}
                    </View>
                  ) : null}
                </View>

                {website != null ? (
                  <View style={styles.websiteView}>
                    <Webpin height={getHp(21)} width={getWp(23)} />
                    <Text
                      onPress={() => Linking.openURL(`https://${website}`)}
                      style={styles.webText}
                    >
                      {website}
                    </Text>
                  </View>
                ) : null}

                {about != null ? (
                  <CustomText
                    TextData={about}
                    styleProp={{ color: "#000", fontSize: FONTSIZE.Text18, marginVertical: getHp(30) }}
                  />
                ) : null}


              </View>
              {/* View Inventory Add Media Extra button START */}

              {!(inventory.length == 0 || inventory == null) && vendorCategoryName == 'Event Rentals' ?
                <>
                  <View style={styles.prView}>
                    <Text style={[styles.mediaText, { fontSize: FONTSIZE.Text24, color: '#000' }]}>{"Media"}</Text>
                    {/* <TouchableOpacity onPress={onlyPartyRentalImage} >
                      <View style={styles.onlyFlex}>
                        <AddBlueWhite height={20} width={20} />
                        <Text style={styles.addButton}>{"Add"}</Text>
                      </View>
                    </TouchableOpacity> */}
                  </View>
                  {
                    !(inventory.length == 0 || inventory == null) ? PRhandleCarousel() : null
                  }
                </>
                :
                <>
                  {(inventory.length == 0 || inventory == null) && vendorCategoryName == 'Event Rentals' &&
                    <View>
                      <TouchableOpacity onPress={onlyPartyRentalImage} style={styles.addMediaButton} >
                        <View style={styles.onlyFlex}>
                          <AddBlue height={20} width={20} />
                          <Text style={[styles.mediaText, { marginLeft: 10, fontWeight: 'bold', marginVertical: 10 }]}> {'Add Media'} </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  }
                </>

              }
              {/* View Inventory Add Media Extra button FINISH */}


              {!(userProfile?.user?.gallery == null ||
                userProfile?.user?.gallery.length == 0) &&
                (vendorCategoryName != 'Event Rentals') ?
                <>
                  <View style={styles.prView}>
                    <Text style={[styles.mediaText, { fontSize: FONTSIZE.Text24, color: '#000' }]}>{"Media"}</Text>
                    {/* <TouchableOpacity onPress={handleImage} >
                      <View style={styles.onlyFlex}>
                        <AddBlueWhite height={20} width={20} />
                        <Text style={[styles.addButton, { marginLeft: 10 }]}>{"Add"}</Text>
                      </View>
                    </TouchableOpacity> */}
                  </View>
                  {
                    !(userProfile?.user?.gallery == null ||
                      userProfile?.user?.gallery.length == 0) &&
                      (vendorCategoryName != 'Event Rentals') ? handleCarousel() : null
                  }
                </>
                :
                <View>
                  {(userProfile?.user?.gallery == null ||
                    userProfile?.user?.gallery.length == 0) &&
                    (vendorCategoryName != 'Event Rentals') ?
                    (<TouchableOpacity onPress={() => {
                      // console.log('TEST - ', uiStore.theme.serialize());
                      // return;
                      handleImage();
                    }} style={styles.addMediaButton} >
                      <View style={styles.onlyFlex}>
                        <AddBlue height={20} width={20} />
                        <Text style={[styles.mediaText, { fontWeight: 'bold', marginVertical: 10 }]}> {'Add Media'} </Text>
                      </View>
                    </TouchableOpacity>)
                    :
                    null
                  }
                </View>
              }
              {/* {
                !(gallery == null) ? handleCarousel() : null
              } */}


              {/* pdf section */}
              {
                <>
                  {
                    (vendorCategoryName == 'Bartenders' ||
                      vendorCategoryName == 'Catering' ||
                      vendorCategoryName == 'Event Rentals') &&
                      // (getPdf != null || getPdf.length != 0) ||
                      (menu != null) ?
                      <>
                        <TouchableOpacity onPress={handleUploadPdf} style={[styles.addMediaButton]} >
                          <Text style={[styles.mediaText, { color: '#1FAEF7', fontSize: FONTSIZE.Text20, fontWeight: 'bold' }]}>
                            {vendorCategoryName == 'Event Rentals' ? 'View All Inventory' :
                              'View Menu'}

                          </Text>
                        </TouchableOpacity>

                      </>
                      :
                      (vendorCategoryName == 'Bartenders' ||
                        vendorCategoryName == 'Catering' ||
                        vendorCategoryName == 'Event Rentals') &&
                        // (getPdf != null || getPdf.length != 0) ||
                        (menu == null) ?
                        <TouchableOpacity onPress={handleImage} style={[styles.addMediaButton]} >
                          <Text style={[styles.mediaText, { color: '#1FAEF7', fontSize: FONTSIZE.Text20, fontWeight: 'bold' }]}>
                            {vendorCategoryName == 'Event Rentals' ? 'Upload Inventory' :
                              'Upload Menu'}
                          </Text>
                        </TouchableOpacity>
                        : null

                  }
                </>
              }
            </View>




            <View style={{ paddingVertical: 0 }}>
              <IconTitle
                textStyle={styles.belowTextStyle}
                text={
                  vendorCategoryName == "Security" ? (
                    <>
                      {guardCertification.map((item) => {
                        return `${item.label}, `;
                      })}
                    </>
                  ) : vendorCategoryName == "DJ" ? (
                    <>
                      {genres.map((item) => {
                        return `${item.label}, `;
                      })}
                    </>
                  ) : vendorCategoryName == "Catering" ? (
                    cuisines
                  ) : null
                }
                icon={
                  vendorCategoryName == "Security" ? (
                    <Certified height={60} width={60} />
                  ) : vendorCategoryName == "DJ" ? (
                    <Certified height={60} width={60} />
                  ) : vendorCategoryName == "Catering" ? (
                    <Cuisines height={60} width={60} />
                  ) : (
                          <Services height={60} width={60} />
                        )
                }
                iconBelowText={
                  vendorCategoryName == "Security"
                    ? "Certified"
                    : vendorCategoryName == "DJ"
                      ? "Genres"
                      : vendorCategoryName == "Catering"
                        ? "Cuisines"
                        : "Services"
                }
              />

              <IconTitle
                textStyle={styles.belowTextStyle}
                text={
                  vendorCategoryName == "Security"
                    ? armed
                    : vendorCategoryName == "DJ"
                      ? equipment
                      : vendorCategoryName == "Catering"
                        ? services
                        : services
                }
                icon={
                  vendorCategoryName == "Security" ? (
                    <Armed height={50} width={50} />
                  ) : vendorCategoryName == "DJ" ? (
                    <Equipments height={60} width={60} />
                  ) : vendorCategoryName == "Catering" ? (
                    <Services height={48} width={48} />
                  ) : (
                          <Services height={48} width={48} />
                        )
                }
                iconBelowText={
                  vendorCategoryName == "Security"
                    ? "Armed"
                    : vendorCategoryName == "DJ"
                      ? "Equipment"
                      : vendorCategoryName == "Catering"
                        ? "Services"
                        : "Services"
                }
              />
              {language == null ||
                (userProfile?.user?.language?.length == 1 &&
                  userProfile?.user?.language[0].label === "English") ? null : (
                  <IconTitle
                    textStyle={styles.belowTextStyle}
                    text={
                      language != null ? (
                        <>
                          {language.map((item) => {
                            return `${item.label}, `;
                          })}
                        </>
                      ) : null
                    }
                    icon={<Multilingual height={60} width={60} />}
                    iconBelowText={"Multilingual"}
                  />
                )}
            </View>
            {/* <View style={{ position: 'absolute', bottom: 0, width: '100%' }}> */}
            <ReviewCard styleProp={{ backgroundColor: "#f0efed" }} />
            {/* </View> */}

          </View>
        </ScrollView>
      )}
    </View>
  );
}
{
  /* <Footer buttonStack={DATA} /> */
}

export default observer(DjProfile);