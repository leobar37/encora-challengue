import { Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { Children, FC, Fragment, ReactNode } from "react";

type GroupStatsProps = {
  children: ReactNode;
};

export const GroupStats: FC<GroupStatsProps> = ({ children }) => {
  const childs = Children.toArray(children).map((child, idx) => {
    const isLast = idx === Children.count(children) - 1;
    return (
      <Fragment key={idx}>
        {child}
        {!isLast && (
          <Divider
            borderColor={"black"}
            borderStyle={"dashed"}
            orientation="vertical"
            height={"60px"}
            borderWidth={"1px"}
          />
        )}
      </Fragment>
    );
  });
  return <HStack spacing={5}>{childs}</HStack>;
};
