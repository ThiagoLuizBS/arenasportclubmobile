import { useState } from "react";
import {
  HStack,
  ColorMode,
  VStack,
  Text,
  Pressable,
  Divider,
} from "native-base";
import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useWindowDimensions } from "react-native";

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
                ? "white"
                : "#334155"
            }
          />
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 24 : 14}
            fontWeight="bold"
          >
            Todas
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
                ? "white"
                : "#334155"
            }
          />
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 24 : 14}
            fontWeight="bold"
          >
            Ao vivo
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
                ? "white"
                : "#334155"
            }
          />
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 24 : 14}
            fontWeight="bold"
          >
            Encerradas
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
                ? "white"
                : "#334155"
            }
          />
          <Text
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
            fontSize={width > 700 ? 24 : 14}
            fontWeight="bold"
          >
            Próximas
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
          <Fontisto
            name="date"
            size={32}
            color={colorMode === "light" ? "black" : "white"}
          />
        </VStack>
      </Pressable>
    </HStack>
  );
}
