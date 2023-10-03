import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import PersonChat from "../components/PersonChat";
import { useQuery } from "react-query";
import { MyContext } from "../Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const fetchAllUsers = async () => {
  try {

    const response = await fetch("somerandomlink/users");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

export default function ChatroomScreen({ navigation }) {
  const { data, error, isLoading } = useQuery("allUsers", fetchAllUsers);
  const { exist, setExist } = useContext(MyContext);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState();

  useEffect(() => {
    if (data) {
      const filteredData = data.filter((data) => {
        return (
          data.userName.toLowerCase().includes(search.toLocaleLowerCase()) &&
          data.userName !== exist
        );
      });
      setSearchData(filteredData);
    }
  }, [search]);

  async function removeData(key) {
    try {
      const value = await AsyncStorage.removeItem(key);
      setExist("login");
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>"An error occurred: " + `{error.message}`</Text>;
  }

  const newdata = data.filter((arr) => {
    return arr.userName !== exist;
  });

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <View style={styles.deleteContainer}>
          <Text style={styles.usernameText}>{exist}</Text>
          <TouchableOpacity onPress={() => removeData("username")}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/OOjs_UI_icon_logOut-ltr-invert.svg/1024px-OOjs_UI_icon_logOut-ltr-invert.svg.png",
              }}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Enter username"
          onChangeText={(text) => setSearch(text)}
          style={styles.search}
        />
      </View>
      <View style={styles.chats}>
        <Text style={styles.chatText}>Chats</Text>

        <FlatList
          data={!search ? newdata : searchData}
          keyExtractor={(item) => item.userName}
          style={styles.flatlist}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PersonChat
              key={item.userName}
              id={item.userName}
              userName={item.userName}
              navigation={navigation}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "purple",
  },
  headContainer: {
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  usernameText: {
    // backgroundColor: "red",
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  search: {
    fontSize: 18,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingLeft: 10,
    height: 45,
    width: "80%",
    backgroundColor: "white"
  },
  chats: {
    flex: 1,
    width: "95%",
    paddingTop: 40,
    // paddingBottom: 10,

    // marginTop: 5,
  },

  chatText: {
    fontSize: 20,
    marginLeft: 10,
    color: "white"
  },
  deleteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  image: {
    width: 18,
    height: 18,
  },
  flatlist: {
    flex: 1,
    width: "100%",

  },
});
