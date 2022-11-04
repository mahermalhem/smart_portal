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
import { COLOR } from '../constants/COLORS';

export function DrawerContent(props) {

    const { signOut } = React.useContext(AuthContext);

    const dispatch = useDispatch();

    return (
        <View style={{flex:1,height:"100%",width:'100%',alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:COLOR.DEFAULT_COLOR,fontSize:wp(6),margin:wp(2)}}>SMART PORTAL</Text>

            <View style={{flex:1,width:'100%',alignItems:'center',justifyContent:'flex-start',paddingTop:wp(20),paddingHorizontal:wp(2)}}>
                <TouchableOpacity onPress={()=>{
                    props.navigation.navigate("Home")
                }} style={{width:'100%',height:wp(15),backgroundColor:COLOR.DEFAULT_COLOR,alignItems:'center',justifyContent:'center',marginBottom:wp(1)}}>
                    <Text style={{color:'white',fontSize:wp(5)}}>Home screen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    props.navigation.navigate("myProfile")
                }} style={{width:'100%',height:wp(15),backgroundColor:COLOR.DEFAULT_COLOR,alignItems:"center",justifyContent:'center',marginBottom:wp(1)}}>
                    <Text style={{color:'white',fontSize:wp(5)}}>My Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    props.navigation.navigate("myApplications")
                }} style={{width:'100%',height:wp(15),backgroundColor:COLOR.DEFAULT_COLOR,alignItems:'center',justifyContent:'center',marginBottom:wp(3)}}>
                    <Text style={{color:'white',fontSize:wp(5)}}>My applications</Text>
                </TouchableOpacity>
                <Button title="Sign out" onPress={signOut} />
            </View>
        </View>
    );
}
