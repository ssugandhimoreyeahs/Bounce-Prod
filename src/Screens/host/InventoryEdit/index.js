// import React, { useState, useEffect, useRef, useContext } from 'react'
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
// import { Header, Root, GooglePlacesInput, CustomDropdown, CustomButton, FloatingInput } from '@components'
// import { Avatar } from 'react-native-elements'
// import { UploadBlue, BlackCircleCross } from '@svg';
// import ImagePicker from 'react-native-image-crop-picker';
// import { FONTSIZE, getHp, getWp } from '@utils'
// import { useSelector, useDispatch } from "react-redux";

// import { Alert } from 'react-native';
// import axios from "axios";
// import CustomTextinput from '../../../components/CustomTextinput';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { UserContext } from '../../../context/profiledataProvider';



// export default function DJSignup(props) {
//     const { userinfo, fetchProfile } = useContext(UserContext);
//     const {
//         languageReduxObject,
//         genreReduxObject,
//         certificationReduxObject,
//         originalLangObject,
//         originalGenreObject,
//         originalCertiObject
//     } = useSelector((state) => state.currentStateData);

//     const scrollRef = useRef();
//     const { vendorType } = useSelector((state) => state.mainExpenseByCategory);
//     // const { token = {}, user = {} } = useSelector((state) => state.mainExpenseByCategory.vendorProfileData);
//     const dispatch = useDispatch()

//     const token = userinfo?.token
//     const user = userinfo?.user

//     const { vendorCategoryName } = user
//     const [business, setBusiness] = useState(null)
//     const [email, setEmail] = useState(null)
//     const [phone, setPhone] = useState(null)
//     const [picture, setPicture] = useState(null)
//     const [loader, setLoader] = useState(false)

//     const [city, setCity] = useState(null)
//     const [price, setPrice] = useState(null)
//     const [description, setDescription] = useState(null)
//     const [equipment, setEquipment] = useState(null)
//     const [website, setWebsite] = useState(null)
//     const [services, setServices] = useState(null)
//     const [cuisines, setCuisines] = useState(null)
//     const [armed, setArmed] = useState(null)
//     const [footer, openFooter] = useState(false)

//     const [language, setLanguage] = useState({ lang: [] })
//     const [genre, setGenre] = useState({ countries: [] })
//     const [certification, setCertification] = useState({ certi: [] })

//     let temp = []
//     let genretemp = []
//     let guardtemp = []

//     const handleImage = () => {
//         ImagePicker.openPicker({
//             width: 300,
//             height: 300,
//             cropping: true
//         }).then(image => {
//             // console.log(image);
//             setPicture(image.path)
//         });
//     }
//     const ImageFooter = () => {
//         return (
//             <TouchableOpacity onPress={() => setPicture(null)} style={styles.crossButton}>
//                 <BlackCircleCross height={30} width={30} />
//             </TouchableOpacity>
//         )
//     }
//     useEffect(() => {
//         handleFiller()
//         fetchData()
//     }, [])

//     const fetchData = async () => {
//         setBusiness(user.fullName)
//         setEmail(user.email)
//         setPhone(user.phoneNumber)
//         setCity(user.city)
//         setPrice(user.vendor.hourlyRate)
//         setDescription(user.about)
//         setEquipment(user.vendor.equipment)
//         setWebsite(user.vendor.website)
//         setServices(user.vendor.services)
//         setCuisines(user.vendor.cuisines)
//         setArmed(user.vendor.armed)

//         setLoader(false)
//     }
//     const handleFiller = async () => {
//         setLoader(true)
//         setPicture(user.profileImage?.filePath != null ? user.profileImage?.filePath : null)
//         let L = []
//         await user.language.map((item) => {
//             L.push(item.id)
//         })
//         setLanguage({ lang: L })


//         let G = []
//         await user.vendor.genres.map((item) => {
//             G.push(item.id)
//         })
//         setGenre({ countries: G })


//         let C = []
//         await user.vendor.guardCertification.map((item) => {
//             C.push(item.id)
//         })
//         setCertification({ certi: C })
//     }




//     const handleSubmit = async () => {
//         setLoader(true)
//         let milliseconds = new Date().getTime();
//         let imgObj = {
//             uri: `${picture}`,
//             type: "image/jpeg",
//             name: `image-${milliseconds}.jpg`,
//         }
//         console.log("THIS IS PRICEE", price);
//         // console.log("languaageeeee", temp);
//         // console.log("genreeeee", genretemp);
//         // console.log("guardCertification", guardtemp);
//         let formData = new FormData()
//         formData.append('email', email)
//         formData.append('phoneNumber', phone)
//         formData.append('fullName', business)
//         formData.append('city', city)
//         formData.append('about', description)
//         formData.append('website', website)
//         formData.append('language', JSON.stringify(temp))
//         formData.append('genres', JSON.stringify(genretemp))
//         formData.append('services', services)
//         formData.append('guardCertification', JSON.stringify(guardtemp))
//         formData.append('armed', armed)
//         formData.append('cuisines', cuisines)
//         formData.append('equipment', equipment)
//         formData.append('profileImageFile', imgObj)
//         formData.append('hourlyRate', price) //only string with limited no.
//         console.log("TOKEN TO DELIVER", token);
//         const venderRegisterResponse = await axios.post('http://3.12.168.164:3000/vendor/updatevendor', formData, {
//             headers: {
//                 'Authorization': 'bearer ' + `${token}`
//             }
//         })
//         console.log("venderRegisterResponse", venderRegisterResponse);
//         let StringifyData = await JSON.stringify(venderRegisterResponse.data)
//         console.log("parsedData", JSON.parse(StringifyData))

