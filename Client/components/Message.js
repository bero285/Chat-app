import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Message({ message, name }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 4,
  },
  name: {
    fontWeight: "800",
  },
});
