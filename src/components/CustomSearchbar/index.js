import React from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { FONTSIZE } from '@utils'
import { Searchbar } from 'react-native-paper';



const CustomSearchbar = ({ placeholder, onPress }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    return (
        // <View style={styles.container}>
        //     <TouchableOpacity onPress={onPress} style={{}}>
        //         <Icon name="search-sharp" size={25} style={{ marginHorizontal: 10 }} color="#000" />
        //     </TouchableOpacity>
        //     <TextInput
        //         placeholder={placeholder}
        //         style={styles.textInput}
        //     />
        // </View>
        <Searchbar
            placeholder={"Search events"}
            onChangeText={onChangeSearch}
            value={searchQuery}
            inputStyle={{
                fontSize: FONTSIZE.Text16,
                fontFamily: 'AvenirNext-Regular',
                alignSelf: 'center'
            }}
            style={styles.searchBarStyle}
            iconColor={"#999999"}

            placeholderTextColor={"#909090"}
        />
    )
}
export {
    CustomSearchbar
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: -20,
        flex: 1,
        borderRadius: 50,
        elevation: 5,
        backgroundColor: '#fff',
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        fontSize: FONTSIZE.Text18
    }
})


