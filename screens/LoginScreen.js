import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Button,
  Dimensions,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { AntDesign } from "@expo/vector-icons";

const LogInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const window = Dimensions.get("window");
export default function SignUpScreen({ navigation }) {
  const validateUserDetails = () => {
    navigation.navigate("Appstack");
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.loginTitle}>Log In</Text>
          <SafeAreaView style={styles.subContainer}>
            <View style={{ top: 71, left: 100 }}>
              <AntDesign name="star" size={8} color="red" />
            </View>
            <Formik
              validationSchema={LogInValidationSchema}
              initialValues={{ email: "", password: "" }}
              onSubmit={validateUserDetails}
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
                  <Text style={styles.emailText}>Email</Text>

                  <TextInput
                    style={styles.emailPlaceholder}
                    placeholder="Example@gmail.com"
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
                  <Text style={styles.passwordText}>Password</Text>
                  <View style={{ top: 152, left: 140 }}>
                    <AntDesign name="star" size={8} color="red" />
                  </View>
                  <TextInput
                    style={styles.passwordPlaceholder}
                    placeholder=" Enter Password"
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
                  <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  <View style={styles.loginButton}>
                    <Button
                      color="#ED722E"
                      onPress={handleSubmit}
                      title="Log In"
                      disabled={!isValid}
                    />
                  </View>
                  <Text style={styles.dontAccout}>Don't have an account?</Text>
                  <Text
                    style={styles.signupText}
                    onPress={() => navigation.navigate("Signup")}
                  >
                    Sign Up
                  </Text>
                </>
              )}
            </Formik>
          </SafeAreaView>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: 414,
    flex: 1,
    height: 896,
    backgroundColor: "#ED722E",
  },
  welcome: {
    position: "absolute",
    top: 128,
    left: 40,
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "500",
    color: "rgba(255,255,255,0.7)",
  },
  loginTitle: {
    position: "absolute",
    left: 40,
    top: 165,
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "600",
    color: "rgba(255,255,255,0.7)",
  },
  subContainer: {
    top: 285,
    width: 414,
    height: 530,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  emailText: {
    position: "absolute",
    top: 71,
    left: 38,
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    color: "#000000",
  },
  emailPlaceholder: {
    // position: "absolute",
    left: 38,
    top: 118,
    width: 360,
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "rgba(0,0,0,0.5)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.36)",
  },
  errorEmail: {
    position: "absolute",
    top: 160,
    left: 38,
  },
  passwordText: {
    position: "absolute",
    left: 38,
    top: 192,
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    color: "#000000",
    // disply:"flex"
  },
  passwordPlaceholder: {
    position: "absolute",
    left: 38,
    top: 239,
    width: 360,
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "#000000",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.36)",
  },
  errorPassword: {
    position: "absolute",
    top: 265,
    left: 38,
  },
  forgotPassword: {
    position: "absolute",
    left: 38,
    top: 306,
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "rgba(58,59,61,0.72)",
  },
  loginButton: {
    position: "absolute",
    left: 38,
    top: 371,
    height: 50,
    width: 360,
  },
  Button: {
    width: 360,
    backgroundColor: "#ED722E",
  },
  loginText: {
    position: "absolute",
    left: 346,
    top: 10,
    color: "#FFFFFF",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  dontAccout: {
    position: "absolute",
    left: 73,
    top: 444,
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "600",
    color: "rgba(0,0,0,0.52)",
  },
  signupText: {
    position: "absolute",
    left: 263,
    top: 444,
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "bold",
    color: "#ED722E",
  },
});
