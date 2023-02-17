import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions
} from "react-native";
import HeaderNews from "../../components/headerNews";
import FooterNews from "../../components/footerNews";
import WebView from 'react-native-webview';


const Prediksi = (props) => {
  const { width, height } = useWindowDimensions();
  const [uri, setUri] = React.useState(props.route.params.uri);
  const [id, setId] = React.useState(props.route.params.id);

  const onChangeUrl = (data) => {
    setUri(data.uri);
    setId(data.id);
  };

  return (
    <>
      <HeaderNews page="blank" />
      <View style={{ flex: 1 }}>
        <View>
          <ScrollView horizontal={true} style={{ backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => props.navigation.navigate('News')}>
              <Text style={[styles.textMenu, styles.borderBottom]}>Detail</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeUrl({
              id: 1,
              uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRS5en_ugibI0i-S8ACyNsEbOe7cWCSPsGS-qNg1jcxA4lp6FykW3xeTgrd9BE1BbqwsbRAoKPLLoSS/pubhtml?widget=true&amp;headers=false'
            })}>
              <Text style={id === 1 ? [styles.textMenuActive, styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Indonesia</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeUrl({
              id: 2,
              uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTgv9yVvkjMMHztM_vXV9Ne7OyRLBSJg3FGjE70hzDXhxFogm9US-rEo9zLXtBD-ik3zXxEQupzRVQ6/pubhtml?widget=true&amp;headers=false'
            })}>
              <Text style={id === 2 ? [styles.textMenuActive, styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Inggris</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeUrl({
              id: 3,
              uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlE_E-3_KoTnMFH946WXIsV3toqY7-drqI7NGODtVGxq2Y6qWcDorsA51E01uZf6sgMHPAZhYq6oPm/pubhtml?widget=true&amp;headers=false'
            })}>
              <Text style={id === 3 ? [styles.textMenuActive, styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Itali</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeUrl({
              id: 4,
              uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTZGsaQYAJt0RHHgsNkMJvUo7PrP0bR6zTZtOUZjal8YOwZSraDFKRI-0ATNK823vGT5kZrYqqmL-62/pubhtml?widget=true&amp;headers=false'
            })}>
              <Text style={id === 4 ? [styles.textMenuActive, styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Spanyol</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeUrl({
              id: 5,
              uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTFPw27I8L7DxAgb580DTWQZcnV5WXhaBw0pElA_MuVdVfRlahalq3kP2m6_p3G1fgcDLgKlKa3LOKL/pubhtml?widget=true&amp;headers=false'
            })}>
              <Text style={id === 5 ? [styles.textMenuActive, styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Eropa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeUrl({
              id: 6,
              uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQPcEo46NWDn8A0VjQ36J83bGIl7kQmcF3_BTbiNp46KMmSt5Of0FGjLhvsWW9bztIeFPdbouP9c-7o/pubhtml?widget=true&amp;headers=false'
            })}>
              <Text style={id === 6 ? [styles.textMenuActive, styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Internasional</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <ScrollView style={{ marginBottom: 70 }}>
          {
            <WebView
              source={{ uri: uri }}
              style={{ width: width, height: height * (id === 6 ? 2.6 : 8) }}
              scalesPageToFit={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
            />
          }
        </ScrollView>
      </View>
      <FooterNews page='prediksi' />
    </>
  );
}

export default Prediksi;

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