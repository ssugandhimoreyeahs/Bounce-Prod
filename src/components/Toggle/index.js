import React, { useState } from "react";
import { View, Switch, StyleSheet, Platform } from "react-native";
import ToggleSwitch from 'toggle-switch-react-native'

export default function Toggle() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        // <View style={styles.container}>

        <ToggleSwitch

            isOn={0}
            // trackColor={{ true: '#7ab8e1', false: Platform.OS=='android'?'#d3d3d3':'#fbfbfb'  }}
            onColor="#20AEF7"
            // trackColor={{true: 'red', false: 'grey'}}
            offColor="#EFF2F3"
            // label="Example label"
            // labelStyle={{ color: "black", fontWeight: "900" }}
            size='medium'
            onToggle={isOn => console.log("changed to : ", isOn)}
        />
        // </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    }
});