//         let ParsedData = await JSON.parse(StringifyData)
//         console.log("ACCESS_TOKEN", ParsedData.accessToken);
//         setLoader(false)

//         if (venderRegisterResponse.status == 201 || venderRegisterResponse.status == 200) {
//             setTimeout(() => {
//                 Alert.alert("Message", "Profile Updated Successfully!", [
//                     {
//                         text: 'Okay',

//                     }
//                 ]);
//                 fetchProfile()
//             }, 200);
//         }
//     }
//     let LangNameArray = []
//     let GenreNameArray = []
//     let CertiNameArray = []

//     const setPacketArray = (argument) => {
//         if (argument == 'Languages') {
//             temp = []
//             language.lang.map((local) => {
//                 originalLangObject.filter((item) => {
//                     // const { name, code, id } = item
//                     if (local == item.id) {
//                         temp.push(item)
//                         LangNameArray.push(` ${item.name}`)
//                     }
//                 })
//             })
//         } else if ((argument == 'Genres')) {
//             genretemp = []
//             genre.countries.map((local) => {
//                 originalGenreObject.filter((item) => {
//                     const { genres, id } = item
//                     if (local == item.id) {
//                         genretemp.push({ genres, id })
//                         GenreNameArray.push(` ${item.genres}`)
//                     }
//                 })
//             })
//         } else if ((argument == 'Certifications')) {
//             guardtemp = []
//             certification.certi.map((local) => {
//                 originalCertiObject.filter((item) => {
//                     const { certification, id } = item
//                     if (local == item.id) {
//                         guardtemp.push({ certification, id })
                      
//                         CertiNameArray.push(` ${item.certification}`)

//                     }
//                     console.log("CertiNameArray",CertiNameArray)
//                 })
//             })
//         }
//     }

//     return (
//         <Root>
//             <Spinner visible={loader} color={'#1FAEF7'} />
//             {!loader &&
//                 <View style={styles.container}>

//                     <ScrollView keyboardShouldPersistTaps='always'
//                         ref={scrollRef} >
//                         <Header
//                             back
//                             headerTitle={"Edit Profile"}
//                             onPress={() => props.navigation.goBack()}
//                         />
//                         <View style={{ paddingHorizontal: 10 }}>

//                             <FloatingInput
//                                 // isFocused
//                                 floatingLabel={"Business Name"}
//                                 onChange={(value) => setBusiness(value)}
//                                 value={business}

//                             />

//                             {picture == null ?
//                                 <TouchableOpacity onPress={handleImage} style={{ padding: 20, marginVertical: getHp(30), justifyContent: 'center', alignItems: 'center' }}>
//                                     <UploadBlue height={getHp(90)} width={getHp(90)} />
//                                     <Text style={{
//                                         fontSize: FONTSIZE.Text19, color: '#000', marginTop: 10, fontFamily: 'AvenirNext-Regular',
//                                     }}>{"Upload Profile Picture"}</Text>
//                                 </TouchableOpacity>
//                                 :
//                                 <>
//                                     <View style={{ marginBottom: getHp(23), justifyContent: 'center', alignItems: 'center' }}>
//                                         <TouchableOpacity onPress={() => openFooter(true)} style={{ marginVertical: 30 }}>
//                                             <Avatar source={{
//                                                 uri: picture,
//                                             }} size={getHp(250)} rounded />
//                                             <View >
//                                                 <UploadBlue height={getHp(80)} width={getWp(80)} style={{ position: 'absolute', bottom: -38, resizeMode: 'contain', alignSelf: 'center' }} />
//                                             </View>
//                                             {footer ?
//                                                 <ImageFooter />
//                                                 : null
//                                             }
//                                         </TouchableOpacity>
//                                     </View>

//                                 </>
//                             }


//                             <FloatingInput
//                                 floatingLabel={"Email"}
//                                 value={email}
//                                 onChange={(value) => setEmail(value)}
//                             />
//                             <FloatingInput
//                                 floatingLabel={"Phone Number"}
//                                 onChange={(value) => setPhone(value)}
//                                 value={phone}
//                             />


//                             <GooglePlacesInput
//                                 floatingLabel={"City"}
//                                 onPress={(data) => {
//                                     setCity(data.description)

//                                 }}
//                                 value={city}
//                             />

