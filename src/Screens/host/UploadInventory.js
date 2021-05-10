import React, { useState, useEffect, useContext, Fragment } from "react";
import {
    View,
    Text,
    FlatList,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Header, Root, CustomButton, FloatingInput } from "@components";
import { GreyHamburger, BlackClose } from "@svg";
import DocumentPicker from 'react-native-document-picker';
import { FONTSIZE, getHp, getWp } from "@utils";
import { Avatar } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import { UserContext } from "../../context/profiledataProvider";
import axios from 'axios'
import Spinner from "react-native-loading-spinner-overlay";
import MobxStore from '../../mobx';

export default function UploadInventory(props) {
    // const { userinfo, fetchProfile, } = useContext(UserContext)
    const {
        userProfile,
        async: {
            fetchProfile
        }
    } = MobxStore.authStore;
    const [loader, setLoader] = useState(true);
    const { editMode, propsImages = [] } = props?.route?.params;
    const [getMedia, setMedia] = useState([]);
    const userinfo = userProfile;
    const token = userinfo?.token
    useEffect(() => {
        fillImages();
    }, [props]);
    const user = userinfo?.user;
    if (!user) {
        return null;
    }
    console.log('CURRENT_TOKEN - ', token);
    let [getCloneMedia, setCloneMedia] = useState([]);

    const handleSubmit = async () => {
        try {
            console.log("handle called");
            let filteredItemProcess = getMedia.filter(i => i.uploaded == false);
            if (filteredItemProcess.length == 0 || filteredItemProcess == undefined) {
                return Alert.alert('Message', 'No Images To Add Select Image');
            }
            let isFieldEmpty = false;
            filteredItemProcess.map(i => {
                if (i.itemName == '' || i.itemCost == '') {
                    isFieldEmpty = true;
                }
            })
            if (isFieldEmpty) {
                return Alert.alert('Message', 'Please fill Item name and Item cost');
            }
            setLoader(true)
            let formData = new FormData();
            filteredItemProcess.map((item, i) => {
                console.log('ITEM_FORM_DATA - ', item);
                formData.append("inventory[" + i + "]['itemCost']", item.itemCost);
                formData.append("inventory[" + i + "]['itemName']", item.itemName);
                formData.append("inventoryFiles", {
                    uri: item.itemImage,
                    type: "image/jpeg",
                    name: `inventry-${Date.now()}.jpg`,
                });

            });
            let d = await fetch('http://3.12.168.164:3000/inventory/addinventory', {
                method: 'POST',
                headers: {
                    Authorization: "bearer " + `${userinfo?.token}`,
                    "Content-Type": 'multipart/form-data'
                },
                body: formData
            });
            let addInventoryResponse = await d.json();
            console.log('ADD_INVENTORY_RESPONSE - ', addInventoryResponse);
            if (addInventoryResponse.success == true) {
                await fillImages();
                props.navigation.setParams({
                    propsImages: [],
                });
                setLoader(false);
                props.navigation.navigate("btmstack", {
                    screen: "DjProfileScreen",
                })
                ToastAndroid.show("Inventory created successfully !", ToastAndroid.SHORT);

            } else {
                setLoader(false)
                ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT)
            }
        } catch (error) {
            setLoader(false)
            console.log('error ', error.status);
            console.log('ERROR - ', error);
        }
    }

    const handleImage = async () => {
        try {
            const res = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.images],
            });
            let len = getMedia.length;
            res.map((i) => {
                let selectedImage = {
                    id: Date.now() + len,
                    uploaded: false,
                    itemImage: i.uri,
                    itemName: "",
                    itemCost: "",
                    fromPrevious: false,
                };
                getMedia.push(selectedImage);
                setMedia(() => [...getMedia]);
                len++;
            });
        } catch (error) {
            console.log('handleImage Error - ', error);
        }
        return false;
    };
    async function fillImages() {
        const fP = await fetchProfile();
        let newMedia = fP?.user?.vendor?.inventory.map(o => ({ ...o, uploaded: true }));
        newMedia.push(...propsImages);
        setMedia(() => newMedia);
        setCloneMedia(() => newMedia);
        setLoader(false)
    };


    const editInventory = async (item) => {
        try {

            setLoader(true);
            let editBody = {
                itemName: item.itemName,
                itemCost: item.itemCost
            };
            console.log('EDIT_INVENTORY_ITEM - ', item);
            console.log('EDIT_INVENTORY_BODY ', editBody);
            const editInvenResponse = await axios.post('http://3.12.168.164:3000/inventory/editInventory/' + item.id, editBody, {
                headers: {
                    Authorization: "bearer " + `${userinfo?.token}`,
                },
            });
            setLoader(false);
            if (editInvenResponse.status == 201 || editInvenResponse.status == 200) {
                await fillImages();
                console.log("EDIT_IN_RESPONSE_1 - ", editInvenResponse.data);
                console.log("EDIT_IN_RESPONSE_ST_2 - ", editInvenResponse.status);
            } else {
                return Alert.alert('Message', 'Something went wrong!');
            }
        } catch (error) {
            setLoader(false);
            console.log('EDIT INVENTORY ERROR - ', error);
            return Alert.alert('Message', 'Something went wrong!');
        }

    };
    const handleName = (name, value, item) => {
        setMedia(oldMedia => {
            return oldMedia.map(o => {
                if (o.id != item.id) {
                    return { ...o };
                }
                let up = {
                    ...o,
                    [name]: value
                };

                return up;
            });
        });
    };

    const handleRemove = async (item) => {
        console.log('ITEM_HERE_DEL - ', item);
        if (item.item?.uploaded) {
            let formData = new FormData()
            formData.append('Authorization', "bearer " + `${userinfo?.token}`)

            Alert.alert("Alert",
                "Are you sure want to delete ?",
                [
                    {
                        text: 'Ok', onPress: async () => {
                            const deleteResponse = await axios.post('http://3.12.168.164:3000/inventory/deleteInventory/' + item?.item?.id, formData, {
                                headers: {
                                    Authorization: "bearer " + `${userinfo?.token}`,
                                },
                            })
                            console.log("deleteResponse", deleteResponse.data);

                            if (deleteResponse.status == 201 || deleteResponse.status == 200) {
                                await fillImages();
                                Alert.alert("Deleted Successfully !")
                            } else {
                                Alert.alert("Something went wrong!")
                            }
                        }
                    },
                    {
                        text: 'Cancel', onPress: () => console.log("DELETE CANCELLED!")
                    }
                ],
                { cancelable: true },
            )
        } else {
            if (item?.item?.fromPrevious) {
                props.navigation.setParams({
                    propsImages: [],
                });
            }
            setMedia((currentImg) => currentImg.filter((img, i) => img.id != item?.item?.id));

        }


    };
    const shouldRenderSave = (item) => {
        if (!item.uploaded) {
            return false;
        }
        let findFromOriginalArray = getCloneMedia.find(m => item.id == m.id);
        if (findFromOriginalArray != undefined) {
            if (findFromOriginalArray.itemName != item?.itemName ||
                findFromOriginalArray?.itemCost != item?.itemCost) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
    const renderItem = (item) => {
        return (
            <Fragment>
                <View>
                    <View key={item.index} style={{
                        marginVertical: getHp(10),
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: getWp(20),
                    }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={[styles.number, { marginRight: getWp(10) }]}>
                                {item.index + 1}
                            </Text>

                            <View>
                                <View>
                                    <Avatar
                                        source={{
                                            uri: item?.item?.itemImage
                                        }}
                                        avatarStyle={{ borderRadius: 13 }}
                                        size={115}
                                    />

                                    <TouchableOpacity
                                        onPress={() => handleRemove(item)}
                                        style={{
                                            backgroundColor: "#1FAEF7",
                                            borderRadius: 100,
                                            padding: 5,
                                            position: "absolute",
                                            right: 3,
                                            top: 3,
                                        }}
                                    >
                                        <BlackClose height={15} width={15} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View
                                style={{
                                    marginLeft: getWp(20),
                                    flexDirection: "column",
                                    width: "45%",
                                }}
                            >
                                <FloatingInput
                                    floatingLabel={"Name"}
                                    custom
                                    onChange={(value) => handleName("itemName", value, item?.item)}
                                    value={item?.item?.itemName}
                                />
                                <FloatingInput
                                    keyboardType={"numeric"}
                                    custom
                                    floatingLabel={"Price"}
                                    onChange={(value) => handleName("itemCost", value, item?.item)}
                                    value={item?.item?.itemCost}
                                />
                            </View>
                        </View>
                        <GreyHamburger height={30} width={30} />
                    </View>
                    {
                        shouldRenderSave(item.item) &&
                        <LinearGradient
                            colors={["#1FAEF7", "#1FAEF7"]}
                            style={[
                                styles.linearGradient,
                                {
                                    height: 30, width: 60, backgroundColor: 'red',
                                    alignSelf: 'center', justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 10
                                },
                            ]}
                        >
                            <TouchableOpacity onPress={() => editInventory(item?.item)}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{"Save"}</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    }
                </View>
                {
                    item.index !== getMedia.length - 1 ? (
                        <View
                            style={{
                                height: getHp(0.5),
                                width: "100%",
                                backgroundColor: "#CCCCCC",
                            }}
                        />
                    ) : null
                }
            </Fragment>
        );
    };

    return (
        <Root>
            <Spinner visible={loader} color={"#1FAEF7"} />
            {!loader && (
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
                        <Header
                            headerTitle={"Upload Media"}
                            back
                            onPress={() => props.navigation.goBack()}
                            headerBackColor={{ backgroundColor: "#fff" }}
                        />

                        <LinearGradient
                            colors={["#1FAEF7", "#1FAEF7"]}
                            style={[
                                styles.linearGradient,
                                {
                                    marginTop: 0,
                                    marginBottom: 15,
                                    width: "60%",
                                    alignSelf: "center",
                                },
                            ]}
                        >
                            <TouchableOpacity onPress={handleImage}>
                                <Text style={styles.buttonText}>{"Add More Images"}</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                        <Text
                            style={[
                                styles.number,
                                {
                                    marginVertical: getHp(10),
                                    fontWeight: "normal",
                                    marginLeft: "10%",
                                },
                            ]}
                        >
                            {"Cover Photo"}
                        </Text>
                        <FlatList data={getMedia} renderItem={renderItem} />
                        <View
                            style={{
                                alignSelf: "center",
                                width: "90%",
                                paddingBottom: getHp(10),
                            }}
                        >
                            <CustomButton
                                complete
                                ButtonTitle={"Continue"}
                                onPress={handleSubmit}
                            />
                        </View>
                    </ScrollView>
                </View>
            )}
        </Root>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    number: {
        fontWeight: "bold",
        color: "#000",
        fontSize: FONTSIZE.Text20,
    },
    linearGradient: {
        width: "48%",
        borderRadius: 20,
    },
    buttonText: {
        fontSize: FONTSIZE.Text18,
        textAlign: "center",
        fontWeight: "bold",
        margin: 10,
        color: "#ffffff",
    },
});