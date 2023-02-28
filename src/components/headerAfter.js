import React from "react";
import { Text, View, Image, Button, ScrollView, StyleSheet, TouchableHighlight } from "react-native";
import { LoginManager } from 'react-native-fbsdk';

import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import AuthAction from '../store/actions/AuthActions';

const HeaderAfter = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(true);
  const onOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  const onGoToHome = () => {
    setIsOpen(!isOpen);
    navigation.navigate("Dashboard");
  };
  const onGoToPlayMatch = () => {
    setIsOpen(!isOpen);
    navigation.navigate("PlayMatch");
  };
  const onGoToPlaySession = () => {
    setIsOpen(!isOpen);
    navigation.navigate("PlaySession");
  };
  const onGoToLeaderboard = () => {
    setIsOpen(!isOpen);
    navigation.navigate("Leaderboard");
  };
  const onGoToResi = () => {
    setIsOpen(!isOpen);
    navigation.navigate("Resi");
  };
  const onGoToSetting = () => {
    setIsOpen(!isOpen);
    navigation.navigate("Setting");
  };
  

  const doLogout = () => {
    dispatch({
      type: AuthAction.USER_LOGOUT,
      payload: ""
    });
    navigation.reset({
      index: 0,
      routes: [{ name: "News" }]
    })
    LoginManager.logOut();
  }

  return <>
    <View style={styles.headers}>
      {
        isOpen ? <TouchableHighlight onPress={onOpenMenu} style={styles.menu} underlayColor="white">
          <Image source={require('../assets/images/menu.png')} style={styles.menu} />
        </TouchableHighlight> :
          <TouchableHighlight onPress={onOpenMenu} style={styles.close} underlayColor="white">
            <Image source={require('../assets/images/close.png')} style={styles.close} />
          </TouchableHighlight>
      }
      <Image style={styles.logo} source={require('../assets/images/logo-landscape.jpeg')} />
    </View>
    {
      !isOpen ? <>
        <View style={styles.menuList}>
          <TouchableHighlight onPress={() => navigation.navigate('News')} underlayColor="white">
            <Text style={[styles.itemMenu]} >News</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => onGoToHome()} style={props.page === 'dashboard' ? styles.activeMenu : ''} underlayColor="white">
            <Text style={[styles.itemMenu]} >Dashboard</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => onGoToPlayMatch()} style={props.page === 'playmatch' ? styles.activeMenu : ''} underlayColor="white">
            <Text style={styles.itemMenu} >Play Match Kuis</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => onGoToPlaySession()} style={props.page === 'playsession' ? styles.activeMenu : ''} underlayColor="white">
            <Text style={styles.itemMenu} >Play Session Kuis</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => onGoToLeaderboard()} style={props.page === 'Leaderboard' ? styles.activeMenu : ''} underlayColor="white">
            <Text style={styles.itemMenu} >Leaderboard</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => onGoToResi()} style={props.page === 'Resi' ? styles.activeMenu : ''} underlayColor="white">
            <Text style={styles.itemMenu} >Resi</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => onGoToSetting()} style={props.page === 'Setting' ? styles.activeMenu : ''} underlayColor="white">
            <Text style={styles.itemMenu} >Settings</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => doLogout()} style={{ backgroundColor: 'red', marginTop: 20 }} underlayColor="red">
            <Text style={styles.itemMenuLogout} >Logout</Text>
          </TouchableHighlight>
        </View>
      </>
        : null
    }
  </>
}

export default HeaderAfter;

const styles = StyleSheet.create({
  headers: {
    height: 70,
    backgroundColor: 'white',
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
    height: 50,
    width: 160,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  mt20: {
    marginTop: 20,
  },
  activeMenu: {
    borderBottomColor: '#00c20b',
    borderBottomWidth: 2,
  },
  itemMenu: {
    padding: 10,
    fontSize: 20,
    width: '100%',
    color: 'black',
  },
  itemMenuLogout: {
    padding: 10,
    fontSize: 20,
    width: '100%',
    color: 'white',
  },
  menu: {
    top: 6,
    left: 8,
    height: 40,
    width: 40,
    position: 'absolute',
  },
  close: {
    top: 8,
    left: 10,
    height: 30,
    width: 30,
    position: 'absolute',
  },
  menuList: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    position: 'relative',
    left: 0,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    paddingLeft: 20,
    paddingRight: 20,
  }
});