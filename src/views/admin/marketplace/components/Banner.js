import React from "react";

// Chakra imports
import { Button, Flex, Link, Text } from "@chakra-ui/react";

// Assets
import banner from "assets/img/auth/auth.png";


export default function Banner() {
  // Chakra Color Mode
  return (
    <Flex
    align='center'
      direction='column'
      bgImage={banner}
      bgSize='cover'
      py={{ base: "10px", md: "36px" }}
      px={{ base: "10px", md: "34px" }}
      borderRadius='30px'>
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color='white'
        mb='14px'
        maxW={{
          base: "100%",
          md: "64%",
          lg: "46%",
          xl: "70%",
          "2xl": "50%",
          "3xl": "42%",
        }}
        fontWeight='700'
        lineHeight={{ base: "32px", md: "42px" }}
        >
        Selamat datang INDOIDJA
      </Text>
      <Text
        fontSize='md'
        color='#E3DAFF'
        maxW={{
          base: "100%",
          md: "64%",
          lg: "40%",
          xl: "56%",
          "2xl": "46%",
          "3xl": "34%",
        }}
        fontWeight='500'
        lineHeight='28px'>
        Sistem monitoring transaksi Digital Rupiah yang terjadi di seluruh Node
      </Text>
    </Flex>
  );
}
