import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
} from "native-base";

type Props = IInputProps & {
  errorMessage?: string | null;
};

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl marginBottom={4} isInvalid={invalid}>
      <NativeBaseInput
        bg={"white"}
        fontSize={"md"}
        h={"16"}
        borderRadius={20}
        isInvalid={invalid}
        placeholderTextColor="gray.500"
        _focus={{
          bg: "gray.300",
          borderColor: "success.700",
          borderWidth: 2,
        }}
        _invalid={{
            borderWidth:2,
            borderColor:"red.500"
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
