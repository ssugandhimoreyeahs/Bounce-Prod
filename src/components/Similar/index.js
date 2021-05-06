import React from 'react'
import { ScrollView } from 'react-native'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { View, Text, FlatList, Image } from 'react-native'

export default function Similar(props) {
    const {
        DATA,
        name,
        time,
        image,
        ref=null
    } = props
    console.log("dataaaaaaaa", props.name, props.time)
    const renderItem = ({ item,index }) => {
        return (
            <TouchableOpacity key={index}>
                <Image source={item.image} style={{ width: '100%', height: 200 }} />
                <Text style={[styles.eventStyle]}>{item.name}</Text>
                <Text style={[styles.dateStyle]}>{item.time}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <ScrollView horizontal>
            <FlatList
                ref={ref}
                data={DATA.SIMILARDATA}
                renderItem={renderItem}
                horizontal
                keyExtractor={(index) => index}
            />
            {/* <TouchableOpacity>
                <Image source={image} style={{ width: '100%', height: 200 }} />
                <Text style={[styles.eventStyle]}>{name}</Text>
                <Text style={[styles.dateStyle]}>{time}</Text>
            </TouchableOpacity> */}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    eventStyle: {
        color: '#fff',
        fontSize: 20
    }
})
