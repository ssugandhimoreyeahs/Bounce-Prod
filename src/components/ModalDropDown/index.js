import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Keyboard, RefreshControlBase } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown-v2';
import ModalStyle from './indexCss';
import Entypo from 'react-native-vector-icons/Entypo';
import { FONTSIZE, getHp, getWp } from '@utils'

Entypo.loadFont();
const ModalDropDownComponent = (props) => {
    const {
        onInitialValue = [],
        options = [],
        placeholder = 'Please Select',
        labelProp,
        uniqueProp,
        onSelectItems = () => { },
        readOnly = false,
        onDropDownPress = () => {  }
    } = props;
    
    let [selectedItems, setselectedItems] = useState([...onInitialValue]);
    useEffect(() => {
        if (readOnly) {
            return;
        } 
        setselectedItems(() => ([...onInitialValue])); 
    }, [onInitialValue]);
    const dropDownRef = useRef();
    const styles = ModalStyle();
    const onSelectDropDown = (item) => {
        let findIndex = selectedItems.findIndex(c => c[uniqueProp] == item[uniqueProp]);
        if (findIndex > -1) {
            setselectedItems(i => {
                let res = i.filter((c, i) => c[uniqueProp] != item[uniqueProp]);
                onSelectItems(res);
                return res;
            });
            return;
        }
        setselectedItems(i => {
            let res = [...i, { ...item }];
            onSelectItems(res);
            return res;
        });
    }
    let selectedValue = '';
    selectedItems.map(i => {
        selectedValue = selectedValue + i[labelProp] + ', ';
    });
    selectedValue = selectedValue.slice(0, selectedValue.length - 2);
    // console.log("IMP_1 - ", selectedItems);
    return (
        <View style={{
            elevation: 2,
            backgroundColor: '#fff',
            borderRadius: 9.5,
            marginVertical: 10,
            justifyContent:'center',
            height: getHp(65),
            marginBottom: 10
        }}>
            <ModalDropdown
                ref={dropDownRef}
                textStyle={styles.textStyle}
                style={styles.dropDownStyle}
                multipleSelect={true}
                defaultValue={'Select Languages...'}
                options={[...options]}
                renderRowComponent={(data) => {
                    return <TouchableOpacity
                        style={{ height: getHp(50), justifyContent: 'center', paddingHorizontal: 20 }}
                        onPress={() => { data.onPress(); }}>
                        {data.children}
                    </TouchableOpacity>;
                }}
                renderRow={(option, index) => {
                    let isSelected = selectedItems.findIndex(c => option[uniqueProp] == c[uniqueProp]);
                    return <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black' }}>{option[labelProp]}</Text>
                        {
                            isSelected > -1
                            && <Entypo name={'check'} color={'black'} />
                        }

                    </View>;
                }}
                onSelect={(index) => {
                    onSelectDropDown({ ...options[index] });
                }}
                dropdownStyle={{ marginTop: 20, width: "95.5%" }}
            >

            </ModalDropdown>
            <TouchableOpacity
                onPress={() => {
                    Keyboard.dismiss();
                    onDropDownPress();
                    setTimeout(() => {
                        dropDownRef.current.show()
                    }, 500);
                }}
                activeOpacity={1}
                style={{
                    position: 'absolute',
                    minHeight: getHp(50),
                    borderRadius: 9.5,
                    width: "100%",
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    flexWrap: 'wrap'
                }}>
                <Text style={{
                    color: '#000',
                    marginLeft:12,
                    opacity:0.8,
                    alignSelf: 'center',
                    fontSize: FONTSIZE.Text15
                }}>
                    {
                        selectedValue.length > 0 ? selectedValue : placeholder
                    }
                </Text>
            </TouchableOpacity>
        </View>
    );
}
export default ModalDropDownComponent;