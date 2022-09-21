import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { View,Text } from 'react-native';

const MainStackNavigator = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AppContainer() {
  
  return (
    <Text>hhhh</Text>
  );
}

export default AppContainer;
