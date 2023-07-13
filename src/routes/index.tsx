import { NavigationContainer, useRoute } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import Header from "../components/Header";
import Footer from "../components/Footer";

export function Routes() {
  return (
    <NavigationContainer>
      <Header />
      <AppRoutes />
      <Footer />
    </NavigationContainer>
  );
}
