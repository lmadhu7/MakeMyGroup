import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Pressable,
  TouchableHighlight,
} from "react-native";
import axios from "axios";
import { Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => {
    const courseData = {
      courseName: item["child_category"],
      mode: item["mode"],
    };
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Groupdetails", { data: courseData });
        }}
        style={styles.item}
      >
        <Text style={styles.title}>{item["child_category"]}</Text>
      </TouchableOpacity>
    );
  };

  const [selectedId, setSelectedId] = useState(null);
  const [enginnering, setEnginnering] = useState(null);
  const [management, setManagement] = useState(null);
  const [medicine, setMedicine] = useState(null);
  const [categoryData, setCategoryData] = useState(null);

  let enginneringArr = [];
  let managementArr = [];
  let medicineArr = [];

  let modeOfDelivery = "Both";

  function BothCourses() {
    modeOfDelivery = "Both";
    setVal(modeOfDelivery);
  }

  function offlineCourses() {
    modeOfDelivery = "Offline";
    setVal(modeOfDelivery);
  }

  function onlineCourses() {
    modeOfDelivery = "Online";
    setVal(modeOfDelivery);
  }

  const setValues = () => {
    axios({
      url: "http://3.17.188.126:5000/categories",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        setCategoryData(res.data);
        for (const cat of res.data) {
          if (cat["mode"] === modeOfDelivery) {
            if (
              cat["parent_category"] == "Enginnering" ||
              cat["parent_category"] == "Engineering"
            ) {
              enginneringArr.push(cat);
            } else if (cat["parent_category"] == "Management") {
              managementArr.push(cat);
            } else if (cat["parent_category"] == "Medicine") {
              medicineArr.push(cat);
            }
          }
        }
        setEnginnering(enginneringArr);
        setManagement(managementArr);
        setMedicine(medicineArr);
      })
      .catch((e) => console.log(e));
  };

  function setVal(modeOfDelivery) {
    for (const cat of categoryData) {
      if (cat["mode"] === modeOfDelivery) {
        if (
          cat["parent_category"] == "Enginnering" ||
          cat["parent_category"] == "Engineering"
        ) {
          enginneringArr.push(cat);
        } else if (cat["parent_category"] == "Management") {
          managementArr.push(cat);
        } else if (cat["parent_category"] == "Medicine") {
          medicineArr.push(cat);
        }
      }
    }
    setEnginnering(enginneringArr);
    setManagement(managementArr);
    setMedicine(medicineArr);
  }

  useEffect(() => {
    setValues();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#ED722E" />

      <View style={styles.logoContainer}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Icon type="ionicon" name="notifications" size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.logoArea}>
          <Text
            style={styles.logoText}
            onPress={() => navigation.navigate("Home")}
          >
            Logo
          </Text>
        </View>
      </View>

      <View style={styles.dataView}>
        <Text style={styles.data}>
          Select a course you want to learn we will create or put you in a group
          so that you can avail group discount.
        </Text>
      </View>
      <Text style={styles.mode}>Mode Of Delivery</Text>
      <Pressable style={styles.bothView} onPress={BothCourses}>
        <Text style={styles.bothText}>Both</Text>
      </Pressable>
      <Pressable style={styles.offlineView} onPress={offlineCourses}>
        <Text style={styles.offlineText}>Offline</Text>
      </Pressable>
      <Pressable style={styles.onlineView} onPress={onlineCourses}>
        <Text style={styles.onlineText}>Online</Text>
      </Pressable>
      <View>
        <Text style={styles.engineeringText}>Engineering</Text>
      </View>

      <FlatList
        style={{ flex: 1 }}
        numColumns={3}
        style={styles.enggFlatList}
        data={enginnering}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight key={item.InstituteName}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Groupdetails", {
                  data: {
                    courseName: item["child_category"],
                    mode: item["mode"],
                  },
                });
              }}
              style={styles.item}
            >
              <Text style={styles.title}>{item["child_category"]}</Text>
            </TouchableOpacity>
          </TouchableHighlight>
        )}
        keyExtractor={(item) => item["child_category"]}
        extraData={selectedId}
      />

      <View>
        <Text style={styles.managementText}>Management</Text>
      </View>

      <FlatList
        style={{ flex: 1 }}
        numColumns={3}
        style={styles.manageFlatList}
        data={management}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight key={item.InstituteName}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Groupdetails", {
                  data: {
                    courseName: item["child_category"],
                    mode: item["mode"],
                  },
                });
              }}
              style={styles.item}
            >
              <Text style={styles.title}>{item["child_category"]}</Text>
            </TouchableOpacity>
          </TouchableHighlight>
        )}
        keyExtractor={(item) => item["child_category"]}
        extraData={selectedId}
      />

      <View>
        <Text style={styles.medicineText}>Medicine</Text>
      </View>
      <FlatList
        style={{ flex: 1 }}
        numColumns={3}
        style={styles.MedicineFlatList}
        data={medicine}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight key={item.InstituteName}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Groupdetails", {
                  data: {
                    courseName: item["child_category"],
                    mode: item["mode"],
                  },
                });
              }}
              style={styles.item}
            >
              <Text style={styles.title}>{item["child_category"]}</Text>
            </TouchableOpacity>
          </TouchableHighlight>
        )}
        keyExtractor={(item) => item["child_category"]}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 414,
  },
  icon: {
    position: "absolute",
    right: 40,
    top: 13,
  },
  logoContainer: {
    position: "absolute",
    width: 414,
    height: 42,
    left: 0,
    top: 0,
    backgroundColor: "#ED722E",
  },
  logoArea: {
    position: "absolute",
    width: 145.77,
    height: 42,
    left: 109,
    top: 0,
    backgroundColor: "#C4C4C4",
  },
  logoText: {
    position: "absolute",
    width: 35.3,
    height: 21.6,
    left: 54,
    top: 8.4,
    color: "#000000",
  },
  dataView: {
    position: "absolute",
    width: 414,
    height: 100,
    left: 0,
    top: 74,
    backgroundColor: "rgba(196, 196, 196, 0.13)",
  },
  data: {
    position: "absolute",
    width: 344,
    height: 60,
    left: 38,
    top: 20,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 18,
    color: "rgba(45,55,72,0.84)",
  },
  mode: {
    position: "absolute",
    // width: 121,
    height: 181,
    left: 30,
    top: 212,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.02,
    display: "flex",
    color: "#000000",
  },
  bothView: {
    position: "absolute",
    width: 69,
    height: 35,
    left: 165,
    top: 207,
    backgroundColor: "#FFFFFF",
    // borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.34)",
  },
  bothText: {
    position: "absolute",
    width: 42.77,
    height: 16,
    left: 14.5,
    top: 5,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: -0.02,
    display: "flex",
    color: "rgba(0,0,0,0.48)",
  },
  offlineView: {
    position: "absolute",
    width: 83.91,
    height: 35,
    left: 233.11,
    top: 207,
    backgroundColor: "#FFFFFF",
    // borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.34)",
  },
  offlineText: {
    position: "absolute",
    width: 50.3,
    height: 16,
    left: 15,
    top: 5,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.02,
    display: "flex",
    color: "rgba(0,0,0,0.48)",
  },
  onlineView: {
    position: "absolute",
    width: 83,
    height: 35,
    left: 315,
    top: 207,
    backgroundColor: "#FFFFFF",
    // borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.34)",
  },
  onlineText: {
    position: "absolute",
    width: 50,
    height: 16,
    left: 17,
    top: 5,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.02,
    display: "flex",
    color: "rgba(0,0,0,0.48)",
  },
  engineeringText: {
    position: "absolute",
    // width: 88,
    height: 21,
    left: 33,
    top: 274,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.02,
    display: "flex",
    color: "#000000",
  },
  title: {
    left: 0,
    top: 30,
    fontSize: 32,
    fontSize: 16,
    textAlign: "center",
    // display: 'flex',
    alignItems: "flex-end",
    letterSpacing: -0.02,
  },
  item: {
    width: 100,
    height: 90,
    margin: 10,
    borderRadius: 15,
    backgroundColor: "#FCE4D7",
  },
  enggFlatList: {
    top: 307,
    width: 414,
    left: 30,
    borderRadius: 15,
  },
  managementText: {
    position: "absolute",
    // width: 88,
    height: 21,
    left: 33,
    top: 308,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.02,
    display: "flex",
    color: "#000000",
  },
  manageFlatList: {
    top: 335,
    left: 30,
    borderRadius: 15,
  },
  medicineText: {
    position: "relative",
    left: 33,
    top: 342,
    height: 21,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.02,
    display: "flex",
    color: "#000000",
  },
  MedicineFlatList: {
    top: 354,
    left: 30,
    borderRadius: 15,
  },
});
