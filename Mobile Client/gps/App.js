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
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

//import DeviceInfo which will help us to get UniqueId
import DeviceInfo from 'react-native-device-info';
import C from './utils/constants';
import {requestLocationPermission, post} from './utils/functions';

const App = () => {
  const [deviceId, setDeviceId] = useState('');
  const [coordinates, setCoordinates] = useState({latitude: '', longitude: ''});

  const getDeviceId = () => {
    const uniqueId = DeviceInfo.getUniqueId();
    setDeviceId(uniqueId);
  };

  useEffect(() => {
    getDeviceId();
    requestLocationPermission(PermissionsAndroid);
  }, []);

  const succesGetCoordinates = ({coords}) => {
    const coordinates = {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
    setCoordinates(coordinates);
  };

  const sendCoordinatesHandler = () => {
    const options = {enableHighAccuracy: true, timeout: 20000};

    Geolocation.getCurrentPosition(
      succesGetCoordinates,
      error => console.log(error),
      options,
    );

    const currentDate = Date.now();

    const body = {
      terminalId: deviceId,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      date: currentDate,
    };

    post(C.postURL, body);
  };

  return (
    <>
      <SafeAreaView style={[styles.sectionContainer]}>
        <Text style={[styles.sectionTitle]}>GPS Tracker</Text>
        <View style={[styles.container]}>
          <TouchableOpacity
            style={[styles.styledButton]}
            onPress={sendCoordinatesHandler}>
            <Text>Send GPS coordinates</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default App;
