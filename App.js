import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList,  SafeAreaView, Linking } from 'react-native';

import AppBar from './components/AppBar';
import ContactItem from './components/ComponentButton';

import { Button } from "native-base";
import { NativeBaseProvider, Box } from "native-base";


import * as Contacts from 'expo-contacts';
import * as Location from 'expo-location';

export default function App() {

  const [locationData, setLocationData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationText, setLocationText] = useState('Waiting..');

  const [contactData, setContactData] = useState([]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location  = await Location.getCurrentPositionAsync({});
    setLocationData(location);
    setLocationText(`Lat: ${locationData.coords.latitude}, Long: ${locationData.coords.longitude}`);

    console.log('Get location', locationData);
  }

  const getContacts = async () => {
    let { status } = await Contacts.requestPermissionsAsync(); // ask for permission
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync();
      setContactData(data);
    }
  }

  const call = (contact) => {
    let userName = contact.name;
    let phoneNumber = contact.phoneNumbers[0].number;
    let link = 'tel:' + phoneNumber; // protocol + URL equiv (like http://)
    Linking.canOpenURL(link)
      .then(isSupported=> Linking.openURL(link))
      .catch((e) => {
        console.log('error',e);
      });

    console.log(contact.name, );
  }

  useEffect(() => {
    console.log('App is loaded');
    getContacts();
    // getLocation();
  }, []);

  // console.log('here i is', locationData);


  return (
    <NativeBaseProvider>

      <SafeAreaView style={styles.safeArea}>
        <Box style={styles.container}>
          <FlatList 
            style={styles.list}
            data={contactData}  // a list of data objects to do something with
            keyExtractor={contact => contact.id}     // a function that returns a unique key for each item
            renderItem={({ item }) =>  
              <ContactItem
                title={item.name}  
                handlePress={() => call(item)} />}
          />
          <StatusBar style="auto" />
        <AppBar title={'Contacts List'} />
        </Box>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  list: {
    width: '100%',
    // contentContainerStyle: 'center'
  },
  footer: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'blue',
  },
  locationInfo:{
    flex: 1,
    color: 'purple',
  },
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 2,
    borderColor: 'purple',
  },
  footerText: {
    color: 'red',
  }
});
