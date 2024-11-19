// online-gaming/app/GameCenter.tsx

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import { ScrollView } from "react-native-gesture-handler";
import Header from "@/components/Header";
import ScratchCard from "@/components/ScratchCardGame";
import GameHeader from "@/components/GameHeader";
import RouletteWheel from "@/components/RouletteWheelGame";
import SlotMachineGame from "@/components/SlotMachine";
import { headerMenuItems, footerMenuItems } from "../constants/menus";
import KenoGame from "@/components/KenoGame";
import BaccaratGame from "@/components/BaccaratGame";
import JackpotGame from "@/components/JackpotGame";
import VideoSlotsGame from "@/components/VideoSlotsGame";
import ClassicslotsGame from "@/components/ClassicSlotsGame";



const Game = () => {
  const { id, title } = useLocalSearchParams();

  return (
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
        <GameHeader title={title} />
        <View style={styles.centeredContainer}>
        
        {id == 1 && <ScratchCard />}
        {id == 2 && <RouletteWheel />}
        {id == 3 && <SlotMachineGame />}
        {id == 4 && <KenoGame />}
        {id == 5 && <BaccaratGame />}
        {id == 6 && <JackpotGame />}
        {id == 7 && <VideoSlotsGame />}
        {id == 8 && <ClassicslotsGame />}


        </View>
       
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-between",
    // marginVertical: 20, // Optional: adjust spacing
  },

});

export default Game;
