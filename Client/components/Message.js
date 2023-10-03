import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Message({ message, name, user }) {
  return (
    <View style={user === name ? styles.containerUser : styles.container}>
      <View style={styles.insideContainer}>
        {/* <Text style={styles.name}>{name}</Text> */}
        <Text style={user === name ? styles.messageUser : styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    marginTop: 2,
    alignItems: "flex-start"
  },
  containerUser: {
    width: "100%",
    alignItems: "flex-end",
  },
  name: {
    fontWeight: "800",
  },
  insideContainer: {
    padding: 10,
    marginTop: 4,
  },
  message: {
    backgroundColor: "#B4B4B3",

    borderWidth: 0,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  messageUser: {

    backgroundColor: "purple",
    color: "white",
    borderWidth: 0,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center"
  },
});
