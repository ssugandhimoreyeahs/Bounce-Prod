import React, { useState } from "react";
import { View, Switch, StyleSheet, Platform } from "react-native";
import ToggleSwitch from 'toggle-switch-react-native'
import SwitchToggle from "react-native-switch-toggle";


export default function Toggle({ switchOn, onChange }) {
    console.log("switchOn", switchOn);

    return (
        // <ToggleSwitch
        //     isOn={switchOn}
        //     onColor="#20AEF7"
        //     offColor="#EFF2F3"
        //     size='large'
        //     onToggle={onChange}
        // />
        <SwitchToggle
            switchOn={!switchOn}
            onPress={onChange}
            circleColorOff='#fff'
            circleColorOn='#fff'
            backgroundColorOn="#20AEF7"
            backgroundColorOff="#EFF2F3"
            containerStyle={{
                width: 59,
                height: 36,
                borderRadius: 25,
                padding: 3,
            }}
            circleStyle={{
                width: 30,
                height: 30,
                borderRadius: 20,
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    }
});

