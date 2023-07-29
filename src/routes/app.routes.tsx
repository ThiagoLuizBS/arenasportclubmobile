import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Match from "../screens/Match";
import Championship from "../screens/Championship";
import Favorites from "../screens/Favorites";
import Team from "../screens/Team";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import News from "../screens/News";
import Settings from "../screens/Settings";

export function AppRoutes() {
  const { Navigator, Screen } = createNativeStackNavigator();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component= {Home} />
      <Screen name="Team" component={Team} />
      <Screen name="Championship" component={Championship} />
      <Screen name="Match" component={Match} />
      <Screen name="Favorites" component={Favorites} />
      <Screen name="Settings" component={Settings} />
      <Screen name="News" component={News} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
