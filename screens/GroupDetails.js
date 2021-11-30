import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

export default function GroupDetails({ route, navigation }) {
  const { data } = route.params;
  const [instituteDetails, setInstituteDetails] = useState(null);

  const [selectedId, setSelectedId] = useState(null);

  const currentDetails = [];
  const modeDelivery = [];

  console.log("data");
  console.log(data);

  if (instituteDetails) {
    for (let x of instituteDetails) {
      if (x["CourseName"].toUpperCase() === data["courseName"].toUpperCase()) {
        currentDetails.push(x);
      }
    }
  }

  if (currentDetails) {
    console.log("currentDetails");
    console.log(currentDetails);
  }

  function getInstitutedetails() {
    axios({
      url: " http://3.17.188.126:5000/getInstitutedetails",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setInstituteDetails(res.data);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    getInstitutedetails();
  }, []);
  //

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{ top: 43, left: 22 }}>
          <Ionicons
            onPress={() => navigation.navigate("Home")}
            name="arrow-back"
            size={30}
            color="#FFFFFF"
          />
        </View>
        <Text style={styles.GroupName}>
          Group Name: {data["courseName"] + " " + data["mode"]}
        </Text>
        <Text style={styles.IName}>Institute name </Text>
        <Text style={styles.Discount}>Group formed for Discount </Text>
      </View>

      <FlatList
        style={{ top: 70, left: 12, paddingBottom: 50 }}
        contentContainerStyle={{ paddingBottom: 50 }}
        data={currentDetails}
        renderItem={({ item, index }) => (
          <View
            key={item.InstituteName + item.CourseName}
            style={{
              backgroundColor: index % 2 === 0 ? "orange" : "white",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              paddingVertical: 15,
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{item.InstituteName}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{item.Count}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Successfull joined");
                  setTimeout(function () {
                    navigation.navigate("Admin", {
                      data: {
                        courseName: data["courseName"],
                        mode: data["mode"],
                        instituteName: item.InstituteName,
                      },
                    });
                  }, 300);
                }}
                style={{
                  height: 25,
                  width: 65,
                  borderRadius: 25,
                  backgroundColor: "#ED722E",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>join</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.InstituteName}
        extraData={selectedId}
      />
      <TouchableOpacity style={{ height: 50, flex: 1, left: 12 }}>
        <Text>Add institute</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 414,
    height: 80,
    backgroundColor: "#ED722E",
  },
  GroupName: {
    position: "absolute",

    left: 100,
    top: 47,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19,
    display: "flex",
    alignItems: "flex-end",
    textAlign: "center",
    letterSpacing: -0.02,

    color: "#FFFFFF",
  },
  IName: {
    // position: "absolute",
    flex: 1,
    width: 120,
    top: 70,
    left: 22,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 15,
    // lineHeight: 17,
    // display: "flex",
    alignItems: "flex-end",
    textAlign: "center",
    letterSpacing: -0.02,

    color: "rgba(0,0,0,0.41)",
  },
  Discount: {
    position: "absolute",
    width: 100,
    top: 90,
    left: 171,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 17,

    alignItems: "flex-end",
    textAlign: "center",
    letterSpacing: -0.02,

    color: "rgba(0,0,0,0.41)",
  },
});
