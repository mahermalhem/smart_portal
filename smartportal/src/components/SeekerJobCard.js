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

const SeekerJobCard = props => {
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

  const showFileInput= async ()=>{
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res[0].uri);
      console.log('Type : ' + res[0].type);
      console.log('File Name : ' + res[0].name);
      console.log('File Size : ' + res[0].size);
      //Setting the state to show single file attributes
      setFile(res[0].uri);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }

  }
  const applyForJob = () => {
    if(file!=undefined){
      if(file[0]['size']<1065070){
        dispatch(showLoader())
        const fdata = new FormData();
        fdata.append('note', note);
        fdata.append('file', file[0]['uri']);
        fetch("http://54.162.241.44/api/user-job/apply-job/?id="+props.item['id'], {
          method: 'POST',
          headers: {
            "Authorization":"Bearer " + props.access_token,
          },
          body: fdata
        }).then((response) => response.json())
          .then(async (json) => {
            dispatch(hideLoader())
            if(json['status']){
              console.log(json)
              setShowApplyModal(false)
              props.getAllJobs();
            }
          })
          .catch((error) => {
            console.log(error);
            dispatch(hideLoader())
          });
        dispatch(hideLoader())
      }
    }
    
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
            name="office-building"
            color={COLOR.DEFAULT_COLOR}
            size={wp(5)}
          />
          {props.item['country']}
        </Text>
        <Text style={{color: 'black', fontSize: wp(3)}}>
          {/* {props.item['country']}    */}
          {props.item['companyDetails']['username']}
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
          {props.item['title']}
        </Text>
      </View>
      {props.item['isApplied'] ? (
        <View style={{flexDirection: 'row', flex: 1, marginBottom: wp(3)}}>
          <View style={{}}>
            <Text style={{color: 'black', fontSize: wp(3.5)}}>Applied</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: wp(1),
            }}>
            <Feather
              name="check-circle"
              color={COLOR.DEFAULT_COLOR}
              size={wp(5)}
            />
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setShowApplyModal(true);
          }}
          style={{
            flexDirection: 'row',
            width: '25%',
            marginBottom: wp(3),
            padding: wp(2),
            backgroundColor: COLOR.DEFAULT_COLOR,
          }}>
          <View style={{}}>
            <Text style={{color: 'white', fontSize: wp(3.5)}}>Apply</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: wp(1),
            }}>
            <MaterialCommunityIcons name="send" color="white" size={wp(5)} />
          </View>
        </TouchableOpacity>
      )}

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
              <View style={{flex: 1}}>
                <Text>Address : </Text>
              </View>
              <View style={{flex: 2, marginBottom: wp(2)}}>
                <Text>{props.item['address']}</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: wp(2),
                borderBottomWidth: 0.5,
              }}>
              <View style={{flex: 1}}>
                <Text>Description : </Text>
              </View>
              <View style={{flex: 2, marginBottom: wp(2)}}>
                <Text>{props.item['description']}</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: wp(2),
                borderBottomWidth: 0.5,
              }}>
              <View style={{flex: 1}}>
                <Text>Created at : </Text>
              </View>
              <View style={{flex: 2, marginBottom: wp(2)}}>
                <Text>{props.item['created_at']}</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: wp(2),
                borderBottomWidth: 0.5,
              }}>
              <View style={{flex: 1}}>
                <Text>Contact info : </Text>
              </View>
              <View style={{flex: 2, marginBottom: wp(2)}}>
                <Text style={{marginBottom: wp(1)}}>Email </Text>
                <TouchableOpacity
                  style={{marginBottom: wp(2)}}
                  onPress={() => {
                    Linking.openURL(
                      `mailto:${props.item['companyDetails']['email']}`,
                    );
                  }}>
                  <Text style={{color: COLOR.DEFAULT_COLOR}}>
                    {props.item['companyDetails']['email']}
                  </Text>
                </TouchableOpacity>
                <Text style={{marginBottom: wp(1)}}>Phone </Text>
                <TouchableOpacity
                  style={{marginBottom: wp(2)}}
                  onPress={() => {
                    Linking.openURL(
                      `tel:${props.item['companyDetails']['phone']}`,
                    );
                  }}>
                  <Text style={{color: COLOR.DEFAULT_COLOR}}>
                    {props.item['companyDetails']['phone']}
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

      <Modal
        isVisible={showApplyModal}
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 30,
          padding: wp(10),
        }}>
        <View style={{marginBottom: wp(3)}}>
            <Text>Note</Text>
            <TextInput
              name={'notes'}
              style={styles.textInput}
              placeholder="Add your notes here"
              onChangeText={value => {
                setNote(value);
              }}
              value={note}
              multiline
              numberOfLines={5}
            />
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            position: 'absolute',
            zIndex: 100,
            top: wp(5),
            right: wp(5),
            marginBottom: wp(1),
          }}
          onPress={() => {
            setShowApplyModal(false);
          }}>
          <MaterialIcons name="cancel" color={COLOR.RED} size={wp(6)} />
        </TouchableOpacity>
        <View style={{flex: 1, padding: wp(2)}}>
          <TouchableOpacity style={{marginBottom: wp(5)}} onPress={() => {
            showFileInput()
          }}>
            <Text>* Upload your Cv</Text>
            <MaterialIcons
              name="cloud-upload"
              color={COLOR.DEFAULT_COLOR}
              size={wp(10)}
            />  
          </TouchableOpacity>

          <View style={{marginBottom:wp(4),alignItems:'center',justifyContent:'center'}}>
          {file!=undefined
            ?file[0]['size'] < 1065070
              ?file[0]['type'].includes("image")
                ?<View style={{width:wp(45),height:wp(50)}}>
                  <Image
                    style={{height:'100%',width:'100%'}}
                    resizeMode='contain'
                    source={{
                      uri: file[0]['uri'],
                    }}
                  />
                </View>
                :<TouchableOpacity disabled onPress={()=>{
                  //Linking.openURL('www.google.com')
                }}>
                    <FontAwesome5 name="file-pdf" color={COLOR.RED} size={wp(15)} />
                    <Text style={{color:COLOR.DEFAULT_COLOR}}>{file[0]['name']}</Text>
                </TouchableOpacity>
              :<Text style={{color:'red'}}>Max size limit exceed</Text>
            :null
          }

          </View>


          <TouchableOpacity
            onPress={() => {
              applyForJob();
            }}
            style={{
              flexDirection: 'row',
              width:"60%",
              marginBottom: wp(3),
              padding: wp(2),
              backgroundColor: COLOR.DEFAULT_COLOR,
            }}>
            <View style={{}}>
              <Text style={{color: 'white', fontSize: wp(3.5)}}>Send application</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: wp(1),
              }}>
              <MaterialCommunityIcons name="send" color="white" size={wp(5)} />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
// {
//   "id": 13,
//   "company_id": 10,
//   "title": "nEW",
//   "description": "descc",
//   "country": "Afif, Riyadh ",
//   "address": "1234 hashmi street",
//   "created_at": "2022-10-19 21:35:43",
//   "isApplied": false,
//   "companyDetails": {
//       "username": "Nad",
//       "email": "maherola204@gmail.com",
//       "phone": "07978988",

//   }
// },

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

export default SeekerJobCard;
