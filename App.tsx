import React from "react";
import {
  ColorMode,
  NativeBaseProvider,
  extendTheme,
  StorageManager,
} from "native-base";
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/contexts/AuthProvider";
import { RouteProvider } from "./src/contexts/RouteProvider";
import { SearchProvider } from "./src/contexts/SearchProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavoritesProvider } from "./src/contexts/FavoritesProvider";

const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem("@arena:theme");
      return val === "dark" ? "dark" : "light";
    } catch (e) {
      return "light";
    }
  },
  set: async (value: ColorMode) => {
    try {
      if (value) await AsyncStorage.setItem("@arena:theme", value);
    } catch (e) {}
  },
};

// Define the config
const config = {
  useSystemColorMode: true,
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export default function App() {
  return (
    <NativeBaseProvider theme={theme} colorModeManager={colorModeManager}>
      <AuthProvider>
        <FavoritesProvider>
          <RouteProvider>
            <SearchProvider>
              <Routes />
            </SearchProvider>
          </RouteProvider>
        </FavoritesProvider>
      </AuthProvider>
    </NativeBaseProvider>
  );
}
