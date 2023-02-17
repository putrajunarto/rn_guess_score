import React from "react";
import useRequest from '../../context/RequestContext';
import { useDispatch } from 'react-redux';
import AuthAction from '../../store/actions/AuthActions';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";

const Login = ({ navigation }) => {
  const request = useRequest();
  const dispatch = useDispatch();
  const [btnDisabled, setBtnDisabled] = React.useState(false);
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
    navigation.navigate('News');
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
        setBtnDisabled(false);
        if (res.data.status === 'success') {
          makeDispatch(res);
        } else {
          Alert.alert('Error', 'Username atau password salah');
        }
      });
    }
  });

  const doLogin = (data) => {
    let postData = {
      "fb_id": data.id,
      "email": data.email,
      "name": data?.name,
    }
    // console.log(postData);
    request.post('/api/v1/auth/login', postData, {}, res => {
      try {
        // console.log(res);
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
      <ImageBackground source={require('../../assets/images/bg-login.jpg')} resizeMode="cover" style={styles.imageBg}>
        <ScrollView keyboardDismissMode="interactive">
          <TouchableOpacity onPress={() => navigation.navigate('News')} style={{ marginLeft: 10, position: 'absolute', top: 20, left: 10 }}>
            <Image source={require('../../assets/images/back.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <View style={{ marginTop: 50, display: "flex", alignItems: "center", }}>
            <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'white' }}>Login</Text>
            {/* Form Login */}
            <View style={{ marginTop: 30, width: '90%', backgroundColor: '#243763', padding: 20, borderRadius: 10 }}>
              <View style={styles.action}>
                {/* <Text style={{ color: '#FFEBB7', fontWeight: 'bold' }}>Username</Text> */}
                <TextInput
                  placeholder='Username'
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
              <View style={styles.action}>
                {/* <Text style={{ color: '#FFEBB7', fontWeight: 'bold' }}>Password</Text> */}
                <TextInput
                  placeholder='Password'
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
              <View style={{ marginTop: 10, alignItems: 'center' }}>
                <TouchableOpacity disabled={btnDisabled} onPress={formik.handleSubmit} style={{ backgroundColor: btnDisabled ? '#666' : '#FFEBB7', padding: 10, borderRadius: 5, width: '100%', alignItems: 'center' }}>
                  <View>
                    <Text style={{ color: '#243763', fontWeight: 'bold' }}>{btnDisabled ? 'Loading...' : 'Login'}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* or */}
              <View style={{ marginVertical: 10, alignItems: 'center' }}>
                <Text style={{ color: '#FFEBB7', fontWeight: 'bold' }}>OR</Text>
              </View>
              {/* Login With Facebook */}
              <TouchableOpacity style={styles.btnLoginFb} onPress={() => loginWithFacebook()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('../../assets/images/facebook.png')} style={{ width: 20, height: 20 }} />
                  <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>Login With Facebook</Text>
                </View>
              </TouchableOpacity>
              {/* Forgot Password */}
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordNews')}>
                <View style={{ marginTop: 10, alignItems: 'center' }}>
                  <Text style={{ color: '#FFEBB7', fontWeight: 'bold' }}>Forgot Password?</Text>
                </View>
              </TouchableOpacity>
              {/* have a account register */}
              <TouchableOpacity onPress={() => navigation.navigate('RegisterNews')}>
                <View style={{ marginTop: 10, alignItems: 'center' }}>
                  <Text style={{ color: '#FFEBB7', fontWeight: 'bold' }}>Don't have a account? <Text style={{ color: '#FF0000' }}>Register</Text></Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Login;

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
    paddingBottom: 5,
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
  },
  btnLoginFb: {
    backgroundColor: '#3B5998', padding: 10, borderRadius: 5, width: '100%', alignItems: 'center',
  }
});
