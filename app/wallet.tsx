// online-gaming/app/GameCenter.tsx

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  headerMenuItems,
  footerMenuItems,
  walletMenuItems,
} from "../constants/menus";
import { useWallet } from "../context/walletContext";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const transactions = [
  {
    id: 1,
    name: "Football - Manchester United vs Liverpool",
    date: "2022-01-01",
    bettingAmount: 100,
    winningAmount: 50,
  },
  {
    id: 2,
    name: "Deposit - Visa Card",
    date: "2022-01-02",
    bettingAmount: 0,
    winningAmount: 500,
  },
  {
    id: 3,
    name: "Blackjack - Casino Royale",
    date: "2022-01-03",
    bettingAmount: 200,
    winningAmount: 100,
  },
  {
    id: 4,
    name: "Withdrawal - Bank Transfer",
    date: "2022-01-04",
    bettingAmount: 0,
    winningAmount: -200,
  },
  {
    id: 5,
    name: "Basketball - NBA Finals",
    date: "2022-01-05",
    bettingAmount: 300,
    winningAmount: 150,
  },
  {
    id: 6,
    name: "Deposit - PayPal",
    date: "2022-01-06",
    bettingAmount: 0,
    winningAmount: 300,
  },
  {
    id: 7,
    name: "Roulette - European Roulette",
    date: "2022-01-07",
    bettingAmount: 400,
    winningAmount: 200,
  },
  {
    id: 8,
    name: "Withdrawal - Skrill",
    date: "2022-01-08",
    bettingAmount: 0,
    winningAmount: -100,
  },
  {
    id: 9,
    name: "Tennis - Wimbledon",
    date: "2022-01-09",
    bettingAmount: 500,
    winningAmount: 250,
  },
  {
    id: 10,
    name: "Deposit - Bitcoin",
    date: "2022-01-10",
    bettingAmount: 0,
    winningAmount: 1000,
  },
  {
    id: 11,
    name: "Cricket - ICC World Cup",
    date: "2022-01-11",
    bettingAmount: 100,
    winningAmount: 50,
  },
  {
    id: 12,
    name: "Withdrawal - Neteller",
    date: "2022-01-12",
    bettingAmount: 0,
    winningAmount: -500,
  },
  {
    id: 13,
    name: "Poker - Texas Hold'em",
    date: "2022-01-13",
    bettingAmount: 200,
    winningAmount: 100,
  },
  {
    id: 14,
    name: "Deposit - Mastercard",
    date: "2022-01-14",
    bettingAmount: 0,
    winningAmount: 800,
  },
  {
    id: 15,
    name: "Golf - US Open",
    date: "2022-01-15",
    bettingAmount: 300,
    winningAmount: 150,
  },
  // Add more transactions here...
];

