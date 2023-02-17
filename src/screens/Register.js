import React from "react";
import Header from "../components/header";
import * as yup from 'yup';
import { useFormik } from 'formik';
import useRequest from '../context/RequestContext';
// import { useDispatch } from 'react-redux';
import {
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  Alert,
} from "react-native";

const Register = ({ navigation }) => {
  // const dispatch = useDispatch();
  const request = useRequest();
  const registerValidationScheme = yup.object().shape({
    userName: yup.string()
      .required("Mohon isikan Username")
      .min(6, "Username minimal 6 karakter")
      .max(12, "Username maksimal 12 karakter"),
    firtsName: yup.string()
      .required("Mohon isikan nama depan"),
    lastName: yup.string()
      .required("Mohon isikan nama belakang"),
    email: yup.string()
      .required("Mohon isikan email")
      .email("Mohon isikan email yang valid"),
    phone: yup.string()
      .required("Mohon isikan nomor telepon")
      .min(10, "Nomor telepon minimal 10 karakter")
      .max(14, "Nomor telepon maksimal 14 karakter"),
    password: yup.string()
      .required("Mohon isikan password")
      .min(6, "Password minimal 6 karakter")
      .max(12, "Password maksimal 12 karakter")
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, "Password (minimal 6 karakter, maksimal 12 karakter, harus mengandung huruf besar, huruf kecil, dan angka)"),
    confirmPassword: yup.string()
      .required("Mohon isikan konfirmasi password")
      .oneOf([yup.ref('password'), null], 'Password tidak sama')
  });
  const formik = useFormik({
    validationSchema: registerValidationScheme,
    initialValues: {
      userName: '',
      firtsName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values) => {
      // console.log(values);
      request.post('/api/v1/auth/register', {
        username: values.userName,
        first_name: values.firtsName,
        last_name: values.lastName,
        email: values.email,
        phone: values.phone,
        password: values.password,
        password_confirmation: values.confirmPassword
      }, {}, res => {
        console.log(res);
        if(res.status != 200){
          alert(res.data.message);
        } else {
          Alert.alert(
            'Success Register Silahkan Login',
            '',
            [
              { text: 'OK', onPress: () => navigation.navigate('Home') },
            ],
            { cancelable: false }
          );
        };
      });
    }
  });

  return (
    <>
      <Header page="blank" />
      <ImageBackground source={require('../assets/images/bg.jpeg')} resizeMode="cover" style={styles.imageBg}>
        <ScrollView style={{ padding: 10 }}>
          <View style={{ flex: 1, padding: 20, marginBottom: 40, backgroundColor: '#fff' }}>
            {/* Form Register */}
            <View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color : '#333', }}>Username</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={formik.handleChange('userName')}
                  value={formik.values.userName}
                  placeholder="Username"
                />
                {formik.errors.userName ? <Text style={{ color: 'red', fontSize : 12 }}>{formik.errors.userName}</Text> : null}
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color : '#333', }}>Nama Depan</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={formik.handleChange('firtsName')}
                  value={formik.values.firtsName}
                  placeholder="Nama Depan"
                />
                {formik.errors.firtsName ? <Text style={{ color: 'red', fontSize : 12 }}>{formik.errors.firtsName}</Text> : null}
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color : '#333', }}>Nama Belakang</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={formik.handleChange('lastName')}
                  value={formik.values.lastName}
                  placeholder="Nama Belakang"
                />
                {formik.errors.lastName ? <Text style={{ color: 'red', fontSize : 12 }}>{formik.errors.lastName}</Text> : null}
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color : '#333', }}>Email</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={formik.handleChange('email')}
                  value={formik.values.email}
                  placeholder="Email"
                />
                {formik.errors.email ? <Text style={{ color: 'red', fontSize : 12 }}>{formik.errors.email}</Text> : null}
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color : '#333', }}>Nomor Telepon</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={formik.handleChange('phone')}
                  value={formik.values.phone}
                  placeholder="Nomor Telepon"
                  keyboardType="numeric"
                />
                {formik.errors.phone ? <Text style={{ color: 'red', fontSize : 12 }}>{formik.errors.phone}</Text> : null}
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color : '#333', }}>Password</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={formik.handleChange('password')}
                  value={formik.values.password}
                  placeholder="Password"
                  secureTextEntry={true}
                />
                {formik.errors.password ? <Text style={{ color: 'red', fontSize : 12 }}>{formik.errors.password}</Text> : null}
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 13, color : '#333', }}>Konfirmasi Password</Text>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  onChangeText={formik.handleChange('confirmPassword')}
                  value={formik.values.confirmPassword}
                  placeholder="Konfirmasi Password"
                />
                {formik.errors.confirmPassword ? <Text style={{ color: 'red', fontSize : 12 }}>{formik.errors.confirmPassword}</Text> : null}
              </View>
              <View>
                <Button
                  title="Daftar"
                  onPress={formik.handleSubmit}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    color: '#333',
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor : '#ddd',
    padding: 10,
    borderRadius: 5,
  },
});