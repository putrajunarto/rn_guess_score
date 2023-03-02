import React from "react";
import HeaderNews from "../../components/headerNews";
import FooterNews from "../../components/footerNews";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";

const PointsHistory = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [dataModal, setDataModal] = React.useState(null);
  const baseUrlImage = 'https://kuis.bolamilenia.com/uploads/resi/';

  const onModal = (item) => {
    setDataModal(item)
    setModalVisible(true)
  }

  return (
    <>
      <HeaderNews page="blank" />
      <View style={{ flex: 1 }}>
        <ScrollView style={{ marginBottom: 70 }}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            {/* Tabs Menu */}
            <View style={[styles.row, styles.mb10]}>
              <TouchableOpacity style={[styles.col, styles.borderBottom]} onPress={() => navigation.navigate('Points')}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", textAlign: 'center' }}>
                  Point
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={[styles.col, styles.borderBottom]} onPress={() => navigation.navigate('PointsRedeem')}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", textAlign: 'center' }}>
                  Redeem
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity style={[styles.col, styles.tabActive]} onPress={() => navigation.navigate('PointsHistory')}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", textAlign: 'center' }}>
                  History
                </Text>
              </TouchableOpacity>
            </View>
            {/* End Tabs Menu */}
            <View style={[styles.row, styles.mt20, styles.card]}>
              <View style={[styles.col, styles.mr10]}>
                <TouchableOpacity onPress={() => onModal('../../assets/images/hadiah.png')}>
                  <Image source={require("../../assets/images/hadiah.png")} onPress="" style={{ width: '100%', height: 150 }} />
                </TouchableOpacity>
              </View>
              <View style={[styles.col]}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                  Resi Redeem 20 Point Tanggal 12-12-2020
                </Text>
              </View>
            </View>
            <View style={[styles.row, styles.mt20, styles.card]}>
              <View style={[styles.col, styles.mr10]}>
                <TouchableOpacity onPress={() => onModal('../../assets/images/hadiah.png')}>
                  <Image source={require("../../assets/images/hadiah.png")} style={{ width: '100%', height: 150 }} />
                </TouchableOpacity>
              </View>
              <View style={[styles.col]}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                  Resi Redeem 40 Point Tanggal 10-12-2020
                </Text>
              </View>
            </View>
            <View style={[styles.row, styles.mt20, styles.card]}>
              <View style={[styles.col, styles.mr10]}>
                <TouchableOpacity onPress={() => onModal('../../assets/images/hadiah.png')}>
                  <Image source={require("../../assets/images/hadiah.png")} style={{ width: '100%', height: 150 }} />
                </TouchableOpacity>
              </View>
              <View style={[styles.col]}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                  Resi Redeem 20 Point Tanggal 02-12-2020
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <FooterNews page='match' />
      {/* Modal detail image */}
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
              <View style={[styles.row, styles.mt20]}>
                <Image source={require("../../assets/images/hadiah.png")} style={{ height: 450, width: '100%' }} />
                {/* <Image source={{ uri: baseUrlImage + dataModal }} style={{ height: 420,5width: '100%' }} /> */}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      {/* End Modal detail image */}
    </>
  );
};

export default PointsHistory;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    marginTop: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#008d7f',
    paddingVertical: 10,
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
  },
  col: {
    flex: 1,
  },
  mr10: {
    marginRight: 10,
  },
  mb10: {
    marginBottom: 10,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  textMenu: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    letterSpacing: 0.5,
    fontSize: 16,
    color: '#000',
  },
  textMenuActive: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    letterSpacing: 0.5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008d7f',
  },
});