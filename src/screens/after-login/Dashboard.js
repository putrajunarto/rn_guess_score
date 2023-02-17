import React from "react";
import HeaderAfter from "../../components/headerAfter";
import useRequest from "../../context/RequestContext";
import { useDispatch, useSelector } from 'react-redux';
import AuthAction from '../../store/actions/AuthActions';

import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Modal,
  Pressable,
  Alert,
  Button,
  ScrollView,
  TouchableHighlight,
} from "react-native";

const Dashboard = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const request = useRequest();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [dataMatch, setDataMatch] = React.useState([]);
  const [dataModal, setDataModal] = React.useState(null);

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
    request.postWithToken('/api/v1/dashboard', { type: 'match' }, {}, res => {
      try {
        if (res.status === 200) {
          setDataMatch(res.data)
        }
      } catch (e) {
        console.log(e);
      }
    });
  }, [])

  const showModal = (data) => {
    setModalVisible(true);
    setDataModal(data);
    // console.log(data);
  }

  return (
    <>
      <HeaderAfter page="dashboard" />
      <ImageBackground source={require('../../assets/images/bg.jpeg')} resizeMode="cover" style={styles.imageBg}>
        <ScrollView>
          {/* Section Players */}
          <View style={styles.bgWhite}>
            <View style={[styles.row, styles.alignCenter,]}>
              <Image source={require('../../assets/images/64X64.gif')} style={{ width: 40, height: 40, borderRadius: 100, }} />
              <Text style={{ fontSize: 16, marginLeft: 10, color: '#333' }}>Hallo, {authState._user?.data?.username} ({authState._user?.data?.first_name} {authState._user?.data?.last_name})</Text>
            </View>
            <View style={[styles.row, styles.alignCenter, styles.mt10]}>
              <Image source={require('../../assets/images/trophy.png')} style={{ width: 40, height: 40, borderRadius: 100, }} />
              <Text style={{ fontSize: 16, marginLeft: 10, marginRight: 10, color: '#333' }}>The Session Point</Text>
              <Text style={{ padding: 6, borderRadius: 5, backgroundColor: 'green', color: 'white', fontSize: 14, }}>{dataMatch.total_point}</Text>
            </View>
            <View style={[styles.row, styles.alignCenter, styles.mt10, styles.borderTop]}>
              <View>
                <Image source={require('../../assets/images/instagram.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
              </View>
              <View>
                <Image source={require('../../assets/images/facebook.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
              </View>
              <View>
                <Image source={require('../../assets/images/twitter.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
              </View>
            </View>
          </View>
          {/* Section Tabs */}
          <View style={[styles.bgWhite, styles.mt0]}>
            <View style={[styles.row]}>
              <TouchableHighlight onPress={() => navigation.navigate('Dashboard')} style={{ width: '50%' }} underlayColor="white">
                <Text style={{ backgroundColor: '#00c20b', color: '#fff', padding: 10, textAlign: 'center' }}>Match</Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => navigation.navigate('DashboardMega')} style={{ width: '50%' }} underlayColor="white">
                <Text style={{ backgroundColor: '#ddd', color: '#333', padding: 10, textAlign: 'center' }}>Mega</Text>
              </TouchableHighlight>
            </View>
          </View>
          {/* Section Total Point */}
          <View style={[styles.bgBlue, styles.mt0]}>
            <View style={[styles.borderBottom]}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Total Score</Text>
            </View>
            <View style={[styles.row, styles.alignCenter, styles.justifyBetween, styles.mt10]}>
              <View style={[styles.timWith,]}>
                <Text style={[styles.textWhite]}>Total Tebak Tim</Text>
                <Text style={[styles.textWhite]}>{dataMatch.team_point}</Text>
              </View>
              <View style={{ width: 130 }}>
                <Text style={styles.textWhite}>Point Tebak Score</Text>
                <Text style={styles.textWhite}>{dataMatch.score_point}</Text>
              </View>
              <View style={{ width: 90 }}>
                <Text style={styles.textWhite}>Game Point</Text>
                <Text style={styles.textWhite}>{dataMatch.total_point}</Text>
              </View>
            </View>
          </View>
          {/* Section Tim */}
          <View style={[styles.bgWhite, styles.mt0]}>
            <View style={[styles.row, styles.alignCenter, styles.justifyBetween, styles.borderBottom]}>
              <Text style={[styles.titleTable, styles.timWith]}>Partai</Text>
              <View style={{ width: 60 }}>
                <Text style={styles.titleTable}>Score</Text>
              </View>
              <View style={{ width: 70 }}>
                <Text style={styles.titleTable}>Action</Text>
              </View>
            </View>
            {
              dataMatch.matches?.map((item, index) => {
                return (
                  <View key={`match-${index}`} style={[styles.row, styles.alignCenter, styles.justifyBetween, styles.borderBottom, styles.mt10, styles.borderBottom]}>
                    <Text style={styles.timWith}>{item.match.home_team_name} <Text style={{ color: '#00c20b', fontWeight: 'bold' }}>vs</Text> {item.match.away_team_name}</Text>
                    <View style={{ width: 60 }}>
                      {
                        item.match.status !== "finished" &&
                        <Text style={{ color: '#00c20b' }}>TBD</Text>
                      }
                      <Text style={{color: '#333'}}>{item.match.home_team_score} - {item.match.away_team_score}</Text>
                    </View>
                    <View style={{ width: 70 }}>
                      <Button
                        title="Detail"
                        color="#841584"
                        onPress={() => showModal(item)}
                      />
                    </View>
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
      </ImageBackground>
      <Modal
        animationType="slide"
        transparent={true}
        fullScreen={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Detail</Text>
              </Pressable>
              <View style={[styles.row, styles.mt20, styles.borderBottom]}>
                <View style={{ width: '33.3333%' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Home</Text>
                  <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5, }}>{dataModal?.match.home_team_name} ( {dataModal?.match.home_team_score} )</Text>
                </View>
                <View style={{ width: '33.3333%', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'capitalize' }}>{dataModal?.match.winner} {dataModal?.match.winner !== "draw" ? 'Win' : ''}</Text>
                </View>
                <View style={{ width: '33.3333%' }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Away</Text>
                  <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5, }}>{dataModal?.match.away_team_name} ( {dataModal?.match.away_team_score} )</Text>
                </View>
              </View>
              {
                dataModal?.guess &&
                <View>
                  <View style={[styles.row, styles.mt10]}>
                    <View style={{ width: '100%' }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Tebak Tim</Text>
                      <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5, textTransform: 'capitalize' }}>{dataModal?.guess?.winner_team}</Text>
                    </View>
                  </View>
                  <View style={[styles.row, styles.mt10]}>
                    <View style={{ width: '100%' }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Tebak Score</Text>
                    </View>
                  </View>
                  <View style={[styles.row, styles.borderBottom]}>
                    <View style={{ width: '33.3333%' }}>
                      <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5, }}>{dataModal?.guess?.home_score}</Text>
                    </View>
                    <View style={{ width: '33.3333%', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'capitalize' }}>-</Text>
                    </View>
                    <View style={{ width: '33.3333%' }}>
                      <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5, }}>{dataModal?.guess?.away_score}</Text>
                    </View>
                  </View>
                  <View style={[styles.row, styles.mt10]}>
                    <View style={{ width: '100%' }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Perolehan Point</Text>
                    </View>
                  </View>
                  <View style={[styles.row, styles.mt10]}>
                    <View style={{ width: '33.3333%' }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'capitalize' }}>TEBAK TEAM</Text>
                      <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5, }}>{dataModal?.guess?.team_point}</Text>
                    </View>
                    <View style={{ width: '33.3333%' }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'capitalize' }}>TEBAK SKOR</Text>
                      <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5 }}>{dataModal?.guess?.score_point}</Text>
                    </View>
                    <View style={{ width: '33.3333%' }}>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', textTransform: 'capitalize' }}>Game Point</Text>
                      <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 5, }}>{dataModal?.guess?.points}</Text>
                    </View>
                  </View>
                </View>
              }
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  overFlow: {
    overflow: 'scroll',
    whiteSpace: 'nowrap',
  },
  timWith: {
    width: 130,
    color: '#333',
  },
  titleTable: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  mr10: {
    marginRight: 10,
  },
  mt0: {
    marginTop: 0,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  imageBg: {
    flex: 1,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  alignCenter: {
    alignItems: "center",
  },
  justifyBetween: {
    justifyContent: "space-between",
  },
  junstifyCenter: {
    justifyContent: "center",
  },
  bgWhite: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    margin: 20,
  },
  textWhite: {
    color: 'white',
  },
  bgGreen: {
    backgroundColor: '#00c20b',
    padding: 15,
    borderRadius: 5,
    margin: 20,
    marginTop: 5,
  },
  bgBlue: {
    backgroundColor: '#0d6efd',
    padding: 15,
    borderRadius: 5,
    margin: 20,
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: '100%',
    height: '60%',
    backgroundColor: "white",
    borderRadius: 0,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});