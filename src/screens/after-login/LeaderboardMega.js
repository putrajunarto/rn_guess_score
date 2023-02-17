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
  const [dataAfter, setDataAfter] = React.useState([]);
  const [leaderboard, setLeaderboard] = React.useState([]);
  const [btnDisabled, setBtnDisabled] = React.useState(false);

  React.useEffect(() => {
    request.getWithToken('/api/v1/session/list', {}, res => {
      try {
        // console.log(res.data.data)
        setDataMatch(res.data.data)
      } catch (error) {
        console.log(error)
      }
    });
  }, []);

  const onSearch = () => {
    setBtnDisabled(true);
    if (selectedItem == null) {
      Alert.alert('Info', 'Please select session')
    } else {
      request.get(`/api/v1/leaderboard?type=session&session_id=${selectedItem.id}&page=1`, {}, res => {
        try {
          // console.log(res.data.data.leaderboard)
          setBtnDisabled(false);
          setDataLeaderboard(res.data.data.leaderboard)
        } catch (error) {
          setBtnDisabled(false);
          console.log(error)
        }
      });
    }
  }

  React.useEffect(() => {
    // sorting point data
    let sortable = [];
    for (let i in dataLeaderboard) {
      sortable.push(dataLeaderboard[i]);
    }

    sortable.sort(function (a, b) {
      return b.points - a.points;
    });

    setDataAfter(sortable);

    // paginate data
    setLeaderboard(paginate(sortable, 15, 1));

  }, [dataLeaderboard]);

  const paginate = (array, page_size, page_number) => {
    let data = {
      data: array.slice((page_number - 1) * page_size, page_number * page_size),
      total: array.length,
      count: array.length / page_size,
      per_page: page_size,
      from: (page_number - 1) * page_size + 1,
      current_page: page_number,
      last_page: Math.ceil(array.length / page_size),
      total_pages: Math.ceil(array.length / page_size),
      to: page_number * page_size,
    }
    return data;
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
                <Text style={{ backgroundColor: '#ddd', color: '#333', padding: 10, textAlign: 'center' }}>Match</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{ width: '50%' }} underlayColor="white" onPress={() => navigation.navigate('LeaderboardMega')}>
                <Text style={{ backgroundColor: '#00c20b', color: '#fff', padding: 10, textAlign: 'center' }}>Mega</Text>
              </TouchableHighlight>
            </View>
            <SelectDropdown
              data={dataMatch}
              onSelect={(selectedItem, index) => {
                setSelectedItem(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                let name = `${selectedItem.name}, ${selectedItem.start_date} - ${selectedItem.end_date}`;
                return name
              }}
              rowTextForSelection={(item, index) => {
                let name = `${item.name}, ${item.start_date} - ${item.end_date}`;
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
                <Text style={{ fontWeight: 'bold', color: '#333', }}>Rank</Text>
              </View>
              <View style={{ width: '50%' }}>
                <Text style={{ fontWeight: 'bold', color: '#333', }}>Name</Text>
              </View>
              <View style={{ width: '30%' }}>
                <Text style={{ fontWeight: 'bold', color: '#333', textAlign: "center" }}>Total Point</Text>
              </View>
            </View>
            {
              leaderboard?.data?.length > 0 &&
              leaderboard.data.map((item, index) => {
                return (
                  <View key={`data-leaderboard-${index}`} style={[styles.row, styles.p10, styles.borderTable]}>
                    <View style={{ width: '20%' }}>
                      <Text style={{color : '#333'}}>{leaderboard.current_page == 1 ? index + 1 : leaderboard.from + index}</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                      <Text style={{color : '#333'}}>{item.user.username != null ? item.user.username : item.user.first_name + ' ' + item.user.last_name}</Text>
                    </View>
                    <View style={{ width: '30%' }}>
                      <Text style={{ textAlign: "center", color: '#333' }}>{item.points != null ? item.points : '0'}</Text>
                    </View>
                  </View>
                )
              })
            }
          </View>
          {
            leaderboard?.data?.length > 0 &&
            <View style={[styles.mt10, styles.row]}>
              {/* Pagination */}
              <Pagination
                totalPage={leaderboard.last_page}
                page={leaderboard.current_page}
                onChangePage={(page) => {
                  // console.log(leaderboard);
                  setLeaderboard(paginate(dataAfter, 15, page));
                  // scroll to top
                  onPressTouch();
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
    marginTop: 10,
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