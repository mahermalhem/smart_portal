import 'react-native-gesture-handler';
import * as React from 'react';
import {Button, Text, TextInput, View, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from './utils';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SignInScreen} from './screens/SignInScreen';
import {RegisterScreen} from './screens/RegisterScreen';
import {HomeScreen} from './screens/HomeScreen';
import {EmailForgetPassword, SplashScreen} from './screens';
import NetInfo from '@react-native-community/netinfo';
import {fcmService} from '../src/services/NotificationService/FCMService';
import {localNotificationService} from '../src/services/NotificationService/localNotificationService';
import AppNotConnected from './components/AppNotConnected';
import {ForgetPassword} from './screens/ForgetPassword';
import {useDispatch, useSelector} from 'react-redux';
import {EmpHomeScreen} from './screens/employeeScreens/EmpHomeScreen';
import {EmpJobScreen} from './screens/employeeScreens/EmpJobScreen';
import {EmpJobStack} from './screens/employeeScreens/EmpJobStack';
import {EmpProfileScreen} from './screens/employeeScreens/EmpProfileScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {DrawerContent} from './components/DrawerContent';
import { MyApplications } from './screens/MyApplications';
import { EmpApplications } from './screens/employeeScreens/EmpApplications';

const SeekerTab = createBottomTabNavigator();
const EmpTab = createBottomTabNavigator();
const SeekerDrawer = createDrawerNavigator();

function EmployeeHomeTab() {
  return (
    <EmpTab.Navigator>
      <EmpTab.Screen
        name="My profile"
        component={EmpProfileScreen}
        options={{
          tabBarLabel: 'My profile',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
      <EmpTab.Screen
        name="Jobs"
        component={EmpJobStack} /*component={HomeStack}*/
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="content-paste"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <EmpTab.Screen
        name="Applications"
        component={EmpApplications} /*component={HomeStack}*/
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="application"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </EmpTab.Navigator>
  );
}

function JobSeekerHomeTab() {
  return (
    <SeekerTab.Navigator>
      <SeekerTab.Screen
        name="Home"
        component={HomeScreen} /*component={HomeStack}*/
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
    </SeekerTab.Navigator>
  );
}

function JobSeekerHomeDrawer() {
  return (
    <SeekerDrawer.Navigator
      screenOptions={{
        drawerType: 'front',
        drawerPosition: 'left',
        drawerStyle: {
          width: wp(50),
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <SeekerDrawer.Screen name="Home" component={HomeScreen} />
      <SeekerDrawer.Screen name="myProfile" options={{title: 'My profile'}} component={EmpProfileScreen} />
      <SeekerDrawer.Screen name="myApplications" options={{title: 'My Applications'}} component={MyApplications} />

    </SeekerDrawer.Navigator>
  );
}

// function HomeDrawer() {
//   // return <SafeAreaView >
//   //   <Text>homedsanfaslkfm;akmfskamsf;kam</Text>
//   // </SafeAreaView>

//   return (
//     <drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerType: 'front',
//         drawerPosition: isRTL == true ? 'right' : 'left',
//         drawerStyle: {
//           width:wp(50),
//           justifyContent: 'center',
//           alignItems: 'center',
//         }
//       }}
//       drawerContent={props => <DrawerContent {...props} />}
//     >
//       <drawer.Screen name="home" component={HomeScreen} />
//       <drawer.Screen name="favourite" component={FavouritesScreen} />
//       <drawer.Screen name="recording" component={RecordingScreen} />
//       <drawer.Screen name="profile" component={ProfileScreen} />
//       <drawer.Screen name="songDetailesScreen" component={SongDetailesScreen} />
//       <drawer.Screen name="myRecordsScreen" component={MyRecordsScreen} />
//       <drawer.Screen name="userProfileScreen" component={UserProfileScreen} />
//       <drawer.Screen name="groups" component={GroupsScreen} />
//       <drawer.Screen name="groupRecords" component={GroupRecordsScreen} />
//       <drawer.Screen name="verify" component={VerifyEmailScreen} />

//     </drawer.Navigator>
//   );
// }

const StackAuth = createStackNavigator();

function AuthStack() {
  return (
    <StackAuth.Navigator initialRouteName="SignIn">
      <StackAuth.Screen
        name="SignIn"
        component={SignInScreen}
        options={{title: 'Sign in'}}
      />
      <StackAuth.Screen name="Register" component={RegisterScreen} />
      <StackAuth.Screen
        name="EmailForgetPassword"
        component={EmailForgetPassword}
        options={{title: 'Forget password'}}
      />
      <StackAuth.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{title: 'Forget password'}}
      />
    </StackAuth.Navigator>
  );
}

const Stack = createStackNavigator();

export default function AppInit({navigation}) {
  var type;

  useSelector(state => {
    type = state.userReducer.type;
  });

  const [isConnected, setIsConnected] = React.useState(true);

  React.useEffect(() => {
    NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });
  }, []);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          if (action.token) {
            AsyncStorage.setItem('userToken', action.token);
          }
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          AsyncStorage.removeItem('userToken');
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    LogBox.ignoreLogs([
      'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported',
      'removeListener',
      'Clipboard has been extracted from react-native core',
      "Can't perform a React state update on an unmounted ",
    ]);
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);
  React.useEffect(() => {
    //fcmService.registerAppWithFCM()
    //fcmService.register(onRegister, onNotification, onOpenNotification)
    fcmService.getToken(onRegister);
    localNotificationService.configure(onOpenNotification);

    async function onRegister(token) {
      console.log('[App] onRegister: ', token);
      await AsyncStorage.setItem('deviceToken', token);
    }
    function onNotification(notify) {}
    function onOpenNotification(notify) {}
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: async () => {
        dispatch({type: 'SIGN_OUT'});
        await AsyncStorage.clear();
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignInAuth"
              component={AuthStack}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : // User is signed in
          type == 'employee' ? (
            <Stack.Screen name="HomeAuth" component={EmployeeHomeTab} />
          ) : (
            <Stack.Screen name="HomeAuth" component={JobSeekerHomeDrawer} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {!isConnected ? <AppNotConnected /> : null}
    </AuthContext.Provider>
  );
}
