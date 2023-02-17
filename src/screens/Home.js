import React from "react";
import Header from '../components/header';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useRequest from '../context/RequestContext';
import { useDispatch } from 'react-redux';
import AuthAction from '../store/actions/AuthActions';
import { useSelector } from "react-redux";
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  Alert
} from "react-native";

const Home = ({ navigation }) => {
  const request = useRequest();
  const dispatch = useDispatch();
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const authState = useSelector((state) => state.auth);
  const loginValidationScheme = yup.object().shape({
    userName: yup.string()
      .required("Mohon isikan Username"),
    password: yup.string()
      .required("Mohon isikan password")
  });
  const makeDispatch = (res) => {
    dispatch({
      type: AuthAction.SAVE_USER_INFO,
      payload: {
        _user: res.data,
      }
    });
    dispatch({
      type: AuthAction.SAVE_USER_TOKEN,
      payload: {
        token: res.data.token
      }
    });
    navigation.navigate('Home');
  }
  const formik = useFormik({
    validationSchema: loginValidationScheme,
    initialValues: {
      userName: '',
      password: ''
    },
    onSubmit: (values) => {
      setBtnDisabled(true);
      request.post('/api/v1/auth/login', {
        username: values.userName,
        password: values.password
      }, {}, res => {
        // console.log(res);
        setBtnDisabled(false);
        if (res.data.status === 'success') {
          makeDispatch(res);
        } else {
          Alert.alert('Error', 'Username atau password salah');
        }
      });
    }
  });
  React.useEffect(() => {
    if (authState.status) {
      navigation.reset({
        index: 0,
        routes: [{ name: "AfterLogin" }]
      });
    }
  }, [authState]);

  const doLogin = (data) => {
    let postData = {
      "fb_id": data.id,
      "email": data.email,
      "name": data?.name,
    }
    console.log(postData);
    request.post('/api/v1/auth/login', postData, {}, res => {
      try {
        makeDispatch(res);
      } catch (error) {
        console.log(error);
      }
    });
  }

  const getInfoFromToken = (token) => {
    const responseInfoCallback = (error, result) => {
      if (error) {
        console.log(error)
      } else {
        doLogin(result);
      }
    }

    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: token,
        parameters: {
          fields: {
            string: 'email,name'
          }
        }
      },
      responseInfoCallback
    );

    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start()
  };

  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              getInfoFromToken(data.accessToken.toString());
            }
          )
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  return (
    <>
      <Header page="home" />
      <ImageBackground source={require('../assets/images/bg.jpeg')} resizeMode="cover" style={styles.imageBg}>
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            <Image style={styles.banner} source={require('../assets/banner/856-x-480.png')} />
          </View>
          <View style={{ flex: 1, padding: 10, marginTop: 10 }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 5 }}>
              <Text style={[styles.title, styles.label]}>Login</Text>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={formik.handleChange('userName')}
                  value={formik.values.userName}
                  onBlur={formik.handleBlur('userName')}
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <Text style={styles.error}>{formik.errors.userName}</Text>
                ) : null}
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={formik.handleChange('password')}
                  value={formik.values.password}
                  onBlur={formik.handleBlur('password')}
                  secureTextEntry={true}
                />
                {formik.touched.password && formik.errors.password ? (
                  <Text style={styles.error}>{formik.errors.password}</Text>
                ) : null}
              </View>
              <View style={[styles.mt10]}>
                <TouchableHighlight disabled={btnDisabled} onPress={formik.handleSubmit} underlayColor="white">
                  <Text style={styles.btnLogin}>Login</Text>
                </TouchableHighlight>
              </View>

              {/* button login facebook */}
              <View style={{ marginTop: 10, alignItems: 'center' }}>
                <Text style={{ marginBottom: 10, color : '#333', }}>Or</Text>
                <TouchableHighlight style={styles.btnLoginFb} onPress={() => loginWithFacebook()} underlayColor="white">
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Login Facebook</Text>
                </TouchableHighlight>
                {/* <LoginButton
                  onLoginFinished={
                    (error, result) => {
                      if (error) {
                        console.log("login has error: " + result.error);
                      } else if (result.isCancelled) {
                        console.log("login is cancelled.");
                      } else {
                        AccessToken.getCurrentAccessToken().then(
                          (data) => {
                            getInfoFromToken(data.accessToken.toString());
                          }
                        )
                      }
                    }
                  }
                  onLogoutFinished={() => console.log("logout.")}
                /> */}
              </View>

              <TouchableHighlight underlayColor="white" onPress={() => navigation.navigate('ForgotPassword')} activeOpacity={0.6}>
                <Text style={{ marginTop: 20, textAlign: 'center', color: '#333' }}>Forgot Password?</Text>
              </TouchableHighlight>
              <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 20, }}>
                <Text style={[ styles.label ]}>Don't have an account?</Text>
                <TouchableHighlight underlayColor="white" onPress={() => navigation.navigate('Register')} activeOpacity={0.6}>
                  <Text style={{ color: 'red' }}> Register</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, padding: 10, marginTop: 10 }}>
            <View style={{ backgroundColor: 'white', padding: 20 }}>
              <Text style={[ styles.label ]}>Kuis yang kami selenggarakan adalah bebas biaya www.football5star.com tidak pernah meminta biaya apapun.</Text>
              <Text style={[ styles.label ]}>Pastikan alamat email dan no telepon anda diisi dengan benar. Kerahasiaan data anda terjamin, data kami butuhkan hanya untuk konfirmasi data pengiriman hadiah.</Text>
              <Text style={{ textAlign: "center", marginTop: 20, color : '#333' }}>© 2019 football5star All Right Sesserved.</Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  label: {
    color: '#333',
  },
  mt10: {
    marginTop: 10
  },
  btnLoginFb: {
    backgroundColor: '#3b5998',
    padding: 11,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  imageBg: {
    flex: 1,
    justifyContent: "center",
  },
  banner: {
    height: 200,
    width: '100%',
  },
  input: {
    color : '#333',
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  textCenter: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  btnLogin: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#00c20b',
    borderColor: '#00c20b',
    borderWidth: 1,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
});