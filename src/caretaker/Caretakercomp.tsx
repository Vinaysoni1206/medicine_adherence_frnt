/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import Addcaretaker from './Addcaretaker';
import React from 'react';
import CaretakerReq from './Caretakerreq';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useFocusEffect} from '@react-navigation/native';
import {Alert} from 'react-native';
import {Tab, TabView} from 'react-native-elements';
import {Caretaker_nurse, Userfriend} from './AllIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Caretakercomp({navigation}) {
  const [index, setIndex] = React.useState(0);
  useFocusEffect(() => {
    async function checkforlog() {
      const islogged = await GoogleSignin.isSignedIn();
      const checkforlogin = await AsyncStorage.getItem('user_id');

      if (checkforlogin === null) {
        Alert.alert(
          'Sign in first to use this feature',
          'Click ok to proceed',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('Login');
              },
            },
            {
              text: 'Cancel',
              onPress: () => {
                navigation.navigate('Home');
              },
            },
          ],
        );
      }
    }

    checkforlog();
  });

  return (
    <>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: '#3743ab',
          height: 3,
        }}
        style={{backgroundColor: '#3743ab'}}
        variant="primary">
        <Tab.Item
          title="Caretakers"
          containerStyle={{backgroundColor: 'white'}}
          titleStyle={{fontSize: 12, color: '#3743ab'}}
          icon={Caretaker_nurse()}
        />
        <Tab.Item
          title="Caretaker request"
          titleStyle={{fontSize: 12, color: '#3743ab'}}
          containerStyle={{backgroundColor: 'white'}}
          icon={Userfriend()}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <Addcaretaker navigation={navigation}></Addcaretaker>
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <CaretakerReq></CaretakerReq>
        </TabView.Item>
      </TabView>
    </>
  );
}
