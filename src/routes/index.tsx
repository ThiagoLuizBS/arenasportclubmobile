import { NavigationContainer, useRoute } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { RouteContext } from "../contexts/RouteProvider";
import BarStatus from "../components/BarStatus";

export function Routes() {
  const [shoulHideHeaderFooter, setShoulHideHeaderFooter] = useState(false);
  const routeContext = useContext(RouteContext);

  useEffect(() => {
    if (routeContext) setShoulHideHeaderFooter(routeContext.hideHeaderFooter);
  }, [routeContext?.hideHeaderFooter]);

  return (
    <NavigationContainer>
      <BarStatus />
      {shoulHideHeaderFooter ? null : <Header />}
      <AppRoutes />
      {shoulHideHeaderFooter ? null : <Footer />}
    </NavigationContainer>
  );
}
