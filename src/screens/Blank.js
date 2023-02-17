import React from "react";
import HeaderAfter from "../../components/headerAfter";
import {
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";

const Blank = () => {
  return (
    <>
      <HeaderAfter page="blank" />
      <ImageBackground source={require('../../assets/images/bg.jpeg')} resizeMode="cover" style={styles.imageBg}>
        
      </ImageBackground>
    </>
  );
};

export default Blank;

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    justifyContent: "center",
  },
});