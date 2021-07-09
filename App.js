import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Button,
  AsyncStorage,
  Alert,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { render } from "react-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import moment from "moment";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants"
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { AppLoading } from 'expo-app-loading';
import { useFonts } from "expo-font"

var INITIAL_STATE = {
  entries: [
    {
      key: 100,
      groupDate: moment(),
      dateEntries: [
        { key: 0, entry: "Hi! Waterfall diary is a beautiful and simple personal diary app. When you add entries, you'll see them here.", date: moment(), image:null },
        {
          key: 1,
          entry: "Thanks for testing waterfall. Please send some feedback",
          date: moment(),
          image: null
        },
      ],
    },
  ],
  theme: true
};

// Reducer for Redux store
const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD":
      var modified = [...state.entries];
      // Finds first group with date that matches entry
      var index = modified.findIndex((element) =>
        moment().isSame(element.groupDate, "day")
      );
      // If group
      if (index >= 0) {
        var sameDay = modified[index];
        console.log(sameDay);
        var selected = sameDay.dateEntries;
        selected.push({
          key: index.toString() + modified[index].dateEntries.length,
          entry: action.entry,
          date: moment(),
          image: action.image || null
        });
      } else {
        modified.unshift({
          key: modified.length + 1 + "00",
          groupDate: moment(),
          dateEntries: [
            {
              key:
                (modified.length + 1).toString() +
                "0",
              entry: action.entry,
              date: moment(),
              image: action.image || null
            },
          ],
        });
      }
      modified = modified.sort((a, b) => moment(b.groupDate).valueOf - moment(a.groupDate).valueOf);
      return { entries: modified, theme: state.theme };
    case "CLEAR":
      return { entries: [], theme: state.theme };
    case "THEME":
      return {entries: state.entries, theme: action.theme }
    default:
      return state;
  }
};

const persistConfig = {
  storage: AsyncStorage,
  key: "root",
};
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer);
let persistor = persistStore(store);

// Import app pages
import {HomeScreen} from './pages/home-screen.js';
import {DiaryScreen} from './pages/diary-screen.js';
import {CameraScreen} from './pages/camera-screen.js';
import {SettingsScreen} from './pages/settings-screen.js';

import {styles} from './styles.js';

moment().format();

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const image = require("./img/waterfall2.jpg");
const image2 = require("./img/black.jpeg");
const navigationRef = React.createRef()

var HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" options={{cardStyle:{backgroundColor: 'black'}, transparentCard: true}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const myTheme = {
  colors: {
    background: 'transparent',
    card: 'transparent',
  },
}

function NavApp() {
  stateWallpaper = useSelector(state => state.theme);

  return(
  <ImageBackground source={stateWallpaper ? image : image2} style={styles.image}>
  <NavigationContainer ref={navigationRef} theme={myTheme}>
    <View style={styles.statusBar} />
    <StatusBar style = "light" hidden = {false} backgroundColor = "#444" translucent = {true}/>
    <Tab.Navigator
      tabBarOptions = {{
          activeTintColor: '#fff',
          inactiveTintColor: '#999',
          pressOpacity: 0.25,
          style: {
            backgroundColor: '#ffffff20',
            padding: 0
          },
          tabStyle: {backgroundColor: '#ffffff20'},
          upperCaseLabel: false,
          labelStyle: {
            fontFamily: "serif",
          }

        }}
      theme = {myTheme}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Diary" component={DiaryScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  </ImageBackground>)
}

export default function App() {

  let [fontsLoaded] = useFonts({
      'Lora': require('./assets/fonts/Lora-VariableFont_wght.ttf'),
      'Lora Italic': require('./assets/fonts/Lora-Italic-VariableFont_wght.ttf'),
    });


  if (!fontsLoaded){
    return <Text />
  } else {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavApp />
      </PersistGate>
    </Provider>
  );
}
}
