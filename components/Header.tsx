import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useWallet } from "@/context/walletContext";

interface HeaderProps {
  backgroundColor?: string;
  logoSource: any;
  menuItems: {
    label: string;
    route: string;
  }[];
}

const Header: React.FC<HeaderProps> = ({
  backgroundColor = "black",
  logoSource,
  menuItems,
  handleAccountCreation
}) => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { totalUserBalance, setTotalUserBalance } = useWallet();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: 16,
        backgroundColor,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <TouchableOpacity onPress={() => router.push("/")}>
        <Image source={logoSource} style={{ width: 100, height: 60 }} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {menuItems.map((menuItem, index) => (
          <React.Fragment key={index}>
            <Link href={menuItem.route} style={{ marginRight: 16 }}>
              <Text style={{ color: "#fff" }}>{menuItem.label}</Text>
            </Link>
          </React.Fragment>
        ))}
        <View style={{ marginRight: 16 }}>
          {isLoggedIn ? (
            <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => router.push("/wallet")}
          >
            <Text style={{ color: "#fff" }}>My Account</Text>
            <Text style={{ color: "#fff" }}>Balance: ${totalUserBalance}</Text>

          </TouchableOpacity>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  color: "white",
                  marginRight: 8,
                }}
                value={username}
                onChangeText={setUsername}
                placeholder="Username"
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  marginLeft: 8,
                  color: "white",
                }}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
              />
              <TouchableOpacity
                style={{
                  height: 40,
                  backgroundColor: "#4CAF50",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 8,
                }}
                disabled={!username || !password}
                onPress={() => setIsLoggedIn(true)}
              >
                <Text style={{ color: "white" }}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 40,
                  backgroundColor: "#4CAF50",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 8,
                }}
                onPress={() => handleAccountCreation()}
              >
                <Text style={{ color: "white" }}>Create Account</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;
