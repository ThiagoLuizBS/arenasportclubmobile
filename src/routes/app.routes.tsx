import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Campeonatos from "../screens/Campeonatos";
import Home from "../screens/Home";
import Match from "../screens/Match";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Campeonatos" component={Campeonatos} />
      <Screen name="Match" component={Match} />
    </Navigator>
  );
}
