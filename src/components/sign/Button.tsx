import { Button as ButtonNativeBase, IButtonProps } from "native-base";
import { Text } from "native-base";
import { useWindowDimensions } from "react-native";

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  const { width } = useWindowDimensions();

  return (
    <ButtonNativeBase
      w="full"
      h={16}
      bg="green.800"
      borderRadius={24}
      _pressed={{
        bgColor: "green.900",
      }}
      {...rest}
    >
      <Text
        color="orange.50"
        fontWeight="semibold"
        fontSize={width > 700 ? 32 : 24}
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
