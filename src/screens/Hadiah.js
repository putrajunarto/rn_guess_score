import React from "react";
import Header from '../components/header';

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
} from "react-native";

const Details = ({ navigation }) => {
  const [tabs, setTabs] = React.useState('Match');
  const onTap = (data) => {
    setTabs(data);
  }
  return (
    <>
      <Header page="hadiah" />
      <ImageBackground source={require('../assets/images/bg.jpeg')} resizeMode="cover" style={styles.imageBg}>
        <ScrollView>
          <View style={styles.bgWhite}>
            <Text style={styles.titleText}>Hadiah Kuis</Text>
            <View style={styles.container}>
              <TouchableHighlight
                style={[styles.button, tabs == 'Match' ? styles.active : '']}
                onPress={() => onTap('Match')}
                underlayColor="#00c25b"
              >
                <Text style={tabs == 'Match' ? styles.textActive : styles.label}>Match</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.button, tabs == 'Mega' ? styles.active : '']}
                onPress={() => onTap('Mega')}
                underlayColor="#00c25b"
              >
                <Text style={tabs == 'Mega' ? styles.textActive : styles.label}>Mega</Text>
              </TouchableHighlight>
            </View>
            {
              tabs == 'Match' &&
              <View style={{ marginTop: 20 }}>
                <Text style={{color : '#333',}}>MATCH KUIS, terdapat 10 pemenang untuk setiap pertandingan, dengan detail hadiah sebagai berikut</Text>
                <Image source={require('../assets/banner/SAMSUNG_A32.jpg')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Image source={require('../assets/banner/OPPO_A31.jpg')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Image source={require('../assets/banner/jaket.jpg')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Image source={require('../assets/banner/pulsa_100rb.jpg')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Image source={require('../assets/banner/pulsa_50rb.jpg')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
              </View>
            }
            {
              tabs == 'Mega' &&
              <View style={{ marginTop: 20 }}>
                <Text style={{color : '#333',}}>MEGA KUIS, terdapat 100 pemenang, dengan detail hadiah sebagai berikut</Text>
                <Image source={require('../assets/banner/hadiah/iphone-14-ds.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Image source={require('../assets/banner/hadiah/samsung-z-fold.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Image source={require('../assets/banner/hadiah/samsung-s22.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Image source={require('../assets/banner/hadiah/samsung-A32.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Image source={require('../assets/banner/hadiah/Oppo-A32.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Image source={require('../assets/banner/hadiah/Jaket.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Image source={require('../assets/banner/hadiah/Pulsa-100rb.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Image source={require('../assets/banner/hadiah/Pulsa-50rb.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
              </View>
              
            }
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  label: {
    color : '#333',
  },
  container: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: '50%',
    height: 30,
    backgroundColor: "#fff",
    elevation: 5,
  },
  active: {
    backgroundColor: "#00c20b",
    elevation: 5,
  },
  textActive: {
    color: 'white',
    fontWeight: 'bold',
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
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textCenter: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  bgWhite: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#00c20b',
  },
  btnLogin: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#00c20b',
    borderColor: '#00c20b',
    borderWidth: 1,
    color: 'white',
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});