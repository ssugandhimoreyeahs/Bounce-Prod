import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native'
import { ThreeBlackDots, Party } from '@svg'
import { Avatar } from 'react-native-elements'
import { FONTSIZE, getHp, getWp } from '../../app/utils'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from 'native-base';
import { styles } from './indexCss'

AntDesign.loadFont();
export default function InviteRequest(props) {
    const {
        MESSAGESTACK,
        heading = '',
    } = props
    const [showMore, setShowMore] = useState(false);

    const renderItem = ({ item }) => {

        const { name, price, icon, time, partyType } = item
        return (
            <View style={[styles.renderContainer, { marginTop: 5 }, styles.shadowStyle]}>
                <View style={[styles.flexDirectionStyle, {
                    alignItems: 'flex-start'
                }]}>

                    <Party height={29} width={30} />
                    <View style={{ width: '75%', marginHorizontal: getWp(10), marginLeft: 15, }}>
                        <Text style={[styles.textStyle, { fontSize: FONTSIZE.Text18 }]}>
                            {name}
                        </Text>
                        <Text style={[styles.timeStyle]}>
                            {time}
                        </Text>
                    </View>
                    <ThreeBlackDots height={10} width={25} />
                </View>

                <View style={[styles.flexDirectionStyle, { marginTop: getHp(20) }]}>
                    <Avatar source={icon} size={30} containerStyle={{ width: '8%' }} rounded />
                    <Text style={[styles.textStyle, { width: '60%', marginHorizontal: getWp(10), marginLeft: 15 }]}>{name}
                        <Text style={[styles.textStyle, { width: '60%', marginHorizontal: getWp(10), fontFamily: 'AvenirNext-Regular', letterSpacing: 0.1 }]}>
                            {'  invited you'}
                        </Text></Text>

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

