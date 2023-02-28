import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

const FooterNews = (props) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.footerMenu]}>
      <View style={[styles.row]}>
        <TouchableHighlight style={[styles.col]} onPress={() => navigation.navigate('News')} underlayColor="#dadada">
          <View style={[styles.itemCenter]}>
            {
              props.page === 'prediksi' ?
                <Image source={require('../assets/images/bar-chart-active.png')} style={{ height: 25, width: 25 }} />
                :
                <Image source={require('../assets/images/bar-chart.png')} style={{ height: 25, width: 25 }} />

            }
            <Text style={props.page === 'prediksi' ? styles.active : styles.text}>Prediksi</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.col]} onPress={() => navigation.navigate('Berita')} underlayColor="#dadada">
          <View style={[styles.itemCenter]}>
            {
              props.page === 'news' ?
                <Image source={require('../assets/images/newspaper-active.png')} style={{ height: 25, width: 25 }} />
                :
                <Image source={require('../assets/images/newspaper.png')} style={{ height: 25, width: 25 }} />

            }
            <Text style={props.page === 'news' ? styles.active : styles.text}>Berita</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.col]} onPress={() => navigation.navigate('Games')} underlayColor="#dadada">
          <View style={[styles.itemCenter]}>
            {
              props.page === 'games' ?
                <Image source={require('../assets/images/soccer-player-active.png')} style={{ height: 25, width: 25 }} />
                :
                <Image source={require('../assets/images/soccer-player.png')} style={{ height: 25, width: 25 }} />

            }
            <Text style={props.page === 'games' ? styles.active : styles.text}>Game</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.col]} onPress={() => navigation.navigate('Statistik')} underlayColor="#dadada">
          <View style={[styles.itemCenter]}>
            {
              props.page === 'statistik' ?
                <Image source={require('../assets/images/stats-active.png')} style={{ height: 25, width: 25 }} />
                :
                <Image source={require('../assets/images/stats.png')} style={{ height: 25, width: 25 }} />

            }
            <Text style={props.page === 'statistik' ? styles.active : styles.text}>Klasemen</Text>
          </View>
        </TouchableHighlight>
        {/* <TouchableHighlight style={[styles.col]} onPress={() => navigation.navigate('Match')} underlayColor="#dadada">
          <View style={[styles.itemCenter]}>
            {
              props.page === 'match' ?
                <Image source={require('../assets/images/soccer-player-active.png')} style={{ height: 25, width: 25 }} />
                :
                <Image source={require('../assets/images/soccer-player.png')} style={{ height: 25, width: 25 }} />

            }
            <Text style={props.page === 'match' ? styles.active : styles.text}>Match</Text>
          </View>
        </TouchableHighlight> */}
        <TouchableHighlight style={[styles.col]} onPress={() => navigation.navigate('Livescore')} underlayColor="#dadada">
          <View style={[styles.itemCenter]}>
            {
              props.page === 'livescore' ?
                <Image source={require('../assets/images/live-streaming-active.png')} style={{ height: 25, width: 25 }} />
                :
                <Image source={require('../assets/images/live-streaming.png')} style={{ height: 25, width: 25 }} />

            }
            <Text style={props.page === 'livescore' ? styles.active : styles.text}>Livescore</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default FooterNews;

const styles = StyleSheet.create({
  footerMenu: {
    backgroundColor: '#dadada',
    height: 70,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  col: {
    width: '20%',
  },
  itemCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    color: '#008d7f',
  },
  text: {
    color: '#000000',
  }
});