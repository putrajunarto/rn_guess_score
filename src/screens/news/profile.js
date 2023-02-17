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

const Profile = ({ navigation }) => {
  const user = useSelector((state) => state.auth._user.data);
  const dispatch = useDispatch();

  const doLogout = () => {
    dispatch({
      type: AuthAction.USER_LOGOUT,
      payload: ""
    });
    LoginManager.logOut();
    navigation.navigate("LoginNews");
  }

  return (
    <>
      <HeaderNews page="detail" />
      <ScrollView style={{ flex: 1, marginBottom: 80 }}>
        <View style={styles.container}>
          {/* Card Profile User */}
          <View style={styles.cardProfile}>
            <View style={styles.cardProfileHeader}>
              <Text style={styles.cardProfileHeaderText}>Profile</Text>
            </View>
            <View style={styles.cardProfileBody}>
              <View style={styles.cardProfileBodyLeft}>
                <ImageBackground
                  source={require("../../assets/images/64X64.gif")}
                  style={styles.cardProfileBodyLeftImage}
                />
              </View>
              <View style={styles.cardProfileBodyRight}>
                <Text style={styles.cardProfileBodyRightText}>{user?.first_name} {user?.last_name}</Text>
                <Text style={styles.cardProfileBodyRightText}>{user?.email}</Text>
                <Text style={styles.cardProfileBodyRightText}>{user?.phone}</Text>
              </View>
            </View>
          </View>
          {/* Edit Profile */}
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              padding: 10,
              width: "100%",
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            onPress={() => navigation.navigate("EditEmail")}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold",  color: '#000' }}>Edit Email</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold",  color: '#000' }}>{'>'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              padding: 10,
              width: "100%",
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            onPress={() => navigation.navigate("EditPhone")}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold",  color: '#000' }}>Edit Phone</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold",  color: '#000' }}>{'>'}</Text>
          </TouchableOpacity>
          {/* Change Password */}
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              padding: 10,
              width: "100%",
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            onPress={() => navigation.navigate("EditPassword")}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold",  color: '#000' }}>Change Password</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold",  color: '#000' }}>{'>'}</Text>
          </TouchableOpacity>
          {/* Logout */}
          <TouchableOpacity
            style={{
              backgroundColor: "#fff",
              padding: 10,
              width: "100%",
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            onPress={() => doLogout()}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold",  color: '#000' }}>Logout</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold",  color: '#000' }}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  cardProfile: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  cardProfileHeader: {
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cardProfileHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  cardProfileBody: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  cardProfileBodyLeft: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardProfileBodyLeftImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  cardProfileBodyRight: {
    width: "70%",
    paddingLeft: 10,
  },
  cardProfileBodyRightText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color : '#000'
  },
});

export default Profile;