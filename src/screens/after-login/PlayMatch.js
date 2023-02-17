import React from "react";
import HeaderAfter from "../../components/headerAfter";
import ItemMatch from "../../components/itemMatch";
import useRequest from "../../context/RequestContext";
import { useDispatch, useSelector } from 'react-redux';
import AuthAction from '../../store/actions/AuthActions';

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

const PlayMatch = () => {
  const request = useRequest();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [today, setToday] = React.useState(new Date());
  const [preDate, setPreDate] = React.useState([]);
  const [nextDate, setNextDate] = React.useState([]);
  const month = today.toLocaleString("default", { month: "short" });
  const date = today.getDate();
  const [dataMatch, setDataMatch] = React.useState([]);

  const getMatch = (data) => {
    let date = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate();
    request.getWithToken(`/api/v1/match/list?type=match&date=${date}`, {}, res => {
      try {
        setDataMatch(res.data.data)
      } catch (error) {
        console.log(error)
      }
    });
  }

  const onRefresh = () => {
    getMatch(today)
  }

  const arrNext = [];
  for (let i = 0; i < 2; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    let data = {
      month: d.toLocaleString("default", { month: "short" }),
      date: d.getDate(),
      fullDate: d,
    };
    arrNext.push(data);
  }

  const arrPre = []
  for (let i = 2; i > 0; i--) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    let data = {
      date: today.getDate() - i,
      month: today.toLocaleString("default", { month: "short" }),
      fullDate: d
    }
    arrPre.push(data)
  }

  React.useEffect(() => {
    request.postWithToken("/api/v1/auth/me", {}, {}, (res) => {
      if (res.data.status === "success") {
        dispatch({
          type: AuthAction.SAVE_USER_INFO,
          payload: {
            _user: res.data,
          }
        });
      }
    });
    setNextDate(arrNext);
    setPreDate(arrPre);
    getMatch(today);
  }, [])

  const onUpdateDate = (data) => {
    getMatch(data);
    const arrPre = []
    for (let i = 2; i > 0; i--) {
      var d = new Date(data);
      d.setDate(d.getDate() - i);
      let aha = {
        date: d.getDate(),
        month: d.toLocaleString("default", { month: "short" }),
        fullDate: d
      }
      arrPre.push(aha)
    }
    const arrNext = [];
    for (let i = 0; i < 2; i++) {
      const n = new Date(data);
      n.setDate(n.getDate() + i + 1);
      let uhu = {
        month: n.toLocaleString("default", { month: "short" }),
        date: n.getDate(),
        fullDate: n,
      };
      arrNext.push(uhu);
    }
    setNextDate(arrNext);
    setPreDate(arrPre)
    setToday(data)
  };

  return (
    <>
      <HeaderAfter page="playmatch" />
      <ImageBackground source={require('../../assets/images/bg.jpeg')} resizeMode="cover" style={styles.imageBg}>
        <ScrollView>
          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <TouchableHighlight underlayColor='#0dcaf0' onPress={() => Linking.openURL('https://www.beta99gaming.com/')}>
              <Image style={[styles.banner]} source={require('../../assets/banner/GASPIALADUNIA2022(350×157px)kuismobile.webp')} />
            </TouchableHighlight>
          </View>
          {/* Section Date Picker */}
          <View style={[styles.bgWhite, styles.justifyCenter]}>
            <ScrollView horizontal={true}>
              {
                preDate.map((item, index) => {
                  return (
                    <TouchableHighlight key={index} style={[styles.datePicker]} onPress={() => onUpdateDate(item.fullDate)} underlayColor="#00c25b">
                      <View>
                        <Text style={[styles.label, styles.dateText]}>{item.date}</Text>
                        <Text style={[styles.label, styles.textCenter]}>{item.month}</Text>
                      </View>
                    </TouchableHighlight>
                  )
                })
              }
              <TouchableHighlight style={[styles.datePicker, styles.dateActive]} underlayColor="#00c25b">
                <View>
                  <Text style={[styles.dateText, styles.textWhite]}>{date}</Text>
                  <Text style={[styles.textCenter, styles.textWhite]}>{month}</Text>
                </View>
              </TouchableHighlight>
              {
                nextDate.map((item, index) => {
                  return (
                    <TouchableHighlight key={index} style={[styles.datePicker]} onPress={() => onUpdateDate(item.fullDate)} underlayColor="#00c25b">
                      <View>
                        <Text style={[styles.label, styles.dateText]}>{item.date}</Text>
                        <Text style={[styles.label, styles.textCenter]}>{item.month}</Text>
                      </View>
                    </TouchableHighlight>
                  )
                })
              }
            </ScrollView>
          </View>

          {/* Section Match */}
          {
            dataMatch.map((item, index) => {
              return (
                <ItemMatch key={index} item={item} onRefresh={() => onRefresh()} type="match" />
              )
            })
          }
          {
            dataMatch.length === 0 && (
              <View style={[styles.bgWhite, styles.justifyCenter, styles.alignCenter]}>
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

export default PlayMatch;

const styles = StyleSheet.create({
  label: {
    color: '#333'
  },
  banner: {
    width: '100%',
    height: 150,
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: "center",
  },
  textWhite: {
    color: "#fff",
  },
  dateText: {
    textAlign: 'center', fontSize: 20
  },
  dateActive: {
    backgroundColor: '#00c25b',
    color: '#fff',
  },
  datePicker: {
    width: 60,
    height: 60,
    alignContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 3,
    marginRight: 10,
    borderRadius: 5
  },
  imageBg: {
    flex: 1,
    justifyContent: "center",
  },
  bgWhite: {
    backgroundColor: "#fff",
    margin: 20,
    marginBottom: 0,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
});