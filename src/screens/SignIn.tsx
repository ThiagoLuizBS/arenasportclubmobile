import {
  Box,
  Center,
  VStack,
  Text,
  Heading,
  ScrollView,
  HStack,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import userService from "../services/user";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail").email("E-mail incorreto"),
  password: yup
    .string()
    .required("Informe a senha")
    .min(8, "A senha deve conter pelo menos 8 dígitos"),
});

export default function SignIn() {
  const { navigate } = useNavigation();

  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
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
        console.log(response.data);
        navigate("Home");
      })
      .catch((error) => {
        if (error.response) {
          setServerErrorMessage("Email ou senha incorretos.");
          console.log(error.response.data.error);
        }
      });
  }

  return (
    <Box
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "success.100" }}
      flex={1}
      w="100%"
    >
      <ScrollView>
        <VStack px={10}>
          <Center>
            <Heading
              _dark={{ color: "white" }}
              _light={{ color: "black" }}
              marginY={3}
              fontSize={30}
              fontWeight="bold"
            >
              Seja Bem-Vindo!
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
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.password?.message || serverErrorMessage}
                />
              )}
            />
            <Button
              title="Entrar"
              marginTop={10}
              onPress={handleSubmit(handleSignIn)}
            />
            <HStack>
              <Text marginTop={3} fontWeight="bold">
                Não possui conta?{" "}
              </Text>
              <Text
                marginTop={3}
                color={"green.900"}
                fontWeight="bold"
                onPress={() => navigate("SignUp")}
              >
                Registre-se aqui.
              </Text>
            </HStack>
          </Center>
        </VStack>
      </ScrollView>
    </Box>
  );
}
