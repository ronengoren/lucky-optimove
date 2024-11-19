// components/ImageBackground.tsx
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

interface Props {
  children: React.ReactNode;
  source: any;
  style?: any;
}

const GlobalImageBackground: React.FC<Props> = ({ children, source, style }) => {
  return (
    <ImageBackground
      source={source}
      style={[styles.container, style]}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    // height: '100%',
  },
});

export default GlobalImageBackground;