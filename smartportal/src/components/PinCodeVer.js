import {
  View,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
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
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

const PinCodeVer = props => {
  const [code, setCode] = useState('');

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
            <View  style={{
                flex: 1,
                backgroundColor: 'white',
                borderRadius: 30,
                padding: wp(10),
                }}>
              <Text style={{color:'black',ontSize:wp(4)}}>Check your email for verification code ! </Text>
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
