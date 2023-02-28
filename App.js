import React from "react";
import { Text } from "react-native";

// screen
import Home from "./src/screens/Home";
import CaraBermain from "./src/screens/CaraBermain";
import Regulasi from "./src/screens/Regulasi";
import Hadiah from "./src/screens/Hadiah";
import Register from "./src/screens/Register";
import ForgotPassword from "./src/screens/ForgotPassword";
// screen setelah login
import Dashboard from "./src/screens/after-login/Dashboard";
import DashboardMega from "./src/screens/after-login/DashboardMega";
import PlayMatch from "./src/screens/after-login/PlayMatch";
import PlaySession from "./src/screens/after-login/PlaySession";
import Leaderboard from "./src/screens/after-login/Leaderboard";
import LeaderboardMega from "./src/screens/after-login/LeaderboardMega";
import Resi from "./src/screens/after-login/Resi";
import ResiMega from "./src/screens/after-login/ResiMega";
import Setting from "./src/screens/after-login/Setting";
import SettingPhone from "./src/screens/after-login/SettingPhone";
import SettingEmail from "./src/screens/after-login/SettingEmail";
// screen news
import News from "./src/screens/news/homenews";
import Berita from "./src/screens/news/berita";
import Livescore from "./src/screens/news/livescore";
import Match from "./src/screens/news/match";
import Statistik from "./src/screens/news/statistik";
import LoginNews from "./src/screens/news/LoginNews";
import RegisterNews from "./src/screens/news/RegisterNews";
import DetailNews from "./src/screens/news/DetailNews";
import ForgotPasswordNews from "./src/screens/news/ForgotPassword";
import Prediksi from "./src/screens/news/prediksi";
import Profile from "./src/screens/news/profile";
import EditEmail from "./src/screens/news/editEmail";
import EditPhone from "./src/screens/news/editPhone";
import EditPassword from "./src/screens/news/editPassword";
import Games from "./src/screens/news/games";
import DetailGames from "./src/screens/news/detailGames";
import Points from "./src/screens/news/points";
import PointsRedeem from "./src/screens/news/pointsRedeem";
import PointsHistory from "./src/screens/news/pointsHistory";

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator: NavigatorStack, Screen: ScreenStack } = createNativeStackNavigator();

const NavigationWrapper = () => {
  return (
    <NavigationContainer>
      <NavigatorStack screenOptions={{ headerShown: false, animation: 'none' }}>
        <ScreenStack name="News" component={News} />
        <ScreenStack name="Berita" component={Berita} />
        <ScreenStack name="Livescore" component={Livescore} />
        <ScreenStack name="Match" component={Match} />
        <ScreenStack name="Statistik" component={Statistik} />
        <ScreenStack name="LoginNews" component={LoginNews} />
        <ScreenStack name="RegisterNews" component={RegisterNews} />
        <ScreenStack name="DetailNews" component={DetailNews} />
        <ScreenStack name="ForgotPasswordNews" component={ForgotPasswordNews} />
        <ScreenStack name="Prediksi" component={Prediksi} />
        <ScreenStack name="Profile" component={Profile} />
        <ScreenStack name="EditEmail" component={EditEmail} />
        <ScreenStack name="EditPhone" component={EditPhone} />
        <ScreenStack name="EditPassword" component={EditPassword} />
        <ScreenStack name="Games" component={Games} />
        <ScreenStack name="DetailGames" component={DetailGames} />
        <ScreenStack name="Points" component={Points} />
        <ScreenStack name="PointsRedeem" component={PointsRedeem} />
        <ScreenStack name="PointsHistory" component={PointsHistory} />

        <ScreenStack name="Home" component={Home} />
        <ScreenStack name="CaraBermain" component={CaraBermain} />
        <ScreenStack name="Hadiah" component={Hadiah} />
        <ScreenStack name="Regulasi" component={Regulasi} />
        <ScreenStack name="Register" component={Register} />
        <ScreenStack name="ForgotPassword" component={ForgotPassword} />
        <ScreenStack name="AfterLogin">
          {(props) => (
            <NavigatorStack screenOptions={{ headerShown: false, animation: 'none' }} >
              <ScreenStack name="PlayMatch" component={PlayMatch} />
              <ScreenStack name="Dashboard" component={Dashboard} />
              <ScreenStack name="DashboardMega" component={DashboardMega} />
              <ScreenStack name="PlaySession" component={PlaySession} />
              <ScreenStack name="Leaderboard" component={Leaderboard} />
              <ScreenStack name="LeaderboardMega" component={LeaderboardMega} />
              <ScreenStack name="Resi" component={Resi} />
              <ScreenStack name="ResiMega" component={ResiMega} />
              <ScreenStack name="Setting" component={Setting} />
              <ScreenStack name="SettingPhone" component={SettingPhone} />
              <ScreenStack name="SettingEmail" component={SettingEmail} />
            </NavigatorStack>
          )}
        </ScreenStack>
      </NavigatorStack>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <NavigationWrapper />
    </>
  );
}