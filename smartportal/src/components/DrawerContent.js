import React, { Component, useState, useEffect, createRef } from 'react'
import {
    Button, Text, View,
    RefreshControl, FlatList, ImageBackground, Image, SafeAreaView, StyleSheet, PermissionsAndroid, TouchableOpacity, ScrollView
} from 'react-native';
import { AuthContext,} from '../utils';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    PulseLoader,
    DotsLoader,
    TextLoader,
    BubblesLoader,
    CirclesLoader,
    BreathingLoader,
    RippleLoader,
    LinesLoader,
    MusicBarLoader,
    EatBeanLoader,
    DoubleCircleLoader,
    RotationCircleLoader,
    RotationHoleLoader,
    CirclesRotationScaleLoader,
    NineCubesLoader,
    LineDotsLoader,
    ColorDotsLoader,
    OpacityDotsLoader
} from 'react-native-indicator'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';

import { useDispatch, useSelector } from 'react-redux';
import { changeLanguageMethod } from '../actions/languageAction';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen"; 

export function DrawerContent(props) {

    const { signOut } = React.useContext(AuthContext);

    const dispatch = useDispatch();

    return (
        <View>
            <Text>hello</Text>
            <Button title="Sign out" onPress={signOut} />
        </View>
    );
}
