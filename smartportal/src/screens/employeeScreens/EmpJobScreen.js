import React, {useCallback,useRef, useState,useEffect} from 'react';
import {Button, Text, View, SafeAreaView,FlatList, StyleSheet,RefreshControl,TouchableOpacity} from 'react-native';
import { AuthContext } from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import { ENDPOINTS } from '../../constants/endpoints';
import { hideLoader, showLoader } from '../../redux/actions/loaderAction';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import JobCard from '../../components/JobCard';

export function EmpJobScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const {container} = styles;
  const dispatch=useDispatch()
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
    (type = state.userReducer.type)
  });
  
  const listRef = useRef()
  const [jobsList, setJobsList] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);

  useFocusEffect(useCallback(() => {
    getCompanyJobs()
  }, []));
  // useEffect(() => {
  //   getCompanyJobs()
  // }, [])

  const getCompanyJobs=async()=>{

    dispatch(showLoader())
    
    fetch(ENDPOINTS.BASE_URL+ENDPOINTS.COMPANY_JOB_LIST, {
      method: 'GET',
      headers: {
        "Authorization":"Bearer "+ access_token //change to auth_key in diff api
      },
    }).then((response) => response.json())
      .then(async (json) => {
        dispatch(hideLoader())
        if(json['status']){
          console.log(json['data']['list'])
          setJobsList(json['data']['list'])
        }
      })
      .catch((error) => {
        // Toast.show(JSON.stringify(error), Toast.SHORT)
        console.log(error);
        dispatch(hideLoader())
      });
  }
  const _renderJob = ({ item, index }) => (
    <JobCard item={item} navigation={navigation} getCompanyJobs={getCompanyJobs} access_token={access_token}/>
  );
  return (
    <SafeAreaView style={container}>
      <View style={{flex:1,margin:wp(2),}}>
        <FlatList
          ref={listRef}
          data={jobsList}
          nestedScrollEnabled
          style={{ flex: 1, marginVertical: wp(2) }}
          renderItem={_renderJob}
          keyExtractor={(item, index) => index.toString()}
          snapToInterval={wp(15)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={()=>{
                getCompanyJobs()
              }}
            />
          }
          // ListHeaderComponent={() => {
          //   return (
          //     <View style={{ justifyContent:'space-evenly', alignItems: 'center', flex: 1, marginHorizontal: wp(3),flexDirection:'row', }}>
          //       <Text style={{ color: 'black',fontSize: wp(6) }}>
          //         Test
          //       </Text>
          //       <Icon name="money-check" size={30} color='black' />
          //     </View>
          //   )
          // }}
          ListEmptyComponent={() => {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{color: 'black',fontSize: wp(5),textAlign:'center' }}>
                    There is no jobs added yet ! 
                  </Text>
                  <Text style={{color: 'black',fontSize: wp(5),textAlign:'center'}}> Click the plus icon to add new job</Text>
                </View>
              </View>
            )
          }}
        />
        <TouchableOpacity style={{alignSelf:'flex-end',
          position:'absolute',bottom:0,right:0
        }} onPress={()=>{
          navigation.navigate('EmpAddJob')
        }}>
          <Entypo name="circle-with-plus" color={'green'} size={wp(17)} />
        </TouchableOpacity>
      </View>
       
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
