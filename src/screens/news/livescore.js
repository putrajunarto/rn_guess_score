import React from "react";
import HeaderNews from "../../components/headerNews";
import FooterNews from "../../components/footerNews";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import WebView from "react-native-webview";

const Livescore = () => {
  const { width, height } = useWindowDimensions();
  return (
    <>
      <HeaderNews page="blank" />
      <ScrollView style={{ flex: 1, marginBottom: 70 }}>
        <WebView
          source={{ uri: "https://www.bolamilenia.com/score/livescore.html" }}
          style={{ width: width, height: height * 6.5 }}
          scalesPageToFit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      </ScrollView>
      <FooterNews page='livescore' />
    </>
  );
};

export default Livescore;

const styles = StyleSheet.create({
});