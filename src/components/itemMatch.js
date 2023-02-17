import React from 'react';
import useRequest from '../context/RequestContext';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  Alert,
} from 'react-native';

const itemMatch = (props) => {
  const request = useRequest();
  const [pemenang, setPemenang] = React.useState(null);
  const [homeScore, setHomeScore] = React.useState('');
  const [awayScore, setAwayScore] = React.useState('');
  const onPemenang = (data) => {
    setPemenang(data);
  };
  const date = new Date(props.item.start_date);
  const time = props.item.start_time.toString().substr(0, 5);
  const baseUrlImage = 'https://kuis.bolamilenia.com/uploads/teams/';
  // const baseUrlImage = 'http://10.0.2.2/guess_score/public/uploads/teams/';
  const [status, setStatus] = React.useState(false);
  
  const [ statusActive, setStatusActive ] = React.useState(false);

  const onSubmited = () => {
    const data = {
      match_id: props.item.id,
      home_score: homeScore,
      away_score: awayScore,
      winner_team: pemenang,
    };
    let url = '';
    if (props.type === 'match') {
      url = '/api/v1/guess/makeGuess';
    } else {
      url = '/api/v1/guess/makeGuessSession';
    }
    request.postWithToken(url, data, {}, (res) => {
      try {
        if (res.data.status === 'success') {
          setAwayScore('');
          setHomeScore('');
          setPemenang(null);
          Alert.alert('Berhasil', res.data.message);
          props.onRefresh();
        } else {
          Alert.alert('Gagal', res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  const onEdit = () => {
    request.postWithToken(`/api/v1/guess/changeguess/${props.item.user_guess.id}?type=${props.type}`, {}, {}, (res) => {
      try {
        setStatus(false);
        console.log(res.data);
        if (res.data.status === 'success') {
          setAwayScore('');
          setHomeScore('');
          setPemenang(null);
          Alert.alert('Berhasil', res.data.message);
          props.onRefresh();
        } else {
          setStatus(true);
          Alert.alert('Gagal', res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  React.useEffect(() => {
    setStatusActive(false);
    setStatus(false);
    if (props.item.user_guess !== null) {
      setHomeScore(props.item.user_guess.home_score.toString());
      setAwayScore(props.item.user_guess.away_score.toString());
      setPemenang(props.item.user_guess.winner_team.toString());
    } else {
      setHomeScore('');
      setAwayScore('');
      setPemenang('');
    }
    if (props.item.user_guess != null || props.item.status != 'active') {
      setStatus(true);
    }
    console.log(props.item);

    let date = `${props.item.start_date}, ${props.item.start_time}`;
    let dateNow = new Date();
    let dateMatch = new Date(date);
    if (dateMatch <= dateNow) {
      setStatusActive(true);
      setStatus(true);
    }
  }, [props.item]);

  return (
    <>
      {/* Section Playmatch */}
      <View style={[styles.bgWhite, styles.playmatch]}>
        <View style={[styles.playmatchItem]}>
          <View style={[styles.bgGreen, styles.justifyCenter]}>
            <Text style={[styles.playmatchItemDateText]}>{date.getDate()} {date.toLocaleString("default", { month: "short" })} {date.getFullYear()}, {time} WIB</Text>
          </View>
          <View style={[styles.playmatchRow]}>
            <View style={[styles.playmatchCol, styles.alignCenter, styles.justifyCenter]}>
              <Image source={{ uri: baseUrlImage + props.item.home_team.team_logo }} style={[styles.playmatchFlag]} />
              <Text style={{color: '#333'}}>{props.item.home_team.team_name}</Text>
            </View>
            <View style={[styles.playmatchCol, styles.alignCenter, styles.justifyCenter]}>
              <Text style={{color: '#333'}}>{props.item.name}</Text>
            </View>
            <View style={[styles.playmatchCol, styles.alignCenter, styles.justifyCenter]}>
              <Image source={{ uri: baseUrlImage + props.item.away_team.team_logo }} style={[styles.playmatchFlag]} />
              <Text style={{color: '#333'}}>{props.item.away_team.team_name}</Text>
            </View>
          </View>
          <Text style={[styles.textCenter, styles.textBold, styles.font20, styles.label]}>Pilih Pemenang</Text>
          <View style={[styles.playmatchRow]}>
            <View style={[styles.playmatchCol, styles.alignCenter, styles.justifyCenter]}>
              <TouchableHighlight disabled={status ? true : false} style={[styles.playmatchButton, pemenang === 'home' ? styles.bgGreen : '', styles.justifyCenter]} onPress={() => onPemenang('home')} underlayColor="#00c25b">
                <Text style={[styles.textWhite, styles.textCenter]}>HOME</Text>
              </TouchableHighlight>
            </View>
            <View style={[styles.playmatchCol, styles.alignCenter, styles.justifyCenter]}>
              <TouchableHighlight disabled={status ? true : false} style={[styles.playmatchButton, pemenang === 'draw' ? styles.bgGreen : '', styles.justifyCenter]} onPress={() => onPemenang('draw')} underlayColor="#00c25b">
                <Text style={[styles.textWhite, styles.textCenter]}>DRAW</Text>
              </TouchableHighlight>
            </View>
            <View style={[styles.playmatchCol, styles.alignCenter, styles.justifyCenter]}>
              <TouchableHighlight disabled={status ? true : false} style={[styles.playmatchButton, pemenang === 'away' ? styles.bgGreen : '', styles.justifyCenter]} onPress={() => onPemenang('away')} underlayColor="#00c25b">
                <Text style={[styles.textWhite, styles.textCenter]}>AWAY</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={[styles.playmatchRow,]}>
            <View style={[styles.playmatchCol, styles.alignCenter, styles.justifyCenter]}>
              <TextInput editable={!status ? true : false} style={[styles.playmatchInput]} value={homeScore} keyboardType="numeric" onChangeText={setHomeScore} placeholder="Home" />
            </View>
            <View style={[styles.playmatchCol, styles.alignCenter, styles.justifyCenter]}>
              <TouchableHighlight disabled={status ? true : false} style={[styles.playmatchButton, styles.bgBlue, styles.justifyCenter, status ? styles.btnDisabled : '']} onPress={() => onSubmited()} underlayColor="#00c25b">
                <Text style={[styles.textWhite, styles.textCenter]}>{status ? 'SUBMITTED' : 'SUBMIT'}</Text>
              </TouchableHighlight>
            </View>
            <View style={[styles.playmatchCol, styles.alignCenter, styles.justifyCenter]}>
              <TextInput editable={!status ? true : false} style={[styles.playmatchInput]} value={awayScore} keyboardType="numeric" onChangeText={setAwayScore} placeholder="Away" />
            </View>
          </View>
          {
            !statusActive ?
            props.item.status !== "finished" &&
            <View style={[styles.playmatchRow, styles.justifyCenter, props.item.user_guess != null && status ? '' : styles.dNone]}>
              <View style={[styles.playmatchCol, styles.alignCenter, styles.justifyCenter]}>
                <TouchableHighlight style={[styles.btnEdit, styles.justifyCenter]} onPress={() => onEdit()} underlayColor="#00c25b">
                  <Text style={[styles.textWhite, styles.textCenter]}>Edit</Text>
                </TouchableHighlight>
              </View>
            </View> 
            : ''
          }
          <View style={{ borderTopColor: '#888', borderTopWidth: 1, padding: 10, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/images/beta99.png')} style={{ height: 70, width: 250 }} />
          </View>
        </View>
        {/* <View style={{ flexDirection: 'row', marginTop: 10, }}>
          <View style={{ width: '50%', padding: 10 }}>
            <TouchableHighlight style={{ width: '100%', backgroundColor: 'red', padding: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Live Score</Text>
                <Image source={require('../assets/images/unnamed.png')} style={{ height: 25, width: 50 }} />
              </View>
            </TouchableHighlight>
          </View>
          <View style={{ width: '50%', padding: 10 }}>
            <TouchableHighlight style={{ width: '100%', backgroundColor: '#0dcaf0', padding: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>Prediksi</Text>
                <Image source={require('../assets/images/unnamed.png')} style={{ height: 25, width: 50 }} />
              </View>
            </TouchableHighlight>
          </View>
        </View> */}
      </View>
    </>
  )
}

export default itemMatch

const styles = StyleSheet.create({
  label: {
    color: '#333'
  },
  dNone: {
    display: 'none'
  },
  btnEdit: {
    width: 100,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'orange',
  },
  mt0: {
    marginTop: 0
  },
  btnDisabled: {
    opacity: 0.5
  },
  btnLive: {
    backgroundColor: '#00c25b',
    padding: 10,
    borderRadius: 5,
    width: 130,
  },
  bgBlue: {
    backgroundColor: '#0a58ca',
  },
  playmatchInput: {
    color: '#333',
    width: 100,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
  },
  playmatchButton: {
    backgroundColor: '#888',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  playmatchFlag: {
    width: 100,
    height: 100,
  },
  playmatchCol: {
    padding: 5,
    width: '33.33333333333333%',
  },
  playmatchItem: {
    borderColor: '#eaebec',
    backgroundColor: '#f1fff2',
    borderRadius: 5,
    borderWidth: 1,
  },
  playmatchRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  playmatchDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playmatchDateItem: {
    width: '50%',
    alignItems: 'center',
    paddingLeft: 20,
  },
  playmatchItemDateText: {
    fontSize: 18,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  playmatch: {
    marginTop: 10,
    marginBottom: 10
  },
  bgGreen: {
    backgroundColor: '#00c25b',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bgWhite: {
    backgroundColor: "#fff",
    margin: 20,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  bgChard: {
    backgroundColor: "#f1fff2",
    margin: 20,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  font20: {
    fontSize: 20,
  },
  textBold: {
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: "center",
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  textWhite: {
    color: '#fff',
  },

})
