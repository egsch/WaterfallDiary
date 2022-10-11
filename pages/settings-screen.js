import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { styles } from "../styles.js";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import moment from "moment";
import { readAsStringAsync, EncodingType } from "expo-file-system";

const image = require("../img/waterfall2.jpg");
const image2 = require("../img/black.jpeg");

var SettingsScreen = ({ route, navigation }) => {
  // Redux Hooks to store
  var dispatch = useDispatch();
  var entries = useSelector((state) => state.entries).sort((a, b) => {
    return moment(b.groupDate).diff(a.groupDate);
  });

  const fetchImageData = async (uri) => {
    const data = await readAsStringAsync(uri, { encoding: "base64" });
    return "data:image/jpg;base64," + data;
  };

  const getIndividualEntry = async (groupDateEntries) => {
    var html = ``;
    for (var item of groupDateEntries) {
      var imageData;
      if (item.image) {
        imageData = await fetchImageData(item.image);
      }
      html += `<div key=${item.key}>
        ${item.entry ? `<p>${item.entry}</p>` : ``}
        ${item.image ? `<img height="440" style="margin-bottom:10; display:block; margin-left:auto; margin-right: auto;" src=${imageData} />` : ``}
      </div>`;
    }
    return html;
  };

  const getGroupEntry = async (entries) => {
    var html = "";
    for (var group of entries) {
      const individualEntry = await getIndividualEntry(group.dateEntries);
      html += `<div key=${group.key}>
          <div class="pagebreak"></div>
          <h1>${moment(group.groupDate).format("ddd, MMMM Do YYYY")}</h1>
          <div>
            ${individualEntry}
          </div>
        </div>`;
    }
    return html;
  };

  const exportPdf = async () => {
    var groupEntries = await getGroupEntry(entries);
    const html = `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet">
      <style>
        @media print {
          .pagebreak { break-before: page; }
        }
      </style>
    </head>
    <body style="text-align: center; font-family: 'Lora', serif;">
      ${groupEntries}
    </body>
    </html>`;
    const { uri } = await printToFileAsync({ html: html });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const exportPdfNoImages = async () => {
    // add stuff here!
    const html = `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet">
      </head>
      <style>
        @media print {
          .pagebreak { break-before: page; }
        }
      </style>
    <body style="text-align: center; font-family: 'Lora', serif;">
      ${entries.map(
        (group, index) => `
      <div key=${group.key}>
          <div class="pagebreak"></div>
          <h1>${moment(group.groupDate).format("ddd, MMMM Do YYYY")}</h1>
          <div>
            ${group.dateEntries
              .map(
                (item, index) => `
                  ${item.entry ? `<p>${item.entry}</p>` : ``} `
              )
              .join("")}
          </div>
        </div>`
      ).join("")}
    </body>
    </html>
    `;
    const { uri } = await printToFileAsync({ html: html });
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  stateWallpaper = useSelector((state) => state.theme);

  // React Hooks for state
  const [wallpaper, setWallpaper] = React.useState(stateWallpaper);
  const toggleWallpaper = () => {
    setWallpaper((previousState) => !previousState);
  };

  return (
    <ImageBackground
      source={stateWallpaper ? image : image2}
      style={styles.image}
    >
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
        <View style={styles.settingsBox}>
          <Text style={styles.smallText}>Export PDF</Text>
          <View>
          <TouchableOpacity onPress={exportPdf}>
            <Text style={styles.button}>With Images</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={exportPdfNoImages}>
            <Text style={styles.button}>Without Images</Text>
          </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.smallText}>
          Photo by José Daniel Toledo Madero on Unsplash
        </Text>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            onPress={(event) => {
              dispatch({ type: "THEME", theme: wallpaper });
              navigation.navigate("Home");
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
