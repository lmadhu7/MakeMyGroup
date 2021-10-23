

import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Pressable, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';


const phoneRegExp = '/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/';
const signUpValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    name: yup
        .string()
        .required('Name field is required'),
    phonenumber: yup
        .string()
        .required('Phone number is required')
        // .matches(phoneRegExp, 'Phone number is not valid'),
  });

export default function SignUpScreen({navigation}) {
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.signupTitle}>Sign Up</Text>
            <SafeAreaView style={styles.subContainer}>
            <Formik
                    validationSchema={signUpValidationSchema}
                    initialValues={{ email: '', password: '', name: '', phonenumber: '' }}
                    onSubmit={()=>navigation.navigate('Login')}
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
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            keyboardType="email-address"
                        />
                        <View style={styles.errorName}>
                        {(errors.name && touched.name) &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                        }
                        </View>
                        <Text style={styles.phoneNumberText}>Phone Number</Text>
                        <TextInput
                            style={styles.phonenumberPlaceholder}
                            placeholder="Enter phone number"
                            onChangeText={handleChange('phonenumber')}
                            onBlur={handleBlur('phonenumber')}
                            value={values.phonenumber}
                            keyboardType="email-address"
                        />
                        <View style={styles.errorPhonenumber}>
                        {(errors.phonenumber && touched.phonenumber) &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.phonenumber}</Text>
                        }
                        </View>
                        <Text style={styles.emailText}>Email</Text>
                        <TextInput
                            style={styles.emailPlaceholder}
                            placeholder="Email Address"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        <View style={styles.errorEmail}>
                        {(errors.email && touched.email) &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                        }
                        </View>
                        <Text style={styles.passwordText}>Password</Text>
                        <TextInput
                            style={styles.passwordPlaceholder}
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        <View style={styles.errorPassword}>
                        {(errors.password && touched.password) &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                        }
                        </View>
                        <View style={styles.signupButton}>
                        <Button
                            onPress={handleSubmit}
                            color='#ED722E'
                            title="SIGN UP"
                            disabled={!isValid}
                        />
                        </View>
                        <Text style={styles.skipText} onPress={()=>navigation.navigate('Appstack')}>Skip for now</Text>
                        </>
                    )}
                    </Formik>
            </SafeAreaView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: 414,
        height: 896,
        backgroundColor: '#ED722E',
        // color: '#ED722E',
    },
    welcomeText: {
        position: 'absolute',
        left: 40,
        top: 78,
        fontStyle:'normal',
        fontSize:18,
        lineHeight:22,
        fontWeight:'500',
        color:'rgba(255,255,255,0.7)',
        // disply:"flex"
    },
    signupTitle: {
        position: 'absolute',
        top: 115,
        left: 40,
        fontStyle:'normal',
        fontSize:30,
        lineHeight:36,
        fontWeight:'600',
        color:'#FFFFFF',
        // disply:"flex"
    },
    subContainer: {
        top: 185,
        left: 0,
        height: 630,
        width: 414,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        backgroundColor: '#FFFFFF'
    },
    nameText: {
        position: 'absolute',
        left: 38,
        top: 71,
        fontStyle:'normal',
        fontSize:20,
        lineHeight:24,
        fontWeight:'600',
        color:'#000000',
        // disply:"flex"
    },
    namePlaceholder: {
        position: 'absolute',
        left: 38,
        top: 118,
        fontStyle:'normal',
        fontSize:14,
        lineHeight:19,
        fontWeight:'500',
        color:'rgba(0,0,0,0.5)',
        // disply:"flex"
    },
    errorName: {
        position: 'absolute',
        left: 38,
        top: 140
    },
    phoneNumberText: {
        position: 'absolute',
        left: 38,
        top: 181,
        fontStyle:'normal',
        fontSize:20,
        lineHeight:24,
        fontWeight:'600',
        color:'#000000',
    },
    phonenumberPlaceholder: {
        position: 'absolute',
        left: 38,
        top: 228,
        fontStyle:'normal',
        fontSize:14,
        lineHeight:19,
        fontWeight:'500',
        color:'rgba(0,0,0,0.5)',
        // disply:"flex"
    },
    errorPhonenumber: {
        position: 'absolute',
        left: 38,
        top: 250
    },
    emailText: {
        position: 'absolute',
        left: 38,
        top: 291,
        fontStyle:'normal',
        fontSize:20,
        lineHeight:24,
        fontWeight:'600',
        color:'#000000',
    },
    emailPlaceholder: {
        position: 'absolute',
        left: 38,
        top: 339,
        fontStyle:'normal',
        fontSize:14,
        lineHeight:19,
        fontWeight:'500',
        color:'rgba(0,0,0,0.5)',
        // disply:"flex"
    },
    errorEmail: {
        position: 'absolute',
        left: 38,
        top: 361
    },
    passwordText: {
        position: 'absolute',
        left: 38,
        top: 401,
        fontStyle:'normal',
        fontSize:20,
        lineHeight:24,
        fontWeight:'600',
        color:'#000000',
    },
    passwordPlaceholder: {
        position: 'absolute',
        left: 38,
        top: 448, 
        fontStyle:'normal',
        fontSize:14,
        lineHeight:19,
        fontWeight:'500',
        color:'rgba(0,0,0,0.5)',
        // disply:"flex"
    },
    errorPassword: {
        position: 'absolute',
        left: 38,
        top: 470
    },
    signupButton: {
        width: 346,
        left: 38,
        top: 530
    },
    Button: {
        width: 346,height:50,
        backgroundColor: '#ED722E'
    },
    skipText: {
        left: 160,
        position: 'absolute',
        top: 580,
        fontStyle:'normal',
        fontSize:16,
        lineHeight:19,
        fontWeight:'600',
        color:'rgba(58,59,61,0.6)',
        // disply:"flex"
    }
});