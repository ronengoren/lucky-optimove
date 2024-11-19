import { ImageBackground, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Header from "../components/Header";
import TopBanner from "@/components/TopBanner";
import Carousel from "@/components/Carousel";
import LowerBanner from "@/components/LowerBanner";
import Footer from "@/components/Footer";
import {  useState } from "react";
import OnboardingModal from "@/components/OnBoardingModal";
import LoginModal from "@/components/LoginModal";
import { headerMenuItems, footerMenuItems, carouselData } from "../constants/menus";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const {  isLoggedIn, isLogout, setIsLoggedIn, setIsLogout} = useAuth();
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [balance, setBalance] = useState(0);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const router = useRouter();



  const leftSection = {
    title: "Ready To Play?",
    subtitle:
      "Elevate Your Gaming Experience. Join the Winning Streak. Play Now!",
    backgroundImage: "../assets/images/purple-background.png",
    buttonText: "Play Now",
    hasButton: true,
    onPress: () => router.navigate("/game-center"),
  };
  const centerSection = {
    title: "",
    subtitle: "",
    backgroundImage: "../assets/images/sportsbook-icon.png",
    buttonText: "",
    hasButton: false,
    onPress: () => console.log("centerSection section pressed"),
  };

  const accountSection = isLoggedIn
    ? {
        title: "Your Wallet",
        subtitle: "",
        balance: balance,
        totalWinnings: totalWinnings,
        backgroundImage: "../assets/images/login-wallet.png",
        buttonText: "Open Account",
        hasButton: false,
        onPress: () => handleAccountSectionPress(),
      }
    : {
        title: "",
        subtitle: "",
        backgroundImage: "../assets/images/create-account.png",
        buttonText: "Open Account",
        hasButton: false,
        onPress: () => handleAccountSectionPress(),
      };

  const handleAccountSectionPress = () => {
    if (!isLoggedIn) {
      setIsRegisterModalVisible(true);
    } else {
      router.push("/wallet");
      // handle logged in user press
    }
  };

  const handleAccountCreation = () => {
    setIsRegisterModalVisible(false);
    setIsLoggedIn(true);
  };

  const handleLogin = () => {
    console.log("Login pressed in index");
    setIsLoggedIn(true);

    setIsLoginModalVisible(false);
    setIsRegisterModalVisible(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleGamePress = ({ id, title }) => {
    router.navigate({
      pathname: "/game/",
      params: { id: id, title: title },
    });
  };

  const handeCreateAccount = () => {
    setIsRegisterModalVisible(true);
  }
 

  return (
    <>
      <ImageBackground
        source={require("../assets/images/background.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <ScrollView>
          <Header
            logoSource={require("../assets/images/logo-casino-gaming.png")}
            menuItems={headerMenuItems}
            handleAccountCreation={handeCreateAccount}
          />
          <View
            style={{
              alignItems: "center",
            }}
          >
            <TopBanner
              leftSection={leftSection}
              centerSection={centerSection}
              accountSection={accountSection}
              isLoggedIn={isLoggedIn}
            />
            <Carousel data={carouselData} handleGamePress={handleGamePress} />

          </View>
          {isRegisterModalVisible && (
            <OnboardingModal
              visible={isRegisterModalVisible}
              onClose={() => setIsRegisterModalVisible(false)}
              onLogin={() => setIsLoginModalVisible(true)}
              onRegister={() => handleAccountCreation()}
            />
          )}

          {isLoginModalVisible && (
            <LoginModal
              visible={isRegisterModalVisible}
              onClose={() => setIsLoginModalVisible(false)}
              handleLogin={handleLogin}
            />
          )}
        </ScrollView>
        {/* <Footer menuItems={footerMenuItems} /> */}

      </ImageBackground>
    </>
  );
}
