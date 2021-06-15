import React, { useState, Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { } from '@components'
import {
    BlueTick,
} from '@svg'


export const BlueCheck = () => {
    return (
        <TouchableOpacity style={{ height: 38, width: 38, backgroundColor: 'rgba(31, 174, 247, 0.13)',borderRadius:67,justifyContent:'center',alignItems:'center' }}>
            <BlueTick height={14} width={18} />
        </TouchableOpacity>
    )
}