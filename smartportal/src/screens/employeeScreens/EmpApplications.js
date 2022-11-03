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
import {AuthContext} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {hideLoader, showLoader} from '../../redux/actions/loaderAction';
import EmpApplicationCard from '../../components/EmpApplicationCard';

export function EmpApplications({navigation}) {
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
  const [applicationsList, setApplicationsList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      getAllApplications();
    }, []),
  );

  const [query, setQuery] = useState('');
  useEffect(() => {
    getAllApplications();
  }, [query]);

  const getAllApplications = async () => {
    dispatch(showLoader());

    fetch("http://54.162.241.44/api/user-job/company-users-applications-list/", {
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
          setApplicationsList(json['data']['list']);
        }
      })
      .catch(error => {
        console.log(error);
        dispatch(hideLoader());
      });
  };
  const _renderApplications = ({item, index}) => (
    <EmpApplicationCard
      item={item}
      navigation={navigation}
      getAllApplications={getAllApplications}
      access_token={access_token}
    />
  );

  return (
    <SafeAreaView style={container}>
      <View style={{flex: 1, margin: wp(2)}}>
        <FlatList
          ref={listRef}
          data={applicationsList}
          nestedScrollEnabled
          style={{flex: 1, marginVertical: wp(1)}}
          renderItem={_renderApplications}
          keyExtractor={(item, index) => index.toString()}
          snapToInterval={wp(15)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                getAllApplications();
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
                    You haven't applied for any job yet !
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
