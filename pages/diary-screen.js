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
} from "react-native";
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";
import {styles} from '../styles.js';
import moment from "moment";

export var DiaryScreen = ( { navigation } ) => {
  var entries = useSelector((state) => state.entries).sort((a, b)=> {return moment(b.groupDate).diff(a.groupDate);});
  var dispatch = useDispatch();

  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>diary</Text>
        <ScrollView>
          {entries.map((group, index) => (
            <View key = {group.key}>
              <Text style={styles.subheadText}>
                {moment(group.groupDate).format("ddd, MMMM Do YYYY")}
              </Text>
              <View>
                {console.log(group)}{
                group.dateEntries.map((item, index) => (
                  <TouchableWithoutFeedback key={item.key} onLongPress={()=>Alert.alert("Would you like to delete this entry?", "", [{text: "No"}, {text: "Yes", onPress: ()=> {dispatch({ type: "DELETE", entry: item.key, image: ""});}}])}>
                      {item.entry ? <Text style={styles.diaryText}>{item.entry}</Text> : <View />}
                      {item.image ? <Image style={styles.diaryImage} source={{uri: item.image}} /> : <View />}
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
    </View>
  );
};
