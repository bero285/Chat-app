import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetNameScreen from "../screens/GetNameScreen";
import ChatroomScreen from "../screens/ChatroomScreen";
import PersonalChatScreen from "../screens/PersonalChatScreen";
import ContainerScreen from "../screens/ContainerScreen";

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={ContainerScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="person"
        component={PersonalChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default AppNavigator;
