import React, { PropTypes } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import HeaderNews from "../../components/headerNews";
import RenderHtml from 'react-native-render-html';
import useRequest from "../../context/RequestContext";
import { useDispatch, useSelector } from 'react-redux';
import AuthAction from '../../store/actions/AuthActions';
import { LoginManager } from 'react-native-fbsdk';

const DetailGames = (props) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const request = useRequest();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [value, onChangeText] = React.useState('');
  const [valueReply, onChangeTextReply] = React.useState('');
  const [comment, setComment] = React.useState([]);
  const [replyShow, setReplyShow] = React.useState(false);
  const [replies, setReplies] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [isLike, setIsLike] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);
  const [unauth, setUnauth] = React.useState(false);

  React.useEffect(() => {
    setData(props.route.params.data);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    getComment();
  }, [data]);

  const dateConvert = (date) => {
    const dateConvert = new Date(date);
    const dateConvertFormat = dateConvert.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return dateConvertFormat;
  }

  const onPostComments = (id) => {
    setBtnDisabled(true)
    if (value === '') {
      alert('Komentar tidak boleh kosong');
      setBtnDisabled(false)
      return;
    }
    request.postWithToken("/api/v1/comment/post", {
      "post_id": data.id,
      "is_reply": false,
      "reply_to": null,
      "comments": value,
    }, {}, (res) => {
      setBtnDisabled(false)
      onChangeText('');
      getComment();
    });
  }

  const onPostReply = (id) => {
    setBtnDisabled(true)
    if (valueReply === '') {
      alert('Komentar tidak boleh kosong');
      setBtnDisabled(false)
      return;
    }
    request.postWithToken("/api/v1/comment/post", {
      "post_id": data.id,
      "is_reply": true,
      "reply_to": id,
      "comments": valueReply,
    }, {}, (res) => {
      setBtnDisabled(false)
      onChangeTextReply('');
      getComment();
    });
  }

  const onLike = () => {
    request.postWithToken("/api/v1/comment/like", {
      "post_id": data.id,
    }, {}, (res) => {
      getComment();
    });
  }

  const getComment = () => {
    request.postWithToken("/api/v1/comment/get", {
      "post_id": data.id,
    }, {}, (res) => {
      if (res.status === 200) {
        setComment(res.data.data);
        setIsLike(res.data.isLiked);
        setLikeCount(res.data.likeCount);
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
  }

  const showReply = (id) => {
    setReplyShow(id);
  }

  const showReplies = (id) => {
    setReplies(id);
  }

  const hideReply = (id) => {
    setReplyShow(false);
  }

  const hideReplies = (id) => {
    setReplies(false);
  }

  // time ago
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " tahun yang lalu";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " bulan yang lalu";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " hari yang lalu";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " jam yang lalu";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " menit yang lalu";
    }
    return Math.floor(seconds) + " detik yang lalu";
  }


  return (
    <>
      <HeaderNews page="detail" />
      <ScrollView>
        {
          loading ? '' :
            <View style={styles.container}>
              <View style={styles.card}>
                {
                  data.yoast_head_json.og_image.map((item, index) => {
                    return (
                      <Image
                        key={index}
                        style={styles.image}
                        source={{
                          uri: item.url,
                        }}
                      />
                    )
                  })
                }
                <Text style={styles.titleCard}>{data.title.rendered}</Text>
                <Text style={styles.date}>{dateConvert(data.date)}</Text>
                <RenderHtml
                  contentWidth={width - 45}
                  source={{ html: data.content.rendered }}
                  tagsStyles={tagsStyles}
                  classesStyles={classesStyles}
                />
              </View>
            </View>
        }
      </ScrollView>
    </>
  );
}

export default DetailGames;

const classesStyles = {
  'wp-block-image': {
    backgroundColor: '#fff',
    marginBottom: -30,
  },
  'wp-caption-text': {
    color: '#444',
    fontSize: 12,
    textAlign: 'center',
  },
  'irp-shortcode': {
    paddingTop: 10,
    backgroundColor: '#dadada',
    borderRadius: 5,
    marginTop: 10,
  },
  'wp-element-caption': {
    color: '#444',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: -10,
  },
  'wp-block-spacer': {
    marginTop: -10,
  },
  'wp-element-button': {
    backgroundColor: '#53971e',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
}

const tagsStyles = {
  figcaption: {
    color: '#444',
    fontSize: 12,
    textAlign: 'center',
  },
  p: {
    fontSize: 14,
    marginBottom: 0,
    color: '#000'
  },
  a: {
    color: '#008d7f',
    textDecorationLine: 'none',
    fontWeight: 'bold',
  },
  img: {
    width: '100%',
    height: 'auto',
    borderRadius: 10,
    marginBottom: 20,
  },
  iframe: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  td: {
    backgroundColor: '#53971e',
    margin: 0,
  },
  li: {
    fontSize: 14,
    marginBottom: 20,
    color: '#000'
  },
};

const styles = StyleSheet.create({
  comments: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  titleCard: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#000',
  },
  date: {
    fontSize: 12,
    color: "#9e9e9e",
    marginBottom: 20,
  },
  content: {
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#008d7f",
    padding: 10,
    borderRadius: 10,
  },
  textButton: {
    color: "#fff",
    textAlign: "center",
  },
});