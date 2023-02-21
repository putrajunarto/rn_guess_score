import React from "react";
import {
  Text,
  View,
  Image,
  Linking,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import AuthAction from '../store/actions/AuthActions';
import { LoginManager } from 'react-native-fbsdk';

const HeaderNews = (props) => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = React.useState(true);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const onOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  const doLogout = () => {
    dispatch({
      type: AuthAction.USER_LOGOUT,
      payload: ""
    });
    LoginManager.logOut();
    navigation.navigate("LoginNews");
  }

  // React.useEffect(() => {
  //   console.log(authState)
  // }, [authState.token]);

  const onPlayGame = () => {
    if (authState.status) {
      setIsOpen(!isOpen);
      navigation.navigate("PlayGame");
    } else {
      Alert.alert(
        "Login Required",
        "Please login to play game",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => {navigation.navigate("LoginNews"); setIsOpen(!isOpen)} }
        ],
        { cancelable: false }
      );
    }
  };

  const onLiveKuis = () => {
    if (authState.status) {
      setIsOpen(!isOpen);
      navigation.navigate("AfterLogin");
    } else {
      Alert.alert(
        "Login Required",
        "Please login to Live Kuis",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => {navigation.navigate("LoginNews"); setIsOpen(!isOpen)} }
        ],
        { cancelable: false }
      );
    }    
  };

  return <>
    <View style={styles.headers}>
      {
        props.page === "detail" ?
          // back navigation
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.close}>
            <Image source={require('../assets/images/back.png')} style={styles.close} />
          </TouchableOpacity>
          : (
            isOpen ? <TouchableOpacity onPress={onOpenMenu} style={styles.menu}>
              <Image source={require('../assets/images/menu-white.png')} style={styles.menu} />
            </TouchableOpacity> :
              <TouchableOpacity onPress={onOpenMenu} style={styles.close}>
                <Image source={require('../assets/images/close-white.png')} style={styles.close} />
              </TouchableOpacity>
          )
      }
      <Text style={styles.logo}>Bola Milenia</Text>
    </View>
    {
      !isOpen ? <ScrollView style={styles.menuList}>
        <ImageBackground source={require('../assets/images/bgside.jpg')} resizeMode="cover" style={styles.imageBg} >
          {
            authState.status ?
              <View>
                <Text style={[styles.sideTitle]}>WELCOME</Text>
                <Text style={[styles.sideTitle, styles.mt10]}>{authState._user.data.first_name} {authState._user.data.last_name}</Text>
                <View style={[styles.mt20, styles.dFlex]}>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('Profile');
                    setIsOpen(!isOpen)
                  }}>
                    <Text style={[styles.btnWarning, styles.mr10]}>PROFILE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { doLogout(); setIsOpen(!isOpen) }}>
                    <Text style={[styles.btnDanger]}>LOGOUT</Text>
                  </TouchableOpacity>
                </View>
              </View>
              :
              <View>
                <Text style={[styles.sideTitle]}>WELCOME</Text>
                <View style={[styles.mt20, styles.dFlex]}>
                  <TouchableOpacity onPress={() => { navigation.navigate('LoginNews'); setIsOpen(!isOpen) }}>
                    <Text style={[styles.btnWarning, styles.mr10]}>LOGIN</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { navigation.navigate('RegisterNews'); setIsOpen(!isOpen) }}>
                    <Text style={[styles.btnWarning]}>DAFTAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
          }
        </ImageBackground>
        {/* <TouchableOpacity onPress={() => onPlayGame()} style={styles.mt20}>
          <Image source={require('../assets/images/side1.jpg')} style={{ height: 170, width: '100%' }} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => onLiveKuis()} style={styles.mt20}>
          <Image source={require('../assets/images/side2.jpg')} style={{ height: 220, width: '100%' }} />
        </TouchableOpacity>
        <View style={[styles.dFlex, styles.my20]}>
          <TouchableOpacity onPress={() => Linking.openURL('http://google.com')} style={styles.items}>
            <Image source={require('../assets/images/facebook.png')} style={{ height: 40, width: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('http://google.com')} style={styles.items}>
            <Image source={require('../assets/images/instagram.png')} style={{ height: 40, width: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('http://google.com')} style={styles.items}>
            <Image source={require('../assets/images/twitter.png')} style={{ height: 40, width: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('http://google.com')} style={styles.items}>
            <Image source={require('../assets/images/youtube.png')} style={{ height: 40, width: 40 }} />
          </TouchableOpacity>
        </View>
      </ScrollView> : null
    }
  </>
}

export default HeaderNews;

const styles = StyleSheet.create({
  my20: {
    marginVertical: 20,
  },
  dFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnWarning: {
    backgroundColor: '#008d7f',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    borderRadius: 50,
    minWidth: 130,
  },
  btnDanger: {
    backgroundColor: '#d9534f',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    borderRadius: 50,
    minWidth: 130,
  },
  imageBg: {
    height: 170,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  headers: {
    height: 70,
    backgroundColor: '#008d7f',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  logo: {
    fontSize: 23,
    fontWeight: 'bold',
    letterSpacing: .8,
    color: '#fff',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mt20: {
    marginTop: 20,
  },
  mr10: {
    marginRight: 10,
  },
  activeMenu: {
    borderBottomColor: '#00c20b',
    borderBottomWidth: 2,
    paddingHorizontal: 10,
  },
  itemMenu: {
    padding: 10,
    fontSize: 20,
    width: '100%',
    color: 'black',
  },
  menu: {
    top: 6,
    left: 8,
    height: 40,
    width: 40,
    position: 'absolute',
  },
  close: {
    top: 10,
    left: 10,
    height: 27,
    width: 27,
    position: 'absolute',
  },
  menuList: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    position: 'relative',
    left: 0,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  items: {
    paddingHorizontal: 10,
  }
});