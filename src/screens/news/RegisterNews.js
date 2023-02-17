import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import useRequest from "../../context/RequestContext";

import {
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const Register = ({ navigation }) => {
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
        if (res.data.status === 'success') {
          Alert.alert(
            'Success',
            'Register berhasil, silahkan login',
            [
              { text: 'OK', onPress: () => navigation.navigate('Login') }
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert('Error', 'Register gagal');
        }
      });
    }
  });

  return (
    <>
      <ImageBackground source={require('../../assets/images/bg-login.jpg')} resizeMode="cover" style={styles.imageBg}>
        <ScrollView keyboardDismissMode="interactive" style={{ flex: 3 }}>
          <TouchableOpacity onPress={() => navigation.navigate('News')} style={{ marginLeft: 10, position: 'absolute', top: 20, left: 10 }}>
            <Image source={require('../../assets/images/back.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 50 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>Register</Text>
            <View style={{ marginTop: 30, width: '90%', backgroundColor: '#243763', padding: 20, borderRadius: 10 }}>
              <View style={styles.action}>
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#fff"
                  style={styles.textInput}
                  onChangeText={formik.handleChange('userName')}
                  value={formik.values.userName}
                  onBlur={formik.handleBlur('userName')}
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <Text style={styles.error}>{formik.errors.userName}</Text>
                ) : null}
              </View>
              <Text style={{fontSize: 12, color : '#fff', paddingHorizontal: 10, marginBottom: 10}}>Username (6-12 Character)</Text>
              <View style={styles.action}>
                <TextInput
                  placeholder="Nama Depan"
                  placeholderTextColor="#fff"
                  style={styles.textInput}
                  onChangeText={formik.handleChange('firtsName')}
                  value={formik.values.firtsName}
                  onBlur={formik.handleBlur('firtsName')}
                />
                {formik.touched.firtsName && formik.errors.firtsName ? (
                  <Text style={styles.error}>{formik.errors.firtsName}</Text>
                ) : null}
              </View>
              <View style={styles.action}>
                <TextInput
                  placeholder="Nama Belakang"
                  placeholderTextColor="#fff"
                  style={styles.textInput}
                  onChangeText={formik.handleChange('lastName')}
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <Text style={styles.error}>{formik.errors.lastName}</Text>
                ) : null}
              </View>
              <View style={styles.action}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#fff"
                  style={styles.textInput}
                  onChangeText={formik.handleChange('email')}
                  value={formik.values.email}
                  onBlur={formik.handleBlur('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Text style={styles.error}>{formik.errors.email}</Text>
                ) : null}
              </View>
              <Text style={{fontSize: 12, color : '#fff', paddingHorizontal: 10, marginBottom: 10}}>Masukan Email Aktif. Email akan berguna untuk "Lupa Password" dan konfirmasi alamat pengiriman hadiah</Text>
              <View style={styles.action}>
                <TextInput
                  placeholder="Nomor Telepon"
                  placeholderTextColor="#fff"
                  style={styles.textInput}
                  onChangeText={formik.handleChange('phone')}
                  value={formik.values.phone}
                  onBlur={formik.handleBlur('phone')}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <Text style={styles.error}>{formik.errors.phone}</Text>
                ) : null}
              </View>
              <Text style={{fontSize: 12, color : '#fff', paddingHorizontal: 10, marginBottom: 10}}>Masukan No Aktif. Bagi Pemenang hadiah pulsa, Pulsa akan di kirimkan ke No terdaftar ini</Text>
              <View style={styles.action}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  style={styles.textInput}
                  onChangeText={formik.handleChange('password')}
                  value={formik.values.password}
                  onBlur={formik.handleBlur('password')}
                  secureTextEntry={true}
                />
                {formik.touched.password && formik.errors.password ? (
                  <Text style={styles.error}>{formik.errors.password}</Text>
                ) : null}
              </View>
              <Text style={{fontSize: 12, color : '#fff', paddingHorizontal: 10, marginBottom: 10}}>Password (6 - 12 character, kombinasi minimal terdapat 1 angka / huruf)</Text>
              <View style={styles.action}>
                <TextInput
                  placeholder="Konfirmasi Password"
                  placeholderTextColor="#fff"
                  style={styles.textInput}
                  onChangeText={formik.handleChange('confirmPassword')}
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur('confirmPassword')}
                  secureTextEntry={true}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <Text style={styles.error}>{formik.errors.confirmPassword}</Text>
                ) : null}
              </View>
              <Text style={{fontSize: 12, color : '#fff', paddingHorizontal: 10, marginBottom: 10}}>Password (6 - 12 character, kombinasi minimal terdapat 1 angka / huruf)</Text>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ color: '#FFEBB7', fontWeight: 'bold', }}>Penting (untuk Alasan Keamanan) :</Text>
                {/* List Items */}
                <View style={{ marginTop: 10 }}>
                  <Text style={{ color: '#FFEBB7' }}>Kami tidak akan Memproses konfirmasi Alamat dari email lain selain email terdaftar ini. Pemenang yang tidak memberikan informasi alamat pengiriman, maka akan di gugurkan dan akan kami cari pemenang baru dari peringkat selanjutnya</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ color: '#FFEBB7' }}>Hadiah Pulsa yang tidak berhasil di kirm ke No HP terdaftar, maka akan anggap gugur dan akan di tentukan pemenang yangbaru dari peringkat selanjutnya</Text>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={{ backgroundColor: '#FFEBB7', padding: 10, borderRadius: 5, width: '100%', alignItems: 'center' }} onPress={formik.handleSubmit}>
                  <Text style={{ textAlign: 'center', color: '#243763' }}>Register</Text>
                </TouchableOpacity>
              </View>
              {/* Or */}
              <TouchableOpacity onPress={() => navigation.navigate('LoginNews')}>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ color: '#FFEBB7', fontWeight: 'bold' }}>Sudah punya akun? <Text style={{ color: '#FF0000' }}>Login</Text></Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  )
}

export default Register;

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    justifyContent: "center",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 0,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#fff",
  },
  error: {
    color: '#FF6E31',
    fontSize: 12,
    marginTop: 5
  },
});