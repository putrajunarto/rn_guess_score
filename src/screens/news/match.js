import React from "react";
import HeaderNews from "../../components/headerNews";
import FooterNews from "../../components/footerNews";
import {
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";

const Match = () => {
  return (
    <>
      <HeaderNews page="blank" />
      <View style={{ flex: 1 }}>
        <View>
          <ScrollView horizontal={true} style={{ backgroundColor: 'white' }}>
            <TouchableOpacity>
              <Text style={[styles.textMenuActive, styles.borderBottomActive]}>Indonesia</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.textMenu, styles.borderBottom]}>Inggris</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.textMenu, styles.borderBottom]}>Italia</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.textMenu, styles.borderBottom]}>Spanyol</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.textMenu, styles.borderBottom]}>Eropa</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={[styles.textMenu, styles.borderBottom]}>Internasional</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={{padding: 20}}>
          <ScrollView>
            
          </ScrollView>
        </View>
      </View>
      <FooterNews page='match' />
    </>
  );
};

export default Match;

const styles = StyleSheet.create({
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
    color: '#ff0000',
  },
  borderBottomActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff0000',
  },
});