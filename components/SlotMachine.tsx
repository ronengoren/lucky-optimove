import { useState, useEffect, useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SlotMachine from "react-native-slot-machine";

export default function SlotMachineGame() {
  const [slotSettings, setSlotSettings] = useState({
    duration: 4000,
    slot1: 1234,
    slot2: "hello",
    slot3: "2351",
  });
  const slotRef = useRef(null);
//   useEffect(() => {
//     setTimeout(
//       () =>
//         setSlotSettings({
//           duration: 1000,
//           slot1: "4321",
//           slot2: "world",
//           slot3: "1234",
//         }),
//       5000
//     );
//     setTimeout(
//       () =>
//         setSlotSettings({
//           duration: 4000,
//           slot1: "1234",
//           slot2: "hello",
//           slot3: "2351",
//         }),
//       7000
//     );
//     setTimeout(() => slotRef.current.spinTo("prize"), 12000);
//   }, []);

  const symbols = ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌"]; // can't use emojies in SlotMachine because some of them are comprised of 2 chars

  const handleSpin = () => {
    setTimeout(
      () =>
        setSlotSettings({
          duration: 1000,
          slot1: "4321",
          slot2: "world",
          slot3: "1234",
        }),
      1000
    );
    setTimeout(
      () =>
        setSlotSettings({
          duration: 4000,
          slot1: "1234",
          slot2: "hello",
          slot3: "2351",
        }),
      1000
    );
    setTimeout(() => slotRef.current.spinTo("prize"), 12000); 
  }
  return (
    <View style={styles.container}>
    <View style={styles.leftColumn}>
    <SlotMachine text={slotSettings.slot3} />
    {/* <SlotMachine
    width={80}
    height={80}
      styles={styles.bigImage}
      text={slotSettings.slot3}
      range="012345"
      ref={slotRef}
      renderContent={(c) => (
        <Text style={{ fontSize: 40 }}>{symbols[c]}</Text>
      )}
      duration={slotSettings.duration}
    /> */}
   
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
      <TouchableOpacity style={styles.playButton} onPress={() => handleSpin()}>
        <Text style={styles.playButtonText}>PLAY</Text>
      </TouchableOpacity>
    </View>
  </View>
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
    //   <View
    //     style={{
    //       height: 200,
          
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //     }}
    //   >
    //     <SlotMachine
      
    //       text={slotSettings.slot3}
    //       range="012345"
    //       renderContent={(c) => (
    //         <Text style={{ fontSize: 25 }}>{symbols[c]}</Text>
    //       )}
    //       duration={slotSettings.duration}
    //     />
    //   </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",

    padding: 20,
  },
  leftColumn: {
    flex: 2,
    justifyContent: "center",
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