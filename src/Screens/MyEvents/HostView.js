import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
} from "react-native";
import {
    Header,
    ImageCarousel,
    EventTabview,
    ThreeFooterButtons,
    Footer,
    IconTitle,
} from "@components";
import { styles } from "./indexCss";
import Spinner from "react-native-loading-spinner-overlay";
import {
    ThreeBlackDots,
    TagPrice,
    DirectionBlue,
    BlackOutlineCalender,
    Peoples,
    Going,
    Interested,
    Cantgo,
    HirePeople,
    BlackSolidPeoples,
    BlackSolidShare,
    BlackSolidStar,
} from '@svg'
import { FONTSIZE } from "@utils";
import { DJ } from "../../assets";

const DATA = [DJ, DJ, DJ]
const filterSmallButtons = ["⛺ Outdoors", "⛺ Outdoors", "⛺ Outdoors"]


export default function HostView() {
    const [getImageState, setImageState] = useState(0);
    const handleCarousel = () => {
        return (
            <ImageCarousel
                value={"Normal"}
                pagination
                imageArray={DATA}
                onSnapToItem={index => setImageState(index)}
                state={getImageState}
            />
        );
    };

    const renderSmallButton = ({ item, index }) => {
        console.log("item", item);
        return (
            <TouchableOpacity style={[styles.linearGradient, {
                marginRight: 10,
                flexDirection: 'row', alignItems: 'center', marginBottom: 10
            }]}>
                <Text style={{ fontFamily: 'AvenirNext-Medium', fontSize: FONTSIZE.Text12, color: '#000' }}>{item}</Text>

            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={"always"}>
                <Header
                    share={<ThreeBlackDots height={25} width={25} style={{ marginRight: 5 }} />}
                    back
                    headerTitle={"Adelson School Gala"}
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                    headerBackColor={{ backgroundColor: "#FFFFFF" }}
                />
                {handleCarousel()}

                <View style={{ marginHorizontal: 10,marginBottom:10 }}>
                    <View style={styles.flex}>
                        <View style={[styles.tagStyle, { width: '55%' }]}>
                            <BlackOutlineCalender height={23} width={20} />
                            <Text style={[styles.tagTextStyle, { marginLeft: 10 }]}>{"Dec 31, 8:00 PM"}</Text>
                        </View>
                        <View style={[styles.tagStyle, { width: '35%' }]}>
                            <TagPrice height={29} width={31} />
                            <Text style={[styles.tagTextStyle, { marginLeft: 10 }]}>{"$40"}</Text>
                        </View>
                    </View>

                    <View style={styles.directionView}>
                        <DirectionBlue height={22} width={22} />
                        <Text style={{ color: '#1FAEF7', fontSize: FONTSIZE.Text14,textDecorationLine:'underline' }}>{'8440 W. Lake Mead Blvd,Las Vegas, NV, 89128'}</Text>
                    </View>
                </View>

                <EventTabview />

                <Text style={[styles.tagTextStyle, {
                    margin
                        : 10, letterSpacing: 0.24, fontFamily: 'AvenirNext-Medium', lineHeight: 26
                }]}>
                    {"This will be the best gala yet, with Mark Cuban as the keynote speaker! Dress in comfy cocktail attire. Wear your dancing shoes. Have a fantastic night out while suppoting us!"}
                </Text>

                <View style={{ alignSelf: 'center', marginBottom: 30 }}>
                    <FlatList
                        data={filterSmallButtons}
                        renderItem={renderSmallButton}
                        keyExtractor={(index) => index}
                        horizontal
                    />
                </View>


            </ScrollView>

            {false ? <View style={styles.bottomContainer}>
                <ThreeFooterButtons
                    icon={<Going height={24} width={24} />}
                    ButtonTitle={"Going"}
                />
                <ThreeFooterButtons
                    icon={<Interested height={20} width={20} />}
                    ButtonTitle={"Interested"}
                />
                <ThreeFooterButtons
                    icon={<Cantgo height={25} width={27} />}
                    ButtonTitle={"Can't Go"}
                />
            </View>
                :
                false ? <View style={styles.bottomContainer}>
                    <ThreeFooterButtons
                        icon={<BlackSolidPeoples height={27} width={30} />}
                        ButtonTitle={"Invite"}
                    />
                    <ThreeFooterButtons
                        icon={<BlackSolidStar height={24} width={24} />}
                        ButtonTitle={"Hire"}
                    />
                    <ThreeFooterButtons
                        icon={<BlackSolidShare height={25} width={27} />}
                        ButtonTitle={"Promote"}
                    />
                </View>
                    : <View style={styles.bottomContainer}>
                        <ThreeFooterButtons
                            icon={<BlackSolidPeoples height={25} width={30} />}
                            ButtonTitle={"Invite"}
                        />
                        <ThreeFooterButtons
                            icon={<BlackSolidStar height={24} width={24} />}
                            ButtonTitle={"Hire"}
                        />
                        <ThreeFooterButtons
                            icon={<BlackSolidShare height={25} width={27} />}
                            ButtonTitle={"Promote"}
                        />
                    </View>
            }

        </View>
    )
}
HostView.routeName = '/HostView'