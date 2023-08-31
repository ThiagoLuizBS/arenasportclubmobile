import { useContext, useEffect, useState } from "react";
import { Box } from "native-base";
import { useWindowDimensions } from "react-native";
import * as Location from "expo-location";
import SelectDiscover from "../components/discover/SelectDiscover";
import { AuthContext } from "../contexts/AuthProvider";
import Localization from "../components/discover/Localization";
import Predict from "../components/discover/Predict";

export default function Discover() {
  const { width } = useWindowDimensions();
  const authContext = useContext(AuthContext);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState(false);
  const [permission, setPermission] = useState(false);
  const [type, setType] = useState("localization");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermission(false);
        setErrorMsg(true);
        return;
      }

      setPermission(true);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [authContext?.language]);

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
      <SelectDiscover type={type} setType={setType} />

      {type === "localization" ? (
        <Localization
          width={width}
          permission={permission}
          location={location}
          errorMsg={errorMsg}
        />
      ) : (
        <Predict width={width} permission={permission} errorMsg={errorMsg} />
      )}
    </Box>
  );
}
