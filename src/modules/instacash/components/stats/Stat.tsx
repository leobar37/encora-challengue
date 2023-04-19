import { Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { Children, FC, Fragment, ReactNode } from "react";

export type StatProps = {
  label: string;
  children: ReactNode;
};
export const Stat: FC<StatProps> = ({ label, children }) => {
  return (
    <VStack>
      <Text>{label}</Text>
      <Text fontWeight={"bold"}>{children}</Text>
    </VStack>
  );
};
