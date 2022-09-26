import {View, Text, Button,StyleSheet} from 'react-native';
import React from 'react';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
BallIndicator,
BarIndicator,
DotIndicator,
MaterialIndicator,
PacmanIndicator,
PulseIndicator,
SkypeIndicator,
UIActivityIndicator,
WaveIndicator,
} from 'react-native-indicators';
import { useSelector } from 'react-redux';

const Loader = (props) => {

    const isLoading=useSelector((state)=> state.loaderReducer.loading)
    const linearGradientTheme= useSelector((state) => state.themeReducer.theme);
    return (
        isLoading
        ? <View style={styles.container}>
            <SkypeIndicator color={linearGradientTheme[0]} size={wp(15)}/>
        </View>
        : null
    );
};
const styles = StyleSheet.create({
    container: {
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      zIndex:10000000,
      top:0,
      left:0,
      bottom:0,
      right:0,
      backgroundColor:'white',
      opacity:0.5,
    },
    text:{
        color:'white'
    }
});
  
export default Loader;
