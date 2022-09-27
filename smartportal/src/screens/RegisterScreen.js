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
import Toast from 'react-native-toast-message';
import { RadioButton } from 'react-native-paper';


export function RegisterScreen({navigation}) {

  const {signIn} = React.useContext(AuthContext);
  const {container, txtInput} = styles;
  const dispatch = useDispatch()

  const [seekerEmp, setSeekerEmp] = React.useState('');


  let schema = yup.object().shape({
    email: yup.string().email("pleaseEnterValidEmail").required('Emai is required'),
    password: yup.string().required("Password is required"),
    password_confirm: yup.string().required("Password confirm is required"),
    username: yup.string().required("Username is required"),
    phone: yup.string().required("Phone is required"),
    type: yup.string().required("Type is required"),
  });

  const login = async (formValues) => {
    console.log(formValues)
   
    dispatch(showLoader())
    const fdata = new FormData();
    fdata.append('username', formValues.username);
    fdata.append('email', formValues.email);
    fdata.append('password', formValues.password);
    fdata.append('password_confirm', formValues.password_confirm);
    fdata.append('phone', formValues.phone);
    fdata.append('type', formValues.type);
    fdata.append('device_token', "device_token test");


    fetch(ENDPOINTS.BASE_URL + ENDPOINTS.REGISTER, {
      method: 'POST',
      body: fdata
    }).then((response) => response.json())
      .then((json) => {
        dispatch(hideLoader())
        console.log(json)
        if(json['status']){
          console.log(json)
          //signIn()
        }else{
          Toast.show(json['msg'], Toast.SHORT)
        }
      })
      .catch((error) => {
        Toast.show(error, Toast.SHORT)
        console.log(error);
        dispatch(hideLoader())
      });
      signIn()
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
                  initialValues={{ email: '', password: '',type:'',password_confirm:"",username:'',phone:''}}
                  onSubmit={values => {
                    login(values)
                  }}
                  validationSchema={schema}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                    <View style={{ flex: 1, marginBottom: wp(10), width: '90%', }}>
                      <View style={styles.textInputContainer}>
                        <TextInput
                          name={'username'}
                          id='6'
                          style={styles.textInput}
                          placeholder="Username"
                          onChangeText={handleChange('username')}
                          onBlur={handleBlur('username')}
                          value={values.username}
                        />
                        {errors.username &&
                          <Text style={{ fontSize: wp(3), color: COLOR.RED,}}>{errors.username}</Text>
                        }
                      </View>
                      <View style={styles.textInputContainer}>
                        <TextInput
                          name={'email'}
                          id='1'
                          style={styles.textInput}
                          placeholder="Email"
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
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
                          onBlur={handleBlur('password')}
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
                          onBlur={handleBlur('password_confirm')}
                          value={values.password_confirm}
                        />
                        {errors.password_confirm &&
                          <Text style={{ fontSize: wp(3), color: COLOR.RED,}}>{errors.password_confirm}</Text>
                        }
                      </View>
                      <View style={styles.textInputContainer}>
                        <TextInput
                          name={'phone'}
                          id='5'
                          style={styles.textInput}
                          placeholder="Phone number"
                          onChangeText={handleChange('phone')}
                          onBlur={handleBlur('phone')}
                          value={values.phone}
                          keyboardType={'decimal-pad'}
                        />
                        {errors.phone &&
                          <Text style={{ fontSize: wp(3), color: COLOR.RED,}}>{errors.phone}</Text>
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
                      {errors.type &&
                          <Text style={{ fontSize: wp(3), color: COLOR.RED,}}>{errors.type}</Text>
                      }            
                      <TouchableOpacity onPress={handleSubmit} style={{
                        backgroundColor: COLOR.DEFAULT_COLOR,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30,
                        marginHorizontal: wp(4),
                        marginTop:wp(5),
                        height: wp(10),
                      }}>
                        <Text style={{ color: 'white' }}>Register</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ marginTop: wp(3),flexDirection:'row' }} onPress={()=>{
                        navigation.navigate('SignIn')
                      }}>
                        <Text style={{  }}>Have account ? </Text><Text style={{ color:'blue' }}>Login </Text>
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
