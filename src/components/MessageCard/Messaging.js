import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native'
import {
    StarPerson,
    Peoples,
    Message,
    Download,
    Party,
    WhiteRightArrow
} from '@assets'
import { TextIconButton } from '@components'
import { BlackArrowDown, BlueArrowDown } from '@svg'
import { Avatar } from 'react-native-elements'
import { FONTSIZE, getHp, getWp } from '../../app/utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from 'native-base';
import { styles } from './indexCss'
import ModalPopup from '../Modal'
import { modalFunction } from '../Modal/modalFunction'

AntDesign.loadFont();
export default function MessageCard(props) {
    const {
        MESSAGESTACK,
        heading = ''
    } = props
    const [showMore, setShowMore] = useState(false);
    const [closePopup, setClosePopup] = useState(false);



    const renderItem = ({ item }) => {
        const { name, partyType, time, icon, desc } = item
        return (
            <View style={[styles.renderContainer, { marginVertical: getHp(5) }, styles.shadowStyle]}>
                <View style={styles.flexDirectionStyle}>

                    <Avatar source={icon} size={40} 
                    containerStyle={{ width: '10%' }} rounded />
                    
                    <Text style={[styles.textStyle, { width: '50%', marginHorizontal: getWp(10), marginLeft: 15 }]}>{name}</Text>

                    <TouchableOpacity
                        onPress={() => setClosePopup(!closePopup)}
                        style={[styles.RequestButton, {}]}>
                        <Text style={styles.hireButtonStyle}>
                            {'Hire'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.textinputContainer}>
                    <Text style={styles.messageTextStyle}>
                        {'Message'}
                    </Text>
                </TouchableOpacity>

                {closePopup &&
                    <ModalPopup
                        name={name}
                        icon={icon}
                        desc={desc}
                        infoModel={true}
                        closePopup={closePopup}
                        onPress={() => setClosePopup(!closePopup)}
                    />}

            </View>
        )
    }
    return (
        <View style={styles.mainContainer}>
            <Text style={[styles.headingStyle, { marginBottom: getHp(10) }]}>{heading}</Text>



            {MESSAGESTACK.length > 1 ?
                <>
                    <FlatList
                        initialNumToRender={2}
                        data={!showMore ? MESSAGESTACK.slice(0, 1) : MESSAGESTACK}
                        renderItem={renderItem}
                        keyExtractor={(index) => index}
                        onEndReachedThreshold={0.5}
                    />

                    <View style={{ backgroundColor: '#FBFBFB', paddingBottom: 10 }}>
                        <Button
                            onPress={() => {
                                setShowMore(i => !i);
                            }}
                            full
                            light
                            style={[styles.showMoreButtonContainer]}>
                            <Text style={[styles.showMoreTextStyle, { fontFamily: 'AvenirNext-Medium', letterSpacing: 0.2 }]}>
                                {!showMore ? `${MESSAGESTACK.length - 1} More` : `Hide`}
                            </Text>
                            <View style={{ marginStart: getHp(10) }}>
                                <AntDesign
                                    color={'black'}
                                    size={getHp(16)}
                                    name={!showMore ? 'down' : 'up'}
                                />
                            </View>
                        </Button>
                    </View>
                </>
                :
                null
            }


        </View>
    )
}

