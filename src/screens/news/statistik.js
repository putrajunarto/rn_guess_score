import React from "react";
import HeaderNews from "../../components/headerNews";
import FooterNews from "../../components/footerNews";
import WebView from "react-native-webview";
import {
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

const Statistik = () => {
  const { width, height } = useWindowDimensions();
  const [active, setActive] = React.useState(0);
  const [url, setUrl] = React.useState('https://www.fctables.com/indonesia/super-liga/iframe/?type=table&lang_id=2&country=102&template=318&team=&timezone=Asia/Jakarta&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=0&ga=0&gd=0&pts=1&ng=1&form=1&width=560&height=550&font=Verdana&fs=12&lh=22&bg=414851&fc=ffffff&logo=1&tlink=0&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=08ac7c&thc=ffffff&bc=dddddd&hob=2a3033&hobc=2a3033&lc=680202&sh=1&hfb=1&hbc=292c31&hfc=FFFFFF');

  const onChangeUrl = (data) => {
    setUrl(data.uri);
    setActive(data.id);
  };

  return (
    <>
      <HeaderNews page="blank" />
      <View style={{ flex: 1 }}>
        <View>
          <ScrollView horizontal={true} style={{ backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => onChangeUrl(
              {
                uri: 'https://www.fctables.com/indonesia/super-liga/iframe/?type=table&lang_id=2&country=102&template=318&team=&timezone=Asia/Jakarta&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=0&ga=0&gd=0&pts=1&ng=1&form=1&width=560&height=550&font=Verdana&fs=12&lh=22&bg=414851&fc=ffffff&logo=1&tlink=0&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=08ac7c&thc=ffffff&bc=dddddd&hob=2a3033&hobc=2a3033&lc=680202&sh=1&hfb=1&hbc=292c31&hfc=FFFFFF',
                id: 0,
              }
            )}>
              <Text style={active == 0 ? [styles.textMenuActive, styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Indonesia</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeUrl(
              {
                uri: 'https://www.fctables.com/england/premier-league/iframe/?type=table&lang_id=2&country=67&template=10&team=&timezone=Asia/Jakarta&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=0&ga=0&gd=0&pts=1&ng=1&form=1&width=570&height=610&font=Verdana&fs=11&lh=22&bg=414851&fc=ffffff&logo=1&tlink=0&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=08ac7c&thc=ffffff&bc=dddddd&hob=2a3033&hobc=2a3033&lc=680202&sh=1&hfb=1&hbc=292c31&hfc=FFFFFF',
                id: 1,
              }
            )}>
              <Text style={active == 1 ? [styles.textMenuActive, styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Inggris</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeUrl(
              {
                uri: 'https://www.fctables.com/italy/serie-a/iframe/?type=table&lang_id=2&country=108&template=17&timezone=Asia/Jakarta&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=0&ga=0&gd=0&pts=1&ng=1&form=1&width=570&height=610&font=Verdana&fs=11&lh=22&bg=414851&fc=ffffff&logo=1&tlink=0&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=08ac7c&thc=ffffff&bc=dddddd&hob=2a3033&hobc=2a3033&lc=680202&sh=1&hfb=1&hbc=292c31&hfc=FFFFFF',
                id: 2,
              }
            )}>
              <Text style={active == 2 ? [styles.textMenuActive, styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Italia</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeUrl(
              {
                uri: 'https://www.fctables.com/spain/liga-bbva/iframe/?type=table&lang_id=2&country=201&template=43&timezone=Asia/Jakarta&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=0&ga=0&gd=0&pts=1&ng=1&form=1&width=570&height=610&font=Verdana&fs=11&lh=22&bg=414851&fc=ffffff&logo=1&tlink=0&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=08ac7c&thc=ffffff&bc=dddddd&hob=2a3033&hobc=2a3033&lc=680202&sh=1&hfb=1&hbc=292c31&hfc=FFFFFF',
                id: 3,
              }
            )}>
              <Text style={active == 3 ? [styles.textMenuActive, styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Spanyol</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChangeUrl(
              {
                uri: 'Liga Champions',
                id: 4,
              }
            )}>
              <Text style={active == 4 ? [styles.textMenuActive, styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Eropa</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={{ paddingBottom: 20 }}>
          <ScrollView>
            {/* Webview */}
            {
              url == 'Liga Champions' ?
                <View style={{marginBottom : 95}}>
                  <WebView
                    source={{ uri: 'https://www.fctables.com/championsleague/iframe/?type=table&lang_id=2&country=5&stage=34820&team=&timezone=Asia/Jakarta&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=0&ga=0&gd=0&pts=1&ng=1&form=1&width=570&height=180&font=Verdana&fs=11&lh=22&bg=414851&fc=ffffff&logo=1&tlink=0&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=08ac7c&thc=ffffff&bc=dddddd&hob=2a3033&hobc=2a3033&lc=680202&sh=1&hfb=1&hbc=292c31&hfc=FFFFFF' }}
                    style={{ width: width, height: 160 }}
                    scalesPageToFit={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                  />
                  <WebView
                    source={{ uri: 'https://www.fctables.com/championsleague/iframe/?type=table&lang_id=2&country=5&stage=34821&team=&timezone=Asia/Jakarta&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=0&ga=0&gd=0&pts=1&ng=1&form=1&width=570&height=180&font=Verdana&fs=11&lh=22&bg=414851&fc=ffffff&logo=1&tlink=0&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=08ac7c&thc=ffffff&bc=dddddd&hob=2a3033&hobc=2a3033&lc=680202&sh=1&hfb=1&hbc=292c31&hfc=FFFFFF' }}
                    style={{ width: width, height: 160 }}
                    scalesPageToFit={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                  />
                  <WebView
                    source={{ uri: 'https://www.fctables.com/championsleague/iframe/?type=table&lang_id=2&country=5&stage=34822&team=&timezone=Asia/Jakarta&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=0&ga=0&gd=0&pts=1&ng=1&form=1&width=570&height=180&font=Verdana&fs=11&lh=22&bg=414851&fc=ffffff&logo=1&tlink=0&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=08ac7c&thc=ffffff&bc=dddddd&hob=2a3033&hobc=2a3033&lc=680202&sh=1&hfb=1&hbc=292c31&hfc=FFFFFF' }}
                    style={{ width: width, height: 160 }}
                    scalesPageToFit={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                  />
                  <WebView
                    source={{ uri: 'https://www.fctables.com/championsleague/iframe/?type=table&lang_id=2&country=5&stage=34825&team=&timezone=Asia/Jakarta&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=0&ga=0&gd=0&pts=1&ng=1&form=1&width=570&height=180&font=Verdana&fs=11&lh=22&bg=414851&fc=ffffff&logo=1&tlink=0&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=08ac7c&thc=ffffff&bc=dddddd&hob=2a3033&hobc=2a3033&lc=680202&sh=1&hfb=1&hbc=292c31&hfc=FFFFFF' }}
                    style={{ width: width, height: 160 }}
                    scalesPageToFit={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                  />
                  <WebView
                    source={{ uri: 'https://www.fctables.com/championsleague/iframe/?type=table&lang_id=2&country=5&stage=34827&team=&timezone=Asia/Jakarta&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=0&ga=0&gd=0&pts=1&ng=1&form=1&width=570&height=180&font=Verdana&fs=11&lh=22&bg=414851&fc=ffffff&logo=1&tlink=0&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=08ac7c&thc=ffffff&bc=dddddd&hob=2a3033&hobc=2a3033&lc=680202&sh=1&hfb=1&hbc=292c31&hfc=FFFFFF' }}
                    style={{ width: width, height: 160 }}
                    scalesPageToFit={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                  />
                  <WebView
                    source={{ uri: 'https://www.fctables.com/championsleague/iframe/?type=table&lang_id=2&country=5&stage=34823&team=&timezone=Asia/Jakarta&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=0&ga=0&gd=0&pts=1&ng=1&form=1&width=570&height=180&font=Verdana&fs=11&lh=22&bg=414851&fc=ffffff&logo=1&tlink=0&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=08ac7c&thc=ffffff&bc=dddddd&hob=2a3033&hobc=2a3033&lc=680202&sh=1&hfb=1&hbc=292c31&hfc=FFFFFF' }}
                    style={{ width: width, height: 160 }}
                    scalesPageToFit={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                  />
                  <WebView
                    source={{ uri: 'https://www.fctables.com/championsleague/iframe/?type=table&lang_id=2&country=5&stage=34824&team=&timezone=Asia/Jakarta&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=0&ga=0&gd=0&pts=1&ng=1&form=1&width=570&height=180&font=Verdana&fs=11&lh=22&bg=414851&fc=ffffff&logo=1&tlink=0&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=08ac7c&thc=ffffff&bc=dddddd&hob=2a3033&hobc=2a3033&lc=680202&sh=1&hfb=1&hbc=292c31&hfc=FFFFFF' }}
                    style={{ width: width, height: 160 }}
                    scalesPageToFit={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                  />
                  <WebView
                    source={{ uri: 'https://www.fctables.com/championsleague/iframe/?type=table&lang_id=2&country=5&stage=34826&team=&timezone=Asia/Jakarta&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=0&ga=0&gd=0&pts=1&ng=1&form=1&width=570&height=180&font=Verdana&fs=11&lh=22&bg=414851&fc=ffffff&logo=1&tlink=0&scfs=22&scfc=333333&scb=1&sclg=1&teamls=80&ths=1&thb=1&thba=08ac7c&thc=ffffff&bc=dddddd&hob=2a3033&hobc=2a3033&lc=680202&sh=1&hfb=1&hbc=292c31&hfc=FFFFFF' }}
                    style={{ width: width, height: 160 }}
                    scalesPageToFit={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                  />
                </View>
                :
                <WebView
                  source={{ uri: url }}
                  style={{ width: width, height: height }}
                  scalesPageToFit={true}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={true}
                />
            }
          </ScrollView>
        </View>
      </View>
      <FooterNews page='statistik' />
    </>
  );
};

export default Statistik;

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