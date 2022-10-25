import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  Button,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  SectionList,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
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
import Icon from 'react-native-vector-icons/FontAwesome5';
import JobCard from '../../components/JobCard';
import {Formik} from 'formik';
import * as yup from 'yup';
import {COLOR} from '../../constants/COLORS';
import Toast from 'react-native-simple-toast';

export function EmpJobDescScreen({navigation, route}) {
  const {signOut} = React.useContext(AuthContext);
  const {container} = styles;
  const dispatch = useDispatch();
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
      (type = state.userReducer.type);
  });

  const [countryModal, setCountryModal] = useState(false);

  const listRef = useRef();
  const [job, setJob] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  let schema = yup.object().shape({
    country: yup.string().required('Country is required'),
    address: yup.string().required('Address is required'),
    description: yup.string().required('Description is required'),
    title: yup.string().required('Title is required'),
  });

  const updateJob = async formValues => {
    console.log(formValues);

    dispatch(showLoader())
    const fdata = new FormData();
    fdata.append('title', formValues.title);
    fdata.append('address',formValues.address);
    fdata.append('country', formValues.country);
    fdata.append('description', formValues.description);

    fetch('http://54.162.241.44/api/job/update-job/?id='+ route.params.job.jobId, {
      method: 'POST',
      headers: {
        "Authorization":"Bearer "+access_token,
      },
      body: fdata
    }).then((response) => response.json())
      .then((json) => {
        dispatch(hideLoader())
        if(json['status']){
          navigation.goBack()
        }else{
          console.log(json)
        }
      })
      .catch((error) => {
        Toast.show(JSON.stringify(error), Toast.SHORT)
        console.log(JSON.stringify(error));
        dispatch(hideLoader())
      });
  };

  return (
    <SafeAreaView style={container}>
      {job == {} ? null : (
             <KeyboardAvoidingView
             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
             style={styles.container}>
             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <View style={{marginVertical: wp(10)}}>
                 <ScrollView nestedScrollEnabled={true}>
                   <View
                     style={{
                       flex: 1,
                       width: '100%',
                       alignItems: 'center',
                       justifyContent: 'center',
                     }}>
                     <Formik
                       initialValues={{
                         title:route.params.job.jobTitle,
                         country: route.params.job.jobCountry,
                         address: route.params.job.jobAdress,
                         description: route.params.job.jobDesc,
                       }}
                       onSubmit={values => {
                         updateJob(values);
                       }}
                       validationSchema={schema}>
                       {({
                         handleChange,
                         handleBlur,
                         handleSubmit,
                         values,
                         errors,
                         isValid,
                       }) => (
                         <View style={{flex: 1, marginBottom: wp(10), width: '90%'}}>
                           <View style={styles.textInputContainer}>
                             <TextInput
                               name={'title'}
                               id="1"
                               style={styles.textInput}
                               placeholder={"Title"}
                               onChangeText={handleChange('title')}
                               value={values.title}
                               multiline
                             />
                             {errors.title && (
                               <Text style={{fontSize: wp(3), color: COLOR.RED}}>
                                 {errors.title}
                               </Text>
                             )}
                           </View>
                           <View style={styles.textInputContainer}>
                             <TextInput
                               name={'address'}
                               id="1"
                               style={styles.textInput}
                               placeholder="Address"
                               onChangeText={handleChange('address')}
                               value={values.address}
                               multiline
                             //   numberOfLines={numOfLinesAddress}
                             //   onContentSizeChange={e => {
                             //     numOfLinesAddress =
                             //       e.nativeEvent.contentSize.height / 18;
                             //   }}
                             />
                             {errors.address && (
                               <Text style={{fontSize: wp(3), color: COLOR.RED}}>
                                 {errors.address}
                               </Text>
                             )}
                           </View>
                           <TouchableOpacity
                             onPress={() => {
                               setCountryModal(true);
                             }}
                             style={styles.textInputContainer}>
                             <TextInput
                               name={'country'}
                               id="3"
                               style={styles.textInput}
                               placeholder={"Country"}
                               onChangeText={handleChange('country')}
                               value={values.country}
                               multiline
                               editable={false}
                             //   numberOfLines={numOfLinesDescription}
                             //   onContentSizeChange={e => {
                             //     numOfLinesDescription =
                             //       e.nativeEvent.contentSize.height / 18;
                             //   }}
                             />
                             {errors.country && (
                               <Text style={{fontSize: wp(3), color: COLOR.RED}}>
                                 {errors.country}
                               </Text>
                             )}
                           </TouchableOpacity>
                           <View style={styles.textInputContainer}>
                             <TextInput
                               name={'description'}
                               id="4"
                               style={styles.textInput}
                               placeholder="Description"
                               onChangeText={handleChange('description')}
                               value={values.description}
                               multiline
                             //   numberOfLines={numOfLinesDescription}
                             //   onContentSizeChange={e => {
                             //     numOfLinesDescription =
                             //       e.nativeEvent.contentSize.height / 18;
                             //   }}
                             />
                             {errors.description && (
                               <Text style={{fontSize: wp(3), color: COLOR.RED}}>
                                 {errors.description}
                               </Text>
                             )}
                           </View>
                           <Modal
                             isVisible={countryModal}
                             style={{
                               flex: 1,
                               backgroundColor: 'white',
                               borderRadius: 30,
                               padding: wp(10),
                             }}
                             >
                             <SectionList
                                 sections={CountriesEn}
                                 nestedScrollEnabled={true}
                                 keyExtractor={(item, index) => item + index}
                                 // renderItem={( { section,item,index },values) => <Item title={item} index={index} section={section} />}
                                 renderItem={( { section,item,index }) => {
                                     return (<TouchableOpacity
                                             style={styles.item}
                                             onPress={() => {
                                                 //setSelectedCountry(item+","+section.title)
                                                 values.country=item+","+section.title
                                                 setCountryModal(false)
                                             }}>
                                             <Text style={styles.title}>{item}</Text>
                                     </TouchableOpacity>)
                                 }}
                                 renderSectionHeader={({ section: { title } }) => (
                                     <Text style={styles.header}>{title} Region</Text>
                                 )}
                             />
                             </Modal>
                       
                           <TouchableOpacity
                             onPress={handleSubmit}
                             style={{
                               backgroundColor: COLOR.DEFAULT_COLOR,
                               justifyContent: 'center',
                               alignItems: 'center',
                               borderRadius: 30,
                               marginHorizontal: wp(4),
                               height: wp(10),
                             }}>
                             <Text style={{color: 'white'}}>Save</Text>
                           </TouchableOpacity>
                         </View>
                       )}
                     </Formik>
                   </View>
                 </ScrollView>
               </View>
             </TouchableWithoutFeedback>
           </KeyboardAvoidingView>
      )}
    </SafeAreaView>
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
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 15,
      color: 'black',
      fontSize: wp(4),
      // fontFamily: FONT_FAMILY
    },
    textInputContainer: {
      marginBottom: wp(3),
    },
    item: {
      backgroundColor: 'lightblue',
      padding: 5,
      marginVertical: 1,
    },
    header: {
      fontSize: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 14,
    },
});