import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Match from "../screens/Match";
import Championship from "../screens/Championship";
import Favorites from "../screens/Favorites";
import Settings from "../screens/Settings";

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

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
      <Screen name="Settings" component={Settings} />
    </Navigator>
  );
}
