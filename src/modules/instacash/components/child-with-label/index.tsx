import { ReactNode, FC } from "react";

import { FormControl, FormLabel, Text } from "@chakra-ui/react";
export type ChildWithLabelProps = {
  label: string;
  children: ReactNode;
};

export const ChildWithLabel: FC<ChildWithLabelProps> = ({
  children,
  label,
}) => {
  return (
    <FormControl>
      <FormLabel>
        <Text>{label}</Text>
      </FormLabel>
      {children}
    </FormControl>
  );
};
