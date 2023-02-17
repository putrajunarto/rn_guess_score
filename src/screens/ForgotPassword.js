import React from "react";
import Header from '../components/header';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useRequest from '../context/RequestContext';

import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";

const ForgotPassword = ({navigation}) => {
  const request = useRequest();
  const loginValidationScheme = yup.object().shape({
    email: yup.string()
      .required("Mohon isikan email")
  });
  const formik = useFormik({
    validationSchema: loginValidationScheme,
    initialValues: {
      email: ''
    },
    onSubmit: (values, actions) => {
      request.post('api/v1/auth/forgotpassword', {
        email: values.email
      }, {}, res => {
        if (res.data.status != 'success') {
          Alert.alert('Error', res.data.message);
        } else {
          Alert.alert('Success', res.data.message);
          actions.resetForm();
          navigation.navigate('Home');
        }
      }, err => {
        console.log(err);
      });
    }
  });
  return (
    <>
      <Header page="forgotpassword" />
      <ImageBackground source={require('../assets/images/bg.jpeg')} resizeMode="cover" style={styles.imageBg}>
        <View style={styles.container}>
          <Text style={styles.text}>Forgot Password</Text>
          {/* Form Forgot Password */}
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={formik.handleChange('email')}
                value={formik.values.email}
                placeholder="Masukkan email"
              />
              {formik.errors.email && formik.touched.email ? (
                <Text style={styles.error}>{formik.errors.email}</Text>
              ) : null}
            </View>
            <View style={styles.formGroup}>
              <TouchableOpacity style={styles.btn} onPress={formik.handleSubmit}>
                <Text style={styles.btnText}>Kirim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  form: {
    marginTop: 20
  },
  formGroup: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10
  },
  error: {
    color: 'red',
    fontSize: 12
  },
  btn: {
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 5
  },
  btnText: {
    color: '#fff',
    textAlign: 'center'
  },
  imageBg: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});