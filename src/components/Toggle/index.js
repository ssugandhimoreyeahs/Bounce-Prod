import React, { useState } from "react";
import { View, Switch, StyleSheet, Platform } from "react-native";
import ToggleSwitch from 'toggle-switch-react-native'

export default function Toggle({ switchOn, onChange }) {
       console.log("switchOn", switchOn);

    return (
        <ToggleSwitch
            isOn={switchOn}
            onColor="#20AEF7"
            offColor="#EFF2F3"
            size='medium'
            onToggle={onChange}
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

