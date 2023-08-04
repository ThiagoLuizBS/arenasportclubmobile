import { Button as ButtonNativeBase, IButtonProps } from "native-base";
import { Text } from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={16}
      bg="green.800"
      borderRadius={24}
      _pressed={{
        bgColor:"green.900"
      }}
      {...rest}
    >
      <Text 
        color="white" 
        fontWeight="semibold"
        fontSize={22}
        >
            {title}
      </Text>
    </ButtonNativeBase>
  );
}
