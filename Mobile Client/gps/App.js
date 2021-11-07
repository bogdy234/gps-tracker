/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  PermissionsAndroid,
  Text,
  View,
  Modal,
  Pressable,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
//import DeviceInfo which will help us to get UniqueId
import DeviceInfo from 'react-native-device-info';
import C from './utils/constants';
import {requestLocationPermission, post} from './utils/functions';

const App = () => {
  const [deviceId, setDeviceId] = useState('');
  const [coordinates, setCoordinates] = useState({latitude: '', longitude: ''});
  const [errorText, setErrorText] = useState(false);
  const [successText, setSuccessText] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const getDeviceId = () => {
    // get unique id for device
    const uniqueId = DeviceInfo.getUniqueId();
    setDeviceId(uniqueId);
  };

  useEffect(() => {
    // Call the function to set uid and request for location permission if needed.
    getDeviceId();
    requestLocationPermission(PermissionsAndroid);
  }, []);

  const failGetCoordinates = error => {
    // In case something goes wrong getting coordinates
    console.log(error);
    // If user didn't activated their location
    if (error.message === C.NO_LOCATION_ACTIVE) {
      setModalVisible(true);
    }
  };

  const succesGetCoordinates = ({coords}) => {
    // If no errors are thrown set state with coordinates
    console.log(coords);
    const coordinates = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
    setCoordinates(coordinates);
  };

  const sendCoordinatesHandler = () => {
    // Make a POST request to store the coordinates in the database

    let options;
    if (!errorText) {
      options = {enableHighAccuracy: true, timeout: 20000};
    } else {
      options = {enableHighAccuracy: false, timeout: 10000};
    }
    Geolocation.getCurrentPosition(
      succesGetCoordinates,
      failGetCoordinates,
      options,
    );

    const currentDate = Date.now();

    const body = {
      terminalId: deviceId,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      date: currentDate,
    };
    if (body.latitude !== '' && body.longitude !== '') {
      post(C.postURL, body);
      setErrorText(false);
      setSuccessText(true);
    } else {
      console.log('Some error occured...');
      setErrorText(true);
      setSuccessText(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      sendCoordinatesHandler(true);
    }, 300000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <SafeAreaView style={[styles.sectionContainer]}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalText}>
                {C.TEXT.LOCATION_TURNED_OFF}
              </Text>
              <Pressable
                style={[modalStyles.button, modalStyles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={modalStyles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Text style={[styles.sectionTitle]}>{C.TEXT.GPS_TRACKER}</Text>
        <Text
          style={[
            styles.sectionSubTitle,
          ]}>{`${C.TEXT.YOUR_ID}${deviceId}`}</Text>
        <View style={[styles.container]}>
          <TouchableOpacity
            style={[styles.styledButton]}
            onPress={sendCoordinatesHandler}>
            <Text>{C.TEXT.SEND_COORDINATES}</Text>
          </TouchableOpacity>
          {successText && (
            <Text style={[styles.successText]}>{C.TEXT.SUCCESS_TEXT}</Text>
          )}
          {errorText && (
            <Text style={[styles.errorText]}>{C.TEXT.ERROR_TEXT}</Text>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});

const styles = StyleSheet.create({
  successText: {
    paddingTop: 10,
    color: '#fff',
  },
  errorText: {
    paddingTop: 10,
    color: '#f00',
  },
  styledButton: {
    height: 100,
    backgroundColor: 'skyblue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    display: 'flex',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingBottom: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  sectionSubTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default App;
