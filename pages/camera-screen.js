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
import { Provider, useDispatch, useSelector } from "react-redux";
import {styles} from '../styles.js';
import moment from "moment";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants"
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Ionicons from '@expo/vector-icons/Ionicons';

export var CameraScreen = ( {route, navigation} ) => {

  // Redux Hooks to store
  var dispatch = useDispatch();

  // React Hooks for state
  const [hasPermission, setHasPermission] = React.useState("");
  const [isCameraReady, setIsCameraReady] = React.useState("");
  const [cameraType, setCameraType] = React.useState("");
  const [isPreview, setIsPreview] = React.useState(false);
  const [supportedRatio, setSupportedRatio] = React.useState("")
  const [imageLocation, setImageLocation] = React.useState("");

  //ref
  const cameraRef = React.useRef()

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const object2 = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted" && object2.status === "granted");
    })();
  }, []);

  const onCameraReady = async () => {
    setIsCameraReady(true);
    const ratios = await cameraRef.current.getSupportedRatiosAsync();
    console.log(ratios);
    setSupportedRatio(ratios[ratios.length-1]);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true, skipProcessing: true, ratio: supportedRatio}
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory+"photos").catch(e=>console.log(e))
        setIsPreview(true);

        var location = FileSystem.documentDirectory+"photos/"+(moment().format('YYYYMMDDhhmmss'))+".jpg";
        await FileSystem.copyAsync({
          from: source,
          to: location
        });
        await console.log("File contents: " + FileSystem.readAsStringAsync(location).toString())
        navigation.navigate({
          name: "Home",
          params: {image: location},
          merge:true
        });
        // (need to add params to HomeScreen)
        // then access state on press of "submit"
        // and use <Image> with an if loop to display image in diary screen
      } else {
        console.log("failure")
      }
    } else {
      console.log("no current cameraRef.")
    }
  }

  if (hasPermission === null) {
    return(<Text>Null</Text>)
  } else if (hasPermission === false) {
    return(<View style={styles.container}>
      <Text style={styles.diaryText}>Uh oh, looks like we don't have the right permissions! Please enable camera and media permissions in Settings.</Text>
      <TouchableOpacity onPress={()=>navigation.navigate("Home")}><Text style={styles.subheadText}>home</Text></TouchableOpacity>
    </View>)
  } else {
    return (
      <View style={styles.container}>
        <Camera style={styles.container} type={cameraType} ref={cameraRef} onCameraReady={onCameraReady} ratio={supportedRatio}>
          <View style={styles.cameraButtons}>
            <TouchableOpacity onPress={()=>{
              setCameraType(
                cameraType === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
              <Ionicons name="md-camera-reverse-outline" size={25} color="white" style={styles.icons}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture}>
              <Ionicons name="md-camera" size={25} color="white" style={styles.icons}></Ionicons>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
};
