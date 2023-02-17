import React from "react";
import HeaderAfter from "../../components/headerAfter";
import * as yup from 'yup';
import { useFormik } from 'formik';
import useRequest from '../../context/RequestContext';
import { useSelector } from "react-redux";
import AuthAction from '../../store/actions/AuthActions';

import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TouchableHighlight,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";

const SettingEmail = ({ navigation }) => {
  const request = useRequest();
  const authState = useSelector((state) => state.auth);
  const changeEmailValidationScheme = yup.object().shape({
    email: yup.string()
      .required("Mohon isikan email")
      .email("Mohon isikan email yang valid"),
  });
  const formik = useFormik({
    validationSchema: changeEmailValidationScheme,
    initialValues: {
      email: authState._user.data?.email,
    },
    onSubmit: (values, { resetForm }) => {
      request.postWithToken('/api/v1/settings/changeEmail', {
        email: values.email,
      }, {}, res => {
        try {
          if (res.data?.errors) {
            Alert.alert('Error', res.data.message);
          } else {
            Alert.alert('Success', 'Nomor telepon berhasil diubah');
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  });
  return (
    <>
      <HeaderAfter page="Setting" />
      <ImageBackground source={require('../../assets/images/bg.jpeg')} resizeMode="cover" style={styles.imageBg}>
        <ScrollView>
          <View style={[styles.bgWhite]}>
            <Text style={{ fontSize: 20, marginBottom: 5, color: '#333' }}>Detail User</Text>
            <View style={[styles.row, styles.mb5]}>
              <View style={{ width: '15%' }}>
                <Text style={{color: '#333'}}>Name</Text>
              </View>
              <View style={{ width: '85%' }}>
                <Text style={{color: '#333'}}>: {authState._user.data?.first_name} {authState._user.data?.last_name}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.mb5]}>
              <View style={{ width: '15%' }}>
                <Text style={{color: '#333'}}>Email</Text>
              </View>
              <View style={{ width: '85%' }}>
                <Text style={{color: '#333'}}>: {authState._user.data?.email}</Text>
              </View>
            </View>
            <View style={[styles.row, styles.mb10, styles.borderBottom]}>
              <View style={{ width: '15%' }}>
                <Text style={{color: '#333'}}>Phone</Text>
              </View>
              <View style={{ width: '85%' }}>
                <Text style={{color: '#333'}}>: {authState._user.data?.phone}</Text>
              </View>
            </View>
            <View style={[styles.mb10]}>
              <View style={[styles.row]}>
                <TouchableHighlight onPress={() => navigation.navigate('Setting')} style={{ width: '33.333333%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', color : '#333', borderColor: '#999', borderWidth: 1 }} underlayColor="white">
                  <Text style={{ padding: 10, textAlign: 'center', fontSize: 11, }}>Change Password</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.navigate('SettingPhone')} style={{ width: '33.333333%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', color : '#333', borderColor: '#999', borderWidth: 1 }} underlayColor="white">
                  <Text style={{ padding: 10, textAlign: 'center' }}>Change Phone</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => navigation.navigate('SettingEmail')} style={{ width: '33.333333%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00c20b', borderColor: '#00c20b', borderWidth: 1 }} underlayColor="white">
                  <Text style={{ color: '#fff', padding: 10, textAlign: 'center' }}>Change Email</Text>
                </TouchableHighlight>
              </View>
            </View>
            {/* Form Change Password */}
            <Text style={{ fontSize: 20, marginBottom: 5, color: '#333' }}>Change Email</Text>
            <Text style={{color: '#333'}}>Email</Text>
            <TextInput
              style={[styles.input, styles.mb10]}
              onChangeText={formik.handleChange('email')}
              value={formik.values.email}
              placeholder="Email"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <Text style={styles.error}>{formik.errors.phone}</Text>
            ) : null}
            <TouchableHighlight
              style={[styles.button, styles.bgBlue]}
              onPress={formik.handleSubmit}
            >
              <Text style={[styles.textWhite]}>Change Phone</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default SettingEmail;

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10
  },
  input: {
    color: '#333',
    marginTop: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10
  },
  bgBlue: {
    backgroundColor: "#2196F3"
  },
  textWhite: {
    color: "#fff"
  },
  borderBottom: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  mb10: {
    marginBottom: 10,
  },
  mb5: {
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
  },
  bgWhite: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  imageBg: {
    flex: 1,
    padding: 10,
  },
});