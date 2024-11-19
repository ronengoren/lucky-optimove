import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const BaccaratGame = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image
          source={require("../assets/images/adaptive-icon.png")}
          style={styles.bigImage}
        />
      </View>
      <View style={styles.middleColumn}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button 5</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.bettingInfoText}>
          Betting info text goes here...
        </Text>
      </View>
      <View style={styles.playButtonContainer}>
        <TouchableOpacity style={styles.playButton}>
          <Text style={styles.playButtonText}>PLAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",

    padding: 20,
  },
  leftColumn: {
    flex: 2,
  },
  bigImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    padding: 100,
    marginBottom: 50,
    marginRight: 50,
  },
  middleColumn: {
    marginLeft: 50,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: 200,
  },
  button: {
    width: 100,
    height: 30,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  rightColumn: {
    marginLeft: 50,
  },
  bettingInfoText: {
    fontSize: 18,
    color: "#333",
  },
  playButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 300,
  },
  playButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default BaccaratGame;
