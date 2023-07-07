import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Match from "../screens/Match";
import Championship from "../screens/Championship";
import Favorites from "../screens/Favorites";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Championship" component={Championship} />
      <Screen name="Match" component={Match} />
      <Screen name="Favorites" component={Favorites} />
    </Navigator>
  );
}
