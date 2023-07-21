import {
  Box,
  Center,
  VStack,
  Text,
  Image,
  Heading,
  ScrollView,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import logo from "../assets/logo1.png";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import userService from "../services/user";
import { useNavigation } from "@react-navigation/native";

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
  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({ resolver: yupResolver(signUpSchema) });

  function handleSignUp(data: FormDataProps) {
    userService
      .getPost(data.name, data.email, data.password)
      .then((response) => {
        navigate("Home");
      })
      .catch((response) => {
        console.log(response.response.data.error);
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
            <Text marginTop={3} onPress={() => navigate('Favorites')}>Já tem uma conta? Entre aqui.</Text>
          </Center>
        </VStack>
      </ScrollView>
    </Box>
  );
}