//                             <FloatingInput
//                                 floatingLabel={"Starting Price"}
//                                 onChange={(value) => setPrice(value)}
//                                 value={`${price}`}
//                             />
//                             <FloatingInput
//                                 floatingLabel={"Website"}
//                                 onChange={(value) => setWebsite(value)}
//                                 value={website}
//                             />
//                             <CustomTextinput
//                                 text={"Description"}
//                                 multiline
//                                 onChange={(value) => setDescription(value)}
//                                 value={description}
//                             />

//                             {languageReduxObject.length > 0 ?
//                                 <>
//                                     <CustomDropdown
//                                         cb={() => {
//                                             scrollRef.current.scrollToEnd({ animated: true })
//                                         }}
//                                         floatingLabel={"Languages"}
//                                         multiple
//                                         DATA={languageReduxObject}
//                                         showMargin={true}
//                                         onChange={item => setLanguage({ lang: item })
//                                         }
//                                         value={language.lang}
//                                         selectedValues={LangNameArray}
//                                     />
//                                     {language.lang.length > 0 ?
//                                         setPacketArray("Languages")
//                                         : null
//                                     }

//                                 </>
//                                 : null
//                             }

//                             {vendorCategoryName == "DJ" ?
//                                 <>
//                                     {genreReduxObject.length > 0 ?
//                                         <>
//                                             <CustomDropdown
//                                                 cb={() => {
//                                                     scrollRef.current.scrollToEnd({ animated: true })
//                                                 }}
//                                                 floatingLabel={"Genre"}
//                                                 multiple
//                                                 DATA={genreReduxObject}
//                                                 showMargin={true}
//                                                 onChange={item => {
//                                                     // console.log("ANDAR ", item.value);
//                                                     setGenre({ countries: item })
//                                                 }
//                                                 }
//                                                 value={genre.countries}
//                                                 selectedValues={GenreNameArray}
//                                             />
//                                             {genre.countries.length > 0 ?
//                                                 setPacketArray("Genres")
//                                                 : null
//                                             }
//                                         </>
//                                         : null}

//                                     <CustomTextinput
//                                         text={"Equipment"}
//                                         multiline
//                                         onChange={(value) => setEquipment(value)}
//                                         value={equipment}
//                                     />

//                                 </>
//                                 : null}

//                             {vendorCategoryName == "Security" ?
//                                 <>
//                                     {certificationReduxObject.length > 0 ?
//                                         <>
//                                             <CustomDropdown
//                                                 cb={() => {
//                                                     scrollRef.current.scrollToEnd({ animated: true })
//                                                 }}
//                                                 floatingLabel={"Guard certification"}
//                                                 multiple
//                                                 DATA={certificationReduxObject}
//                                                 showMargin={true}
//                                                 onChange={item => setCertification({ certi: item })
//                                                 }
//                                                 value={certification.certi}
//                                                 selectedValues={CertiNameArray}
//                                             />
//                                             {certification.certi.length > 0 ?
//                                                 setPacketArray("Certifications")
//                                                 : null
//                                             }
//                                         </>
//                                         : null}

//                                     <FloatingInput
//                                         floatingLabel={"Armed"}
//                                         onChange={(value) => setArmed(value)}
//                                         value={armed}
//                                     />
//                                 </>
//                                 : null}

//                             {vendorCategoryName == "Catering" ?
//                                 <>
//                                     <FloatingInput
//                                         floatingLabel={"Cuisines"}
//                                         onChange={(value) => setCuisines(value)}
//                                         value={cuisines}
//                                     />
//                                     <FloatingInput
//                                         floatingLabel={"Services"}
//                                         onChange={(value) => setServices(value)}
//                                         value={services}
//                                     />
//                                 </>
//                                 :
//                                 null
//                             }
//                             {vendorCategoryName != "Catering" &&
//                                 vendorCategoryName != "Security" &&
//                                 vendorCategoryName != "DJ" ?
//                                 <>
//                                     <FloatingInput
//                                         floatingLabel={"Services"}

//                                         onChange={(value) => setServices(value)}
//                                         value={services}
//                                     />
//                                 </>
//                                 : null
//                             }
//                             <CustomButton
//                                 complete
//                                 onPress={handleSubmit}
//                                 ButtonTitle={"Update"}
//                             />
//                             <View style={{ marginVertical: 5 }} />
//                         </View>
//                     </ScrollView>
//                 </View>
//             }
//         </Root>
//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#fff',
//     },
//     crossButton: {
//         // elevation: 10,
//         // backgroundColor: '#fff',
//         // borderRadius: 50,
//         // padding: 10,
//         position: 'absolute',
//         right: 0,
//         top: 0
//     },


//     ContainerStyle: {
//         width: '100%',
//         marginVertical: 4,
//     },
//     ButtonStyle: {
//         backgroundColor: '#212121',
//         borderRadius: 10,
//         justifyContent: 'flex-start',
//         paddingLeft: 20
//     },
//     TitleStyle: {
//         fontFamily: 'AvenirNext-Regular',
//         fontSize: 16,
//         paddingVertical: 5
//     },

// })
