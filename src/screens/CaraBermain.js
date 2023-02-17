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
  const [tabs, setTabs] = React.useState('umum');
  const onTap = (data) => {
    setTabs(data);
  }
  return (
    <>
      <Header page="carabermain" />
      <ImageBackground source={require('../assets/images/bg.jpeg')} resizeMode="cover" style={styles.imageBg}>
        <ScrollView>
          <View style={styles.bgWhite}>
            <Text style={styles.titleText}>Cara Bermain</Text>
            <View style={styles.container}>
              <TouchableHighlight
                style={[styles.button, tabs == 'umum' ? styles.active : '']}
                onPress={() => onTap('umum')}
                underlayColor="#00c25b"
              >
                <Text style={tabs == 'umum' ? styles.textActive : styles.label}>Umum</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.button, tabs == 'daftar' ? styles.active : '']}
                onPress={() => onTap('daftar')}
                underlayColor="#00c25b"
              >
                <Text style={tabs == 'daftar' ? styles.textActive : styles.label}>Daftar</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.button, tabs == 'bermain' ? styles.active : '']}
                onPress={() => onTap('bermain')}
                underlayColor="#00c25b"
              >
                <Text style={tabs == 'bermain' ? styles.textActive : styles.label}>Bermain</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={[styles.button, tabs == 'pemenang' ? styles.active : '']}
                onPress={() => onTap('pemenang')}
                underlayColor="#00c25b"
              >
                <Text style={tabs == 'pemenang' ? styles.textActive : styles.label}>Pemenang</Text>
              </TouchableHighlight>
            </View>
            {
              tabs == 'umum' &&
              <View style={{ marginTop: 20, }}>
                <Text style={{color : '#333',}}>Kuis ini adalah kuis menebak pemenang dan menebak skor. Tebakan yang benar akan mendapatkan point</Text>
                <Image source={require('../assets/banner/carabermain/Quiz1.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Text style={{color : '#333',}}>Jumlah Point untuk Tebak Pemenang berbeda dengan Point Tebak Skor. Dan Tiap Point Tebak Pemenang maupun Tebak Skor berbeda untuk tiap Stage. Berikut Adalah detail masing-masing point untuk tiap Stage</Text>
                <Image source={require('../assets/banner/carabermain/Point.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Text style={{color : '#333',}}>Kuis ini ada 2 Bagian, yaitu MATCH KUIS dan MEGA KUIS</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 5 }}>MATCH KUIS</Text>
                <Text style={{color : '#333',}}>Kuis untuk Setiap Pertandingan dan akan di cari 10 Pemenang dengan skor tertinggi.</Text>
                <Text style={{ fontWeight: 'bold', marginTop: 5 }}>MEGA KUIS</Text>
                <Text style={{color : '#333',}}>Kuis untuk keseluruhan Pertandingan. Point pemain merupakan akumulasi dari tebakan dari awal sampai akhir Event terdapat 100 pemenang dengan skor tertinggi.</Text>
                <Text style={{color : '#333',}}>untuk Hadiah dapat di lihat di Menu HADIAH</Text>
              </View>
            }
            {
              tabs == 'daftar' &&
              <View style={{ marginTop: 20, }}>
                <Text style={{color : '#333',}}>Kunjungi hal website, www.kuis.bolamilenia.com</Text>
                <Image source={require('../assets/banner/carabermain/cara-daftar-panjang.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Text style={{color : '#333',}}>Isi form sesuai petunjuk. Setelah itu klik Sign Up.</Text>
                <Image source={require('../assets/banner/carabermain/cara-isi-form.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
              </View>
            }
            {
              tabs == 'bermain' &&
              <View style={{ marginTop: 20, }}>
                <Text style={{color : '#333',}}>1. Silahkan Login</Text>
                <Image source={require('../assets/banner/carabermain/cara-bermain-1.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Text style={{color : '#333',}}>2. Setelah Login, akan muncul Page DASHBOARD. Dashboard ini merupakan rangkuman dari pertandingan yang ada dan Partai apa saja sudah di submit dan yang belum di submit.
                  di Dashboard ini ada 2 Tab masing-masing yaitu : Match Kuis dan Mega Kuis. Selalu periksa masing - masing tab untuk mengetahui pertandingan mana saja yang belum diisi
                </Text>
                <Image source={require('../assets/banner/carabermain/cara-bermain-2.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Image source={require('../assets/banner/carabermain/cara-bermain-3.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Text style={{color : '#333',}}>3. Play MATCH KUIS</Text>
                <Text style={{ marginBottom: 5 }}>Pilih tanggal yng tersedia. Pertandingan bisa diisi 2 x 24 jam sebelum pertandingan di mulai. Dan begitu jam pertandingan, maka tidak bisa diisi prediksi pemain lagi.</Text>
                <Text style={{color : '#333',}}>tebak siapakah yang akan menang, kemudian tebak skor. Setelah itu submit prediksi Anda. Pemain di izinkan untuk mengubah hasil prediksi sampai sesaat sebelum pertandingan di mulai.</Text>
                <Image source={require('../assets/banner/carabermain/cara-bermain-4.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Text style={{color : '#333',}}>4. Play MEGA KUIS</Text>
                <Text style={{color : '#333',}}>hasil tebakan di MATCH KUIS ini tidak akan muncul di MEGA KUIS. Dan tebakan di MEGA KUIS ini boleh berbeda dengan di MATCH KUIS</Text>
                <Image source={require('../assets/banner/carabermain/cara-bermain-5.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Text style={{color : '#333',}}>Catatan :</Text>
                <Text style={{color : '#333',}}>selalu periksa DASHBOARD baik di MATCH KUIS maupun MEGA KUIS supaya tidak ada partai yang ketinggalan atau lupa isi tebakan.
                  Setiap Pemain wajib menebak masing-masing di MATCH KUIS dan MEGA KUIS. Tebakan boleh tidak sama antara MATCH dan MEGA</Text>
              </View>
            }
            {
              tabs == 'pemenang' &&
              <View style={{ marginTop: 20, }}>
                <Text style={{color : '#333',}}>1. Klik Leaderboard</Text>
                <Text style={{color : '#333',}}>Leaderboard ini adalah berupa list Pemain dan perolehan Poin nya. Leaderboard ini ada untuk masing-masing MATCH KUIS dan MEGA KUIS
                  untuk mengetahui perolehan Point di MATCH KUIS, maka silahkan klik Tab MATCH KUIS, pilih Match yang hendak di ketahui dan Submit</Text>
                <Image source={require('../assets/banner/carabermain/cara-bermain-6.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
                <Text style={{marginBottom: 10}}>Untuk mengetahui perolehan point sementara MEGA KUIS, dengan cara yang sama seperti di MATCH KUIS. silahkan klik MEGA KUIS, pilih Sesi dan submit.</Text>
                <Text style={{color : '#333',}}>2.Pemenang & Resi</Text>
                <Text style={{color : '#333',}}>Bagian ini akan menampilkan pemenang untuk MATCH KUIS dan MEGA KUIS. Para Pemenang ini kami ambil dari point tertinggi yang ada di Leaderboard. Dan apabila terdapat lebih dari 1 pemain dengan jumlah point yang sama maka kami akan mengambil secara acak. Pertimbangan kami dalam memenangkan satu pemain adalah di lihat dari share Facebook dan juga ke aktifan melakukan tebakan.</Text>
                <Text style={{color : '#333',}}>Untuk Mengetahui Pemenang dan Mengecek Resi Pengiriman MATCH KUIS, Silahkan Pilih MATCH KUIS, Pilih Tim dan Submit</Text>
                <Image source={require('../assets/banner/carabermain/cara-bermain-7.png')} style={{ width: 'auto', height: 145, marginTop: 10, marginBottom: 5, borderColor: '#ddd', borderWidth: 1 }} />
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
    color: '#333',
  },
  container: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: '25%',
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
  titleText: {
    color : '#333',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#00c20b',
  },
  bgWhite: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 20,
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