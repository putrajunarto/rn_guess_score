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
  const image = { uri: "https://reactjs.org/logo-og.png" };
  return (
    <>
      <Header page="regulasi" />
      <ImageBackground source={require('../assets/images/bg.jpeg')} resizeMode="cover" style={styles.imageBg}>
        <ScrollView>
          <View style={styles.bgWhite}>
            <Text style={styles.titleText}>Aturan Kuis</Text>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.subtitleText}>Cara Bermain & Aturan</Text>
              <Text style={{ color : '#333', marginTop: 10 }}>
                Peserta wajib mengisi tebakan Tim dan Tebakan Skor. Untuk Point Tebakan akan berubah seiring babak yang berjalan.
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.subtitleText}>Waktu Bermain</Text>
              <Text style={{ color : '#333', marginTop: 10 }}>
                pertandingan akan diupdate/ diposting paling lambar 1 hari sebelum kick off peserta bisa bermain kuis minimal 24 jam sebelum kick off Poin akan di update maksimal satu hari setelah pertandingan
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.subtitleText}>Pembatalan pertandingan / point</Text>
              <Text style={{ color : '#333', marginTop: 10 }}>
                Ada beberapa penyebab point pertandingan tidak dihitung :
              </Text>
              <Text>
                1. Kick off pertandingan dimajukan, sehingga peserta masih bisa menebak skir setelah kick off (point tidak dihitung)
              </Text>
              <Text>
                2. Pertandingan ditunda lebih dari 3 jam dari jadwal sebenarnya
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.subtitleText}>Point pertandingan tetap dihitung</Text>
              <Text style={{ color : '#333', marginTop: 10 }}>
                pertandingan ditunda 1-3 jam setelah jadwal sebenarnya
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.subtitleText}>Penentuan Pemenang</Text>
              <Text style={{ color : '#333', marginTop: 10 }}>
                Sejumlah Pemenang akan kami pilih dengan perolehan Poin yang tertinggi. apabila Jumlah pemain yang memiliki poin yang sama melebihi dari Jumlah Pemenang, maka akan kami acak pemenang nya. Pertimbangan dalam mengambil keputusan adalah Jumlah share Sosmed kami dan keaktifan peserta.
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
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
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#00c20b',
  },
  subtitleText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 5,
    borderBottomColor: '#00c20b',
    borderBottomWidth: 2,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});