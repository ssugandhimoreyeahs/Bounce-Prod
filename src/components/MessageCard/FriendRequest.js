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
import { BlueSendRequest, BlueArrowDown } from '@svg'
import { Avatar } from 'react-native-elements'
import { FONTSIZE, getHp, getWp } from '../../app/utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from 'native-base';
import { styles } from './indexCss'
import { BlackClose } from '../../assets/Svg'
import RatingPage from '../../components/ReviewCard/RatingPage'


AntDesign.loadFont();
export default function Payment(props) {
    const {
        MESSAGESTACK,
        heading = '',
    } = props
    const [showMore, setShowMore] = useState(false);

    const renderItem = ({ item }) => {

        const { name, price, time, icon } = item
        return (
            <View style={[styles.renderContainer]}>
                <View style={styles.flexDirectionStyle}>

                    <Avatar source={icon} size={40} containerStyle={{ width: '10%' }} rounded />
                    <Text style={[styles.textStyle, { fontSize: FONTSIZE.Text18, width: '60%', marginHorizontal: getWp(10), marginLeft: 15 }]}>{name}</Text>


                    <View style={[styles.flexDirectionStyle, { width: '30%' }]}>
                        <BlueSendRequest height={27} width={27} />

                        <TouchableOpacity >
                            <View style={{
                                backgroundColor: '#EEEEEE',
                                padding: 7,
                                borderRadius: 100,
                                marginLeft: getWp(25)
                            }}>
                                <BlackClose height={12} width={12} />
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        )
    }
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headingStyle}>{heading}</Text>


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
                            style={[styles.showMoreButtonContainer, {
                                marginTop: getHp(0),
                            }]}>
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

