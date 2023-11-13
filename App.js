import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button,  SafeAreaView, Linking } from 'react-native';

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
    getLocation();
  }, []);

  // console.log('here i is', locationData);


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>Contacts thinge</Text>
        <FlatList 
          data={contactData}  // a list of data objects to do something with
          keyExtractor={contact => contact.id}     // a function that returns a unique key for each item
          renderItem={({ item }) =>  
            <Button 
              title={item.name} 
              onPress={() => call(item)} 
            />
          }
        />
        <StatusBar style="auto" />
      </View>
      <View style={styles.footer}>
        <Text>Location Data Received:</Text>
        <Text style={styles.locationInfo}>{locationText}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'purple',
  },
  footerText: {
    color: 'red',
  }
});
