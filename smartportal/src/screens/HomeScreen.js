import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  Button,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../utils';
import {useDispatch, useSelector} from 'react-redux';
import PinCodeVer from '../components/PinCodeVer';
import {ENDPOINTS} from '../constants/endpoints';
import {useFocusEffect} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {hideLoader, showLoader} from '../redux/actions/loaderAction';
import JobCard from '../components/JobCard';
import SeekerJobCard from '../components/SeekerJobCard';
import JobSearchBar from '../components/JobSearchBar';

export function HomeScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const {container} = styles;
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

  const listRef = useRef();
  const [jobsList, setJobsList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      getAllJobs();
    }, []),
  );

  const [query, setQuery] = useState('');
  useEffect(() => {
    getAllJobs();
  }, [query]);

  const getAllJobs = async () => {
    dispatch(showLoader());

    fetch(ENDPOINTS.BASE_URL + ENDPOINTS.LIST_OF_JOBS + '?query=' + query, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + access_token, //change to auth_key in diff api
      },
    })
      .then(response => response.json())
      .then(async json => {
        dispatch(hideLoader());
        if (json['status']) {
          // console.log(json['data']['list'])
          setJobsList(json['data']['list']);
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(hideLoader());
      });
  };
  const _renderJob = ({item, index}) => (
    <SeekerJobCard
      item={item}
      navigation={navigation}
      getAllJobs={getAllJobs}
      access_token={access_token}
    />
  );

  return (
    <SafeAreaView style={container}>
      <JobSearchBar setQuery={setQuery} />
      <TouchableOpacity
        onPress={() => {
          console.log(access_token);
        }}>
        <Text>access_token</Text>
      </TouchableOpacity>
      <View style={{flex: 1, margin: wp(2)}}>
        <FlatList
          ref={listRef}
          data={jobsList}
          nestedScrollEnabled
          style={{flex: 1, marginVertical: wp(1)}}
          renderItem={_renderJob}
          keyExtractor={(item, index) => index.toString()}
          snapToInterval={wp(15)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                getAllJobs();
              }}
            />
          }
          ListEmptyComponent={() => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: wp(5),
                      textAlign: 'center',
                    }}>
                    There is no jobs added yet !
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
