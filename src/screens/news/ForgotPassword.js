import React from "react";
import { View, Text, StyleSheet, TextInput, Image, Alert, TouchableOpacity } from "react-native";
import useRequest from "../../context/RequestContext";
import * as yup from "yup";
import { useFormik } from "formik";

const ForgotPassword = ({ navigation }) => {
  const request = useRequest();
  const forgotPasswordValidationScheme = yup.object().shape({
    email: yup.string()
      .required("Mohon isikan email")
      .email("Mohon isikan email yang valid"),
  });
  const formik = useFormik({
    validationSchema: forgotPasswordValidationScheme,
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      request.post('api/v1/auth/forgotpassword', {
        email: values.email
      }, {}, res => {
        console.log(res);
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
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('News')} style={{ marginLeft: 10, position: 'absolute', top: 20, left: 10 }}>
          <Image source={require('../../assets/images/back.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
        <Text style={styles.title}>Lupa Password</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>Masukkan email anda untuk mereset password</Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#243763"
            style={styles.textInput}
            onChangeText={formik.handleChange("email")}
            value={formik.values.email}
            onBlur={formik.handleBlur("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <Text style={styles.errorText}>{formik.errors.email}</Text>
          ) : null}
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={formik.handleSubmit}
          >
            <Text style={styles.textSign}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#243763",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#FFEBB7",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logo: {
    width: 200,
    height: 50,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor: "#243763",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#243763",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#243763",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
