import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import {COLOR} from '../constants/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const JobCard = props => {
  
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
  
  const removeItem=()=>{
    fetch("http://54.162.241.44/api/job/delete-job/?id="+props.item['id'], {
        method: 'DELETE',
        headers: {
          "Authorization":"Bearer "+ props.access_token //change to auth_key in diff api
        },
      }).then((response) => response.json())
        .then( (json) => {
            console.log(json);
        })
        .catch((error) => {
          console.log(error);
        });
    props.getCompanyJobs()
  }
  

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightblue',
        padding: wp(2),
        borderRadius: 10,
        marginBottom: wp(2),
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: wp(2),
        }}>
        <View style={{flex: 2, alignItems: 'flex-start'}}>
          <Text style={{color: 'black', fontSize: wp(5)}}>
            {props.item['title']}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={{color: 'black', fontSize: wp(3.5)}}>
            {props.item['companyDetails']['username']}
          </Text>
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row', marginBottom: wp(1)}}>
        <View style={{flex: 1}}>
          <Text style={{color: 'black', fontSize: wp(3.5)}}>Country</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={{color: 'black', fontSize: wp(3.5)}}>
            {props.item['country']}
          </Text>
        </View>
      </View>
      <View style={{flex: 2, flexDirection: 'row', marginBottom: wp(1)}}>
        <View style={{flex: 1}}>
          <Text style={{color: 'black', fontSize: wp(3.5)}}>Address</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={{color: 'black', fontSize: wp(3.5)}}>
            {props.item['address']}
          </Text>
        </View>
      </View>
      <View style={{flex: 2, flexDirection: 'row', marginBottom: wp(1)}}>
        <View style={{flex: 1}}>
          <Text style={{color: 'black', fontSize: wp(3.5)}}>Created at</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={{color: 'black', fontSize: wp(3.5)}}>
            {props.item['created_at']}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginHorizontal: wp(2),
          marginBottom: wp(2),
        }}
        onPress={() => {
          console.log(props.item['id']);
          props.navigation.navigate('EmpJobDescScreen', {
            job:{
              jobId: props.item['id'],
              jobTitle: props.item['title'],
              jobDesc: props.item['description'],
              jobAdress: props.item['address'],
              jobCountry: props.item['country'],
            },
          });
        }}>
        <Text style={{color: 'purple', fontSize: wp(3.5)}}>Details </Text>
        <Entypo name="edit" color={'black'} size={wp(5)} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginHorizontal: wp(2),
          marginBottom: wp(2),
        }}
        onPress={() => {
            checkRemove();
        }}>
        <Text style={{color: 'red', fontSize: wp(3.5)}}>Delete job </Text>
        <Entypo name="circle-with-cross" color={'red'} size={wp(5)} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flexDirection: 'row', marginTop: wp(25)},
});

export default JobCard;
{
  /* <Text>Job Card {props.item['title']} {props.item['companyDetails']['username']}</Text> */
}

// {
//     "id": 3,
//     "company_id": 10,
//     "title": "Dotnet Programmer",
//     "description": "dasdadsad"
//     "country": "Rydah",
//     "address": " On-site mecca street",
//     "created_at": "2022-10-18 21:02:25",
//     "companyDetails": {
//         "id": 10,
//         "type": "employee",
//         "status": "active",
//         "username": "Nad",
//         "email": "maherola204@gmail.com",
//         "phone": "07978988",
//         "password_hash": "$2y$13$3FchEZL36nFLmszxJ1h/9eBbqifQ9rg7icXrZfenVnGJ.0GCboAqa",
//         "password_reset_token": null,
//         "auth_key": "eRaAc7D3FFbA4zgR13xU925tZU0fJjic1666131062",
//         "device_token": "c_Ca3TmxTXuxDTtbm_fE6N:APA91bHfn4hbr7NmEhp7fUdc1Uj5gOFZxpb3KYfBgvwWtUOHOHgM_pZqVW9rnTyhhLsMD6KCVPCFO2XTRcsLL8y4wUwMQ3nfmV3tt7RS3XL_aLKVpyyU5pCl42DFDRR3TmF9rfbNQmUd",
//         "verification_token": "123415",
//         "created_at": "2022-10-09 12:50:48",
//         "updated_at": "2022-10-18 22:11:03"
//     }
// },
