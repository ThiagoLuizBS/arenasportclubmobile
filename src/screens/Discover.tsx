import { useEffect, useState } from "react";
import { Box, Text } from "native-base";
import { useWindowDimensions } from "react-native";
import i18n from "../languages/I18n";
import * as Location from "expo-location";

export default function Discover() {
  const { width } = useWindowDimensions();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      px={2}
      w="100%"
      alignItems="center"
      justifyContent="center"
    >
      {errorMsg !== "" ? (
        <Text fontSize={width > 700 ? 32 : 20}>{errorMsg}</Text>
      ) : (
        <>
          <Text fontSize={width > 700 ? 32 : 20}>
            {location?.coords.latitude}
          </Text>
          <Text fontSize={width > 700 ? 32 : 20}>
            {location?.coords.longitude}
          </Text>
        </>
      )}
    </Box>
  );
}
