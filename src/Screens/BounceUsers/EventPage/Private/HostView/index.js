import React, { useState, useRef } from 'react'
import { View, Text, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import {
    Header,
    Media,
    UnderlineText,
    ImageCarousel,
    IconTitle,
    ReviewCard,
    Footer,
    CustomText,
    TextIconButton,
    Similar,
    TouchableButton,
    Root
} from '@components'
import {
    Girl,
    DJ,
    DJ1,
    DJ2,
    Message,
    Favourite,
    Favourited
} from '@assets'
import {
    TagPrice,
    PlusWhiteCalender,
    DirectionBlue,
    BlueArrowDown,
    Peoples,
    HirePeople,
    PenWhite
} from '@svg'
import { styles } from './indexCss';
import { FlatList } from 'react-native';
import { render } from 'react-dom';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Scaffold } from '@components';


const SIMILARDATA = [
    {
        name: "Hakkasan",
        image: DJ,
        time: "Sat. May 16, 5:00 PM",
    },
    {
        name: "Hakkasan",
        image: DJ,
        time: "Sat. May 16, 5:00 PM",
    },
    {
        name: "Hakkasan",
        image: DJ,
        time: "Sat. May 16, 5:00 PM",
    },
];

const DATA = [
    {
        id: "0",
        icon: Favourite,
        messageName: "Favourite",
    },
    {
        id: "1",
        icon: Message,
        messageName: "Message",
    },
    {
        id: "2",
        icon: Favourited,
        messageName: "Favourited",
    },
];
const imageArray = [DJ, DJ1, DJ2]

export default function DjProfile(props) {
    const flatlistRef = useRef(null)
    const [state, setState] = useState(0)
    const handleCarousel = () => {
        return <ImageCarousel
            imageArray={imageArray}
            onSnapToItem={(index) => setState(index)}
            state={state}
        />
    }
    const LocalRender = ({ heading, body }) => {
        return (
            <View style={styles.threeBlocks}>
                <Text style={[styles.threeBlockHeading]}>
                    {heading}
                </Text>
                <Text style={[styles.threeBlockBodyText]}>
                    {body}
                </Text>
            </View>
        )
    }
    return (
        <Scaffold  statusBarStyle={{ backgroundColor: '#FFFFFF' }}>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <ScrollView>
                        <Header
                            headerTitle={"Adelson School Gala"}
                            back
                            share
                        />
                        {handleCarousel()}
                        <View style={styles.subContainer}>

                            <View style={styles.flex}>
                                <IconTitle
                                    iconStyle={styles.iconStyle}
                                    textStyle={styles.textStyle}
                                    text={"Dec 31, 8:00 PM"}
                                    icon={<TagPrice height={20} width={20} />}
                                    styleProp={{ backgroundColor: '#212121', padding: 10, justifyContent: 'space-between', borderRadius: 15 }}
                                />
                                <IconTitle
                                    iconStyle={styles.iconStyle}
                                    textStyle={styles.textStyle}
                                    text={"$40"}
                                    icon={<TagPrice height={20} width={20} />}
                                    styleProp={{ backgroundColor: '#212121', padding: 10, justifyContent: 'space-between', borderRadius: 15 }}
                                />
                            </View>

                            <View style={styles.directionView}>
                                <UnderlineText
                                    underlineText={'8440 W. Lake Mead Blvd,Las Vegas, NV, 89128'}
                                    styleTextProp={{ color: '#1FAEF7', fontSize: 18 }}
                                    styleContainerProp={{ width: '80%' }}
                                />
                                <DirectionBlue height={50} width={50} />
                            </View>

                            <View style={styles.threeBlocksContainer}>
                                <LocalRender heading={"Hosting"} body={"2"} />
                                <LocalRender heading={"Hosting"} body={"2"} />
                                <LocalRender heading={"Hosting"} body={"2"} />
                            </View>
                            <CustomText
                                TextData={"This will be the best gala yet, with Mark Cuban as the keynote speaker! Dress in comfy cocktail attire. Wear your dancing shoes. Have a fantastic night out while supporting..."}
                            />

                            <Media />

                            <TextIconButton
                                title={'More Media'}
                                icon={<BlueArrowDown height={20} width={20} />}
                            />

                        </View>

                        <Similar
                            DATA={SIMILARDATA}
                            ref={flatlistRef}
                        />
                        {/* <Similar name={'ss'} time={'ss'} image={DJ}  />
            <FlatList
                    data={DATA.SIMILARDATA}
                    renderItem={<Similar name={'ss'} time={'ss'} image={DJ}  />}
                    horizontal
                    keyExtractor={(index) => index}
                /> */}

                        <View style={styles.bottomContainer}>
                            <TouchableButton
                                icon={<Peoples height={30} width={30} />}
                                ButtonTitle={"Invite Friends"}
                                ButtonStyle={styles.bottomButton}
                            />
                            <TouchableButton
                                icon={<HirePeople height={20} width={20} />}
                                ButtonTitle={"Hire Vendors"}
                                ButtonStyle={styles.bottomButton}
                            />
                            <TouchableButton
                                icon={<PenWhite height={50} width={50} />}
                                // ButtonTitle={"Hire Vendors"}
                                ButtonStyle={styles.bottomButtonPen}
                            />
                        </View>
                    </ScrollView>

                </View>
            </KeyboardAwareScrollView>
        </Scaffold>
    )
}
