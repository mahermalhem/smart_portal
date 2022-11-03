import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  Button,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  SectionList,Linking,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,Clipboard,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
} from 'react-native';
import Modal from 'react-native-modal';
import {AuthContext, Countries, CountriesEn} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {ENDPOINTS} from '../../constants/endpoints';
import {hideLoader, showLoader} from '../../redux/actions/loaderAction';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import JobCard from '../../components/JobCard';
import {Formik} from 'formik';
import * as yup from 'yup';
import {COLOR} from '../../constants/COLORS';
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';

export function EmpProfileScreen() {
  const {signOut} = React.useContext(AuthContext);
  const {container} = styles;
  var username,
  id,
  type,
  status,
  username,
  email,
  phone,
  verification_code,
  device_token,
  access_token;


useSelector(state => {
  (username = state.userReducer.username),
  (access_token = state.userReducer.access_token),
  (status = state.userReducer.status),
  (type = state.userReducer.type),
  (id = state.userReducer.id),
  (email = state.userReducer.email),
  (phone = state.userReducer.phone),
  (verification_code = state.userReducer.verification_code),
  (device_token = state.userReducer.device_token)
});


var userData = [
    {
        label: type=='employee'? 'Company name':"User name",
        value: username
    },
    {
        label: "Phone number",
        value: phone,
        icon: <Icon name="copy" size={30} color="black" />,
        //phoneIcon: <Icon name="phone-square-alt" size={30} color="black" />,
    },
    {
      label: "Status",
      value: status,
    },
    {
        label: "Email",
        value: email,
        icon: <Icon name="copy" size={30} color="black" />,
    },
    {
        label: "Logout",
        value: '',
        logoutIcon: <Icon2 name="logout" size={30} color={COLOR.RED} />,
    },
  ];

useFocusEffect(useCallback(() => {

    
}, []));


const _renderItem = ({item, index}) => (
    <View>
      <View
        style={{
          marginBottom: wp(5),
          flexDirection:'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <Text style={{color: 'black'}}>
            {item.label}
          </Text>
        </View>
        <View style={{flex: 1, alignItems:'flex-start'}}>
          {item.logoutIcon ? null : (
            <Text style={{color: 'black'}}>
              {item.value}
            </Text>
          )}
          <TouchableOpacity
            style={{}}
            onPress={() => {
              Clipboard.setString(item.value);
              Toast.show("Copied to clipboard", Toast.SHORT);
            }}>
            {item.icon ? item.icon : null}
          </TouchableOpacity>
          <TouchableOpacity style={{}} onPress={() => {
            signOut()
          }}>
            {item.logoutIcon ? item.logoutIcon : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              Linking.openURL(
                `tel:${item.value}`,
              );
            }}>
            {item.phoneIcon ? item.phoneIcon : null}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );


  return (
    <SafeAreaView style={container}>
        <View style={{backgroundColor:"lightblue",borderRadius:30,padding:wp(5)}}>
            <FlatList data={userData} renderItem={_renderItem} />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:wp(2)
  },
});
