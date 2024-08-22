import { TouchableOpacity, View, Text } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const config = {
    webClientId: process.env.EXPO_PUBLIC_WEBCLINETID,
    iosClientId: process.env.EXPO_PUBLIC_IOSCLIENTID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROIDCLIENTID,
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await response.json();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  const handleToken = () => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      console.log(token);
      getUserInfo(token!).catch(console.error);
    }
  };

  useEffect(() => {
    handleToken();
  }, [response]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => promptAsync()}
        style={{
          padding: 10,
          backgroundColor: "blue",
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Click me to login with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}
