import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Match from "../screens/Match";
import Championship from "../screens/Championship";
import Favorites from "../screens/Favorites";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Championship" component={Championship} />
      <Screen name="Match" component={Match} />
      <Screen name="Favorites" component={Favorites} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
