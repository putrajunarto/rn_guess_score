import React from "react";
import HeaderNews from "../../components/headerNews";
import FooterNews from "../../components/footerNews";
import axios from "axios";
import useRequest from "../../context/RequestContext";
import { useDispatch, useSelector } from 'react-redux';
import AuthAction from '../../store/actions/AuthActions';
import { LoginManager } from 'react-native-fbsdk';
import {
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";

const HomeNews = ({ navigation }) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [perPage, setPerPage] = React.useState(10);
  const [newLoad, setNewLoad] = React.useState(false);
  const request = useRequest();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  React.useEffect(() => {
    request.postWithToken("/api/v1/auth/me", {}, {}, (res) => {
      if (res.status === 200) {
        dispatch({
          type: AuthAction.SAVE_USER_INFO,
          payload: {
            _user: res.data,
          }
        });
      }
      if (res.status === 401) {
        dispatch({
          type: AuthAction.USER_LOGOUT,
          payload: ""
        });
        LoginManager.logOut();
      }
    });
  }, [authState._token]);

  const fatchData = () => {
    axios.get(`https://www.bolamilenia.com/wp-json/wp/v2/posts?per_page=${perPage}&categories=30`)
      .then((response) => {
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
  }, [perPage]);

  const loadMore = () => {
    setPerPage(perPage + 10);
    setNewLoad(true);
  }

  return (
    <>
      <HeaderNews page="blank" />
      <View style={{ flex: 1 }}>
        <View>
          <ScrollView horizontal={true} style={{ backgroundColor: 'white' }}>
            <TouchableOpacity onPress={() => navigation.navigate('News')}>
              <Text style={[styles.textMenuActive, styles.borderBottomActive]}>Detail</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Prediksi', {
              id: 1,
              uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQPcEo46NWDn8A0VjQ36J83bGIl7kQmcF3_BTbiNp46KMmSt5Of0FGjLhvsWW9bztIeFPdbouP9c-7o/pubhtml?widget=true&amp;headers=false'
            })}>
              <Text style={[styles.textMenu, styles.borderBottom]}>Indonesia</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Prediksi', {
              id: 2,
              uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTgv9yVvkjMMHztM_vXV9Ne7OyRLBSJg3FGjE70hzDXhxFogm9US-rEo9zLXtBD-ik3zXxEQupzRVQ6/pubhtml?widget=true&amp;headers=false'
            })}>
              <Text style={[styles.textMenu, styles.borderBottom]}>Inggris</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Prediksi', {
              id: 2,
              uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTgv9yVvkjMMHztM_vXV9Ne7OyRLBSJg3FGjE70hzDXhxFogm9US-rEo9zLXtBD-ik3zXxEQupzRVQ6/pubhtml?widget=true&amp;headers=false'
            })}>
              <Text style={[styles.textMenu, styles.borderBottom]}>Itali</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Prediksi', {
              id: 3,
              uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlE_E-3_KoTnMFH946WXIsV3toqY7-drqI7NGODtVGxq2Y6qWcDorsA51E01uZf6sgMHPAZhYq6oPm/pubhtml?widget=true&amp;headers=false'
            })}>
              <Text style={[styles.textMenu, styles.borderBottom]}>Spanyol</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Prediksi', {
              id: 4,
              uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTZGsaQYAJt0RHHgsNkMJvUo7PrP0bR6zTZtOUZjal8YOwZSraDFKRI-0ATNK823vGT5kZrYqqmL-62/pubhtml?widget=true&amp;headers=false'
            })}>
              <Text style={[styles.textMenu, styles.borderBottom]}>Eropa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Prediksi', {
              id: 5,
              uri: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTFPw27I8L7DxAgb580DTWQZcnV5WXhaBw0pElA_MuVdVfRlahalq3kP2m6_p3G1fgcDLgKlKa3LOKL/pubhtml?widget=true&amp;headers=false'
            })}>
              <Text style={[styles.textMenu, styles.borderBottom]}>Internasional</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={{ flex: 1, paddingBottom: 70, }}>
          <ScrollView style={{ padding: 20 }}>
            {
              loading ? <Text style={{ textAlign: 'center', color: '#ff0000', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 50 }}>Loading...</Text> :
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
                                style={{ width: '100%', height: 90 }}
                              />
                            )
                          })
                        }
                      </View>
                      <View style={[styles.col, { flex: 1, paddingLeft: 20 }]}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>{item.title.rendered}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })
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
      <FooterNews page='prediksi' />
    </>
  );
};

export default HomeNews;

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