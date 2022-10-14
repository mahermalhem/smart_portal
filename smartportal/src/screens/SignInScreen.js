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
import { setUserMethod } from '../redux/actions/userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PinCodeVer from '../components/PinCodeVer';


export function SignInScreen({navigation}) {

  const {signIn} = React.useContext(AuthContext);
  const {container, txtInput} = styles;
  const dispatch = useDispatch()

  const [seekerEmp, setSeekerEmp] = React.useState('job_seeker');
  const [userStatus , setUserStatus] = React.useState('active');


  let schema = yup.object().shape({
    email: yup.string().email("Please enter valid email").required('Email is required'),
    password: yup.string().required("Password is required")
  });

  const login = async (formValues) => {
    console.log(formValues)
    var DT=await AsyncStorage.getItem('deviceToken')

    dispatch(showLoader())
    const fdata = new FormData();
    fdata.append('email', formValues.email);
    fdata.append('password', formValues.password);
    fdata.append('type', formValues.type);
    

    fetch(ENDPOINTS.BASE_URL + ENDPOINTS.LOGIN, {
      method: 'POST',
      headers: {
        "device-token":DT,
      },
      body: fdata
    }).then((response) => response.json())
      .then((json) => {
        dispatch(hideLoader())
        if(json['status']){
          console.log(json)
          // dispatch(setUserMethod({
          //   client_name_en:json['client_name_en'],
          //   client_name_ar:json['client_name_ar'],
          //   client_email:json['client_email'],
          //   bank_id: json['bank_id'],
          //   currency_ar: json['currency_ar'],
          //   currency_en: json['currency_en'],
          //   iban : json['iban']
          // }))
          dispatch(setUserMethod(json['data']))
          signIn()
        }else{
          console.log(json)
          if(JSON.stringify(json.errors)){
            var err=JSON.stringify(json.errors);
            Toast.show(err, Toast.SHORT)
            if(err.includes('Inactive')){
              setUserStatus('inactive')
            }
          }
        }
      })
      .catch((error) => {
        // Toast.show(JSON.stringify(error), Toast.SHORT)
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
                  initialValues={{ email: '', password: '',type:'employee' }}
                  onSubmit={values => {
                    login(values)
                  }}
                  validationSchema={schema}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                    <View style={{ flex: 1, marginBottom: wp(10), width: '90%', }}>
                        {
                          userStatus == 'inactive'
                            ?<PinCodeVer email={values.email} setUserStatus={setUserStatus}/>
                            : null
                        }
                      <View style={styles.textInputContainer}>
                        <TextInput
                          name={'email'}
                          id='1'
                          style={styles.textInput}
                          placeholder="Email"
                          onChangeText={handleChange('email')}
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
                          value={values.password}
                        />
                        {errors.password &&
                          <Text style={{ fontSize: wp(3), color: COLOR.RED,}}>{errors.password}</Text>
                        }
                      </View>
                      <TouchableOpacity
                        onPress={() =>{
                          values.type="job_seeker"
                          setSeekerEmp('job_seeker')
                        }}
                        style={{flexDirection:'row',alignItems:'center'}}>
                        <RadioButton
                          value="job_seeker"
                          status={ seekerEmp === 'job_seeker' ? 'checked' : 'unchecked' }
                          onPress={() =>{
                            values.type="job_seeker"
                            setSeekerEmp('job_seeker')
                          }}
                        />
                        <Text style={{ fontSize: wp(4), color: COLOR.DEFAULT_COLOR,}}>Job seeker</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() =>{ 
                          values.type="employee"
                          setSeekerEmp('employee')
                        }}
                        style={{flexDirection:'row',alignItems:'center',}}>
                        <RadioButton
                          value="employee"
                          status={ seekerEmp === 'employee' ? 'checked' : 'unchecked'}
                          onPress={() =>{ 
                            values.type="employee"
                            setSeekerEmp('employee')
                          }}
                        />
                        <Text style={{ fontSize: wp(4), color: COLOR.DEFAULT_COLOR,}}>Employee</Text>
                      </TouchableOpacity>

                                           
                      <TouchableOpacity onPress={handleSubmit} style={{
                        backgroundColor: COLOR.DEFAULT_COLOR,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30,
                        marginHorizontal: wp(4),
                        height: wp(10),
                      }}>
                        <Text style={{ color: 'white' }}>Login</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginTop: wp(3) }} onPress={()=>{
                        navigation.navigate('ForgetPassword')
                      }}>
                        <Text style={{  }}>Forget password</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginTop: wp(3),flexDirection:'row' }} onPress={()=>{
                        navigation.navigate('Register')
                      }}>
                        <Text style={{  }}>Don't have account ? </Text><Text style={{ color:'blue' }}>Registe </Text>
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
