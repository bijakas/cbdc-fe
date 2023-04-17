import React from "react";

// Chakra imports
import { Flex, Text } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  return (
    <Flex align='center' direction='column'>
    <Text color="white" fontSize="2xl" fontWeight="1000" me="10px">
					GARUDA
		</Text>
      
      {/* <HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /> */}
      <HSeparator m='20px' />
    </Flex>
  );
}

export default SidebarBrand;
