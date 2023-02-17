import React from "react";
import { useRef } from 'react';
import HeaderAfter from "../../components/headerAfter";
import SelectDropdown from 'react-native-select-dropdown'
import useRequest from "../../context/RequestContext";
import Pagination from "../../components/pagination";

import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  Button,
  Alert,
  Linking,
} from "react-native";

const Leaderboard = ({ navigation }) => {
  const scrollRef = useRef();
  const request = useRequest();
  const [dataMatch, setDataMatch] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [dataLeaderboard, setDataLeaderboard] = React.useState([]);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  React.useEffect(() => {
    request.getWithToken(`/api/v1/match/list?type=match`, {}, res => {
      try {
        setDataMatch(res.data.data)
      } catch (error) {
        console.log(error)
      }
    });
  }, []);

  const onSearch = () => {
    setBtnDisabled(true);
    if (selectedItem == null) {
      Alert.alert('Info', 'Please select match')
    } else {
      request.get(`/api/v1/leaderboard?type=match&match_id=${selectedItem.id}&page=1`, {}, res => {
        try {
          setBtnDisabled(false);
          // console.log(res.data.data);
          setDataLeaderboard(res.data.data.leaderboard)
        } catch (error) {
          setBtnDisabled(false);
          console.log(error)
        }
      });
    }
  }

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 170,
      animated: true,
    });
  }

  return (
    <>
      <HeaderAfter page="Leaderboard" />
      <ImageBackground source={require('../../assets/images/bg.jpeg')} resizeMode="cover" style={styles.imageBg}>
        <ScrollView ref={scrollRef}>
          <View>
            <TouchableHighlight underlayColor='#0dcaf0' onPress={() => Linking.openURL('https://www.beta99gaming.com/')}>
              <Image style={[styles.banner]} source={require('../../assets/banner/CeriaDesember2022(350×157px)mobilekuis.webp')} />
            </TouchableHighlight>
          </View>
          <View style={[styles.bgWhite, styles.mt10]}>
            <View style={[styles.row]}>
              <TouchableHighlight style={{ width: '50%' }} underlayColor="white" onPress={() => navigation.navigate('Leaderboard')}>
                <Text style={{ backgroundColor: '#00c20b', color: '#fff', padding: 10, textAlign: 'center' }}>Match</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{ width: '50%' }} underlayColor="white" onPress={() => navigation.navigate('LeaderboardMega')}>
                <Text style={{ backgroundColor: '#ddd', color: '#333', padding: 10, textAlign: 'center' }}>Mega</Text>
              </TouchableHighlight>
            </View>
            <SelectDropdown
              data={dataMatch}
              onSelect={(selectedItem, index) => {
                setSelectedItem(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                let name = selectedItem.home_team.team_name + ' vs ' + selectedItem.away_team.team_name + ' | ' + selectedItem.start_date + ', ' + selectedItem.start_time;
                return name
              }}
              rowTextForSelection={(item, index) => {
                let name = item.home_team.team_name + ' vs ' + item.away_team.team_name + ' | ' + item.start_date + ', ' + item.start_time;
                return name
              }}
              defaultButtonText="Select an Match"
              buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              renderDropdownIcon={() => {
                return (
                  <Image
                    style={{ width: 15, height: 15, marginLeft: 10 }}
                    source={require('../../assets/images/down-arrow.png')}
                  />
                )
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}
            />
            <Button title="Submit" disabled={btnDisabled} onPress={() => onSearch()} />
          </View>
          <View style={[styles.bgWhite, styles.mt10]}>
            <View style={[styles.row, styles.p10, styles.borderTable]}>
              <View style={{ width: '20%' }}>
                <Text style={{ fontWeight: 'bold', color: '#333' }}>Rank</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={{ fontWeight: 'bold', color: '#333' }}>Name</Text>
              </View>
              <View style={{ width: '30%' }}>
                <Text style={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>Total Point</Text>
              </View>
            </View>
            {
              dataLeaderboard?.total > 0 ?
                dataLeaderboard?.data.map((item, index) => {
                  return (
                    <View key={`leaderboard-${index}`} style={[styles.row, styles.p10, styles.borderTable]}>
                      <View style={{ width: '20%', justifyContent: "center" }}>
                        <Text style={{color: '#333'}}>{dataLeaderboard?.from + index}</Text>
                      </View>
                      <View style={{ width: '50%', justifyContent: "center" }}>
                        <Text style={{color: '#333'}}>{item?.user.first_name} {item?.user.last_name}</Text>
                      </View>
                      <View style={{ width: '30%', justifyContent: "center" }}>
                        <Text style={{color: '#333', textAlign:'center'}}>{item.points == null ? '0' : item.points}</Text>
                      </View>
                    </View>
                  )
                })
                :
                <View style={[styles.row, styles.p10, styles.borderTable]}>
                  <View style={{ width: '100%' }}>
                    <Text style={{ textAlign: 'center', color: '#333' }}>No Data</Text>
                  </View>
                </View>
            }
          </View>
          {
            dataLeaderboard?.total > 0 &&
            <View style={[styles.mt10, styles.row]}>
              {/* Pagination */}
              <Pagination
                totalPage={dataLeaderboard?.last_page}
                page={dataLeaderboard?.current_page}
                onChangePage={(page) => {
                  request.get(`/api/v1/leaderboard?type=match&match_id=${selectedItem.id}&page=${page}`, {}, res => {
                    try {
                      console.log(res.data.data)
                      setDataLeaderboard(res.data.data.leaderboard)
                      // scroll to top
                      onPressTouch();
                    } catch (error) {
                      console.log(error)
                    }
                  });
                }}
              />
            </View>
          }
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  banner: {
    height: 150,
    width: '100%',
  },
  mt10: {
    marginTop: 10
  },
  p10: {
    padding: 10
  },
  borderTable: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  mt20: {
    marginTop: 20,
  },
  dropdown2BtnStyle: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 0,
    marginRight: 0,
  },
  dropdown2BtnTxtStyle: {
    textAlign: 'left',
    color: '#000',
    fontSize: 14,
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
  },
  dropdown2RowStyle: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  dropdown2RowTxtStyle: {
    textAlign: 'left',
    color: '#000',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
  },
  bgWhite: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  imageBg: {
    flex: 1,
    padding: 20,
  },
});