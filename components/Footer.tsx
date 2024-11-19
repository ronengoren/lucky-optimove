// online-gaming/components/Footer.tsx

import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface FooterProps {
  menuItems: {
    label: string;
    route: string;
  }[];
}

const Footer: React.FC<FooterProps> = ({ menuItems }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 16,
        position: 'absolute', // Position absolutely
        left: 0, // Align left to screen
        right: 0, // Align right to screen
        bottom: 0, // Position at the bottom of the screen
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingTop: 20,
       
      }}
    >
      {menuItems.map((menuItem, index) => (
        <TouchableOpacity
         
          key={index}
          onPress={() => {
            router.push(menuItem.route);
          }}
        >
          <Text  style={{
            color: 'white',
          }}>{menuItem.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Footer;