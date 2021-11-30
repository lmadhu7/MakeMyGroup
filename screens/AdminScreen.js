import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Button,
} from "react-native";
import { Video, Audio } from "expo-av";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import Moment from "react-moment";
import WebView from "react-native-webview";
// import PDFView from "react-native-pdf-view";

export default function GroupScreen({ route, navigation }) {
  const { data } = route.params;
  const [currentInstituteDetails, setCurrentInstituteDetails] =
    React.useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [sound, setSound] = React.useState();

  const groupName1 =
    data["courseName"] + " " + data["mode"] + " " + data["instituteName"];

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity>
        <Text>srikanth</Text>
      </TouchableOpacity>
    );
  };

  const getgrouptext = () => {
    axios({
      url: "http://3.17.188.126:5000/getgrouptext",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      let rulesArr = [];
      let messageArr = [];
      let currentDetailsArr = [];
      for (const group of res.data) {
        // if (group["group_name"].toUpperCase() === groupName1.toUpperCase()) {
        currentDetailsArr.push(group);
        // }
      }
      setCurrentInstituteDetails(currentDetailsArr);
    });
  };

  useEffect(() => {
    getgrouptext();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.groupNmae1}>
        <Text style={styles.groupNmae1Text}>{groupName1}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.AdminText}>Admin Messages</Text>
      </View>

      <FlatList
        style={{ top: 200, left: 15 }}
        data={currentInstituteDetails}
        renderItem={({ item }) => {
          if (item.messagetype === "Rules") {
            return (
              <View>
                <Moment parse="YYYY-DD-MM HH:mm:ss">{item.timestamp}</Moment>

                <Text
                  style={{
                    flex: 1,
                    backgroundColor: "red",
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                    borderBottomRightRadius: 18,
                    borderBottomLeftRadius: 4,
                  }}
                >
                  {item.message}
                </Text>
                <Text> </Text>
              </View>
            );
          } else if (item.messagetype === "image") {
            return (
              <View>
                <Moment parse="YYYY-DD-MM HH:mm:ss">{item.timestamp}</Moment>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: item.message }}
                />
                <Text> </Text>
              </View>
            );
          } else if (item.messagetype === "message") {
            return (
              <View>
                <Moment parse="YYYY-DD-MM HH:mm:ss">{item.timestamp}</Moment>
                <Text>{item.message}</Text>
                <Text> </Text>
              </View>
            );
          } else if (item.messagetype === "video") {
            return (
              <View>
                <Video
                  ref={video}
                  style={{ width: 200, height: 200 }}
                  source={{ uri: item.message }}
                  useNativeControls
                  resizeMode="contain"
                  isLooping
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
                <Moment parse="YYYY-DD-MM HH:mm:ss">{item.timestamp}</Moment>
                <Text>{item.message}</Text>
                <Text> </Text>

                {/* <View>
                  <Button
                    title={status ? "Pause" : "Play"}
                    onPress={() =>
                      status
                        ? video.current.pauseAsync()
                        : video.current.playAsync()
                    }
                  />
                </View> */}
              </View>
            );
          } else if (item.messagetype === "audio") {
            return (
              <View>
                <Moment parse="YYYY-DD-MM HH:mm:ss">{item.timestamp}</Moment>
                {/* <Button
                  title="Play Sound"
                  onPress={async () => {
                    console.log("Loading Sound");
                    console.log(item);
                    const { sound } = await Audio.sound.createAsync(
                      // require("../assets/sample.mp3")
                      require("./" + item.message)
                    );
                    setSound(sound);

                    console.log("Playing Sound");
                    await sound.playAsync();
                  }}
                /> */}
                <Text>{item.message}</Text>
                {/* <Text> </Text> */}
              </View>
            );
          } else if (item.messagetype === "document") {
            // let urlDoc = item.message;

            // let absolutePath = RNFS.item.message + "/My.pdf";
            // let absolutePath = item.message;

            // return (
            //   <PDFView
            //     ref={(pdf) => {
            //       this.pdfView = pdf;
            //     }}
            //     src={absolutePath}
            //     style={ActharStyles.fullCover}
            //   />
            // );

            return (
              <View>
                <Moment parse="YYYY-DD-MM HH:mm:ss">{item.timestamp}</Moment>
                {/* <Text>pdf starting</Text>
                <WebView
                  source={{
                    baseUrl: urlDoc,
                  }}
                />
                <Text>pdf end</Text> */}
              </View>
            );
          } else {
          }
        }}
        keyExtractor={(item, index) => item.message}
        extraData={selectedId}
      />

      <View style={styles.ChatWithAdmin}>
        <Text
          style={styles.ChatText}
          onPress={() => navigation.navigate("chat")}
        >
          Chat with Admin
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 390,
    height: 50,
    top: 100,
    left: 12,
    backgroundColor: "#FCE4D7",
    borderRadius: 10,
  },
  groupNmae1: {
    position: "absolute",
    width: 414,
    height: 70.24,
    top: 0.17,
    backgroundColor: "#ED722E",
  },
  groupNmae1Text: {
    position: "absolute",
    width: 254,
    top: 25,
    left: 50,

    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
    display: "flex",
    letterSpacing: -0.02,
  },
  AdminText: {
    position: "absolute",
    width: 150,

    top: 16,
    left: 31,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    display: "flex",
    letterSpacing: -0.02,
  },
  ChatWithAdmin: {
    position: "absolute",
    width: 390,
    top: 650,
    height: 50,
    backgroundColor: "#FCE4D7",
    borderWidth: 1,
    borderRadius: 10,
    left: 12,
  },
  ChatText: {
    position: "absolute",
    width: 159,
    left: 31,
    top: 10,
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
  },
});
