import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

export default function GroupScreen({ route, navigation }) {
  const { data } = route.params;
  const [messages, setMessages] = React.useState(null);
  const [rules, setRules] = React.useState(null);
  const [selectedId, setSelectedId] = useState(null);

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
      for (const group of res.data) {
        if (group["group_name"].toUpperCase() === groupName1.toUpperCase()) {
          rulesArr.push(group["rules"]);
          messageArr.push(group["messages"]);
        }
      }
      setRules(rulesArr);
      setMessages(messageArr);
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
        data={rules}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item}
        extraData={selectedId}
      />
      <FlatList
        style={{ top: 300, left: 30, borderRadius: 18, padding: 10 }}
        data={messages}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item}
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
    top: 700,
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
