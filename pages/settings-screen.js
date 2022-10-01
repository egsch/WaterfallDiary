import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Switch,
  TouchableOpacity
} from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import {styles} from '../styles.js';

const image = require("../img/waterfall2.jpg");
const image2 = require("../img/black.jpeg");

var SettingsScreen = ({ route, navigation }) => {
  // Redux Hooks to store
  var dispatch = useDispatch();

  stateWallpaper = useSelector(state => state.theme);

  // React Hooks for state
  const [wallpaper, setWallpaper] = React.useState(stateWallpaper);
  const toggleWallpaper = () => {
    setWallpaper((previousState) => !previousState);
  };

  return (
    <ImageBackground source={stateWallpaper ? image : image2} style={styles.image}>
    <View>
        <Text style={styles.titleText}>settings</Text>
        <View style={styles.settingsBox}>
        <Text style={styles.smallText}>Waterfall themed wallpaper</Text>
        <Switch
          trackColor={{ false: "#666", true: "#BBB" }}
          thumbColor={wallpaper ? "#adc" : "#fff"}
          value={wallpaper}
          onValueChange={toggleWallpaper}
        />
        </View>
        <Text style={styles.smallText}>
          Photo by José Daniel Toledo Madero on Unsplash
        </Text>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            onPress={(event) => {
                dispatch({ type: "THEME", theme: wallpaper});
                navigation.navigate("Home")
            }}
          >
            <Text style={styles.subheadText}>save</Text>
          </TouchableOpacity>
        </View>
    </View>
    </ImageBackground>
  );
};

export { SettingsScreen };
