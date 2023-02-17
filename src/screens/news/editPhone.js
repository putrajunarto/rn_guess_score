import React from "react";
import HeaderNews from "../../components/headerNews";
import * as yup from "yup";
import { useFormik } from 'formik';
import useRequest from "../../context/RequestContext";
import { useDispatch, useSelector } from 'react-redux';
import AuthAction from '../../store/actions/AuthActions';

import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

const EditPhone = ({ navigation }) => {
  const request = useRequest();
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    phone: yup.string().required(),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      phone: "",
    },
    onSubmit: (values, { resetForm }) => {
      request.postWithToken('/api/v1/settings/changePhone', {
        phone: values.phone,
      }, {}, res => {
        try {
          if (res.data?.errors) {
            Alert.alert('Error', res.data.message);
          } else {
            Alert.alert('Success', 'Phone berhasil diubah');
            resetForm();
            fatchUser();
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
      {/* Edit Phone */}
      <ScrollView style={styles.container}>
        <View style={styles.editEmail}>
          <Text style={styles.title}>Edit Phone</Text>
          <Text style={styles.text}>
            Masukkan nomor telepon yang baru untuk mengganti nomor telepon yang lama
          </Text>
          <View style={styles.input}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Phone"
              placeholderTextColor="#243763"
              onChangeText={formik.handleChange("phone")}
              value={formik.values.phone}
              onBlur={formik.handleBlur("phone")}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <Text style={styles.errorText}>{formik.errors.phone}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={formik.handleSubmit}
          >
            <Text style={styles.buttonText}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default EditPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  editEmail: {
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
  text: {
    fontSize: 14,
    color: "#243763",
    marginTop: 10,
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