// online-gaming/app/GameCenter.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  Button,
} from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";
import BigBanner from "@/components/BigBanner";
import { ScrollView } from "react-native-gesture-handler";
import { headerMenuItems, footerMenuItems } from "../constants/menus";
import { Ionicons } from "@expo/vector-icons";
import {
  sports,
  footballMatchs,
  SoccerMatchs,
  BasketballGames,
  BaseballGames,
  GolfGames,
  FightingGames,
  TennisGames,
  WeightliftingGames,
  BowlingGames,
  FutureGames,
  CarRacingGames,
} from "../constants/menus";
import { useWallet } from "@/context/walletContext";

const { width: screenWidth } = Dimensions.get("window");
const ITEM_WIDTH = 400; // Desired item width, adjust as needed

const SportsBook = () => {
  const { totalUserBalance, setTotalUserBalance } = useWallet();

  const [selectedSport, setSelectedSport] = useState("Football");
  const [selectedTab, setSelectedTab] = useState("My Betslip");
  const [slipModalVisible, setSlipModalVisible] = useState(false);
  const numColumns = Math.floor(screenWidth / ITEM_WIDTH);
  const [sportsList, setSportsList] = useState(sports);
  const [footballMatchsList, setFootballMatchsList] = useState(footballMatchs);
  const [SoccerMatchsList, setSoccerMatchsList] = useState(SoccerMatchs);
  const [BasketballGamesList, setBasketballGamesList] =
    useState(BasketballGames);
  const [BaseballGamesList, setBaseballGamesList] = useState(BaseballGames);
  const [GolfGamesList, setGolfGamesList] = useState(GolfGames);
  const [FightingGamesList, setFightingGamesList] = useState(FightingGames);
  const [TennisGamesList, setTennisGamesList] = useState(TennisGames);
  const [WeightliftingGamesList, setWeightliftingGamesList] =
    useState(WeightliftingGames);
  const [BowlingGamesList, setBowlingGamesList] = useState(BowlingGames);
  const [FutureGamesList, setFutureGamesList] = useState(FutureGames);
  const [CarRacingGamesList, setCarRacingGamesList] = useState(CarRacingGames);
  const [betSlipObject, setBetSlipObject] = useState([]);
  const [betsObject, setBetsObject] = useState([]);

  const [depositAmount, setDepositAmount] = useState("");

  const handleSlipModal = () => {
    setSlipModalVisible(!slipModalVisible);
  };

  const renderGames = ({ item }) => {
    return (
      <View
        style={{
          padding: 5,
          width: 400,
          height: 350,
          borderRadius: 10,
          margin: 5,
          justifyContent: "space-around",
          backgroundColor: "black",
        }}
      >
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Text style={{ color: "white" }}>{selectedSport}</Text>
          <Text style={{ color: "white" }}> - {item.league}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Ionicons name="calendar-outline" size={15} color="#fff" />
          <Text style={{ color: "white", fontSize: 10 }}> {item.date}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 5,
            }}
          >
            <Ionicons name="time-outline" size={15} color="#fff" />
          </View>
          <Text style={{ color: "white", fontSize: 10 }}> {item.time}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ width: 45, height: 45 }}
            source={{ uri: item.team1Flag }}
            resizeMode="contain"
          />
          <Text style={{ color: "white", fontSize: 10 }}> {item.team1}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ width: 45, height: 45 }}
            source={{ uri: item.team2Flag }}
            resizeMode="contain"
          />
          <Text style={{ color: "white", fontSize: 10 }}> {item.team2}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {" "}
          <Text style={{ color: "white" }}>Bet Type: {item.betType} </Text>
          <Ionicons name="pin-outline" size={24} color="#fff" />
          <Text style={{ color: "white" }}> Bet Odds: {item.betOdds}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white" }}>Stake: {item.stake} </Text>
          <Ionicons name="pin" size={24} color="#fff" />

          <Text style={{ color: "white" }}>
            {" "}
            Potential Win: {item.potentialWin}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: depositAmount > 0 ? "green" : "gray",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
          onPress={() => handleAddToSlip(item)}
          disabled={depositAmount === ""}
        >
          <Text style={{ color: "white" }}>Add to Slip</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleAddToSlip = (game) => {
    setSlipModalVisible(true)
    setSelectedTab("My Betslip")
    setBetSlipObject((prevBetSlip) => [...prevBetSlip, game]);
    console.log(betSlipObject);
  };

  const handlePlaceBet = () => {
    setTotalUserBalance(totalUserBalance - depositAmount);
    setBetsObject([...betsObject, ...betSlipObject]);
    setBetSlipObject([]);
    setSelectedTab("My Bets");
        setDepositAmount("");

  };

  const removeItemFromBetSlip = (item) => {
    setBetSlipObject(betSlipObject.filter((i) => i !== item));
  };

  const renderBetSlipItem = ({ item }) => (
    <View style={{ padding: 5, width: 400, borderRadius: 10, backgroundColor: "black", margin: 5 }}>
      <Text style={styles.betslipText}>League: {item.league}</Text>
      <Text style={styles.betslipText}>
        Date: {item.date} Time: {item.time}
      </Text>
      <Text style={styles.betslipText}>
        {item.team1} vs {item.team2}
      </Text>
      <Text style={styles.betslipText}>
        {item.betType} - Odds: {item.betOdds}
      </Text>
      <Text style={styles.betslipText}>Stake: {item.stake}</Text>
      <Text style={styles.betslipText}>Potential Win: {item.potentialWin}</Text>
      <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5 }} onPress={() => removeItemFromBetSlip(item)}>
      <Text style={{ color: 'red' }}>X</Text>
    </TouchableOpacity>
    </View>
  );

  const renderBetsItem = ({ item }) => (
    <View style={{ padding: 5, width: 400, borderRadius: 10, backgroundColor: "black", margin: 5 }}>
      <Text style={styles.betslipText}>League: {item.league}</Text>
      <Text style={styles.betslipText}>
        Date: {item.date} Time: {item.time}
      </Text>
      <Text style={styles.betslipText}>
        {item.team1} vs {item.team2}
      </Text>
      <Text style={styles.betslipText}>
        {item.betType} - Odds: {item.betOdds}
      </Text>
      <Text style={styles.betslipText}>Stake: {item.stake}</Text>
      <Text style={styles.betslipText}>Potential Win: {item.potentialWin}</Text>
      <Text style={styles.betslipText}>Status: WIN</Text>

    </View>
  );


 
  return (
    <>
      <ImageBackground
        source={require("../assets/images/background.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <ScrollView style={{ flex: 1 }}>
          <Header
            logoSource={require("../assets/images/logo-casino-gaming.png")}
            menuItems={headerMenuItems}
          />
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>SportsBook</Text>

              <View>
                <View style={styles.depositContainer}>
                <Text style={{ color: "white", marginRight: 5 }}>Deposit: $</Text>
                  <TextInput
                    style={styles.depositInput}
                    placeholder="Enter Deposit Amount"
                    keyboardType="numeric"
                    value={depositAmount}
                    onChangeText={(text) => setDepositAmount(text)}
                  />
                </View>
              </View>
              <TouchableOpacity onPress={() => handleSlipModal()}>
                <Ionicons name="pricetags-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <Modal
                visible={slipModalVisible}
                transparent={true}
                onRequestClose={() => setSlipModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <ScrollView
                    contentContainerStyle={{
                      flex: 1,
                      padding: 20,
                    }}
                  >
                    <View style={styles.modalContent}>
                      <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={() => setSlipModalVisible(false)}
                      >
                        <Ionicons
                          name="close-outline"
                          size={24}
                          color="black"
                        />
                      </TouchableOpacity>
                      <View style={styles.tabs}>
                        <TouchableOpacity
                          onPress={() => setSelectedTab("My Betslip")}
                          style={[
                            styles.tab,
                            selectedTab === "My Betslip"
                              ? styles.selectedTab
                              : null,
                          ]}
                        >
                          <Text
                            style={[
                              styles.tabText,
                              selectedTab === "My Betslip"
                                ? styles.selectedTabText
                                : null,
                            ]}
                          >
                            My Betslips
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => setSelectedTab("My Bets")}
                          style={[
                            styles.tab,
                            selectedTab === "My Bets"
                              ? styles.selectedTab
                              : null,
                          ]}
                        >
                          <Text
                            style={[
                              styles.tabText,
                              selectedTab === "My Bets"
                                ? styles.selectedTabText
                                : null,
                            ]}
                          >
                            My Bets
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {selectedTab === "My Betslip" ? (
                        <View style={styles.betslipContainer}>
                          <Text style={styles.betslipHeader}>Your Betslip</Text>
                          <View style={styles.betslipDetails}>
                            <FlatList
                              data={betSlipObject}
                              renderItem={renderBetSlipItem}
                              keyExtractor={(item, index) => index.toString()}
                            />
                        
                          </View>
                          <TouchableOpacity onPress={() => handlePlaceBet()} style={styles.placeBetButton} disabled={betSlipObject.length === 0}>
                            PLACE BET FOR $ {depositAmount}
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View style={styles.betslipContainer}>
                          <Text style={styles.betslipHeader}>Your Bets</Text>
                          <View style={styles.betslipDetails}>
                          <View style={styles.betslipDetails}>
                            {betsObject.length === 0 ? (
                              <Text style={styles.noBetsText}>
                                No Bets Found
                              </Text>
                            ) : (
<FlatList
                              data={betsObject}
                              renderItem={renderBetsItem}
                              keyExtractor={(item, index) => index.toString()}
                            />
                            )}
                            
                        
                          </View>
                          </View>
                        </View>
                      )}
                    </View>
                  </ScrollView>
                </View>
              </Modal>
            </View>
            {/* games header list */}
            <View style={{ flexDirection: "row" }}>
              <FlatList
                horizontal
                data={sportsList}
                style={{ flex: 1, backgroundColor: "black" }}
                contentContainerStyle={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: 20,
                }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setSelectedSport(item.name)}
                    style={{
                      padding: 10,
                      alignItems: "center",
                      // backgroundColor:
                      //   selectedSport === item ? "lightgray" : "white",
                    }}
                  >
                    <Ionicons name={item.icon} size={24} color="#fff" />

                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
              />
              <View></View>
            </View>
            {/* selected sport */}

            <View style={styles.centerSection}>
              <View style={styles.selectedSportHeader}>
                <Text style={styles.selectedSportHeaderText}>
                  {selectedSport}
                </Text>
              </View>
              {/* search games */}
              <View style={{ padding: 10 }}>
                <TextInput
                  style={{ borderWidth: 1, borderColor: "gray", padding: 10 }}
                  placeholder="Search Games"
                />
              </View>
              {/* games container */}
              <FlatList
                numColumns={numColumns}
                contentContainerStyle={{
                  backgroundColor: "lightgray",
                  alignItems: "center",
                }}
                data={
                  selectedSport === "Football"
                    ? footballMatchsList
                    : selectedSport === "Soccer"
                    ? SoccerMatchsList
                    : selectedSport === "Basketball"
                    ? BasketballGamesList
                    : selectedSport === "Baseball"
                    ? BaseballGamesList
                    : selectedSport === "Golf"
                    ? GolfGamesList
                    : selectedSport === "Fighting"
                    ? FightingGamesList
                    : selectedSport === "Tennis"
                    ? TennisGamesList
                    : selectedSport === "Weightlifting"
                    ? WeightliftingGamesList
                    : selectedSport === "Bowling"
                    ? BowlingGamesList
                    : selectedSport === "Futures"
                    ? FutureGamesList
                    : selectedSport === "Car Racing"
                    ? CarRacingGamesList
                    : []
                }
                renderItem={renderGames}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      {/* <Footer menuItems={footerMenuItems} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  placeBetButton: {
    backgroundColor: "yellow",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",

  },
  betslipContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  betslipHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  betslipDetails: {
    marginBottom: 20,
  },
  betslipText: {
    fontSize: 18,
    marginBottom: 5,
    color: "white"
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    marginTop: 160,
    // justifyContent: 'center',
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginRight: 20,
    // height: 500,
  },
  modalContent: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalText: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 60,
    backgroundColor: "#333",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    // paddingHorizontal: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f7f7f7",
    paddingVertical: 10,
    // width:'20%'
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  selectedTab: {
    backgroundColor: "#333",
  },
  tabText: {
    fontSize: 16,
    color: "#333",
  },
  selectedTabText: {
    color: "#fff",
  },
  content: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    // width: "20%",
    height: "100%",
  },
  contentText: {
    fontSize: 24,
  },
  leftSection: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "gray",
    padding: 10,
  },
  centerSection: {
    flex: 2,
    padding: 10,
    // backgroundColor: "yellow",
    // width:'80%'
  },
  rightSection: {
    flex: 1,
    padding: 10,
  },
  sportItem: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedSportItem: {
    backgroundColor: "lightgray",
  },
  gameItem: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 10,
  },
  betButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  betButtonText: {
    color: "white",
  },
  selectedSportHeader: {
    backgroundColor: "lightgray", // adjust background color as needed
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedSportHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  depositContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  depositButton: {
    color: "#fff",
    fontSize: 16,
    marginRight: 10,
  },
  depositInput: {
    height: 30,
    width: 170,
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 10,
    color: "#fff",
    marginHorizontal: 5,
  },
});

export default SportsBook;
