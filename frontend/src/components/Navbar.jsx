import { Button, Container, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { PlusSquareIcon } from '@chakra-ui/icons';
import { useColorMode } from '@chakra-ui/react';
import { IoMoon, IoSunny } from "react-icons/io5"

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
  return <Container maxW={"1140px"} px={4} >
    <Flex 
    h={16}
    alignItems={"center"}
    justifyContent={"space-between"}
    flexDir={{base: "column", sm: "row"}}
    >
      <Text
        fontSize={{base: 22, sm: 28}}
        fontWeight={"bold"}
        textTransform={"uppercase"}
        textAlign={["center", "left"]}
        bgGradient={"linear(to-r, cyan.400,blue.500)"}
        bgClip={"text"}
      
      
      >
        <Link to={"/"}>Product Store</Link>
      </Text>

      <HStack spacing={8} alignItems={"center"}>
        <Link to={"/create"}>
            <Button>
                <PlusSquareIcon fontSize={"20px"}/>
            </Button>
        </Link>
        <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <IoSunny />}
        </Button>
      </HStack>

    </Flex>
  </Container>
}

export default Navbar
