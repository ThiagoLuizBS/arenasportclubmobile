import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";
import { useWindowDimensions } from "react-native";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const { width } = useWindowDimensions();
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl marginBottom={4} isInvalid={invalid}>
      <NativeBaseInput
        bg={"orange.50"}
        fontSize={width > 700 ? 24 : 16}
        h={"16"}
        borderRadius={20}
        isInvalid={invalid}
        _dark={{ placeholderTextColor: "black", color: "black" }}
        _light={{ placeholderTextColor: "gray.500", color: "gray.500" }}
        _focus={{
          bg: "gray.300",
          borderColor: "success.700",
          borderWidth: 2,
        }}
        _invalid={{
          borderWidth: 2,
          borderColor: "red.500",
        }}
        {...rest}
      />
      {errorMessage && (
        <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      )}
    </FormControl>
  );
}
