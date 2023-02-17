import React from "react";
import { View, Text, StyleSheet, Image, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TabsCaraBermain = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={[styles.button, props.page == 'umum' ? styles.active : '']}
        onPress={() => navigation.navigate("CaraBermain")}
        underlayColor="#00c25b"
      >
        <Text style={props.page == 'umum' ? styles.textActive : ''}>Umum</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.button, props.page == 'daftar' ? styles.active : '']}
        onPress={() => navigation.navigate("CaraBermain")}
        underlayColor="#00c25b"
      >
        <Text style={props.page == 'daftar' ? styles.textActive : ''}>Daftar</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.button, props.page == 'bermain' ? styles.active : '']}
        onPress={() => navigation.navigate("CaraBermain")}
        underlayColor="#00c25b"
      >
        <Text style={props.page == 'bermain' ? styles.textActive : ''}>Bermain</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 110,
    height: 30,
    backgroundColor: "#fff",
    elevation: 5,
  },
  active: {
    backgroundColor: "#00c20b",
  },
  textActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default TabsCaraBermain;