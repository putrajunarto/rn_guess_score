import React from "react";
import HeaderAfter from "../../components/headerAfter";
import SelectDropdown from 'react-native-select-dropdown'
import useRequest from "../../context/RequestContext";
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TouchableHighlight,
  ScrollView,
  Image,
  Button,
  Modal,
  Pressable,
  Alert,
} from "react-native";

const Resi = ({ navigation }) => {
  const request = useRequest();
  const [dataMatch, setDataMatch] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [dataResi, setDataResi] = React.useState([]);
  const [dataModal, setDataModal] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [ btnDisabled, setBtnDisabled ] = React.useState(false);

  const baseUrlImage = 'https://kuis.bolamilenia.com/uploads/resi/';
  // const baseUrlImage = 'http://10.0.2.2/guess_score/public/uploads/resi/';

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
      let postData = {
        "type": "match",
        "match_id": selectedItem.id,
      }
      request.postWithToken(`/api/v1/resi`, postData, {}, res => {
        try {
          setBtnDisabled(false);
          // console.log(res.data.data);
          setDataResi(res.data.data.resi)
        } catch (error) {
          setBtnDisabled(false);
          console.log(error)
        }
      });
    }
  }

  const onModal = (item) => {
    setDataModal(item)
    setModalVisible(true)
  }

  return (
    <>
      <HeaderAfter page="Resi" />
      <ImageBackground source={require('../../assets/images/bg.jpeg')} resizeMode="cover" style={styles.imageBg}>
        <ScrollView>
          <View style={[styles.bgWhite]}>
            <View style={[styles.row]}>
              <TouchableHighlight style={{ width: '50%' }} underlayColor="white" onPress={() => navigation.navigate('Resi')}>
                <Text style={{ backgroundColor: '#00c20b', color: '#fff', padding: 10, textAlign: 'center' }}>Match</Text>
              </TouchableHighlight>
              <TouchableHighlight style={{ width: '50%' }} underlayColor="white" onPress={() => navigation.navigate('ResiMega')}>
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
          {/* Table */}
          <View style={[styles.bgWhite, styles.mt20]}>
            <View style={[styles.row, styles.p10, styles.borderTable]}>
              <View style={{ width: '20%' }}>
                <Text style={{ fontWeight: 'bold', color: '#333' }}>No</Text>
              </View>
              <View style={{ width: '60%' }}>
                <Text style={{ fontWeight: 'bold', color: '#333' }}>Name</Text>
              </View>
              <View style={{ width: '20%' }}>
                <Text style={{ fontWeight: 'bold', color: '#333' }}>Action</Text>
              </View>
            </View>
            {
              dataResi.length > 0 ?
                dataResi.map((item, index) => {
                  return (
                    <View key={`res-${index}`} style={[styles.row, styles.p10, styles.borderTable]}>
                      <View style={{ width: '20%', justifyContent: "center" }}>
                        <Text style={[styles.label]}>{index + 1}</Text>
                      </View>
                      <View style={{ width: '60%', justifyContent: "center" }}>
                        <Text style={[styles.label]}>{item.username}</Text>
                      </View>
                      <View style={{ width: '20%', justifyContent: "center" }}>
                        <Button title="Detail" onPress={() => onModal(item.img_path)} />
                      </View>
                    </View>
                  )
                }) :
                <View style={[styles.row, styles.p10, styles.borderTable]}>
                  <View style={{ width: '100%', alignItems: 'center', justifyContent: "center" }}>
                    <Text style={[styles.label]}>Data not found</Text>
                  </View>
                </View>
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
              <View style={[styles.row, styles.mt20, styles.borderTable]}>
                <Image source={{ uri: baseUrlImage + dataModal }} style={{ height: 420, width: '100%' }} />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Resi;

const styles = StyleSheet.create({
  label: {
    color: '#333',
  },
  mt10: {
    marginTop: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: '100%',
    height: '80%',
    backgroundColor: "white",
    borderRadius: 0,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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