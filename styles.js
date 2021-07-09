import {
  StyleSheet
} from "react-native";
import Constants from "expo-constants";

 export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff0",
    alignItems: "flex-start",
    justifyContent: "space-around",
    width: "100%",
  },
  statusBar: {
    height:  Constants.statusBarHeight,
    backgroundColor: 'green'
  },
  titleText: {
    fontSize: 35,
    fontFamily: "Lora Italic",
    color: "#fff",
    margin: 10,
  },
  subheadText: {
    fontSize: 25,
    fontFamily: "Lora",
    color: "#fff",
    margin: 10,
  },
  diaryText: {
    textAlignVertical: "top",
    color: "#fff",
    fontSize: 15,
    fontFamily: "Lora",
    backgroundColor: "#ffffff20",
    margin: 10,
    padding: 15
  },
  smallText: {
    fontSize: 12,
    fontFamily: "Lora",
    color: "#fff",
    margin: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-between",
    width: "100%",
  },
  textBox: {
    flex: 1,
    width: "100%",
  },
  textInput: {
    textAlignVertical: "top",
    color: "#fff",
    fontSize: 15,
    fontFamily: "Lora",
    margin: 10,
    minHeight: 100,
  },
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cameraButtons: {
    position: 'absolute',
    bottom: '2%',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  diaryImage: {
    margin: 0,
    width: "100%",
    minHeight: 400
  },
  thumbnail: {
    width: 50,
    height: 50
  },
  settingsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff20",
    margin: 10,
    padding: 15
  }
});
