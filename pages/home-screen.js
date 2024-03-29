import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";
import {styles} from '../styles.js';
import Ionicons from '@expo/vector-icons/Ionicons';

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
              // Checks if there is text or an image before submitting
              if (!(value == "" && !route.params?.image)){
                dispatch({ type: "ADD", entry: value, image: route.params?.image});
              }
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
                <Ionicons name="md-settings-outline" size={25} color="white" style={styles.icons}></Ionicons>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Camera")}>
              <View>
              <Ionicons name="md-camera-outline" size={25} color="white" style={styles.icons}></Ionicons>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
};

export {HomeScreen}
