import React from "react";
import HeaderNews from "../../components/headerNews";
import * as yup from "yup";
import { useFormik } from 'formik';
import useRequest from "../../context/RequestContext";
import AuthAction from '../../store/actions/AuthActions';
import { useDispatch, useSelector } from 'react-redux';
import { LoginManager } from 'react-native-fbsdk';

import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

const EditPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const request = useRequest();

  const validationSchema = yup.object().shape({
    old_password: yup.string().required(),
    password: yup.string().required()
      .min(6, "Password minimal 6 karakter")
      .max(12, "Password maksimal 12 karakter")
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, "Password (minimal 6 karakter, maksimal 12 karakter, harus mengandung huruf besar, huruf kecil, dan angka)"),
    password_confirmation: yup.string().required()
      .oneOf([yup.ref('password'), null], 'Password tidak sama'),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: (values, { resetForm }) => {
      request.postWithToken('/api/v1/settings/changePassword', {
        old_password: values.old_password,
        password: values.password,
        password_confirmation: values.password_confirmation,
      }, {}, res => {
        try {
          console.log(res.data);
          if (res.data?.errors) {
            Alert.alert('Error', res.data.message);
          } else {
            Alert.alert('Success', 'Password berhasil diubah');
            resetForm();
            navigation.navigate('Profile');
          }
        } catch (error) {
          console.log(error);
        }
      });
    },
  });

  React.useEffect(() => {
    fatchUser();
  }, []);

  const fatchUser = () => {
    request.postWithToken("/api/v1/auth/me", {}, {}, (res) => {
      if (res.status === 200) {
        dispatch({
          type: AuthAction.SAVE_USER_INFO,
          payload: {
            _user: res.data,
          }
        });
      }
      if (res.status === 401) {
        dispatch({
          type: AuthAction.USER_LOGOUT,
          payload: ""
        });
        LoginManager.logOut();
        Alert.alert('Error', 'Token expired atau tidak valid'
          , [
            {
              text: 'OK',
              onPress: () => navigation.navigate('LoginNews')
            }
          ]);
      }
    });
  };

  return (
    <>
      <HeaderNews page="detail" />
      <ScrollView style={styles.container}>
        {/* card change password */}
        <View style={styles.card}>
          <Text style={styles.title}>Change Password</Text>
          <View style={styles.input}>
            <Text style={styles.label}>Old Password</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Old Password"
              onChangeText={formik.handleChange("old_password")}
              value={formik.values.old_password}
              secureTextEntry={true}
            />
            {formik.errors.old_password && formik.touched.old_password && (
              <Text style={styles.errorText}>{formik.errors.old_password}</Text>
            )}
          </View>
          <View style={styles.input}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.inputText}
              placeholder="New Password"
              onChangeText={formik.handleChange("password")}
              value={formik.values.password}
              secureTextEntry={true}
            />
            {formik.errors.password && formik.touched.password && (
              <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}
          </View>
          <View style={styles.input}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Confirm Password"
              onChangeText={formik.handleChange("password_confirmation")}
              value={formik.values.password_confirmation}
              secureTextEntry={true}
            />
            {formik.errors.password_confirmation && formik.touched.password_confirmation && (
              <Text style={styles.errorText}>{formik.errors.password_confirmation}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
};

export default EditPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#243763",
  },
  input: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: "#243763",
  },
  inputText: {
    borderBottomWidth: 1,
    borderBottomColor: "#243763",
    fontSize: 14,
    color: "#243763",
    marginTop: 5,
  },
  errorText: {
    fontSize: 12,
    color: "#ff0000",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#ff0000",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
});