const rewards = [
  {
    id: 1,
    title: "Welcome Bonus",
    description: "100% deposit match up to $100",
    termsAndConditions:
      "https://www.example.com/terms-and-conditions/welcome-bonus",
    expiryDate: "2024-12-31",
    selected: false,
  },
  {
    id: 2,
    title: "Weekly Spin & Win",
    description: "Spin the wheel every week for a chance to win big prizes",
    termsAndConditions:
      "https://www.example.com/terms-and-conditions/weekly-spin",
    expiryDate: "2024-12-31",
    selected: false,
  },
  {
    id: 3,
    title: "Weekend Bonus Boost",
    description: "50% deposit bonus on weekends",
    termsAndConditions:
      "https://www.example.com/terms-and-conditions/weekend-bonus",
    expiryDate: "2024-12-31",
    selected: false,
  },
  {
    id: 4,
    title: "VIP Rewards Program",
    description: "Earn points and level up for exclusive rewards",
    termsAndConditions:
      "https://www.example.com/terms-and-conditions/vip-rewards",
    expiryDate: null, // No expiry date
    selected: false,
  },
  {
    id: 5,
    title: "Refer a Friend",
    description: "Get a bonus for every friend you refer",
    termsAndConditions:
      "https://www.example.com/terms-and-conditions/refer-a-friend",
    expiryDate: null, // No expiry date
    selected: false,
  },
];
const Wallet = () => {
  const { totalUserBalance, setTotalUserBalance } = useWallet();
  const { setIsLoggedIn } = useAuth();
  const animationProgress = useRef(0);

  const [selectedItem, setSelectedItem] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [depositPaymentMethod, setDepositPaymentMethod] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalPaymentMethod, setWithdrawalPaymentMethod] = useState("");
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [rewardsList, setRewardsList] = useState(rewards);
  const [isRewardClaimed, setIsRewardClaimed] = useState(false);

  const handleItemClick = (item) => {
    // if (item.title === 'Logout') {
    //   setIsLoggedIn(false)
    // }
    setSelectedItem(item);
  };

  const handleDepositAmountChange = () => {
    const outcome = parseInt(depositAmount) + totalUserBalance;
    setTotalUserBalance(outcome);
    setDepositAmount("");
    setDepositPaymentMethod("");
  };

  const handleAddChip = (amount) => {
    setDepositAmount(amount);
  };

  const handlePaymentMethodChange = (payment) => {
    setDepositPaymentMethod(payment);
  };

  const handleWithdrawalPaymentMethod = (method) => {
    setWithdrawalPaymentMethod(method);
  };

  const handleWithdrawal = () => {
    const newBalance = totalUserBalance - parseInt(withdrawalAmount);
    setTotalUserBalance(newBalance);
    setDepositPaymentMethod("");
    setWithdrawalAmount("");
    setWithdrawalPaymentMethod("");
  };

  const handleLogout = (item) => {
    if (item === "Yes") {
      setIsLoggedIn(false);
      router.push("/");
    } else {
      setSelectedItem(null);
    }

    // setIsLoggedIn(false);
  };

  const renderTransactions = ({ item }) => (
    <View style={styles.transactionContainer}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.bettingAmountText}>
        Betting Amount: ${item.bettingAmount}
      </Text>
      <Text style={styles.winningAmountText}>
        Winning Amount: ${item.winningAmount}
      </Text>
    </View>
  );

  const handleRewardItemClick = (item) => {
    setSelectedReward(item);
    setIsRewardModalVisible(true);
  };
  const onRewardModalClose = () => {
    setSelectedReward(null);
  };

  const onClaimReward = () => {
    const newRewards = rewardsList.map((reward) => {
      if (reward.id === selectedReward.id) {
        return { ...reward, selected: true };
      }
      return reward;
    });
    setRewardsList(newRewards);
    setIsRewardModalVisible(false);
    setIsRewardClaimed(true);
  };
  const renderRewards = ({ item }) => (
    <View style={styles.transactionContainer}>
      <View style={styles.rowRewardContainer}>
        <View style={styles.textRewardContainer}>
          <Text style={styles.nameText}>{item.title}</Text>
          {/* <Text style={styles.dateText}>{item.date}</Text> */}
          <Text style={styles.bettingAmountText}>
            Reward Desciption: {item.description}
          </Text>
          <Text style={styles.winningAmountText}>
            Reward Expiry Date: {item.expiryDate}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => handleRewardItemClick(item)}>
            <AntDesign
              name={item.selected ? "star" : "staro"}
              size={50}
              color="yellow"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  return (
    <ScrollView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/background.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <Header
          logoSource={require("../assets/images/logo-casino-gaming.png")}
          menuItems={headerMenuItems}
        />
        <View style={styles.walletContainer}>
          <View style={styles.leftSection}>
            <FlatList
              data={walletMenuItems}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleItemClick(item)}>
  <Text style={[styles.listItem, selectedItem === item ? styles.selectedAccountItem : null]}>{item.title}</Text>
  </TouchableOpacity>
              )}
              ListHeaderComponent={() => (
                <View style={styles.leftHeaderContainer}>
                  <Text style={styles.header}>My Account</Text>
                </View>
              )}
            />
          </View>
          <View style={styles.rightSection}>
            {selectedItem ? (
              <View style={styles.rightTransactionSection}>
                {selectedItem.title === "Manage Funds" && (
                  <View>
                    <Text style={styles.sectionTitle}>
                      {selectedItem.title}
                    </Text>
                    <View style={{ flexDirection: "row", flex: 1 }}>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: "gray",
                          padding: 20,
                          marginRight: 10,
                        }}
                      >
                        <Text style={styles.detailedContent}>Deposit</Text>
                        <View style={{ marginBottom: 10 }}>
                          <Text style={styles.inputHeader}>
                            Enter amount you want to deposit
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginBottom: 10,
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                marginRight: 10,
                                padding: 10,
                                backgroundColor: "lightgray",
                              }}
                              onPress={() => handleAddChip("10")}
                            >
                              <Text style={{ fontSize: 16 }}>+$10</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                marginRight: 10,
                                padding: 10,
                                backgroundColor: "lightgray",
                              }}
                              onPress={() => handleAddChip("25")}
                            >
                              <Text style={{ fontSize: 16 }}>+$25</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                marginRight: 10,
                                padding: 10,
                                backgroundColor: "lightgray",
                              }}
                              onPress={() => handleAddChip("50")}
                            >
                              <Text style={{ fontSize: 16 }}>+$50</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                padding: 10,
                                backgroundColor: "lightgray",
                              }}
                              onPress={() => handleAddChip("100")}
                            >
                              <Text style={{ fontSize: 16 }}>+$100</Text>
                            </TouchableOpacity>
                          </View>
                          <TextInput
                            style={{
                              height: 40,
                              borderColor: "gray",
                              borderWidth: 1,
                              padding: 5,
                              backgroundColor: "white",
                            }}
                            placeholder="Enter amount"
                            value={depositAmount}
                            onChangeText={setDepositAmount}
                          />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                          <Text style={styles.inputHeader}>
                            Choose your payment method
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                marginRight: 10,
                                padding: 10,
                                backgroundColor:
                                  depositPaymentMethod === "Credit Card"
                                    ? "white"
                                    : "lightgray",
                              }}
                              onPress={() =>
                                handlePaymentMethodChange("Credit Card")
                              }
                            >
                              <Text style={{ fontSize: 16 }}>Credit Card</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                padding: 10,
                                backgroundColor:
                                  depositPaymentMethod === "Bank Transfer"
                                    ? "white"
                                    : "lightgray",
                              }}
                              onPress={() =>
                                handlePaymentMethodChange("Bank Transfer")
                              }
                            >
                              <Text style={{ fontSize: 16 }}>
                                Bank Transfer
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: depositPaymentMethod
                              ? "blue"
                              : "gray",
                            padding: 10,
                            alignItems: "center",
                            borderRadius: 5,
                            borderColor: "black",
                            borderWidth: 1,
                          }}
                          onPress={handleDepositAmountChange}
                          disabled={!depositAmount && !depositPaymentMethod}
                        >
                          <Text style={{ color: "white", fontSize: 16 }}>
                            Pay
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          backgroundColor: "gray",
                          padding: 20,
                        }}
                      >
                        <Text style={styles.detailedContent}>Withdraw</Text>
                        <View style={{ marginBottom: 20 }}>
                          <Text style={styles.inputHeader}>Payment Method</Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                padding: 2,
                                backgroundColor:
                                  withdrawalPaymentMethod === "Visa"
                                    ? "black"
                                    : "white",
                              }}
                              onPress={() =>
                                handleWithdrawalPaymentMethod("Visa")
                              }
                            >
                              <Image
                                source={require("../assets/images/visa-logo.jpg")}
                                style={{ width: 50, height: 40 }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                padding: 2,
                                backgroundColor:
                                  withdrawalPaymentMethod === "apple-pay"
                                    ? "black"
                                    : "white",
                              }}
                              onPress={() =>
                                handleWithdrawalPaymentMethod("apple-pay")
                              }
                            >
                              <Image
                                source={require("../assets/images/apple-pay-logo.jpg")}
                                style={{ width: 50, height: 40 }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                padding: 2,
                                backgroundColor:
                                  withdrawalPaymentMethod === "google-wallet"
                                    ? "black"
                                    : "white",
                              }}
                              onPress={() =>
                                handleWithdrawalPaymentMethod("google-wallet")
                              }
                            >
                              <Image
                                source={require("../assets/images/google-wallet-logo.png")}
                                style={{ width: 50, height: 40 }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                padding: 2,
                                backgroundColor:
                                  withdrawalPaymentMethod === "mastercard"
                                    ? "black"
                                    : "white",
                              }}
                              onPress={() =>
                                handleWithdrawalPaymentMethod("mastercard")
                              }
                            >
                              <Image
                                source={require("../assets/images/mastercard-logo.jpg")}
                                style={{ width: 50, height: 40 }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                padding: 2,
                                backgroundColor:
                                  withdrawalPaymentMethod === "bitcoin"
                                    ? "black"
                                    : "white",
                              }}
                              onPress={() =>
                                handleWithdrawalPaymentMethod("bitcoin")
                              }
                            >
                              <Image
                                source={require("../assets/images/Bitcoin-Logo.png")}
                                style={{ width: 50, height: 40 }}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                        <TextInput
                          style={{
                            height: 40,
                            borderColor: "gray",
                            borderWidth: 1,
                            padding: 5,
                            backgroundColor: "white",
                          }}
                          placeholder="Enter amount to withdraw"
                          value={withdrawalAmount}
                          onChangeText={setWithdrawalAmount}
                        />
                        <View style={{ marginBottom: 20 }}>
                          <Text style={styles.inputHeader}>
                            Total Amount in Account:
                          </Text>
                          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                            ${totalUserBalance}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            backgroundColor:
                              withdrawalPaymentMethod === "" ||
                              !withdrawalAmount
                                ? "gray"
                                : "black",
                            padding: 10,
                            alignItems: "center",
                            borderRadius: 5,
                            borderColor: "black",
                            borderWidth: 1,
                          }}
                          disabled={
                            withdrawalPaymentMethod === "" || !withdrawalAmount
                          }
                          onPress={() => handleWithdrawal(withdrawalAmount)}
                        >
                          <Text style={{ color: "white", fontSize: 16 }}>
                            Withdraw
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
                {selectedItem.title === "My Transactions" && (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.sectionTitle}>
                        {selectedItem.title}
                      </Text>
                      <View style={styles.transactionContainer}>
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity style={styles.transactionButton}>
                            <Text style={styles.transactionButtonText}>
                              Download Transactions
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.transactionButton}>
                            <Text style={styles.transactionButtonText}>
                              Contact Support
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <FlatList
                      data={transactions}
                      renderItem={renderTransactions}
                      keyExtractor={(item) => item.id}
                    />
                  </View>
                )}

                {selectedItem.title === "My rewards" && (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.sectionTitle}>
                        {selectedItem.title}
                      </Text>
                    </View>
                    <FlatList
                      data={rewardsList}
                      renderItem={renderRewards}
                      keyExtractor={(item) => item.id}
                    />
                  </View>
                )}

                {selectedItem.title === "Manage Profile" && (
                  <View>
                    <Text style={styles.sectionTitle}>
                      {selectedItem.title}
                    </Text>
                    <Text style={styles.detailedContent}>
                      This is the detailed content for {selectedItem.title}
                    </Text>
                  </View>
                )}
                {selectedItem.title === "Logout" && (
                  <View style={styles.logoutContainer}>
                    <Text style={styles.sectionTitle}>
                      Are you sure you want to logout?
                    </Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.yesButton}
                        onPress={() => handleLogout("Yes")}
                      >
                        <Text style={styles.buttonText}>Yes</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.noButton}
                        onPress={() => handleLogout("No")}
                      >
                        <Text style={styles.buttonText}>No</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            ) : (
              <Text style={styles.sectionTitle}>
                Please select an item from the left section.
              </Text>
            )}
          </View>
        </View>
        {selectedReward && (
          <Modal visible={isRewardModalVisible} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Reward Details</Text>
                <Text style={styles.modalText}>
                  Title: {selectedReward.title}
                </Text>
                <Text style={styles.modalText}>
                  Description: {selectedReward.description}
                </Text>
                <Text style={styles.modalText}>
                  Expiry Date: {selectedReward.expiryDate}
                </Text>
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={onClaimReward}
                  >
                    <Text style={styles.modalButtonText}>Claim Reward</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={onRewardModalClose}
                  >
                    <Text style={styles.modalButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
        {isRewardClaimed && (
          <Modal
            visible={isRewardClaimed}
            transparent={true}
            style={{ width: 100 }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Reward Details</Text>
                <Text style={styles.modalText}>
                  Title: {selectedReward.title}
                </Text>
                <Text
                  style={styles.modalText}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  Description: {selectedReward.description}
                </Text>
                <Text style={styles.modalText}>
                  Expiry Date: {selectedReward.expiryDate}
                </Text>
                <View style={styles.modalButtonContainer}>
                  {/* <TouchableOpacity
                    style={styles.modalButton}
                    onPress={onClaimReward}
                  >
                    <Text style={styles.modalButtonText}>Claim Reward</Text>
                  </TouchableOpacity> */}

                  <View style={styles.animationContainer}>
                    <LottieView
                      source={require("../assets/jsons/rewardClaimed.json")}
                      ref={animationProgress}
                      autoPlay={true}
                      style={styles.animationImage}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.claimModalButton}
                  onPress={() => setIsRewardClaimed(false)}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {/* <Footer menuItems={footerMenuItems} /> */}
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectedAccountItem: {
    backgroundColor: "#4F8EF7",
  },
  animationContainer: {
    width: 300,
    height: 300,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  animationImage: {
    width: 300,
    height: 300,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#4F8EF7",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 5,
  },
  claimModalButton: {
    backgroundColor: "#4F8EF7",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    margin: 5,
    // width:200
  },
  modalButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,

    // width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  // modalButton: {
  //   backgroundColor: "#4F8EF7",
  //   padding: 10,
  //   borderRadius: 5,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // modalButtonText: {
  //   fontSize: 16,
  //   color: "#fff",
  // },
  rowRewardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textRewardContainer: {
    flex: 1,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  transactionButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  transactionButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  rightTransactionSection: {
    // marginTop: 200,
    // backgroundColor: "red",
  },
  list: {
    flex: 1,
  },
  listContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  detailedContent: {
    fontSize: 16,
    color: "white",
  },
  inputHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  leftSection: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "gray",
    padding: 10,
  },
  rightSection: {
    flex: 2,
    padding: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    color: "white",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },

  walletContainer: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    // alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    // height: 400,
    marginTop: 50,
    flexDirection: "row",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  leftHeaderContainer: {
    backgroundColor: "black",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  logoutContainer: {
    padding: 20,
    // backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  yesButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  noButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  transactionContainer: {
    // flexDirection: "column",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  dateText: {
    marginBottom: 5,
    color: "#fff",
  },
  bettingAmountText: {
    marginBottom: 5,
    color: "#fff",
  },
  winningAmountText: {
    marginBottom: 10,
    color: "#fff",
  },
});

export default Wallet;
