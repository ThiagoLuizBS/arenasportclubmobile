import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { useContext, useEffect, useState } from "react";
import { RouteContext } from "../contexts/RouteProvider";
import Header from "../components/app/Header";
import Footer from "../components/app/Footer";
import BarStatus from "../components/app/BarStatus";

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
