import { useState } from "react";
import {
  HStack,
  ColorMode,
  VStack,
  Text,
  Pressable,
  Divider,
} from "native-base";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useWindowDimensions } from "react-native";
import i18n from "../../languages/I18n";

type SelectHomeProps = {
  buttonChange: string;
  colorMode: ColorMode;
  changeSelected: (buttonName: string) => void;
  getTodayDate: (x: number) => string;
  dateFilter: string;
  changeDate: (dateChange: string) => void;
  getFilterSelect: (x: number) => string;
};

export default function SelectHome({
  buttonChange,
  colorMode,
  changeSelected,
  getTodayDate,
  dateFilter,
  changeDate,
}: SelectHomeProps) {
  const { width } = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeDatePicker = (date: Date) => {
    setSelectedDate(date);
    let day = String(date.getDate());
    let month = String(date.getMonth() + 1);
    let year = date.getFullYear();
    if (Number(day) < 10) day = "0" + day;
    if (Number(month) < 10) month = "0" + month;
    changeDate(`${day}-${month}-${year}`);
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange(event, date) {
        if (date) changeDatePicker(date);
      },
      mode: "date",
      is24Hour: true,
    });
  };
  return (
    <HStack
      w="100%"
      py={1}
      borderBottomWidth={2}
      _dark={{ borderBottomColor: "blueGray.700" }}
      _light={{ borderBottomColor: "emerald.700" }}
    >
      <Pressable
        w="20%"
        justifyContent="center"
        alignItems="center"
        onPress={() => changeSelected("all")}
      >
        <VStack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Ionicons
            name="football-sharp"
            size={32}
            color={
              colorMode === "light"
                ? buttonChange === "all"
                  ? "#047857"
                  : "black"
                : buttonChange === "all"
                ? "#fff7ed"
                : "#334155"
            }
          />
          <Text
            _dark={{ color: "orange.50" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 24 : 14}
            fontWeight="bold"
          >
            {i18n.t("Todas")}
          </Text>
        </VStack>
      </Pressable>
      <Divider
        h="60%"
        m="auto"
        orientation="vertical"
        _dark={{
          bg: "blueGray.700",
        }}
        _light={{
          bg: "emerald.700",
        }}
      />
      <Pressable
        w="20%"
        justifyContent="center"
        alignItems="center"
        isDisabled={getTodayDate(0) !== dateFilter}
        _disabled={{ opacity: 0.4 }}
        onPress={() => changeSelected("live")}
      >
        <VStack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <MaterialCommunityIcons
            name="clock"
            size={32}
            color={
              colorMode === "light"
                ? buttonChange === "live"
                  ? "#047857"
                  : "black"
                : buttonChange === "live"
                ? "#fff7ed"
                : "#334155"
            }
          />
          <Text
            _dark={{ color: "orange.50" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 24 : 14}
            fontWeight="bold"
          >
            {i18n.t("AoVivo")}
          </Text>
        </VStack>
      </Pressable>
      <Divider
        h="60%"
        m="auto"
        orientation="vertical"
        _dark={{
          bg: "blueGray.700",
        }}
        _light={{
          bg: "emerald.700",
        }}
      />
      <Pressable
        w="20%"
        justifyContent="center"
        alignItems="center"
        isDisabled={getTodayDate(0) !== dateFilter}
        _disabled={{ opacity: 0.4 }}
        onPress={() => changeSelected("finished")}
      >
        <VStack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <MaterialCommunityIcons
            name="whistle"
            size={32}
            color={
              colorMode === "light"
                ? buttonChange === "finished"
                  ? "#047857"
                  : "black"
                : buttonChange === "finished"
                ? "#fff7ed"
                : "#334155"
            }
          />
          <Text
            _dark={{ color: "orange.50" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 24 : 14}
            fontWeight="bold"
          >
            {i18n.t("Encerradas")}
          </Text>
        </VStack>
      </Pressable>
      <Divider
        h="60%"
        m="auto"
        orientation="vertical"
        _dark={{
          bg: "blueGray.700",
        }}
        _light={{
          bg: "emerald.700",
        }}
      />
      <Pressable
        w="20%"
        justifyContent="center"
        alignItems="center"
        isDisabled={getTodayDate(0) !== dateFilter}
        _disabled={{ opacity: 0.4 }}
        onPress={() => changeSelected("next")}
      >
        <VStack
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Ionicons
            name="play-forward"
            size={32}
            color={
              colorMode === "light"
                ? buttonChange === "next"
                  ? "#047857"
                  : "black"
                : buttonChange === "next"
                ? "#fff7ed"
                : "#334155"
            }
          />
          <Text
            _dark={{ color: "orange.50" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 24 : 14}
            fontWeight="bold"
          >
            {i18n.t("Proximas")}
          </Text>
        </VStack>
      </Pressable>
      <Divider
        h="60%"
        m="auto"
        orientation="vertical"
        _dark={{
          bg: "blueGray.700",
        }}
        _light={{
          bg: "emerald.700",
        }}
      />
      <Pressable
        w="20%"
        justifyContent="center"
        alignItems="center"
        onPress={() => showMode()}
      >
        <VStack>
          <Ionicons
            name="calendar"
            size={32}
            color={colorMode === "light" ? "black" : "#fff7ed"}
          />
        </VStack>
      </Pressable>
    </HStack>
  );
}
