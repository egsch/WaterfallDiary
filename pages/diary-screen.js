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
import moment from "moment";

export var DiaryScreen = ( { navigation } ) => {
  var entries = useSelector((state) => state.entries).sort((a, b)=> {return moment(b.groupDate).diff(a.groupDate);});

  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>diary</Text>
        <ScrollView>
          {entries.map((group, index) => (
            <View>
              <Text style={styles.subheadText}>
                {moment(group.groupDate).format("ddd, MMMM Do YYYY")}
              </Text>
              <View>
                {group.dateEntries.map((item, index) => (
                  <View>
                      {item.entry ? <Text style={styles.diaryText}>{item.entry}</Text> : <View />}
                    {item.image ? <Image style={styles.diaryImage} source={{uri: item.image}} /> : <View />}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.smallText}>
          Photo by José Daniel Toledo Madero on Unsplash
        </Text>
    </View>
  );
};
