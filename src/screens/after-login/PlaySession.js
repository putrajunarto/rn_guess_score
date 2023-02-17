import React from "react";
import HeaderAfter from "../../components/headerAfter";
import ItemMatch from "../../components/itemMatch";
import useRequest from "../../context/RequestContext";


import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  Image,
  TextInput,
  Button,
  Linking,
} from "react-native";

const PlaySession = () => {
  const request = useRequest();
  const [dataSession, setDataSession] = React.useState([]);
  const [dataMatch, setDataMatch] = React.useState([]);

  const getSession = () => {
    request.getWithToken('/api/v1/session/list', {}, res => {
      try {
        console.log(res.data.data)
        setDataSession(res.data.data)
      } catch (error) {
        console.log(error)
      }
    });
  }
  const getMatch = () => {
    request.getWithToken('/api/v1/match/list?type=session', {}, res => {
      try {
        setDataMatch(res.data.data)
      } catch (error) {
        console.log(error)
      }
    });
  }
  const onRefresh = () => {
    getMatch()
  }

  React.useEffect(() => {
    getSession()
    getMatch()
  }, [])

  return (
    <>
      <HeaderAfter page="playsession" />
      <ImageBackground source={require('../../assets/images/bg.jpeg')} resizeMode="cover" style={styles.imageBg}>
        <ScrollView>
          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <TouchableHighlight underlayColor='#0dcaf0' onPress={() => Linking.openURL('https://www.beta99gaming.com/')}>
              <Image style={[styles.banner]} source={require('../../assets/banner/Nge-GAS-PIALADUNIA2022(350x157px)kuismobile.webp')} />
            </TouchableHighlight>
          </View>
          {/* Section Date Picker */}
          <View style={[styles.bgWhite, styles.mt0]}>
            <ScrollView horizontal={true}>
              {
                dataSession.map((item, index) => {
                  return (
                    <View key={index} style={{ color: 'white', backgroundColor: '#0dcaf0', marginRight: 10, padding: 5 }}>
                      <TouchableHighlight underlayColor='#0dcaf0' >
                        <Text style={{ color: 'white' }}>
                          {item.name} (
                          {new Date(item.start_date).getDate()} {new Date(item.start_date).toLocaleString("default", { month: "short" })} {new Date(item.start_date).getFullYear()} - {new Date(item.end_date).getDate()} {new Date(item.end_date).toLocaleString("default", { month: "short" })} {new Date(item.end_date).getFullYear()}
                          )
                        </Text>
                      </TouchableHighlight>
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>

          {/* Section Match */}
          {
            dataMatch.map((item, index) => {
              return (
                <ItemMatch key={index} item={item} onRefresh={() => onRefresh()} type="session" />
              )
            })
          }
          {
            dataMatch.length === 0 && (
              <View style={[styles.bgWhite]}>
                <Text style={[styles.textCenter, styles.label]}>No Match</Text>
              </View>
            )
          }
          {/* End Section Match */}
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default PlaySession;

const styles = StyleSheet.create({
  label: {
    color: '#333'
  },
  banner: {
    width: "100%",
    height: 150,
  },
  imageBg: {
    flex: 1,
    justifyContent: "center",
  },
  bgWhite: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 10,
    marginBottom: 0,
    padding: 10,
    borderRadius: 5,
  },
  textCenter: {
    textAlign: "center",
  },
});