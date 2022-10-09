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


export function ForgetPassword({navigation}) {

  const {signIn} = React.useContext(AuthContext);
  const {container, txtInput} = styles;
  const dispatch = useDispatch()

  const [seekerEmp, setSeekerEmp] = React.useState('');

  let schema = yup.object().shape({
    email: yup.string().email("Please enter valid email").required('Emai is required'),
    password: yup.string().required("Password is required"),
    password_confirm: yup.string().required("Password confirm is required"),
    code: yup.string().required("Code is required"),
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

  const changePass = async (formValues) => {
    console.log(formValues)

    dispatch(showLoader())
    const fdata = new FormData();
    fdata.append('email', formValues.email);
    fdata.append('password', formValues.password);
    fdata.append('password_confirm', formValues.password_confirm);
    fdata.append('code', formValues.code);


    fetch(ENDPOINTS.BASE_URL + ENDPOINTS.RESET_PASSWORD, {
      method: 'POST',
      body: fdata
    }).then((response) => response.json())
      .then((json) => {
        dispatch(hideLoader())
        if(json==null){
            navigation.navigate('SignIn')
        }else{
            Toast.show("Code is incorrect", Toast.SHORT)
        }
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
                  initialValues={{ email: '', password: '',password_confirm:"",code:''}}
                  onSubmit={values => {
                    changePass(values)
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
                      <View style={styles.textInputContainer}>
                        <TextInput
                          name={'password'}
                          id='3'
                          style={styles.textInput}
                          secureTextEntry
                          placeholder="Password"
                          onChangeText={handleChange('password')}
                          // onBlur={handleBlur('password')}
                          value={values.password}
                        />
                        {errors.password &&
                          <Text style={{ fontSize: wp(3), color: COLOR.RED,}}>{errors.password}</Text>
                        }
                      </View>
                      <View style={styles.textInputContainer}>
                        <TextInput
                          name={'password_confirm'}
                          id='4'
                          style={styles.textInput}
                          secureTextEntry
                          placeholder="Password confirm"
                          onChangeText={handleChange('password_confirm')}
                          // onBlur={handleBlur('password_confirm')}
                          value={values.password_confirm}
                        />
                        {errors.password_confirm &&
                          <Text style={{ fontSize: wp(3), color: COLOR.RED,}}>{errors.password_confirm}</Text>
                        }
                      </View>
                      <View style={styles.textInputContainer}>
                        <TextInput
                          name={'code'}
                          id='5'
                          style={styles.textInput}
                          placeholder="Code"
                          onChangeText={handleChange('code')}
                          // onBlur={handleBlur('phone')}
                          value={values.phone}
                          keyboardType={'decimal-pad'}
                        />
                        {errors.code &&
                          <Text style={{ fontSize: wp(3), color: COLOR.RED,}}>{errors.code}</Text>
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
                        <Text style={{ color: 'white' }}>Change password</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginTop: wp(3),flexDirection:'row' }} onPress={()=>{
                        console.log(errors.email)
                        if(errors.email==undefined && values.email.length!=0){
                            sendCodeToEmail(values.email)
                        }
                      }}>
                        <Text style={{  }}>Code recived  ? </Text><Text style={{ color:'blue' }}>Get code </Text>
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
