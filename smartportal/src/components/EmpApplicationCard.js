import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    UIManager,
    LayoutAnimation,
    Alert,
    TextInput,Image,
    Platform,
    Linking,
  } from 'react-native';
  import React, {useCallback, useRef, useState, useEffect} from 'react';
  import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  import Modal from 'react-native-modal';
  import {COLOR} from '../constants/COLORS';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import Feather from 'react-native-vector-icons/Feather';
  import FilePickerManager from 'react-native-file-picker';
  import DocumentPicker from 'react-native-document-picker';
  import { hideLoader, showLoader } from '../redux/actions/loaderAction';
  import { useDispatch, useSelector } from 'react-redux';
  
  const EmpApplicationCard = props => {
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [file, setFile] = useState();
    const [note, setNote] = useState('');
    const dispatch = useDispatch()
    
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  
    const [expanded, setExpanded] = useState(false);
    const changeLayout = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setExpanded(!expanded);
    };
  
    const checkRemove = () => {
      Alert.alert(
        'Delete job',
        'Are you sure you want to remove ' + props.item['title'],
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'YES', onPress: () => removeItem()},
        ],
      );
    };
  
    // const removeItem = () => {
    //   fetch('http://54.162.241.44/api/job/delete-job/?id=' + props.item['id'], {
    //     method: 'DELETE',
    //     headers: {
    //       Authorization: 'Bearer ' + props.access_token, //change to auth_key in diff api
    //     },
    //   })
    //     .then(response => response.json())
    //     .then(json => {
    //       console.log(json);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    //   props.getAllJobs();
    // };
  
   
    const changeApplicationStatus = (status) => {
        dispatch(showLoader())
        const fdata = new FormData();
        fdata.append('status', status);
        fetch("http://54.162.241.44/api/user-job/update-application-job-status/?id="+props.item['id'], {
          method: 'POST',
          headers: {
            "Authorization":"Bearer " + props.access_token,
          },
          body: fdata
        }).then((response) => response.json())
          .then(async (json) => {
            dispatch(hideLoader())

            console.log(json)
            if(json['status']){
              console.log(json)
              props.getAllApplications();
            }
          })
          .catch((error) => {
            console.log(error);
            dispatch(hideLoader())
          });
        dispatch(hideLoader())
    };
  
    return (
      <View
        style={{
          flex: 1,
          borderWidth: wp(0.5),
          borderRadius: wp(10),
          padding: wp(2),
          borderRadius: 10,
          borderColor: 'lightblue',
          marginBottom: wp(2),
        }}>
        <View
          style={{
            flex: 2,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexDirection: 'row',
            marginBottom: wp(4),
          }}>
          <Text style={{color: 'black', fontSize: wp(4)}}>
            <MaterialCommunityIcons
              name="account"
              color={COLOR.DEFAULT_COLOR}
              size={wp(5)}
            />
            {props.item['userDetails']['username']}
          </Text>
          <Text style={{color: 'black', fontSize: wp(3)}}>
            {/* {props.item['country']}    */}
            {props.item['job_id']}
          </Text>
        </View>
  
        <View
          style={{
            flex: 2,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: wp(4),
          }}>
          <Text style={{color: 'black', fontSize: wp(5)}}>
            {props.item['jobDetails']['title']}
          </Text>
        </View>
        <Text>Added file : </Text>

        {props.item['file'] != null 
            ?<TouchableOpacity
            onPress={()=>{
                //Linking.openURL(props.item['file'])
                Linking.openURL("https://drive.google.com/file/d/1KDk0HfP_KEQWw1bfEmwfV97LkF6JBKvw/view?usp=sharing")
            }}
            style={{
                flex: 2,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: wp(2),
            }}>
                <Text style={{color: COLOR.DEFAULT_COLOR, fontSize: wp(3)}}>
                    {/* {props.item['file']} */}
                    https://drive.google.com/file/d/1KDk0HfP_KEQWw1bfEmwfV97LkF6JBKvw/view?usp=sharing
                </Text>
            </TouchableOpacity>
            :<Text style={{color: 'red', fontSize: wp(3.5)}}>No file</Text>

        }
        <Text>Current application status : </Text>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: wp(3),
            width:"25%",
            padding: wp(2),
            marginTop:wp(3),
            backgroundColor:props.item['status']=='accepted'?"green":props.item['status']=='rejected'?COLOR.RED:"#fbbb15",
          }}>
          <View style={{}}>
            <Text style={{color: 'white', fontSize: wp(3.5)}}>{props.item['status']}</Text>
          </View>
          
        </View>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginVertical:wp(3)}}>
          <TouchableOpacity style={{backgroundColor:'green',padding:wp(2)}} onPress={()=>{
            changeApplicationStatus("accepted")
          }}>
            <Text style={{color: 'white', fontSize: wp(3.5)}}>Accept application</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:COLOR.RED,padding:wp(2)}} onPress={()=>{
            changeApplicationStatus("rejected")
          }}>
            <Text style={{color: 'white', fontSize: wp(3.5)}}>Reject application</Text>
          </TouchableOpacity>
        </View>
        
        {expanded == false ? (
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              changeLayout();
            }}>
            <Text style={{color: 'green', fontSize: wp(3)}}>Show more</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <View style={{borderRadius: 10, padding: wp(2), borderWidth: 0.3}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: wp(2),
                  borderBottomWidth: 0.5,
                }}>
                <View style={{flex: 1.2}}>
                  <Text>Note : </Text>
                </View>
                <View style={{flex: 2, marginBottom: wp(2)}}>
                    {props.item['note'] == null || props.item['note'] == '' 
                        ?<Text style={{color: 'red', fontSize: wp(3.5)}}>No Note</Text>
                        :<Text style={{color: 'black', fontSize: wp(3.5)}}>{props.item['note']}</Text>
                    }
                </View>
              </View>
  
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: wp(2),
                  borderBottomWidth: 0.5,
                }}>
                <View style={{flex: 1.2}}>
                  <Text>Application sent date : </Text>
                </View>
                <View style={{flex: 2, marginBottom: wp(2)}}>
                  <Text>{props.item['jobDetails']['created_at']}</Text>
                </View>
              </View>
  
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: wp(2),
                  borderBottomWidth: 0.5,
                }}>
                <View style={{flex: 1.2}}>
                  <Text>Contact info : </Text>
                </View>
                <View style={{flex: 2, marginBottom: wp(2)}}>
                  <Text style={{marginBottom: wp(1)}}>Email </Text>
                  <TouchableOpacity
                    style={{marginBottom: wp(2)}}
                    onPress={() => {
                      Linking.openURL(
                        `mailto:${props.item['userDetails']['email']}`,
                      );
                    }}>
                    <Text style={{color: COLOR.DEFAULT_COLOR}}>
                      {props.item['userDetails']['email']}
                    </Text>
                  </TouchableOpacity>
                  <Text style={{marginBottom: wp(1)}}>Phone </Text>
                  <TouchableOpacity
                    style={{marginBottom: wp(2)}}
                    onPress={() => {
                      Linking.openURL(
                        `tel:${props.item['userDetails']['phone']}`,
                      );
                    }}>
                    <Text style={{color: COLOR.DEFAULT_COLOR}}>
                      {props.item['userDetails']['phone']}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
  
            <TouchableOpacity
              style={{flex: 1, paddingVertical: wp(2)}}
              onPress={() => {
                changeLayout();
              }}>
              <Text style={{color: 'green', fontSize: wp(3)}}>Show less</Text>
            </TouchableOpacity>
          </View>
        )}
  
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {flexDirection: 'row', marginTop: wp(25)},
    textInput: {
      width: '100%',
      backgroundColor: '#fff',
      paddingVertical: 5,
      paddingHorizontal: 5,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 15,
      color: 'black',
      textAlign: 'auto',
      fontSize: wp(4),
      // fontFamily: FONT_FAMILY
    },
  });
  
  export default EmpApplicationCard;
  