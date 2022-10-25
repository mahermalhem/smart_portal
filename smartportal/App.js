/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
 import React,{useEffect} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,Platform
 } from 'react-native';
import AppInit from './src/AppInit';
import Loader from './src/components/Loader';

 
 const App = () => {
   return (
       <SafeAreaView style={{flex:1,backgroundColor:"transparent",}}>
         <StatusBar barStyle="light-content" />
         <AppInit/>
         <Loader/>
       </SafeAreaView>
   );
 };
 
 export default App;
 