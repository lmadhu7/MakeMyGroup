import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  CheckBox,
} from "react-native";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { AntDesign } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";

const phoneRegExp =
  "/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/";
const signUpValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  name: yup.string().required("Name field is required"),
  phonenumber: yup.string().required("Phone number is required"),
});

export default function SignupScreen({ navigation }) {
  const [name, setName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSelected, setSelection] = useState(false);

  const userSignUp = () => {
    const paramBody = {
      name: name,
      phone: phoneNumber,
      email: email,
      password: password,
    };
    axios({
      url: "http://3.17.188.126:5000/insertsignupdetails",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: paramBody,
    }).then((res) => {
      if (res.data === "Successful") {
        Alert.alert(
          "Thank you for sign up. You may login now using with your registed with mobile number/email id."
        );
        navigation.navigate("Login");
      }
    });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.signupTitle}>Sign Up</Text>
        <SafeAreaView style={styles.subContainer}>
          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              email: "",
              password: "",
              name: "",
              phonenumber: "",
            }}
            onSubmit={userSignUp}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
                <Text style={styles.nameText}>Name</Text>
                <TextInput
                  style={styles.namePlaceholder}
                  placeholder="Enter name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  keyboardType="email-address"
                />
                <View style={styles.errorName}>
                  {errors.name && touched.name && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.name}
                    </Text>
                  )}
                </View>
                <View style={{ top: 70, left: 110 }}>
                  <AntDesign name="star" size={8} color="red" />
                </View>
                <Text style={styles.phoneNumberText}>Phone Number</Text>
                <TextInput
                  style={styles.phonenumberPlaceholder}
                  placeholder="Enter phone number"
                  onChangeText={handleChange("phonenumber")}
                  onBlur={handleBlur("phonenumber")}
                  value={values.phonenumber}
                  keyboardType="email-address"
                />
                <View style={styles.errorPhonenumber}>
                  {errors.phonenumber && touched.phonenumber && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.phonenumber}
                    </Text>
                  )}
                </View>
                <View style={{ top: 170, left: 190 }}>
                  <AntDesign name="star" size={8} color="red" />
                </View>

                <Text style={styles.emailText}>Email</Text>
                <TextInput
                  style={styles.emailPlaceholder}
                  placeholder="Email Address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                <View style={styles.errorEmail}>
                  {errors.email && touched.email && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View style={{ top: 270, left: 100 }}>
                  <AntDesign name="star" size={8} color="red" />
                </View>
                <Text style={styles.passwordText}>Password</Text>
                <TextInput
                  style={styles.passwordPlaceholder}
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />

                <View style={styles.errorPassword}>
                  {errors.password && touched.password && (
                    <Text style={{ fontSize: 10, color: "red" }}>
                      {errors.password}
                    </Text>
                  )}
                </View>
                <View style={{ top: 370, left: 140 }}>
                  <AntDesign name="star" size={8} color="red" />
                </View>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                  />
                  <Text style={styles.label}>Terms & Conditions?</Text>
                </View>

                <View style={styles.signupButton}>
                  <Button
                    onPress={handleSubmit}
                    color="#ED722E"
                    title="SIGN UP"
                    disabled={!isValid}
                  />
                </View>
              </>
            )}
          </Formik>
        </SafeAreaView>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 896,
    backgroundColor: "#ED722E",
  },
  welcomeText: {
    position: "absolute",
    left: 40,
    top: 78,
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "500",
    color: "rgba(255,255,255,0.7)",
    // disply:"flex"
  },
  signupTitle: {
    position: "absolute",
    top: 115,
    left: 40,
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  subContainer: {
    top: 185,
    left: 0,
    height: 630,
    width: 414,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  nameText: {
    position: "absolute",
    left: 38,
    top: 71,
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    color: "#000000",
  },
  namePlaceholder: {
    position: "absolute",
    width: 360,
    left: 38,
    top: 118,
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "500",
    color: "rgba(0,0,0,0.5)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.36)",
  },
  errorName: {
    position: "absolute",
    left: 38,
    top: 150,
  },
  phoneNumberText: {
    position: "absolute",
    left: 38,
    top: 181,
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    color: "#000000",
  },
  phonenumberPlaceholder: {
    position: "absolute",
    flex: 1,
    left: 38,
    top: 228,
    width: 360,
    fontStyle: "normal",
    fontSize: 14,
    // lineHeight: 19,
    fontWeight: "500",
    color: "rgba(0,0,0,0.5)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.36)",
  },
  errorPhonenumber: {
    position: "absolute",
    left: 38,
    top: 260,
  },
  emailText: {
    position: "absolute",
    left: 38,
    top: 291,
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    color: "#000000",
  },
  emailPlaceholder: {
    position: "absolute",
    width: 360,
    left: 38,
    top: 339,
    fontStyle: "normal",
    fontSize: 14,
    // lineHeight: 19,
    fontWeight: "500",
    color: "rgba(0,0,0,0.5)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.36)",
  },
  errorEmail: {
    position: "absolute",
    left: 38,
    top: 371,
  },
  passwordText: {
    position: "absolute",
    left: 38,
    top: 401,
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    color: "#000000",
  },
  passwordPlaceholder: {
    position: "absolute",
    width: 360,
    left: 38,
    top: 448,
    fontStyle: "normal",
    fontSize: 14,
    // lineHeight: 19,
    fontWeight: "500",
    color: "rgba(0,0,0,0.5)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.36)",
  },
  errorPassword: {
    // position: "absolute",
    left: 38,
    top: 480,
  },
  signupButton: {
    width: 346,
    left: 38,
    top: 460,
  },
  Button: {
    width: 346,
    height: 50,
    backgroundColor: "#ED722E",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    top: 450,
    left: "30%",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    fontSize: 16,
  },
});
