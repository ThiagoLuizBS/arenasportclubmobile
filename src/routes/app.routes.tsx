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
import Discover from "../screens/Discover";
import Search from "../screens/Search";
import Profile from "../screens/Profile";

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
      <Screen name="Team" component={Team} />
      <Screen name="Match" component={Match} />
      <Screen name="Favorites" component={Favorites} />
      <Screen name="News" component={News} />
      <Screen name="Discover" component={Discover} />
      <Screen name="Settings" component={Settings} />
      <Screen name="Search" component={Search} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
