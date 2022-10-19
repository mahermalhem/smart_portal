import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,ScrollView,TouchableOpacity,
  TextInput,Platform,
  Button,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import {AuthContext} from '../utils';
import { COLOR } from '../constants/COLORS';
import { ENDPOINTS } from '../constants/endpoints';
import { hideLoader } from '../redux/actions/loaderAction';
import { showLoader } from '../redux/actions/loaderAction';
import Toast from 'react-native-simple-toast';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserMethod } from '../redux/actions/userAction';


export function EmailForgetPassword({navigation}) {

  const {signIn} = React.useContext(AuthContext);
  const {container, txtInput} = styles;
  const dispatch = useDispatch()

  let schema = yup.object().shape({
    email: yup.string().email("Please enter valid email").required('Emai is required'),
  });
  
  const sendCodeToEmail=(email)=>{
    
    dispatch(showLoader())
    const fdata = new FormData();
    fdata.append('email', email);

    fetch(ENDPOINTS.BASE_URL + ENDPOINTS.SEND_RESET_PASSWORD_VERFICATION, {
      method: 'POST',
      body: fdata
    }).then((response) => response.json())
      .then((json) => {
        dispatch(hideLoader())
        Toast.show("Please check your email", Toast.SHORT)
      })
      .catch((error) => {
        Toast.show(error, Toast.SHORT)
        console.log(error);
        dispatch(hideLoader())
      });
  }

  return (
    <View style={container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{marginVertical:wp(10)}}>
          <ScrollView>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Formik
                  initialValues={{ email: '' }}
                  onSubmit={values => {
                    sendCodeToEmail(values.email)
                    navigation.navigate('ForgetPassword',{emailVar:values.email})
                  }}
                  validationSchema={schema}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                    <View style={{ flex: 1, marginBottom: wp(10), width: '90%', }}>
                      <View style={styles.textInputContainer}>
                        <TextInput
                          name={'email'}
                          id='1'
                          style={styles.textInput}
                          placeholder="Email"
                          onChangeText={handleChange('email')}
                          // onBlur={handleBlur('email')}
                          value={values.email}
                          multiline
                          numberOfLines={3}
                        />
                        {errors.email &&
                          <Text style={{ fontSize: wp(3), color: COLOR.RED,}}>{errors.email}</Text>
                        }
                      </View>        
                      <TouchableOpacity onPress={handleSubmit} style={{
                        backgroundColor: COLOR.DEFAULT_COLOR,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30,
                        marginHorizontal: wp(4),
                        marginTop:wp(5),
                        height: wp(10),
                      }}>
                        <Text style={{ color: 'white' }}>Send code</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </Formik>
              </View>
          </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* <Button title="Sign in" onPress={() => signIn({username, password})} /> */}
      {/* <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: wp(90),
    height: wp(90),
  },
  logoContainer: {
    zIndex: 10,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    // fontFamily: FONT_FAMILY
  },
  textInput: {
    width: '100%',
    height: wp(12),
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    color:'black',
    fontSize: wp(4),
    // fontFamily: FONT_FAMILY
  },
  textInputContainer: {
    marginBottom: wp(3)
  },
});
