


import React, {useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PhoneInput from "react-native-phone-input";

export const PhoneNumber = () => {
    const focusRef = useRef(null)
    const [state, setState] = useState({
        valid: '',
        type: '',
        value: ''
    })

    useEffect(() => {
    
        // updateInfo = updateInfo.bind();
        // renderInfo = renderInfo.bind();
    }, [])

    const updateInfo = () => {
        setState({
            valid: phone.isValidNumber(),
            type: phone.getNumberType(),
            value: phone.getValue()
        });
    }

    const renderInfo = () => {
        if (state.value) {
            return (
                <View style={styles.info}>
                    <Text>
                        Is Valid:{" "}
                        <Text style={{ fontWeight: "bold" }}>
                            {state.valid.toString()}
                        </Text>
                    </Text>
                    <Text>
                        Type: <Text style={{ fontWeight: "bold" }}>{state.type}</Text>
                    </Text>
                    <Text>
                        Value:{" "}
                        <Text style={{ fontWeight: "bold" }}>{state.value}</Text>
                    </Text>
                </View>
            );
        }
    }


    return (<View style={styles.container} >
        <PhoneInput
          ref={focusRef}
        />
    {focusRef.current?.phone}

        <TouchableOpacity
            onPress={updateInfo}
            style={styles.button}
        >
            <Text>Get Info</Text>
        </TouchableOpacity>

        { renderInfo()}
    </View >
    );

}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        paddingTop: 60
    },
    info: {
        // width: 200,
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
        padding: 10,
        marginTop: 20
    },
    button: {
        marginTop: 20,
        padding: 10
    }
});
