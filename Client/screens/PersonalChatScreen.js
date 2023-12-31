import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Message from "../components/Message";
import { useQuery, useMutation } from "react-query";
import { MyContext } from "../Context";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
const fetchChats = async ({ firstUser, secondUser }) => {
  try {
    const requestBody = JSON.stringify({ firstUser, secondUser });
    const response = await fetch("somerandomlink/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

const socket = io("somerandomlink/");

export default function PersonalChatScreen({ navigation, route }) {
  const [allChats, setAllChats] = useState([]);
  const [userSaved, setUserSaved] = useState()
  const {
    mutate: mutateChat,
    data: dataChats,
    error: errorChats,
  } = useMutation(fetchChats);

  const { userName } = route.params;
  const scrollViewRef = useRef();
  const [message, setMessage] = useState("");
  const submitMessage = () => {
    setMessage("");
    try {
      socket.emit("sendMessage", {
        firstUser: userName,
        secondUser: exist,
        message: message,
      });
    } catch (error) {
      console.error(error);
    }

  };

  async function retrieveData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        setUserSaved(value)

      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

  const { exist, setExist } = useContext(MyContext);

  if (userName && exist === undefined) {
    return <Text>Loading exist...</Text>;
  }

  useEffect(() => {
    socket.on("messageReceived", (newMessage) => {

      let firstName = newMessage.bothUser.split(" ")[0]
      let secondName = newMessage.bothUser.split(" ")[1]

      if (exist === firstName || exist === secondName) {
        if (userName === firstName || userName === secondName) {
          setAllChats(newMessage.chats);
        }
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await mutateChat({
          firstUser: userName,
          secondUser: exist,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userName, exist, mutateChat]);

  useEffect(() => {

    retrieveData("username")
  }, []);

  useEffect(() => {
    if (dataChats) {
      setAllChats(dataChats.chats);
    }
  }, [dataChats]);

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("home")}>
          <Image source={require("../assets/back.png")} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.username}>{userName}</Text>
      </View>
      <ScrollView style={styles.scrollview} ref={scrollViewRef}>
        {allChats.map((arr, index) => (
          <Message key={index} message={arr[1]} name={arr[0]} user={userSaved} />
        ))}
      </ScrollView>
      <View style={styles.messageContainer}>
        <TextInput
          placeholder="Enter message"
          value={message}
          style={styles.message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity
          onPress={() => submitMessage()}
          disabled={message.length > 0 ? false : true}
        >
          <Image source={require("../assets/send.png")} style={styles.send} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  headContainer: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    paddingLeft: 10,
  },
  back: {
    width: 20,
    height: 20,
  },
  username: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
  },
  scrollview: {
    flex: 1,
    paddingTop: 10,
  },
  messageContainer: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    paddingLeft: 10,
  },
  message: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    fontSize: 13,
    paddingLeft: 10,
    paddingVertical: 3,
  },
  send: {
    width: 38,
    height: 38,
  },
});
