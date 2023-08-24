import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function PersonChat({ navigation, userName }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("person", { userName })}
    >
      <View style={styles.middleContainer}>
        <Image source={require("../assets/random.jpg")} style={styles.image} />
        <Text style={styles.text}>{userName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    // backgroundColor: "red",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 5,
  },
  text: {
    fontSize: 20,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 45,
  },
  middleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 10,
  },
});
