import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Divider } from "react-native-elements";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.Profile}>Profile</Text>
      <Avatar
        style={{
          height: 150,
          top: 129,
          width: 150,
          left: 130,
          borderRadius: 150 / 2,
          overflow: "hidden",
          borderWidth: 2,
          position: "absolute",
        }}
        size="large"
        rounded
        source={{
          uri: "data:image/jpeg;base64,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",
        }}
        activeOpacity={0.7}
      />
      <Text style={styles.profilename}>Victoria Robertson</Text>

      <Text style={styles.emailId}>Email ID</Text>
      <Text style={styles.Phnumber}>Phone Number </Text>
      <Divider style={styles.Divider} />
      <Text style={styles.previous}>Pevious joined groups</Text>

      <Text style={styles.mentor}>Mentor Support</Text>
      <Text style={styles.Help}>Help and Support</Text>

      <TouchableOpacity onPress={() => doUserLogOut()}>
        <View style={styles.button}>
          <Text style={styles.button_label}>{"Logout"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 852,
    width: 414,
    backgroundColor: "#E5E5E5",
  },
  Profile: {
    position: "absolute",
    height: 36,
    // width: 94,
    top: 22,
    left: 161,
    color: "#ED722E",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 30,
    lineHeight: 36,
    textAlign: "center",
  },
  profilename: {
    position: "absolute",
    top: 320,
    left: 100,
    fontStyle: "normal",
    fontSize: 24,
    lineHeight: 29,
    color: "#000000",
  },

  emailId: {
    position: "absolute",
    // width: 61,
    left: 27,
    top: 402,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,

    color: "#ED722E",
  },
  Phnumber: {
    position: "absolute",
    // width: 119,
    left: 27,
    top: 445,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#ED722E",
  },
  Divider: {
    position: "absolute",
    width: 360,
    height: 0,
    left: 27,
    top: 490.5,
    // border: 1,
    backgroundColor: "#000000",
  },
  previous: {
    position: "absolute",
    // width: 169,
    left: 27,
    top: 525,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#ED722E",
  },
  mentor: {
    position: "absolute",
    // width: 169,
    left: 27,
    top: 568,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#ED722E",
  },
  Help: {
    position: "absolute",
    // width: 169,
    left: 27,
    top: 613,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#ED722E",
  },
  button: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    top: 670,
    right: 117,
    left: 117,
    borderRadius: 100,
    backgroundColor: "#ED722E",
  },
  button_label: {
    // position: "absolute",
    left: 0,
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "600",
    color: "#ffffff",
  },
});
