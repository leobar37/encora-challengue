import { Divider, HStack } from "@chakra-ui/react";
import { Children, Fragment } from "react";
import type { ReactNode, FC } from "react";

export type GroupStatsProps = {
  children?: ReactNode;
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
