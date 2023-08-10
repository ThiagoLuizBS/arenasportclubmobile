import {
  Box,
  Center,
  VStack,
  Text,
  Image,
  Heading,
  ScrollView,
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
import { useContext, useCallback, useState } from "react";
import { RouteContext } from "../contexts/RouteProvider";
import { Ionicons } from "@expo/vector-icons";
import ToastLogin from "../components/app/ToastLogin";
import { useWindowDimensions } from "react-native";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup
    .string()
    .required("Informe o nome")
    .min(4, "Tem que ter pelo menos 4 dígitos"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  password: yup
    .string()
    .required("Informe a senha")
    .min(8, "A senha deve conter pelo menos 8 dígitos"),
  password_confirm: yup
    .string()
    .required("Informe a confirmação de senha")
    .oneOf([yup.ref("password"), ""], "A confirmação de senha não é igual"),
});

export default function SignUp() {
  const { navigate, goBack } = useNavigation();
  const { width } = useWindowDimensions();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const context = useContext(RouteContext);
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
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) });

  function handleSignUp(data: FormDataProps) {
    setServerErrorMessage(null);
    userService
      .getPost(data.name, data.email, data.password)
      .then((response) => {
        toast.show({
          render: () => {
            return <ToastLogin nameUser={data.name} type="Cadastro" />;
          },
        });
        navigate("Settings");
      })
      .catch((error) => {
        setServerErrorMessage(error.response.data.error);
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
      <HStack w="100%" alignItems="flex-start" px={2}>
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
            Criar Conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nome"
                marginTop={10}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Email"
                onChangeText={onChange}
                errorMessage={errors.email?.message || serverErrorMessage}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirme Senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />
          <Button title="Criar" onPress={handleSubmit(handleSignUp)} />
          <HStack>
            <Text marginTop={3} fontWeight="bold">
              Já tem uma conta?{" "}
            </Text>
            <Text
              marginTop={3}
              color={"emerald.700"}
              fontWeight="bold"
              onPress={() => navigate("SignIn")}
            >
              Entre aqui.
            </Text>
          </HStack>
        </Center>
      </VStack>
    </Box>
  );
}
