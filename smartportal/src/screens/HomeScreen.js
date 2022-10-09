import * as React from 'react';
import {Button, Text, View, SafeAreaView, StyleSheet} from 'react-native';
import { AuthContext } from '../utils';
import {useDispatch, useSelector} from 'react-redux';
import PinCodeVer from '../components/PinCodeVer';

export function HomeScreen() {
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
  (status = state.userReducer.status)
});

  return (
    <SafeAreaView style={container}>
      <Text>Home Screen! {username} {access_token}</Text>
      <Button title="Sign out" onPress={signOut} />
      <Text>dsada</Text>
      {
        status != 'inactive'
          ?<PinCodeVer />
          :null
      }
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