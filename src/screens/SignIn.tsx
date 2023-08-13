import { useCallback, useContext, useState } from "react";
import {
  Box,
  Center,
  VStack,
  Text,
  Heading,
  HStack,
  Pressable,
  useColorMode,
  useToast,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../components/sign/Input";
import { Button } from "../components/sign/Button";
import userService from "../services/user";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RouteContext } from "../contexts/RouteProvider";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthProvider";
import ToastLogin from "../components/app/ToastLogin";
import { useWindowDimensions } from "react-native";
import i18n from "../languages/I18n";

type FormDataProps = {
  email: string;
  password: string;
};

export default function SignIn() {
  const signInSchema = yup.object({
    email: yup
      .string()
      .required(i18n.t("InformeEmail"))
      .email(i18n.t("EmailIncorreto")),
    password: yup
      .string()
      .required(i18n.t("InformeSenha"))
      .min(8, i18n.t("RequisicaoSenha")),
  });

  const { width } = useWindowDimensions();
  const { navigate } = useNavigation();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const context = useContext(RouteContext);
  const authContext = useContext(AuthContext);
  const route = useRoute();
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );

  useFocusEffect(
    useCallback(() => {
      if (context) context.handleRoute(route.name);
    }, [])
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signInSchema) });

  function handleSignIn(data: FormDataProps) {
    setServerErrorMessage(null);
    userService
      .getUser(data.email, data.password)
      .then((response) => {
        authContext?.handleLogin(
          response.data.token,
          response.data.idUser,
          response.data.nameUser,
          data.email
        );
        toast.show({
          render: () => {
            return (
              <ToastLogin nameUser={response.data.nameUser} type="Login" />
            );
          },
        });
        navigate("Home");
      })
      .catch((error) => {
        if (error.response) {
          setServerErrorMessage(i18n.t("EmailSenhaIncorreto")); // // {i18n.t("EmailSenhaIncorreto")}
        }
      });
  }

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      justifyContent="center"
      w="100%"
    >
      <HStack
        w="100%"
        alignItems="flex-start"
        justifyContent="flex-start"
        px={2}
      >
        <Pressable onPress={() => navigate("Settings")}>
          <Ionicons
            name="arrow-back"
            color={colorMode === "light" ? "black" : "#fff7ed"}
            size={24}
          />
        </Pressable>
      </HStack>
      <VStack px={10} h="90%" justifyContent="center">
        <Center>
          <Heading
            _dark={{ color: "orange.50" }}
            _light={{ color: "black" }}
            marginY={3}
            fontSize={width > 700 ? 48 : 32}
            fontWeight="bold"
          >
            {i18n.t("BemVindo")}
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                marginTop={16}
                placeholder="Email"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder={i18n.t("Senha")}
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message || serverErrorMessage}
              />
            )}
          />
          <Button
            title={i18n.t("Entrar")}
            marginTop={10}
            onPress={handleSubmit(handleSignIn)}
          />
          <HStack>
            <Text marginTop={3} fontWeight="bold">
              {i18n.t("SemConta")}{" "}
            </Text>
            <Text
              marginTop={3}
              color={"emerald.700"}
              fontWeight="bold"
              onPress={() => navigate("SignUp")}
            >
              {i18n.t("Registre")}
            </Text>
          </HStack>
        </Center>
      </VStack>
    </Box>
  );
}
