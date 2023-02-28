import React from "react";
import HeaderNews from "../../components/headerNews";
import FooterNews from "../../components/footerNews";
import { useSelector } from 'react-redux';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

const Points = ({navigation}) => {
  const user = useSelector((state) => state.auth._user);
  return (
    <>
      <HeaderNews page="blank" />
      <View style={{ flex: 1 }}>
        <ScrollView style={{ marginBottom: 70 }}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            {/* Tabs Menu */}
            <View style={[styles.row, styles.mb10]}>
              <TouchableOpacity style={[styles.col, styles.tabActive]} onPress={() => navigation.navigate('Points')}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", textAlign: 'center' }}>
                  Point
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.col]} onPress={() => navigation.navigate('PointsRedeem')}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", textAlign: 'center' }}>
                  Redeem
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.col]} onPress={() => navigation.navigate('PointsHistory')}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", textAlign: 'center' }}>
                  History
                </Text>
              </TouchableOpacity>
            </View>
            {/* End Tabs Menu */}
            <View style={[styles.row, styles.mt10, styles.card]}>
              <View style={[styles.row]}>
                <Image source={require("../../assets/images/trophy.png")} style={{ width: 40, height: 40, marginRight: 10 }} />
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                  Total Point
                </Text>
              </View>
              <View style={[styles.row]}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                  {user.data.saldo_bonus}
                </Text>
                <Image
                  source={require("../../assets/images/coin.png")}
                  style={{ width: 20, height: 20, marginLeft: 5 }}
                />
              </View>
            </View>
            <View style={[styles.mt20]}>
              <View style={[styles.borderBottom]}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 5 }}>List Hadiah</Text>
              </View>
              <Image source={require('../../assets/banner/hadiah/Pulsa-50rb.png')} style={{ width: '100%', height: 170, marginTop: 10 }} />
              <Image source={require('../../assets/banner/hadiah/Pulsa-100rb.png')} style={{ width: '100%', height: 170, marginTop: 10 }} />
              <Image source={require('../../assets/banner/hadiah/Jaket.png')} style={{ width: '100%', height: 170, marginTop: 10 }} />
            </View>
          </View>
        </ScrollView>
      </View>
      <FooterNews page='match' />
    </>
  );
};

export default Points;

const styles = StyleSheet.create({
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#008d7f',
  },
  col: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 10,
  },
  mr10: {
    marginRight: 10,
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: '#666',
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
  borderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  textMenuActive: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    letterSpacing: 0.5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#008d7f',
  },
  borderBottomActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#008d7f',
  },
});