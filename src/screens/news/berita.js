import React from "react";
import HeaderNews from "../../components/headerNews";
import FooterNews from "../../components/footerNews";
import axios from "axios";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const Berita = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [perPage, setPerPage] = React.useState(10);
  const [newLoad, setNewLoad] = React.useState(false);
  const [category, setCategory] = React.useState(null);

  const fatchData = () => {
    axios.get(`https://www.bolamilenia.com/wp-json/wp/v2/posts?per_page=${perPage}${category != null ? '&categories='+category : ''}`)
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
        setLoading(false);
        setNewLoad(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    fatchData();
  }, [perPage, category]);

  const loadMore = () => {
    setPerPage(perPage + 10);
    setNewLoad(true);
  }

  const onCategory = (id) => {
    setCategory(id);
    setPerPage(10);
    setLoading(true);
  }


  return (
    <>
      <HeaderNews page="blank" />
      <View style={{ flex: 1 }}>
        <View>
          <ScrollView horizontal={true} style={{ backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => onCategory(null)}>
              <Text style={category === null ? [styles.textMenuActive,styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Terbaru</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onCategory(35)}>
              <Text style={category === 35 ? [styles.textMenuActive,styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Timnas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onCategory(40)}>
              <Text style={category === 40 ? [styles.textMenuActive,styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Indonesia</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onCategory(22)}>
              <Text style={category === 22 ? [styles.textMenuActive,styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Inggris</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onCategory(28)}>
              <Text style={category === 28 ? [styles.textMenuActive,styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Itali</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onCategory(33)}>
              <Text style={category === 33 ? [styles.textMenuActive,styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Spanyol</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onCategory(27)}>
              <Text style={category === 27 ? [styles.textMenuActive,styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Eropa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onCategory(23)}>
              <Text style={category === 23 ? [styles.textMenuActive,styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Internasional</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onCategory(39)}>
              <Text style={category === 39 ? [styles.textMenuActive,styles.borderBottomActive] : [styles.textMenu, styles.borderBottom]}>Hiburan</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={{ flex: 1, paddingBottom: 70, }}>
          <ScrollView style={{ padding: 20 }}>
            {
              loading ? (
                <Text style={{ textAlign: 'center', color: '#ff0000', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 50 }}>Loading...</Text>
              ) : (
                data.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} style={[styles.row, styles.borderBottom, { paddingBottom: 10 }]} onPress={() => navigation.navigate('DetailNews', { data: item })}>
                      <View style={[styles.col, { flex: 1 }]}>
                        {
                          item.yoast_head_json.og_image != null &&
                          item.yoast_head_json.og_image.map((item, index) => {
                            return (
                              <ImageBackground
                                key={index}
                                source={{ uri: item.url }}
                                style={{ width: '100%', height: 160 }}
                              />
                            )
                          })
                        }
                      </View>
                      <View style={[styles.col, { flex: 1, paddingLeft: 20 }]}>
                        <Text style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}>{item.title.rendered}</Text>
                        <Text style={{ fontSize: 12, color: '#9e9e9e', marginTop: 5 }}>{item.yoast_head_json.description}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
              )
            }
            {
              loading ? "" :
                <TouchableOpacity disabled={newLoad} onPress={loadMore}>
                  <Text style={{ textAlign: 'center', color: '#ff0000', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 50 }}>
                    {
                      newLoad ? "Loading..." : "Muat Lebih Banyak"
                    }
                  </Text>
                </TouchableOpacity>
            }
          </ScrollView>
        </View>
      </View>
      <FooterNews page='news' />
    </>
  );
};

export default Berita;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  col: {
    flexDirection: 'column',
  },
  textMenu: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    letterSpacing: 0.5,
    fontSize: 16,
    color: '#000'
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