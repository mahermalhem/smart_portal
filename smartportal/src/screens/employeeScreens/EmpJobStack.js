import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  Button,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {AuthContext} from '../../utils';
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
import {EmpJobScreen} from './EmpJobScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { EmpJobDescScreen } from './EmpJobDescScreen';
import { EmpAddJob } from './EmpAddJob';

export function EmpJobStack() {
  const StackJobs = createStackNavigator();
  return (
    <StackJobs.Navigator initialRouteName="EmpJobScreen">
      <StackJobs.Screen
        name="EmpJobScreen"
        component={EmpJobScreen}
        options={{title: "Jobs"}}
      />
      <StackJobs.Screen
        name="EmpJobDescScreen"
        component={EmpJobDescScreen}
        options={{title: "Job details"}}
      />
      <StackJobs.Screen
        name="EmpAddJob"
        component={EmpAddJob}
        options={{title: "Add new job"}}
      />
    </StackJobs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
