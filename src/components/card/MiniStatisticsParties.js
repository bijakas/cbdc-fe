// Chakra imports
// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatGroup,
  useColorModeValue,
  StatHelpText,
  StatArrow,
  Text,
  Progress,
  Divider,
  SimpleGrid,
  Spacer
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Custom icons
import React from "react";

export default function Default(props) {
  const { startContent, endContent, name, growth, value, progressValue } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  return (
    <Card py='15px' boxShadow='xs'>
      <Flex
        my='auto'
        h='100%'
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}>
        {startContent}

        <Stat my='auto' ms={startContent ? "18px" : "0px"}>
          <StatLabel
            // lineHeight='100%'
            // color={textColorSecondary}
            align="center"
            fontSize={{
              base: "xl",
            }}>
            {name}
          </StatLabel>
          <Divider orientation="horizontal" m="5px" />
          {endContent}
          <box m="10px"></box>
        </Stat>

      </Flex>
    </Card>
  );
}
