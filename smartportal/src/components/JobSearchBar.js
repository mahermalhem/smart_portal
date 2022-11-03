import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SectionList,
  TextInput,
} from 'react-native';
import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import {COLOR} from '../constants/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CountriesEn} from '../utils';

const JobSearchBar = props => {
  const [countryModal, setCountryModal] = useState(false);
  const [searchText, setSearchText] = useState('');

  return (
    <View
      style={{
        padding: wp(1),
        margin: wp(1),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgray',
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 1 / 3,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log(searchText);
            setCountryModal(true)
          }}>
          <MaterialIcons
            name="location-city"
            color={COLOR.DEFAULT_COLOR}
            size={wp(8)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log(searchText);
            props.setQuery(searchText);
          }}>
          <MaterialIcons
            name="search"
            color={COLOR.DEFAULT_COLOR}
            size={wp(8)}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <TextInput
          name={'search'}
          style={styles.textInput}
          placeholder="Search"
          onChangeText={value => {
            setSearchText(value);
          }}
          value={searchText}
        />
      </View>
      <Modal
        isVisible={countryModal}
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 30,
          padding: wp(10),
        }}>
        <TouchableOpacity style={{alignSelf:'flex-end',marginBottom:wp(1)}} onPress={()=>{
            setCountryModal(false)
        }}>
            <MaterialIcons
                name="cancel"
                color={COLOR.RED}
                size={wp(6)}
            />
        </TouchableOpacity>
        <SectionList
          sections={CountriesEn}
          nestedScrollEnabled={true}
          keyExtractor={(item, index) => item + index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({section, item, index}) => {
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  //setSelectedCountry(item+","+section.title)
                  //values.country = item + ',' + section.title;
                  setSearchText(item + ',' + section.title)
                  setCountryModal(false);
                  props.setQuery(item);
                  console.log(item, ',', section.title);
                }}>
                <Text style={styles.title}>{item}</Text>
              </TouchableOpacity>
            );
          }}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </Modal>
    </View>
  );
};

export default JobSearchBar;

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
  
