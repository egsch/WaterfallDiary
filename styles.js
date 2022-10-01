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
    justifyContent: "flex-start",
    width: "100%",
  },
  scrollView: {
    width: "100%",
    height: "100%"
  },
  diaryContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff0",
    alignItems: "flex-start",
    justifyContent: "space-around",
    width: "100%"
  },
  statusBar: {
    height:  Constants.statusBarHeight,
    backgroundColor: '#fff4'
  },
  search: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    minHeight: 75,
    alignItems: "center",
    justifyContent: "space-between"
  },
  searchBox: {
    flex: 1,
    height: 45,
    padding: 10,
    color: "#fff",
    fontSize: 15,
    fontFamily: "Lora",
    margin: 15,
    backgroundColor: "#fff2"
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
  diaryEntry: {
    backgroundColor: "#ffffff20",
    marginHorizontal: 10,
    marginVertical: 5
  },
  diaryText: {
    textAlignVertical: "top",
    color: "#fff",
    fontSize: 15,
    fontFamily: "Lora",
    margin: 10,
    padding: 15,
    flex: 1
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
    marginHorizontal: 10,
    marginBottom: 10,
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
  },
  icons: {
    margin: 10,
    width: 25
  }
});
