import React from "react";
import HeaderNews from "../../components/headerNews";
import FooterNews from "../../components/footerNews";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

const PointsRedeem = ({ navigation }) => {
  return (
    <>
      <HeaderNews page="blank" />
      <View style={{ flex: 1 }}>
        <ScrollView style={{ marginBottom: 70 }}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            {/* Tabs Menu */}
            <View style={[styles.row, styles.mb10]}>
              <TouchableOpacity style={[styles.col]} onPress={() => navigation.navigate('Points')}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", textAlign: 'center' }}>
                  Point
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.col, styles.tabActive]} onPress={() => navigation.navigate('PointsRedeem')}>
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
            <View style={[styles.mt10]}>
              {/* <View style={[styles.borderBottom]}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000', marginBottom: 5 }}>Redeem Point</Text>
              </View> */}
              <View style={[styles.card, styles.p0]}>
                <Image source={require('../../assets/banner/hadiah/Pulsa-50rb.png')} style={{ width: '100%', height: 170, borderTopLeftRadius : 10, borderTopRightRadius: 10 }} />
                <View style={[styles.row, styles.p10]}>
                  <Text style={{ color : '#333'}}>20 Point</Text>
                  <TouchableOpacity style={{ backgroundColor: '#008d7f', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5, marginLeft: 'auto' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Redeem</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.card, styles.p0, styles.mt20]}>
                <Image source={require('../../assets/banner/hadiah/Pulsa-100rb.png')} style={{ width: '100%', height: 170, borderTopLeftRadius : 10, borderTopRightRadius: 10 }} />
                <View style={[styles.row, styles.p10]}>
                  <Text style={{ color : '#333'}}>40 Point</Text>
                  <TouchableOpacity style={{ backgroundColor: '#008d7f', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5, marginLeft: 'auto' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Redeem</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.card, styles.p0, styles.mt20]}>
                <Image source={require('../../assets/banner/hadiah/Jaket.png')} style={{ width: '100%', height: 170, borderTopLeftRadius : 10, borderTopRightRadius: 10 }} />
                <View style={[styles.row, styles.p10]}>
                  <Text style={{ color : '#333'}}>100 Point</Text>
                  <TouchableOpacity style={{ backgroundColor: '#008d7f', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5, marginLeft: 'auto' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Redeem</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <FooterNews page='match' />
    </>
  );
};

export default PointsRedeem;

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
  p10: {
    padding: 10,
  },
  p0: {
    padding: 0,
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