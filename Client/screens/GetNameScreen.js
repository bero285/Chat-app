import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyContext } from "../Context";
import { useMutation } from "react-query";

const setNameFetch = async (userName) => {
  try {
    const response = await fetch("somerandomlink/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName }),
    });

    if (!response.ok) {
      throw new Error("Error uploading username");
    }
  } catch (error) {
    throw error;
  }
};

export default function GetNameScreen({ navigation }) {
  const { mutate, isLoading, isError, isSuccess } = useMutation(setNameFetch);
  const [username, setUsername] = useState("");
  const { exist, setExist } = useContext(MyContext);
  const [logError, setLogError] = useState(" ");
  async function storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error storing data:", error);
    }
  }

  const submitName = async () => {
    if (username.length > 2) {
      try {
        await mutate(username, {
          onSuccess: () => {
            storeData("username", username);
            setExist(username);
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }
    if (username.length < 3) {
      setLogError("username must be longer");
      setTimeout(() => {
        setLogError(" ");
      }, 4000);
    }
    if (isLoading) {
      return <Text>...Loading</Text>;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.error}> {logError ? logError : null}</Text>
      <TextInput
        placeholder="username"
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
      />
      <TouchableOpacity style={styles.button} onPress={() => submitName()}>
        <Text style={styles.buttonText}>Set Name</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

  },
  headText: {
    backgroundColor: "yellow",
  },
  input: {
    width: "50%",
    borderWidth: 1,
    padding: 6,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "purple",
    width: "40%",
    // borderWidth: 2,
    padding: 5,
    paddingVertical: 7,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
