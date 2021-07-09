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
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";
import {styles} from '../styles.js';

var HomeScreen = ({ route, navigation }) => {
  // Redux Hooks to store
  var dispatch = useDispatch();

  // React Hooks for state
  const [value, onChangeText] = React.useState("");

  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>waterfall</Text>
        <View style={styles.textBox}>
          <TextInput
            multiline
            style={styles.textInput}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            placeholder={"how are you doing today? \nwrite it here... \n \n"}
            placeholderTextColor="#bbb"
          ></TextInput>
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            onPress={(event) => {
              // Checks of there is text and an image
              //if (value != "" && route.params?.image) {
                dispatch({ type: "ADD", entry: value, image: route.params?.image});
              //} else if (value != ""){
              //  dispatch({ type: "ADD", entry: value, image: "" });
              //} else if (route.params?.image) {
              //  dispatch({ type: "ADD", entry: "", image: route.params?.image});
              //}
              navigation.setParams({image: ""})
              onChangeText("");
            }}
          >
            <Text style={styles.subheadText}>submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={(event)=>
            Alert.alert("Would you like to remove this image?", "", [{text: "No"}, {text: "Yes", onPress: ()=> {navigation.setParams({image: ""})}}])
          }>
            {(route.params?.image) ? <Image style={styles.thumbnail} source={{uri: route.params?.image}} /> : <View />}
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.bottomBar}>
            <TouchableOpacity onPress={()=>navigation.navigate("Settings")}>
              <View>
                <Text style={styles.smallText}>Settings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Camera")}>
              <View>
                <Text style={styles.smallText}>Camera</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
};

export {HomeScreen}
