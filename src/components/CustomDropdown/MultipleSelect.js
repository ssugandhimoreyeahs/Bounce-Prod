import React, { Component, useRef } from 'react';
import { View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const items = [{
  id: '92iijs7yta',
  name: 'Ondo'
}, {
  id: 'a0s0a8ssbsd',
  name: 'Ogun'
}, {
  id: '16hbajsabsd',
  name: 'Calabar'
}, {
  id: 'nahs75a5sg',
  name: 'Lagos'
}, {
  id: '667atsas',
  name: 'Maiduguri'
}, {
  id: 'hsyasajs',
  name: 'Anambra'
}, {
  id: 'djsjudksjd',
  name: 'Benue'
}, {
  id: 'sdhyaysdj',
  name: 'Kaduna'
}, {
  id: 'suudydjsjd',
  name: 'Abuja'
}
];

export default function MultipleSelect(props) {
  const {
    DATA,
    multiple = false,
    showMargin = false,
    cb = () => { },
    onChange,
    value,
    selectedValues = ''
  } = props
  const [state, setState] = React.useState({ selectedItems: [] })
  const localRef = useRef()

  const onSelectedItemsChange = selectedItems => {
    setState({ selectedItems });
  };

  console.log("selectedItems", state.selectedItems);
  return (
    <View style={{ flex: 1 }}>
      <MultiSelect
      fixedHeight={true}
        hideTags
        items={DATA}
        uniqueKey="id"
        ref={localRef}
        // ref={(component) =>{this.multiSelect = component }}
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={state.selectedItems}
        selectText="Pick Items"
        searchInputPlaceholderText="Search Items..."
        onChangeInput={(text) => console.log(text)}
        altFontFamily="ProximaNova-Light"
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
      <View>
        {localRef.current?.getSelectedItemsExt(state.selectedItems)}
      </View>
    </View>
  )
}
