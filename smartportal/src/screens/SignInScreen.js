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
export function SignInScreen({navigation}) {

  const {signIn} = React.useContext(AuthContext);
  const {container, txtInput} = styles;

  let schema = yup.object().shape({
    email: yup.string().email("pleaseEnterValidEmail").required('emailIsRequired'),
    password: yup.string().required("passwordIsRequired")
  });

  const login = async (formValues) => {
    console.log(formValues)
    // dispatch(showLoader())
    // const fdata = new FormData();
    // fdata.append('clientEmail', formValues.email);
    // fdata.append('clientPassword', formValues.password);
    // fetch(ENDPOINTS.BASE_URL + ENDPOINTS.LOGIN, {
    //   method: 'POST',
    //   body: fdata
    // }).then((response) => response.json())
    //   .then((json) => {
    //     dispatch(hideLoader())
    //     if (json['status']) {
    //       console.log(json)
    //       setSecureData('token',json['client_token'])
    //       setSecureData('client_id',json['client_id'])
    //       dispatch(setUserMethod({
    //         client_name_en:json['client_name_en'],
    //         client_name_ar:json['client_name_ar'],
    //         client_email:json['client_email'],
    //         bank_id: json['bank_id'],
    //         currency_ar: json['currency_ar'],
    //         currency_en: json['currency_en'],
    //         iban : json['iban']
    //       }))
    //       dispatch(openPinCodeBottomSheet())
    //     } else {
    //       Toast.show(strings('common.wrongEmailOrPassword'), Toast.SHORT)
    //     }
    //   })
    //   .catch((error) => {
    //     Toast.show(error + strings('common.networkDefaultMessage'), Toast.SHORT)
    //     console.log(error);
    //     dispatch(hideLoader())
    //   });
  }


  return (
    <View style={container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Formik
                  initialValues={{ email: 'Ahmad456@gmail.com', password: 'KiIpN88M' }}
                  onSubmit={values => {
                    login(values)
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
                      <TouchableOpacity style={{ marginTop: wp(3) }}>
                        <Text style={{  }}>Forget password</Text>
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
