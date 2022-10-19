import React, {useCallback, useState} from 'react';
import {Button, Text, View, SafeAreaView, StyleSheet} from 'react-native';
import { AuthContext } from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

export function EmpHomeScreen() {
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
  (type = state.userReducer.type)
});

const [jobList, setJobList] = useState([])

useFocusEffect(useCallback(() => {

    
}, []));

  return (
    <SafeAreaView style={container}>
      <Text>EmpHomeScreen!! {username} {access_token} {type}</Text>
      <Button title="Sign out" onPress={signOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
