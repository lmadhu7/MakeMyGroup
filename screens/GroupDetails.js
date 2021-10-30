import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Button,
  StatusBar,
} from "react-native";
import axios from "axios";
import { IconAntDesign } from "react-native-vector-icons/AntDesign";
// import { Button } from "react-native-elements/dist/buttons/Button";

export default function GroupDetails({ route, navigation }) {
  const { data } = route.params;
  const [instituteDetails, setInstituteDetails] = useState(null);
  const currentDetails = [];

  if (instituteDetails) {
    for (let x of instituteDetails) {
      if (x["CourseName"].toUpperCase() === data.toUpperCase()) {
        currentDetails.push(x);
      }
    }
  }

  if (currentDetails) {
    console.log("currentDetails");
    console.log(currentDetails);
  }

  const renderItem = ({ item, index, separators }) => {
    const instituteName = item.InstituteName;
    const count = item.Count;
    return (
      <TouchableOpacity style={{ left: 22, top: 100 }}>
        <View style={{ left: 22, top: 50 }}>
          <Text>{instituteName}</Text>
        </View>
        <View style={{ left: 187, top: 30 }}>
          <Text>{count}</Text>
        </View>
        <View
          onPress={() => alert("sri")}
          style={{
            left: 282,
            top: 10,
            height: 21,
            width: 58,
            borderRadius: 25,
            backgroundColor: "#ED722E",
          }}
        >
          <Text style={{ left: 20, position: "absolute" }}>join</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
    <SafeAreaView style={{ width: 414, height: 896 }}>
      <View style={styles.container}>
        {/* <IconAntDesign name="arrowleft" size={16} color="red" /> */}
        <Text style={styles.GroupName}>Group Name: {data}</Text>
        <Text style={styles.IName}>Institute name </Text>
        <Text style={styles.Discount}>Group formed for Discount </Text>
      </View>

      <FlatList
        // horizontal
        // style={styles.MedicineFlatList}
        // showsHorizontalScrollIndicator={false}
        data={currentDetails}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        // extraData={selectedId}
      />
    </SafeAreaView>
  );
}

// const currentDetails1 = [
//   {
//     InstituteName: "java",
//     Count: 20,
//   },
// ];

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: 414,
    height: 87,
    backgroundColor: "#ED722E",
    // color: '#ED722E',
  },
  GroupName: {
    position: "absolute",
    // width: 102,
    // height: 19,
    left: 70,
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
    position: "absolute",
    width: 120,
    top: 153,
    left: 32,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 17,
    display: "flex",
    alignItems: "flex-end",
    textAlign: "center",
    letterSpacing: -0.02,

    color: "rgba(0,0,0,0.41)",
  },
  Discount: {
    position: "absolute",
    width: 100,
    top: 143,
    left: 171,
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 17,
    display: "flex",
    alignItems: "flex-end",
    textAlign: "center",
    letterSpacing: -0.02,

    color: "rgba(0,0,0,0.41)",
  },
  instituteContainer: {
    position: "absolute",
    // width: 370,
    // height: 50,
    left: 22,
    top: 222,
  },
  instituteName: {
    position: "absolute",
    width: 75,
    top: 207,
    // left: 32,
  },
  count: {
    position: "absolute",
    width: 75,
    top: 207,
    // left: 200,
  },
});
