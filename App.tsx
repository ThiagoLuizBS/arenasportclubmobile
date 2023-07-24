import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/contexts/AuthProvider";
import { RouteProvider } from "./src/contexts/RouteProvider";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <AuthProvider>
        <RouteProvider>
          <Routes />
        </RouteProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
}
