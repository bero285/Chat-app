import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GetNameScreen from "./screens/GetNameScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { MyContext } from "./Context";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();


export default function App() {
  const [exist, setExist] = useState("");
  return (
    <QueryClientProvider client={queryClient}>
      <MyContext.Provider value={{ exist, setExist }}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </MyContext.Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
