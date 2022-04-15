import React from "react";
import { Flex, Spacer, Box, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export default function Example() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex>
      <Spacer />
      <Box py={2}>
        <IconButton icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} onClick={toggleColorMode}>
        </IconButton>
      </Box>
    </Flex>
  );
}
