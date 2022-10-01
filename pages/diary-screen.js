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
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";
import {styles} from '../styles.js';
import moment from "moment";
import Ionicons from '@expo/vector-icons/Ionicons';

export var DiaryScreen = ( { navigation } ) => {
  var entries = useSelector((state) => state.entries).sort((a, b)=> {return moment(b.groupDate).diff(a.groupDate);});
  var dispatch = useDispatch();

  const [searchValue, onChangeSearchText] = React.useState("");
  const [searchBarOpen, changeSearchBar] = React.useState(false);

  function filterObj(obj, searchStr){
    var filtered = [];
    for (let i in obj) {
        var filteredDateEntries = obj[i].dateEntries.filter((entry)=>entry.entry.toLowerCase().includes(searchStr.toLowerCase())) 
      if (filteredDateEntries.length > 0){
        filtered.unshift({
          key: obj[i].key,
          groupDate: obj[i].groupDate,
          dateEntries: filteredDateEntries
        })
      }
    }
    return filtered;
  }

  return (
    <View style={styles.container}>
        <View style={styles.search}>
        {
          !searchBarOpen && <Text style={styles.titleText}>diary</Text>
        }
        {
          searchBarOpen && 
          <View style={styles.search}>
          <TextInput 
            style={styles.searchBox}
            onChangeText={(text) => onChangeSearchText(text)}
            value={searchValue}
            placeholder= "Search entries"
            placeholderTextColor="#bbb"
          ></TextInput>
        </View>
        }
        <TouchableOpacity onPress={()=>{changeSearchBar(!searchBarOpen); onChangeSearchText("");}}>
            <Ionicons name={!searchBarOpen ? "md-search" : "md-close"} size={25} color="white" style={styles.icons}></Ionicons>
        </TouchableOpacity>
        </View>
        <ScrollView style = {styles.scrollView}>
          { 
          (searchValue == "") ?
          entries.map((group, index) => (
            <View key = {group.key}>
              <Text style={styles.subheadText}>
                {moment(group.groupDate).format("ddd, MMMM Do YYYY")}
              </Text>
              <View>
                {group.dateEntries.map((item, index) => (
                  <TouchableWithoutFeedback key={item.key}  onLongPress={()=>Alert.alert("Would you like to delete this entry?", "", [{text: "No"}, {text: "Yes", onPress: ()=> {dispatch({ type: "DELETE", entry: item.key, image: ""});}}])}>
                      <View style={styles.diaryEntry}>
                      {item.entry ? <Text style={styles.diaryText}>{item.entry}</Text> : <View />}
                      {item.image ? <Image style={styles.diaryImage} source={{uri: item.image}} /> : <View />}
                      </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </View>
          )) : filterObj(entries, searchValue).map((group, index) => (
            <View key = {group.key}>
              <Text style={styles.subheadText}>
                {moment(group.groupDate).format("ddd, MMMM Do YYYY")}
              </Text>
              <View>
                {group.dateEntries.map((item, index) => (
                  <TouchableWithoutFeedback key={item.key} style={styles.diaryEntry} onLongPress={()=>Alert.alert("Would you like to delete this entry?", "", [{text: "No"}, {text: "Yes", onPress: ()=> {dispatch({ type: "DELETE", entry: item.key, image: ""});}}])}>
                      <View style={styles.diaryEntry}>
                      {item.entry ? <Text style={styles.diaryText}>{item.entry}</Text> : <View />}
                      {item.image ? <Image style={styles.diaryImage} source={{uri: item.image}} /> : <View />}
                      </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
    </View>
  );
};
