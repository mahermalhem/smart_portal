import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
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
import Modal from 'react-native-modal';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {ENDPOINTS} from '../constants/endpoints';
import Toast from 'react-native-simple-toast';
import {hideLoader, showLoader} from '../redux/actions/loaderAction';
import { useDispatch, useSelector } from 'react-redux';

const PinCodeVer = props => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch()

  const activateUser = () => {
    if (code.length >= 6) {
      console.log(code, props.email);
      dispatch(showLoader());
      const fdata = new FormData();
      fdata.append('email', props.email);
      fdata.append('code', code);

      fetch(ENDPOINTS.BASE_URL + ENDPOINTS.ACTIVATE_USER, {
        method: 'POST',
        body: fdata,
      })
        .then(response => response.json())
        .then(json => {
          dispatch(hideLoader());
          if (json['status']) {
            props.setUserStatus('active');
          } else {
            Toast.show(JSON.stringify(json['errors']), Toast.SHORT);
          }
        })
        .catch(error => {
          Toast.show(error, Toast.SHORT);
          console.log(error);
          dispatch(hideLoader());
        });
      // props.setUserStatus('active');
    }
  };

  return (
    <View style={{}}>
      <Modal
        isVisible={true}
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 30,
          padding: wp(10),
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                borderRadius: 30,
                padding: wp(10),
              }}>
              <Text style={{color: 'black', fontSize: wp(4)}}>
                Verification code has been sent to {props.email} !
              </Text>
              <SmoothPinCodeInput
                cellStyle={{
                  borderBottomWidth: 2,
                  borderColor: 'black',
                }}
                containerStyle={{marginVertical: wp(10), width: '100%'}}
                textStyle={{color: 'black'}}
                value={code}
                codeLength={6}
                onTextChange={code => setCode(code)}
              />
              <TouchableOpacity
                style={{
                  marginVertical: wp(2),
                  backgroundColor: 'blue',
                  borderRadius: 30,
                  padding: wp(4),
                }}
                onPress={() => {
                  activateUser();
                }}>
                <Text style={{color: 'black', fontSize: wp(4)}}>
                  Verify account
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginVertical: wp(2),
                  backgroundColor: 'red',
                  borderRadius: 30,
                  padding: wp(4),
                }}
                onPress={() => {
                  console.log('prop');
                  props.setUserStatus('active');
                }}>
                <Text style={{color: 'black', ontSize: wp(4)}}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10000000,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    opacity: 0.5,
  },
  text: {
    color: 'white',
  },
});

export default PinCodeVer;
