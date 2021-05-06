import React,{useCallback,useState} from 'react'
import { View, Text } from 'react-native'
import {styles} from './indexCss'
export default function CustomText(props) {
    const {
        TextData,
        styleProp,
    }=props
    const [textShown, setTextShown] = useState(false); 
    const [lengthMore, setLengthMore] = useState(false); 
    const toggleNumberOfLines = () => { 
        setTextShown(!textShown);
    }

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 4); 
    }, []);

    return (
        <View styles={styles.container}>
          <Text
                    onTextLayout={onTextLayout}
                    numberOfLines={textShown ? undefined : 4}
                    style={[styles.hostDetail,styleProp]}>{TextData}</Text>

                {
                    lengthMore ? <Text
                        onPress={toggleNumberOfLines}
                        style={styles.readMoreStyle}>{textShown ? '...view less' : '...view more'}</Text>
                        : null
                }
        </View>
    )
}
