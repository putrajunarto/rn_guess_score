import React from "react";
import { Text, View, Image, Button, ScrollView, StyleSheet, TouchableHighlight } from "react-native";

import { useNavigation } from "@react-navigation/native";

const Header = (props) => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = React.useState(true);
  const onOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  const onGoToHome = () => {
    setIsOpen(!isOpen);
    navigation.navigate("Home");
  };
  const onGoToCaraBermain = () => {
    setIsOpen(!isOpen);
    navigation.navigate("CaraBermain");
  };
  const onGoToHadiah = () => {
    setIsOpen(!isOpen);
    navigation.navigate("Hadiah");
  };
  const onGoToRegulasi = () => {
    setIsOpen(!isOpen);
    navigation.navigate("Regulasi");
  };

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
      <Image style={styles.logo} source={require('../assets/images/logo.jpeg')} />
    </View>
    {
      !isOpen ? <View style={styles.menuList}>
        <TouchableHighlight onPress={() => onGoToHome()} style={props.page === 'home' ? styles.activeMenu : ''} underlayColor="white">
          <Text style={[styles.itemMenu]} >Login</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => onGoToCaraBermain()} style={props.page === 'carabermain' ? styles.activeMenu : ''} underlayColor="white">
          <Text style={styles.itemMenu} >Cara Bermain</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => onGoToHadiah()} style={props.page === 'hadiah' ? styles.activeMenu : ''} underlayColor="white">
          <Text style={styles.itemMenu} >Hadiah</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => onGoToRegulasi()} style={props.page === 'regulasi' ? styles.activeMenu : ''} underlayColor="white">
          <Text style={styles.itemMenu} >Regulasi</Text>
        </TouchableHighlight>
      </View> : null
    }
  </>
}

export default Header;

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