import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import GetNameScreen from "./GetNameScreen";
import ChatroomScreen from "./ChatroomScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyContext } from "../Context";
export default function ContainerScreen({ navigation }) {
  const { exist, setExist } = useContext(MyContext);
  async function retrieveData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) {
        setExist("login");
      } else {
        setExist(value);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

  useEffect(() => {
    retrieveData("username");
    // setExist("chat");
  }, []);
  return (
    <View style={styles.container}>
      {/* <ChatroomScreen navigation={navigation} /> */}
      {exist === "login" ? (
        <GetNameScreen />
      ) : (
        <ChatroomScreen navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
});
