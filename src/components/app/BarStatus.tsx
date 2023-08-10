import { StatusBar, useColorMode } from "native-base";

export default function BarStatus() {
  const { colorMode } = useColorMode();

  return (
    <StatusBar
      barStyle={colorMode === "light" ? "dark-content" : "light-content"}
      backgroundColor={colorMode === "light" ? "#dcfce7" : "#0f172a"}
    />
  );
}
