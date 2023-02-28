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
  Image,
  TouchableOpacity,
} from "react-native";

const Games = ({ navigation }) => {
  const request = useRequest();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [perPage, setPerPage] = React.useState(10);
  const [newLoad, setNewLoad] = React.useState(false);
  const authState = useSelector((state) => state.auth);
  const [unauth, setUnauth] = React.useState(false);

  React.useEffect(() => {
    request.postWithToken("/api/v1/auth/me", {}, {}, (res) => {
      fatchData();
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
    axios.get(`https://www.bolamilenia.com/wp-json/wp/v2/posts?per_page=${perPage}&categories=1507`)
      .then((response) => {
        let data = response.data;
        data.map((item, index) => {
          request.postWithToken("/api/v1/comment/get", {
            "post_id": item.id,
          }, {}, (res) => {
            if (res.status === 200) {
              data[index].comment = res.data;
            }
            if (res.status == 401) {
              dispatch({
                type: AuthAction.USER_LOGOUT,
                payload: ""
              });
              LoginManager.logOut();
              setUnauth(true);
            }
          });
        });
        setTimeout(() => {
          setData(data);
          setLoading(false);
          setNewLoad(false);
        }, 300);
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
        <View style={{ flex: 1, paddingBottom: 70, }}>
          <ScrollView style={{ padding: 20 }}>
            {
              loading ? <Text style={{ textAlign: 'center', color: '#008d7f', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 50 }}>Loading...</Text> :
                data.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} style={[styles.row, styles.borderBottom, { paddingBottom: 10 }]} onPress={() => navigation.navigate('DetailGames', { data: item, })}>
                      <View style={[styles.col, { flex: 1 }]}>
                        {
                          item.yoast_head_json.og_image != null &&
                          item.yoast_head_json.og_image.map((item, index) => {
                            return (
                              <ImageBackground
                                key={index}
                                source={{ uri: item.url }}
                                style={{ width: '100%', height: 90, backgroundColor: '#ccc' }}
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
              data.length < 10 || 
              loading ? "" :
                <TouchableOpacity disabled={newLoad} onPress={loadMore}>
                  <Text style={{ textAlign: 'center', color: '#008d7f', fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 50 }}>
                    {
                      newLoad ? "Loading..." : "Muat Lebih Banyak"
                    }
                  </Text>
                </TouchableOpacity>
            }
          </ScrollView>
        </View>
      </View>
      <FooterNews page='games' />
    </>
  );
};

export default Games;

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
    color: '#008d7f',
  },
  borderBottomActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#008d7f',
  },
});