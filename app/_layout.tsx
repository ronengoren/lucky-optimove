import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { WalletProvider } from "@/context/walletContext";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {

  useEffect(() => {
    const headScript = document.createElement("script");
    const bodyScript = document.createElement("script");
    const OptimoveSDK = document.createElement("script");


OptimoveSDK.src = "https://sdk.optimove.net/v2/websdk/?tenant_id=593&amp;tenant_token=c8bcd75214d35b386d74f4c76c3cb3aca3adab0329413963c733d80fe5384c0e";
    headScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TXS33NR');`;
    // headScript.async = true;

    bodyScript.src = `https://www.googletagmanager.com/ns.html?id=GTM-TXS33NR`;
    // headScript.async = true;

    document.head.appendChild(headScript);
    document.body.appendChild(bodyScript);
    document.head.appendChild(OptimoveSDK);


  })
  return (
    <AuthProvider>
    <WalletProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
      <Stack.Screen name="game-center" options={{ headerShown: false }} />
      <Stack.Screen name="online-casino" options={{ headerShown: false }} />
      <Stack.Screen name="sportbook" options={{ headerShown: false }} />
      <Stack.Screen name="wallet" options={{ headerShown: false }} />
      <Stack.Screen name="game" options={{ headerShown: false }} />

    </Stack>
    </WalletProvider>
    </AuthProvider>
  );
}
